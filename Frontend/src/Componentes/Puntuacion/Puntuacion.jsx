import React, { useContext, useEffect, useState } from 'react';
import './Puntuacion.css';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { AuthContext } from '../../utils/AuthContext';
import baseUrl from '../../utils/baseUrl.json'
import Swal from 'sweetalert2';

const Puntuacion = ({ setRatingWindowShow, restaurante }) => {

    const urlAgregarPuntuacion = baseUrl.url + "/puntuacion/agregar"

    //Estado global
    const {user,token} = useContext(AuthContext)

    const [selectedRating, setSelectedRating] = useState(0);

    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {

    }, [selectedRating]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            puntuacion: selectedRating,
            restaurante_id: restaurante.id,
            usuario_id: user.id
          };

          if (selectedRating === 0) {
            // El usuario no ha seleccionado una estrella
            setShowAlert(true)
          }
        
          try {
            const response = await fetch(urlAgregarPuntuacion, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            if (response.ok) {
                // El envío de datos fue exitoso
                console.log('Datos enviados correctamente');
                Swal.fire(
                  {
                    title: 'Puntuación Guardada Correctamente',
                    text: `Puntuación para el restaurante: ${restaurante.nombre}, ha sido agregada con éxito.`,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar',
                  }
                ).then((result) => {
                  if (result.isConfirmed) {
                    setRatingWindowShow(false)
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
    <div className="ratingWindowStyles">
      <div className='modal'>
        <h2>Selecciona una puntuación</h2>
        <div className='estrellas-modal'>
          {[1, 2, 3, 4, 5].map((rating) => (
            <span key={rating} onClick={() => setSelectedRating(rating)}>
              {rating <= selectedRating ? <AiFillStar /> : <AiOutlineStar />}
            </span>
          ))}
        </div>
        <div className='botones-puntuar'>
            <button className='boton-puntuacion-enviar' onClick={handleSubmit}>Enviar</button>
            <button className='boton-puntuacion-cancelar' onClick={() => setRatingWindowShow(false)}>Cancelar</button>
        </div>
      </div>
      {showAlert && (
        <div className='alerta'>
            <p>Por favor, selecciona una puntuación antes de enviar.</p> 
        </div>
      )}
    </div>
  );
};

export default Puntuacion;
