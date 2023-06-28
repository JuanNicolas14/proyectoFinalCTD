import React, { useContext, useEffect, useState } from 'react';
import './Puntuacion.css';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { AuthContext } from '../../utils/AuthContext';
import baseUrl from '../../utils/baseUrl.json'
import Swal from 'sweetalert2';
import SpinnerGrande from '../../Componentes/SpinnerGrande/SpinnerGrande'

const Puntuacion = ({ setRatingWindowShow, restaurante }) => {

    const urlAgregarPuntuacion = baseUrl.url + "/puntuacion/agregar"
    const urlPuntuacionRestauranteId = baseUrl.url + "/puntuacion/restaurante/"+restaurante.id

    //Estado global
    const {user,token} = useContext(AuthContext)

    const [selectedRating, setSelectedRating] = useState(0);
    const [puntuaciones, setPuntuaciones] = useState([])
    const [comentario, setComentario] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    function calcularEstrellas(puntuacion){
      let numEstrellas = 0;

      if (puntuacion < 1) {
        numEstrellas = 0;
      } else if (puntuacion < 2) {
        numEstrellas = 1;
      } else if (puntuacion < 3) {
        numEstrellas = 2;
      } else if (puntuacion < 4) {
        numEstrellas = 3;
      } else if (puntuacion < 4.5) {
        numEstrellas = 4;
      } else {
        numEstrellas = 5;
      }

      const estrellas = [];
      for (let i = 0; i < numEstrellas; i++) {
        estrellas.push(<AiFillStar key={i} />);
      }
      for (let i = numEstrellas; i < 5; i++) {
        estrellas.push(<AiOutlineStar key={i} />);
      }
      return estrellas;
    }
    

    useEffect(() => {
      fetchPuntuaciones()
      console.log(comentario)
    }, [selectedRating,comentario]);

    const fetchPuntuaciones = async () => {
      try {
        const response = await fetch(urlPuntuacionRestauranteId)
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setIsLoading(false);
          setPuntuaciones(data);
        }
      } catch (error) {
        console.error('Error al obtener las puntuaciones del restaurante:', error);
      }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            puntuacion: selectedRating,
            restaurante_id: restaurante.id,
            usuario_id: user.id,
            comentario: comentario
          };

          if (selectedRating === 0) {
            // El usuario no ha seleccionado una estrella
            Swal.fire({
              icon: "error",
              title: "Error al enviar la puntuación",
              text: "Por favor, selecciona al menos una puntuación.",
            });
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
    <div className="ratingWindowStyles" >
      <div className='modal'>
      <h1 className='titulo-restaurante'>{restaurante.nombre}</h1>
      <div className='contenedor-dar-puntuacion'>
        <h3>Selecciona una puntuación</h3>
        <div className='estrellas-modal'>
          {[1, 2, 3, 4, 5].map((rating) => (
            <span key={rating} onClick={() => setSelectedRating(rating)}>
              {rating <= selectedRating ? <AiFillStar /> : <AiOutlineStar />}
            </span>
          ))}
        </div>
      </div>
        <div className='contenerdor-dar-comentario'>
          <h3>Escribe un comentario</h3>
          <textarea name="" id="" cols="40" rows="4" onChange={(e) => setComentario(e.target.value )}>
          </textarea>
        </div>
        <div className='botones-puntuar'>
            <button className='boton-puntuacion-enviar' onClick={handleSubmit}>Enviar</button>
            <button className='boton-puntuacion-cancelar' onClick={() => setRatingWindowShow(false)}>Cancelar</button>
        </div>

        <div className='contenedor-reseñas'>
          <h2>Comentarios</h2>
          {isLoading ? (
              <SpinnerGrande/>
            ) : (
          <div className='reseñas'>
            {puntuaciones.map((puntuacion) => (
            <div key={puntuacion.id} className='reseña'>
              <div className='nombre-estrellas'>
                <h4>{puntuacion.nombreCompleto}</h4>
                <p className='estrellas-usuario'>{calcularEstrellas(puntuacion.puntuacion)}</p>
              </div>
              <div className='comentario-usuario'>
                {puntuacion.comentario}
              </div>

            </div>
            ))
            }
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Puntuacion;
