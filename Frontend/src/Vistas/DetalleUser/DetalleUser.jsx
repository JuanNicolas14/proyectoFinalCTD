import React from 'react'
import './detalleUser.css'

const DetalleUser = () => {
  const user = JSON.parse(localStorage.getItem("user"))  
    
  return (
    <main>
        {user.nombre.length > 3 
        ?(
            <section className='detalle-usuario'>
                <h2>Detalles del Usuario</h2>
                <div className='usuario-datos'>
                    <p>Nombre: <span>{user.nombre}</span></p>
                    <p>Apellido: <span>{user.apellido}</span></p>
                    <p>Email: <span>{user.email}</span></p>
                    <p>Rol: <span>{user.rol}</span></p>
                </div>
            </section>
        )
        : <section className='no-user'>
            <h2>No hay un usuario con sesión activa.</h2>
        </section>
        }
        
    </main>
  ); 
      
}

export default DetalleUser