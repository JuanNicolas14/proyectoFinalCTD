import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import images from '../../assets/images/images'
import {HiMenu} from 'react-icons/hi'
import {GrClose} from 'react-icons/gr'
import './header.css'
import { AuthContext } from '../../utils/AuthContext'
/*Herramienta Alertas */
import Swal from 'sweetalert2';

const Header = () => {
  const navigate = useNavigate();
  const {user,dispatch} = useContext(AuthContext)

  const [show, setShow] = useState(false)

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const cerrarSesion = () => {
    Swal.fire(
      {
        title: 'Sesión finalizada',
        text: `Sesión finalizada con exito, Presionar aceptar para ir al home.`,
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
      }
    ).then(() => {
      dispatch({type:"LOGOUT"})
      if(show == false){
        navigate('/home')
      }else {
        showMenu()
        navigate('/home')
      }
      
    })

    
  }

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
          <Link to="/home" style={{ textDecoration: "none" }}>
            <img src={images.logoBukinFood} alt="icon-logo" />
          </Link>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <div className="texto-logo">
              <h1>La forma más fácil </h1>
              <h3>De tener almuerzos deliciosos</h3>
            </div>
          </Link>
        </div>

        {user?.nombre?.length > 3 ? (
          user.rol == "ADMIN" ||
          user.permisos.includes("ACCESO PANEL ADMINISTRACIÓN") ? (
            <div className="botones-logueo">
              <Link to="/usuario/detalle" className="avatar-user">
                <span>{user.nombre.charAt(0).toUpperCase()}</span>
                <span>{user.apellido.charAt(0).toUpperCase()}</span>
              </Link>

              <Link to="/usuario/detalle" className="usuario-nombre">
                <span>
                  {capitalizeFirstLetter(user.nombre)}{" "}
                  {capitalizeFirstLetter(user.apellido)}
                </span>
              </Link>
              <span>
                <a
                  href={`/favoritos/${user.id}`}
                  title="Ir a ver mis restaurantes favoritos"
                >
                  Ir a Mis Favoritos
                </a>
              </span>

              <button>
                <Link to="/administracion" style={{ textDecoration: "none" }}>
                  Módulo Admin
                </Link>
              </button>

              <button onClick={cerrarSesion}>
                <Link style={{ textDecoration: "none" }}>Cerrar sesión</Link>
              </button>
            </div>
          ) : (
            <div className="botones-logueo">
              <Link to="/usuario/detalle" className="avatar-user">
                <span>{user.nombre.charAt(0).toUpperCase()}</span>
                <span>{user.apellido.charAt(0).toUpperCase()}</span>
              </Link>
              <Link to="/usuario/detalle" className="usuario-nombre">
                <p>
                  {capitalizeFirstLetter(user.nombre)}{" "}
                  {capitalizeFirstLetter(user.apellido)}
                </p>
              </Link>
              <span>
                <a
                  href={`/favoritos/${user.id}`}
                  title="Ir a ver mis restaurantes favoritos"
                >
                  Ir a Mis Favoritos
                </a>
              </span>
              <button onClick={cerrarSesion}>
                <Link style={{ textDecoration: "none" }}>Cerrar sesión</Link>
              </button>
            </div>
          )
        ) : (
          <div className="botones-logueo">
            <button>
              <Link to="/usuario/registrar" style={{ textDecoration: "none" }}>
                Crear cuenta
              </Link>
            </button>

            <button>
              <Link to="/login" style={{ textDecoration: "none" }}>
                Iniciar sesión
              </Link>
            </button>
          </div>
        )}

        {show ? (
          <div className="menu-movil">
            <div className="menu">
              <div className="menu-container">
                <button onClick={showMenu}>
                  <GrClose />
                </button>
                <h2>Menú</h2>
              </div>

              {user?.rol == "ADMIN" ||
              user?.permisos.includes("ACCESO PANEL ADMINISTRACIÓN") ? (
                <ul>
                  <li onClick={showMenu}>
                    <Link
                      to="/administracion"
                      style={{ textDecoration: "none" }}
                    >
                      Modulo Admin
                    </Link>
                  </li>
                  <li onClick={cerrarSesion}>
                    <Link style={{ textDecoration: "none" }}>
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              ) : user?.rol == "USER" ? (
                <ul>
                  <li onClick={cerrarSesion}>
                    <Link style={{ textDecoration: "none" }}>
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li onClick={showMenu}>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li onClick={showMenu}>
                    <Link
                      to="/usuario/registrar"
                      style={{ textDecoration: "none" }}
                    >
                      Crear cuenta
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="redes-menu">
              <img src={images.facebook} alt="icono-facebook" />
              <img
                className="logo"
                src={images.linkedin}
                alt="icono-linkedin"
              />
              <img src={images.twitter} alt="icono-twitter" />
              <img
                className="logo"
                src={images.instagram}
                alt="icono-instagram"
              />
            </div>
          </div>
        ) : user?.nombre?.length > 3 ? (
          <div className="menu-icono">
            <Link to="/usuario/detalle" className="avatar-user">
              <span>{user?.nombre?.charAt(0).toUpperCase()}</span>
              <span>{user?.apellido?.charAt(0).toUpperCase()}</span>
            </Link>
            <Link to="/usuario/detalle" className="usuario-nombre">
              <span>
                {capitalizeFirstLetter(user.nombre)}{" "}
                {capitalizeFirstLetter(user.apellido)}
              </span>
            </Link>
            <button onClick={showMenu}>
              <HiMenu />
            </button>
          </div>
        ) : (
          <div className="menu-icono">
            <button onClick={showMenu}>
              <HiMenu />
            </button>
          </div>
        )}
      </section>
    </header>
  );
}

export default Header