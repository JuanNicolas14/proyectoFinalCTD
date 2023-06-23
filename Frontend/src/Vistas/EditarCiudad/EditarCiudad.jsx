import React, {useContext, useState} from 'react'
import './EditarCiudad.css'
/*Herramientas */
import Swal from 'sweetalert2';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage';
import { AuthContext } from '../../utils/AuthContext';
import baseUrl from '../../utils/baseUrl.json'
import { useEffect } from 'react';
import { useParams } from 'react-router';

const EditarCiudad = () => {
    const { id } = useParams();
    const urlCiudadId = baseUrl.url + "/ciudades/"+id
    
    //Estado global
    const {user,token} = useContext(AuthContext)

    const [ciudadEncontrada, setCiudadEncontrada] = useState(null);

    useEffect(() => {
      fetchCiudad()
      
    }, []);

    useEffect(() => {
      console.log(ciudadEncontrada);
    }, [ciudadEncontrada]);
  

    const fetchCiudad = async () => {
      try {
        const response = await fetch(urlCiudadId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCiudadEncontrada(data);
        } else {
          throw new Error('Error al obtener la ciudad');
        }
      } catch (error) {
        console.error('Error al obtener la ciudad:', error);
      }
    };    

    const handleChangeNombreCiudad = (event) => {
      setCiudadEncontrada({
        ...ciudadEncontrada,
        nombreCiudad: event.target.value,
      });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const ciudadActualizada = { ...ciudadEncontrada};
        const response = await fetch(urlCiudadId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(ciudadActualizada),
        });
    
        if (response.ok) {
          // El envío de datos fue exitoso
          console.log('Datos enviados correctamente');
          Swal.fire({
            title: 'Ciudad Actualizada Correctamente',
            text: `Ciudad: ${ciudadEncontrada.nombreCiudad}, ha sido actualizada con éxito.`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/administracion/gestionCiudad';
            }
          });
        } else {
          // Ocurrió un error al enviar los datos
          Swal.fire({
            icon: "error",
            title: "Error al actualizar la ciudad",
            text: "Por favor, inténtalo nuevamente",
          });
          console.error('Error al enviar los datos');
        }
      } catch (error) {
        console.error('Error al actualizar la ciudad:', error);
        // Mostrar mensaje de error
      }
    };
    


  return (
    <main className="editar-ciudad">
        {user.rol == "ADMIN" || user.permisos.includes("GESTIÓN CIUDAD")
        ? (
          <section className="form-editar-ciudad">
            <h2>Editar Ciudad</h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                className='nombre-ciudad'
                type="text"
                id="nombre"
                value={ciudadEncontrada?.nombreCiudad}
                onChange={handleChangeNombreCiudad}
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

export default EditarCiudad