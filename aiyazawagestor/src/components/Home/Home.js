import { useState } from 'react'
import './Home.css';
import Validar from '../Validar/Validar.js'
import CrearEntrada from '../CrearEntrada/CrearEntrada.js'

const Home = () => {

    const [eleccion, setEleccion] = useState(null)

    return (
        <>
            <h1 className='GestorTitle'>Gestor de entradas</h1>
            <div className='ContHome'>
                <button onClick={() => setEleccion("validar")} className="btn btn-primary">Validar entrada</button>
                <button onClick={() => setEleccion("crear")} className="btn btn-primary">Crear entrada</button>
            </div>

            {eleccion === "validar" && <Validar/>}
            {eleccion === "crear" && <CrearEntrada/>}
        </>
    )   
}

export default Home;