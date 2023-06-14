import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../utils/AuthContext'
import ErrorPage from '../Componentes/ErrorPage/ErrorPage'


const Administracion = () => {
    const {user} = useContext(AuthContext)   

  return (
    <main className='home'>
      {user
      ? user.rol == "ADMIN" || user.permisos.includes("ACCESO PANEL ADMINISTRACIÓN")
        ? (
            <section className='administracion-panel'>
                <h2>Administracion</h2>
                <div className='opciones'>
                    <ul>
                        <li>
                            <Link to="/administracion/agregarProducto" style={{ textDecoration: 'none' }}>
                                <span>Agregar Producto</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/administracion/eliminarProducto" style={{ textDecoration: 'none' }}>
                            <span>Eliminar Producto</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/plan/registrar" style={{ textDecoration: 'none' }}>
                            <span>Agregar Plan</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/administracion/agregarRol" style={{ textDecoration: 'none' }}>
                            <span>Agregar Rol</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/administracion/gestionRol" style={{ textDecoration: 'none' }}>
                            <span>Gestión Rol</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/administracion/gestionUsuario" style={{ textDecoration: 'none' }}>
                            <span>Gestión Usuarios</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>  
        )
        : (
            <ErrorPage mensaje="No cuenta con los permisos necesarios para ingresar a esta pagina."/>
        )
      : <ErrorPage mensaje="No cuenta con los permisos necesarios para ingresar a esta pagina."/>
      }

      
    
    </main>
    
  )
}

export default Administracion