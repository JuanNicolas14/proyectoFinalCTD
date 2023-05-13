import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import images from '../assets/images/images'
import {HiMenu} from 'react-icons/hi'
import {GrClose} from 'react-icons/gr'

const Header = () => {

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
          <div class="imagotipo">
            <Link to='/home' style={{ textDecoration: 'none' }}>
            
              <img src={images.logoBukinFood} alt="icon-logo" />
              <div class="texto-logo">
                <h1>La forma más fácil </h1>
                <h3>De tener almuerzos deliciosos</h3>
              </div>
            </Link>
          </div>

        <div class="botones-logueo">
          <button>Crear cuenta</button>
          <button>Iniciar sesión</button>
        </div>
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