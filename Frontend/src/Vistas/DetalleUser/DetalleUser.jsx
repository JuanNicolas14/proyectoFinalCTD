import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../utils/EstadoGlobal';
import './detalleUser.css'

const DetalleUser = () => {
    //Estado global
    const {userJwt, setUserJwt} = useContext(AppContext)

    
    useEffect(() => {
        const fetchUserDetails = async () => {
          try { 
    
            // Configura el encabezado de la solicitud HTTP con el token JWT
            const config = {
              headers: {
                'Authorization': `Bearer ${userJwt.jwt}`
              }
            };
    
            // Realiza la solicitud HTTP para obtener los detalles del usuario
            const response = await fetch('http://localhost:8080/usuario/detalle', config)
            if(response.ok){
                const data = await response.json();
                setUserJwt({...userJwt,
                    id:data.id,
                    nombre:data.nombre,
                    apellido:data.apellido,
                    email:data.email,
                    rol:data.rol
                })
                console.log("datos guardados en el global state")
            }
            // Almacena los detalles del usuario en el estado
            
          } catch (error) {
            // Maneja el error
            console.error('Error al obtener los detalles del usuario:', error);
          }
        };
    
        fetchUserDetails();
      }, []);
    
      console.log("fuera del useEffect")
      console.log(userJwt)
    
      return (
        <main>
            {userJwt.nombre.length > 3 
            ?(
                <section className='detalle-usuario'>
                    <h2>Detalles del Usuario</h2>
                    <div className='usuario-datos'>
                        <p>Nombre: <span>{userJwt.nombre}</span></p>
                        <p>Apellido: <span>{userJwt.apellido}</span></p>
                        <p>Email: <span>{userJwt.email}</span></p>
                        <p>Rol: <span>{userJwt.rol}</span></p>
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