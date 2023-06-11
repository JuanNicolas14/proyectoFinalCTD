import React from 'react'
import { Link } from 'react-router-dom'
import './restaurante.css'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'

const Restaurante = ({restaurante}) => {
  return (
    <article className='restaurante-info'>
        <img src={restaurante.imagenes[0]} alt="imagen principal del restaurante" />
        <div className='descripcion'>
          <div>
            <div className='puntuaciones-encontrados'>
              <div className='estrellas'>
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
              </div>
                
              <div className='contenedor-calidad-promedio'>
                {restaurante?.puntuacionPromedio < 1 && (           
                  <div className='calidad-encontrados'>Nuevo</div>
                )}
                {restaurante?.puntuacionPromedio >= 1 && restaurante?.puntuacionPromedio < 2 && (           
                  <div className='calidad-encontrados'>Malo</div>
                )}
                {restaurante?.puntuacionPromedio >= 2 && restaurante?.puntuacionPromedio < 3 && (           
                  <div className='calidad-encontrados'>Malo</div>
                )}
                {restaurante?.puntuacionPromedio >= 3 && restaurante?.puntuacionPromedio < 4 && (           
                  <div className='calidad-encontrados'>Regular</div>
                )}
                {restaurante?.puntuacionPromedio >= 4 && restaurante?.puntuacionPromedio < 4.5 && (           
                  <div className='calidad-encontrados'>Bueno</div>
                )}
                {restaurante?.puntuacionPromedio >= 4.5 && restaurante?.puntuacionPromedio <= 5 && (            
                  <div className='calidad-encontrados'>Muy bueno</div>
                )}
              
                <div className='puntuacion-promedio-encontrados'>
                  <p>{restaurante?.puntuacionPromedio}</p>
                </div>
              </div>
            </div>  

            <h2>{restaurante.nombre}</h2>
            <p className='restaurante-descripcion'>{restaurante.descripcion}</p>
          </div>
            
          <button>
            <Link to={'/detalle/'+restaurante.id} style={{ textDecoration: 'none' }}>
              Ver mas
            </Link>
          </button>
            
        </div>
    </article>
  )
}

export default Restaurante