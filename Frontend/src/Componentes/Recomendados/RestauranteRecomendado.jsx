import React from 'react'
import images from '../../assets/images/images'
import { Link } from 'react-router-dom'
import './recomendados.css'

const RestauranteRecomendado = ({restaurante}) => {
  return (
    <article>
        <img src={restaurante.imagen} alt="" />
        <div className='descripcion'>
            <div>
                <p>⭐⭐⭐⭐</p>
                <h2>{restaurante.nombre}</h2>
                <p>{restaurante.descripcion}</p>
            </div>
            <Link to={'/detalle/'+restaurante.id} style={{ textDecoration: 'none' }}>
              <button>Ver mas</button>
            </Link>
        </div>
    </article>
  )
}

export default RestauranteRecomendado