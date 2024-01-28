import { useState, useEffect, useContext, useRef} from 'react'
import './CrearEntrada.css';
import { backendEnd } from "../../utils/urls.js"
import Context from '../../context/SessionContext.js'; 
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const CrearEntrada = () => {

    const [datosEntrada, setDatosEntrada] = useState({name: null, dni: null, cantidad: null})
    const [entradaCreada, setEntradaCreada] = useState(null)
    const [habilitar, setHabilitar] = useState(false)
    const [errorAlert, setErrorAlert] = useState(null)
    const [loader, setLoader] = useState(false)
    const { token, getAxiosInstance } = useContext(Context)

    const myAxios = getAxiosInstance();

    const divRef = useRef(null);

    useEffect(() => {
        if (!token) {
            window.location.replace("/login")
        }
    }, [token])

    const descargarPDF = async () => {
        // Obtén el contenido del div como imagen
        const canvas = await html2canvas(divRef.current);
        const imgData = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
    
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    
        pdf.save(`EntradaID${entradaCreada.ticket._id}.pdf`);
      };

    const formChange = (e, field) => {
        if (e.target.value && e.target.value !== "") {
            setDatosEntrada({...datosEntrada, [field]: e.target.value})
        } else {
            setDatosEntrada({...datosEntrada, [field]: null})
        }
    }

    useEffect(() => {
        if (datosEntrada && datosEntrada.name && datosEntrada.dni && datosEntrada.cantidad) {
            setHabilitar(true)
        } else {
            setHabilitar(false)
        }
    }, [datosEntrada])

    const crearEntradaNueva = async () => {
        setErrorAlert(null)
        setEntradaCreada(null)
        setLoader(true)
        try {
            const creacionCall = await myAxios.post(`${backendEnd}tickets/`, datosEntrada)
            setEntradaCreada(creacionCall.data)
        } catch (err) {
            setErrorAlert(err.toString())
        }   
        setLoader(false)
        setDatosEntrada(null)
    }

    return (
        <>
            <h2 className='blanco'>Crear nueva entrada</h2>
            {loader && <h3 className='blanco'>Cargando...</h3>}

            {entradaCreada && <button onClick={() => setEntradaCreada(null)} className='btn btn-primary'>Crear otra entrada</button>}

            {errorAlert && 
            <>
              <h2 className='blanco'>Error: {errorAlert}</h2>
            </>}

            {entradaCreada && 
            <>
                <h2 className='blanco'>Entrada creada.</h2>
                <div className='EntradaValida' ref={divRef}>
                    <h2>Nombre: {entradaCreada.ticket.name}</h2>  
                    <h2>DNI: {entradaCreada.ticket.dni}</h2>  
                    <h2>Cantidad de entradas: {entradaCreada.ticket.cantidad}</h2>  
                    <p>ID de entrada: {entradaCreada.ticket._id}</p>  
                    <img className='Qr' src={`${entradaCreada.qrCode}`} alt="QR Code"/>
                </div>
                <button className='btn btn-primary' onClick={() => descargarPDF()}>Descargar entrada PDF</button>
            </>
            }

            {!entradaCreada && <div className='FormCrear'>
                <div className='InputDiv'>
                    <label htmlFor='name'>Nombre y apellido</label>
                    <input onChange={(e) => formChange(e, "name")} className='form-control' type='text' name='name' placeholder='Nombre y apellido'/>
                </div>
                <div className='InputDiv'>
                    <label htmlFor='dni'>DNI</label>
                    <input onChange={(e) => formChange(e, "dni")} className='form-control' type='text' name='dni' placeholder='Numero dni'/>
                </div>
                <div className='InputDiv'>
                    <label htmlFor='cantidad'>Cantidad de entradas</label>
                    <input onChange={(e) => formChange(e, "cantidad")} className='form-control' type='number' name='cantidad' placeholder='Cantidad'/>
                </div>

                <button className='btn btn-primary' disabled={!habilitar || loader} onClick={() => crearEntradaNueva()}>Crear entrada</button>
            </div>}

        </>
    )   
}

export default CrearEntrada;