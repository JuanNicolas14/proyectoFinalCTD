import React from 'react'
import { Link } from 'react-router-dom'
import './recomendados.css'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'

const RestauranteRecomendado = ({restaurante}) => {
  return (
    <article>
      <img src={restaurante.imagenes[0]} alt="imagen restaurante recomendado" />
      <div className='descripcion'>
        <div>
          <div className='puntuaciones-recomendados'>
            <span className='estrellas'>
              {restaurante?.puntuacionPromedio < 1 && (           
                <>
                  <AiOutlineStar/>
                  <AiOutlineStar/>
                  <AiOutlineStar/>
                  <AiOutlineStar/>
                  <AiOutlineStar/>
                </>
              )}
              {restaurante?.puntuacionPromedio >= 1 && restaurante?.puntuacionPromedio < 2 && (           
                <>
                  <AiFillStar/>
                  <AiOutlineStar/>
                  <AiOutlineStar/>
                  <AiOutlineStar/>
                  <AiOutlineStar/>
                </>
              )}
              {restaurante?.puntuacionPromedio >= 2 && restaurante?.puntuacionPromedio < 3 && (           
                <>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiOutlineStar/>
                  <AiOutlineStar/>
                  <AiOutlineStar/>
                </>
              )}
              {restaurante?.puntuacionPromedio >= 3 && restaurante?.puntuacionPromedio < 4 && (           
                <>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiOutlineStar/>
                  <AiOutlineStar/>
                </>
              )}
              {restaurante?.puntuacionPromedio >= 4 && restaurante?.puntuacionPromedio < 4.5 && (           
                <>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiOutlineStar/>
                </>
              )}
              {restaurante?.puntuacionPromedio >= 4.5 && (            
                <>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                </>
              )}
            </span>
                
            <div className='contenedor-valoraciones'>
              <div className='puntuacion-promedio-recomendados'>
                <p>{restaurante?.puntuacionPromedio}</p>
              </div>
              <div className='recomendados-calidad'>
                {restaurante?.puntuacionPromedio < 1 && (           
                  <>
                    <span>Nuevo</span>
                  </>
                )}
                {restaurante?.puntuacionPromedio >= 1 && restaurante?.puntuacionPromedio < 2 && (           
                  <>
                    <span>Malo</span>
                  </>
                )}
                {restaurante?.puntuacionPromedio >= 2 && restaurante?.puntuacionPromedio < 3 && (           
                  <>
                    <span>Malo</span>
                  </>
                )}
                {restaurante?.puntuacionPromedio >= 3 && restaurante?.puntuacionPromedio < 4 && (           
                  <>
                    <span>Regular</span>
                  </>
                )}
                {restaurante?.puntuacionPromedio >= 4 && restaurante?.puntuacionPromedio < 4.5 && (           
                  <>
                    <span>Bueno</span>
                  </>
                )}
                {restaurante?.puntuacionPromedio >= 4.5 && restaurante?.puntuacionPromedio <= 5 &&(            
                  <>
                    <span>Muy Bueno</span>
                  </>
                )}
                {/* <span>{restaurante?.numeroValoraciones} valoraciones</span> */}
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