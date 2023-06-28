import React, { useContext } from 'react'
import { AuthContext } from '../../utils/AuthContext'
import './detalleUser.css'
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage'


const DetalleUser = () => {
    const {user} = useContext(AuthContext)
    
  return (
    <main>
      {user?.nombre?.length > 3 ? (
        <section className="detalle-usuario">
          <h2>Detalles del Usuario</h2>
          <div className="usuario-datos">
            <p>
              Nombre: <span>{user.nombre}</span>
            </p>
            <p>
              Apellido: <span>{user.apellido}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Rol:{" "}
              <span>{user.rol == "ADMIN" ? "Administrador" : "Usuario"}</span>
            </p>
            <p>
              Mis Favoritos:{" "}
              <span>
                <a href={`/favoritos/${user.id}`}>Ir a mis favoritos</a>
              </span>
            </p>
            <p>
              Historial de mis reservas:{" "}
              <span>
                <a href={`/reserva/historial`}>Ir a mi historial</a>
              </span>
            </p>
          </div>
        </section>
      ) : (
        <ErrorPage mensaje="No hay un usuario con sesión iniciada." />
      )}
    </main>
  ); 
      
}

export default DetalleUser