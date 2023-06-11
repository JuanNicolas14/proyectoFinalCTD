import React from 'react'
import { Link } from 'react-router-dom'
import './recomendados.css'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'

const RestauranteRecomendado = ({restaurante}) => {
  const puntuacionPromedio = restaurante?.puntuacionPromedio
  let calidad = ''
  let numEstrellas = 0

  if (puntuacionPromedio < 1) {
    calidad = 'Nuevo'
    numEstrellas = 0
  } else if (puntuacionPromedio < 2) {
    calidad = 'Malo'
    numEstrellas = 1
  } else if (puntuacionPromedio < 3) {
    calidad = 'Malo'
    numEstrellas = 2
  } else if (puntuacionPromedio < 4) {
    calidad = 'Regular'
    numEstrellas = 3
  } else if (puntuacionPromedio < 4.5) {
    calidad = 'Bueno'
    numEstrellas = 4
  } else {
    calidad = 'Muy Bueno'
    numEstrellas = 5
  }

  const generarEstrellas = () => {
    const estrellas = []

    for (let i = 0; i < numEstrellas; i++) {
      estrellas.push(<AiFillStar key={i} />);
    }
    for (let i = numEstrellas; i < 5; i++) {
      estrellas.push(<AiOutlineStar key={i} />);
    }
    return estrellas
  }

  return (
    <article>
      <img src={restaurante.imagenes[0]} alt="imagen restaurante recomendado" />
      <div className='descripcion'>
        <div>
          <div className='puntuaciones-recomendados'>
          <span className='estrellas'>{generarEstrellas()}</span>   
            <div className='contenedor-valoraciones'>
              <div className='puntuacion-promedio-recomendados'>
                <p>{restaurante?.puntuacionPromedio*2}</p>
              </div>
              <div className='recomendados-calidad'>
                {calidad && <span>{calidad}</span>}
              </div>
            </div>
          </div>

          <h2>{restaurante.nombre}</h2>
          <p className='restaurante-descripcion'>{restaurante.descripcion}</p>

        </div>
        <Link to={'/detalle/'+restaurante.id} style={{ textDecoration: 'none' }}>
          <button>Ver mas</button>
        </Link>
      </div>
    </article>
  )
}

export default RestauranteRecomendado