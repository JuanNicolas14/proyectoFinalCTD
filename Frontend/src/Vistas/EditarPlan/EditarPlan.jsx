import React, {useContext, useState} from 'react'
import './EditarPlan.css'
/*Herramientas */
import Swal from 'sweetalert2';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage';
import { AuthContext } from '../../utils/AuthContext';
import baseUrl from '../../utils/baseUrl.json'
import { useEffect } from 'react';
import { useParams } from 'react-router';

const EditarPlan = () => {
    const { id } = useParams();
    const urlPlanId = baseUrl.url + "/plan/"+id
    const urlPlanActualizarId = baseUrl.url + "/plan/actualizar/"+id
    
    //Estado global
    const {user,token} = useContext(AuthContext)
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [cambiarImagen, setCambiarImagen] = useState(false)

    useEffect(() => {
      fetchPlan()
      
    }, []);

    useEffect(() => {
      console.log(nombre);
      console.log(descripcion);
      console.log(imagen);
    }, [nombre,descripcion,imagen]);
  

    const fetchPlan = async () => {
      try {
        const response = await fetch(urlPlanId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setNombre(data.nombre)
          setDescripcion(data.descripcion)
        } else {
          throw new Error('Error al obtener el plan');
        }
      } catch (error) {
        console.error('Error al obtener el plan:', error);
      }
    };    
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcionPlan', descripcion);
        if(cambiarImagen){
          formData.append('imagenPlan', imagen);
        }
        
    
      try {
        const response = await fetch(urlPlanActualizarId, {
          method: 'PUT',
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
    
        if (response.ok) {
          // El envío de datos fue exitoso
          console.log('Datos enviados correctamente');
          Swal.fire({
            title: 'Plan Actualizado Correctamente',
            text: `Plan: ${nombre}, ha sido actualizado con éxito.`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/administracion/gestionPlan';
            }
          });
        } else {
          // Ocurrió un error al enviar los datos
          Swal.fire({
            icon: "error",
            title: "Error al actualizar el plan",
            text: "Por favor, inténtalo nuevamente",
          });
          console.error('Error al enviar los datos');
        }
      } catch (error) {
        console.error('Error al actualizar el plan:', error);
        // Mostrar mensaje de error
      }
    };
    


  return (
    <main className="editar-plan">
        {user.rol == "ADMIN" || user.permisos.includes("GESTIÓN PLAN")
        ? (
          <section className="form-editar-plan">
            <h2>Editar Plan</h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                className='nombre-plan'
                type="text"
                id="nombre"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                />
              </div>

              <div>
                  <label htmlFor="descripcion">Descripción:</label>
                  <textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(event) => setDescripcion(event.target.value)}
                  ></textarea>
              </div>

              <div className='cambiar-imagen'>
              <label htmlFor="cambiar-imagen-pregunta">¿Deseas cambiar la imagen?</label>
                <div>
                <label className='cambiar-imagen-valor'>
                  <input
                    type="radio"
                    name="cambiarImagen"
                    value="si"
                    checked={cambiarImagen === true}
                    onChange={() => setCambiarImagen(true)}
                  />
                  Sí
                </label>
                <label className='cambiar-imagen-valor'>
                  <input
                    type="radio"
                    name="cambiarImagen"
                    value="no"
                    checked={cambiarImagen === false}
                    onChange={() => setCambiarImagen(false)}
                  />
                  No
                </label>
                </div>
              </div>

              {
                cambiarImagen &&
                  <div>
                    <span className='span-imagen'>Imagen:</span>
                    <input
                    className='input-imagen'
                    type="file"
                    id="imagen"
                    accept="image/*"
                    onChange={e => setImagen(e.target.files[0])}
                    />
                    <label className="label-imagen" htmlFor="imagen">
                    <span className="imagen-select input-imagen_input-imagen-nombre">
                    {imagen != null 
                      ? `${imagen.name}`
                      : "Ningún archivo seleccionado"
                      }
                    </span>
                    <span className="input-imagen input-imagen_input-imagen-boton">
                      Seleccionar archivo
                    </span>
                    </label>
                  </div>
              }
              
              <button type="submit">Enviar</button>
            </form>
          </section>
        )
        : <ErrorPage mensaje="No cuentas con los permisos necesarios para ingresar a esta página." />
        }
    </main>
  )
}

export default EditarPlan