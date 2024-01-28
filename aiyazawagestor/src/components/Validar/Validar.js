import { useState, useEffect} from 'react'
import './Validar.css';
import { QrScanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import { backendEnd } from "../../utils/urls.js"

const Validar = () => {

    const [result, setResult] = useState(null); // Almacenar el resultado del escaneo
    const [errorAlert, setErrorAlert] = useState(null)
    const [entradaValida, setEntradaValida] = useState(null)

    const ticketFormat = ticket => {
      const formatOk = ticket.hasOwnProperty("name") && ticket.hasOwnProperty("dni") && ticket.hasOwnProperty("cantidad") && (ticket.hasOwnProperty("_id") || ticket.hasOwnProperty("id"))
      return formatOk
    }

    useEffect(() => {
      const ticketCheck = async () => {
        try {
          const id = result.id || result._id
          const searchTicket = await axios.get(`${backendEnd}tickets/${id}`)

          if (typeof searchTicket.data !== "object" || !searchTicket.data.hasOwnProperty("ticket")) {
            throw new Error("Formato de entrada invalido")
          }

          if (searchTicket.data.error) throw new Error(searchTicket.data.error)

          setEntradaValida(searchTicket.data)

        } catch (err) {
          setErrorAlert(err.toString())
        }
      }

      if (result && ticketFormat(result)) {
        ticketCheck()
      }
    }, [result])

    const vaciarDatos = () => {
      setEntradaValida(null)
      setResult(null)
      setErrorAlert(null)
    }

    const handleScan = async (data) => {
      vaciarDatos()
      if (data) {
        const objData = JSON.parse(data)
        setResult(objData);
      }
    }
  
    const handleError = (error) => {
      setErrorAlert(error);
    }

    return (
        <>
            <h2 className='blanco'>Escanear QR para validar entrada</h2>
            {!result && <QrScanner
                onDecode={(result) => handleScan(result)}
                onError={(error) => handleError(error?.message)}
            />}
            {result && <button onClick={() => setResult(null)} className='btn btn-primary'>Escanear otra entrada</button>}
            
            {errorAlert && 
            <>
              <h2 className='blanco'>Entrada invalida: {errorAlert}</h2>
            </>}

            {entradaValida && 
            <>
              <h2 className='blanco'>Entrada valida.</h2>
              <div className='EntradaValida'>
                <h2>Nombre: {entradaValida.ticket.name}</h2>  
                <h2>DNI: {entradaValida.ticket.dni}</h2>  
                <h2>Cantidad de entradas: {entradaValida.ticket.cantidad}</h2>  
                <img className='Qr' src={`${entradaValida.qrCode}`} alt="QR Code"/>
              </div>
            </>
            }
        </>
    )   
}

export default Validar;