import React from 'react'
import { Link } from 'react-router-dom'
import './restaurante.css'
import {AiFillStar} from 'react-icons/ai'

const Restaurante = ({restaurante}) => {
  return (
    <article className='restaurante-info'>
        <img src={restaurante.imagenes[0]} alt="imagen principal del restaurante" />
        <div className='descripcion'>
            <div>
                <p className='estrellas'>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>  
                </p>
                <h2>{restaurante.nombre}</h2>
                <p className='parrafo'>{restaurante.descripcion}</p>
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