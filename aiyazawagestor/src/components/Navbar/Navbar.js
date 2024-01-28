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
    // <nav className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
    //   <div className="container">
    //     <div className="navbar-translate">
    //       <a className="navbar-brand" href={"/"}>
    //         <div className="logo-image">
    //           <h2>Home</h2>
    //         </div>
    //       </a>
    //       <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
    //         <span className="sr-only">Toggle navigation</span>
    //         <span className="navbar-toggler-icon"></span>
    //         <span className="navbar-toggler-icon"></span>
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //     </div>
    //     <div className="collapse navbar-collapse">
    //       <ul className="navbar-nav ml-auto">
            
    //         {user ? 
    //         <>
    //         <li className={`dropdown nav-item ${toggleLogin && 'show'}`} onClick={() => setToggleLogin(!toggleLogin)}>
    //             <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown" >
    //             <i className="material-icons">face</i> {user.username}
    //             </a>
    //             {toggleLogin ? 
    //             <div className={`dropdown-menu dropdown-with-icons myDrop ${toggleLogin ? 'show showing' : null}`}>
    //                 <a href={`/logout`} className="dropdown-item">
    //                 <i className="material-icons">exit_to_app</i> logOut
    //                 </a>
    //             </div> : null
    //             } 
    //         </li>
    //         </> : 

    //         <>
    //         <li className={`dropdown nav-item ${toggleLogin && 'show'}`} onClick={() => setToggleLogin(!toggleLogin)}>
    //             <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown" >
    //                 <i className="material-icons">face</i> Invitado
    //             </a>
    //             {toggleLogin ? 
    //             <div className={`dropdown-menu dropdown-with-icons myDrop ${toggleLogin ? 'show showing' : 'show'}`}>
    //                 <a href={`/login`} className="dropdown-item">
    //                 <i className="material-icons">exit_to_app</i> logIn
    //                 </a>
    //             </div> : null
    //             }
    //         </li>
    //         </>
    //         }
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    )
}

export default Navbar;