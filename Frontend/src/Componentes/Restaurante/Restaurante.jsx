import React from 'react'
import images from '../../assets/images/images'
import { Link } from 'react-router-dom'
import './restaurante.css'

const Restaurante = ({restaurante}) => {
  return (
    <article className='restaurante'>
        <img src={restaurante.imagen} alt="" />
        <div className='restaurante-descripcion'>
            <p>⭐⭐⭐⭐</p>
            <h2>{restaurante.nombre}</h2>
            <p className='descripcion'>{restaurante.descripcion}</p>
        </div>
        <Link to={'/detalle/'+restaurante.id} style={{ textDecoration: 'none' }}>
          Ver mas
        </Link>
    </article>
  )
}

export default Restaurante