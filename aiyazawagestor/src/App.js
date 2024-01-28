import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {SessionContext} from "./context/SessionContext.js";
import Navbar from './components/Navbar/Navbar.js';
import './App.css';
import './material-kit.css';
import { ScreenMsgProvider } from "./utils/screenMsg.js";
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import img from './nanaback.jpeg';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
      document.body.style.backgroundImage = `url(${img})`  // double check my quotes

      document.body.style.backgroundSize = 'cover'; // Ajusta el tamaño de la imagen para cubrir todo el fondo

      // Media query para dispositivos con un ancho de pantalla máximo de 600px
      const mediaQuery = window.matchMedia('(max-width: 600px)');

      // Función de devolución de llamada que se ejecutará cuando cambie la coincidencia de la media query
      const handleMediaQueryChange = (event) => {
        if (event.matches) {
          // Establece un tamaño de fondo diferente para dispositivos móviles
          document.body.style.backgroundSize = 'contain';
        } else {
          // Restaura el tamaño de fondo para pantallas más grandes
          document.body.style.backgroundSize = 'cover';
        }
      }

      // Agrega el evento de escucha a la media query
      mediaQuery.addEventListener('change', handleMediaQueryChange);

      // Ejecuta la función de devolución de llamada inicialmente para configurar el tamaño inicial
      handleMediaQueryChange(mediaQuery);

      // Elimina el evento de escucha cuando el componente se desmonta
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      };
  }, [])
  
  return (
    <ScreenMsgProvider>
      <BrowserRouter>
        <SessionContext>
          <div className="App">
            <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/logout' element={<h3>pagina logout</h3>}/>
              {/* <Route path='/home/' element={<TxtFormatArba/>}/> */}
              <Route path='*' element={<h1>Not Found</h1>}/>
            </Routes>
          </div>
        </SessionContext>
      </BrowserRouter>
    </ScreenMsgProvider>
  );
}

export default App;