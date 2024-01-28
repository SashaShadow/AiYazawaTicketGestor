import { useState, useContext } from 'react';
import Context from '../../context/SessionContext.js';
import './Navbar.css'
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const { user } = useContext(Context);

    return (
      <nav className='MyNav'>
        <div>
          <NavLink className="" to={`/`}>
            <h2 className='HomeBut'>Home</h2>
          </NavLink>
        </div>

        <div>
          {user ? <h4>{user.username}</h4> 
          : 
          <NavLink className="" to={`/login`}>
            <h4 className='HomeBut'>Login</h4>
          </NavLink>} 

        </div>

      </nav>
    )
}

export default Navbar;