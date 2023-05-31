import React, {useState} from 'react'
import './agregarPlan.css'
/*Herramientas */
import Swal from 'sweetalert2';

const AgregarPlan = () => {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcionPlan', descripcion);
        formData.append('imagenPlan', imagen);

        try {
            const response = await fetch('http://3.19.61.55:8080/plan/registrar', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // El envío de datos fue exitoso
                console.log('Datos enviados correctamente');
                Swal.fire(
                  {
                    title: 'Plan Guardado Correctamente',
                    text: `Plan con nombre: ${nombre}, ha sido agregado con exito.`,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar',
                  }
                ).then((result) => {
                  if (result.isConfirmed) {
                    setNombre('')
                    setDescripcion('')
                    setImagen(null)
                    window.location.reload()
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
    <main className="form-add-plan">
        <section className="form-plan">
            <h2>Agregar Plan</h2>

            <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
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
              <button type="submit">Enviar</button>
            </form>
        </section>
    </main>
  )
}

export default AgregarPlan