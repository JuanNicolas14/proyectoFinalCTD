import React, {useContext, useState} from 'react'
/*Herramientas */
import Swal from 'sweetalert2';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage';
import { AuthContext } from '../../utils/AuthContext';
import baseUrl from '../../utils/baseUrl.json'
import { useEffect } from 'react';
import './agregarCiudad.css'

const AgregarCiudad = () => {
    const urlCiudades = baseUrl.url + "/ciudades"
    //Estado global
    const {user,token} = useContext(AuthContext)

    const [ciudad, setCiudad] = useState({
      nombre: ''
    })

    useEffect(() => {
      console.log(ciudad);
    }, [ciudad]);
  


    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const data = {
          nombreCiudad: ciudad.nombre
        };
      
        try {
          const response = await fetch(urlCiudades, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
              // El envío de datos fue exitoso
              console.log('Datos enviados correctamente');
              Swal.fire(
                {
                  title: 'Ciudad Guardada Correctamente',
                  text: `Ciudad: ${ciudad.nombreCiudad}, ha sido agregada con éxito.`,
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Aceptar',
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/administracion';
                }
              })
          } else {
              // Ocurrió un error al enviar los datos
              console.error('Error al enviar los datos');
          }
      } catch (error) {
      console.error('Error en la conexión', error);
      }
  }

  return (
    <main>
        {user.rol == "ADMIN" || user.permisos.includes("CREAR CIUDAD")
        ? (
          <section className="form-ciudad">
            <h2>Agregar Ciudad</h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                className='nombre-ciudad'
                type="text"
                id="nombre"
                value={ciudad.nombre}
                onChange={(event) => setCiudad({ ...ciudad, nombre: event.target.value })}
                />
              </div>

              <button type="submit">Enviar</button>
            </form>
          </section>
        )
        : <ErrorPage mensaje="No cuentas con los permisos necesarios para ingresar a esta página." />
        }
    </main>
  )
}

export default AgregarCiudad