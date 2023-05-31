import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import images from '../../assets/images/images'
import {HiMenu} from 'react-icons/hi'
import {GrClose} from 'react-icons/gr'
import './header.css'
import { AppContext } from '../../utils/EstadoGlobal'

const Header = () => {

  //Estado global
  const {userJwt, setUserJwt} = useContext(AppContext)

  const [show, setShow] = useState(false)

  const showMenu = ()=> {
    if(show){
      setShow(false)
    }else{
      setShow(true)
    }
  }
  return (
    <header>
      <section>
          <div className="imagotipo">
            <Link to='/home' style={{ textDecoration: 'none' }}>
            
              <img src={images.logoBukinFood} alt="icon-logo" />
              <div className="texto-logo">
                <h1>La forma más fácil </h1>
                <h3>De tener almuerzos deliciosos</h3>
              </div>
            </Link>
          </div>

        {userJwt?.nombre.length > 1 
        ? userJwt.rol == "ADMIN" 
          ? 
            <div className='botones-logueo'>
              <div className='avatar-user'>
                <span>{userJwt.nombre.charAt(0)}</span>
                <span>{userJwt.apellido.charAt(0)}</span>
              </div>

              <div className='usuario-nombre'>
                <p>{userJwt.nombre} {userJwt.apellido}</p>
              </div>

              <button>
                <Link to='/administracion' style={{ textDecoration: 'none' }}>
                  Modulo Admin
                </Link>
              </button>

              <button>
                <Link to='/login' style={{ textDecoration: 'none' }}>
                  Cerrar sesión
                </Link>
              </button>

            </div>
          : <div className='botones-logueo'>
              <div className='avatar-user'>
                <span>{userJwt.nombre.charAt(0)}</span>
                <span>{userJwt.apellido.charAt(0)}</span>
              </div>
              <div className='usuario-nombre'>
                <p>{userJwt.nombre} {userJwt.apellido}</p>
              </div>
              <button>
                <Link to='/login' style={{ textDecoration: 'none' }}>
                  Cerrar sesión
                </Link>
              </button>
              
              
            </div>
        
        : (
          <div className="botones-logueo">
            <button>
              <Link to='/usuario/registrar' style={{ textDecoration: 'none' }}>
                Crear cuenta
              </Link>
            </button>

            <button>
              <Link to='/login' style={{ textDecoration: 'none' }}>
                Iniciar sesión
              </Link>
            </button>
          </div>
          )
        }  

        {/* <div className="botones-logueo">
          <button>
            <Link to='/usuario/registrar' style={{ textDecoration: 'none' }}>
              Crear cuenta
            </Link>
          </button>

          <button>
            <Link to='/administracion' style={{ textDecoration: 'none' }}>
              Modulo Admin
            </Link>
          </button>

          <button>
            <Link to='/login' style={{ textDecoration: 'none' }}>
              Iniciar sesión
            </Link>
          </button>
        </div> */}

        {show 
        ? <div className='menu-movil'>
            <div className="menu">
              <div className='menu-container'>
                <button onClick={showMenu}><GrClose/></button>
                <h2>Menú</h2>
              </div>
              <ul>
                <li>Crear cuenta</li>
                <li>Iniciar sesión</li>
              </ul>
            </div>
            <div className="redes-menu">
              <img
                src={images.facebook}
                alt="icono-facebook"
              />
              <img className='logo' src={images.linkedin} alt="icono-linkedin" />
              <img src={images.twitter} alt="icono-twitter" />
              <img className='logo' src={images.instagram} alt="icono-instagram" />
            </div>
          </div>
        : (
          <div className='menu-icono'>
            <button onClick={showMenu}><HiMenu /></button>
          </div>
        )
        }
        
      </section>
    </header>
  )
}

export default Header