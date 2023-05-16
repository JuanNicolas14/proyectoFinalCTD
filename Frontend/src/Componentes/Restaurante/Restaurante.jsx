import React from 'react'
import images from '../../assets/images/images'
import { Link } from 'react-router-dom'
import './restaurante.css'

const Restaurante = ({nombre, descripcion, plan}) => {
  return (
    <article className='restaurante'>
        <img src={images.plato1} alt="" />
        <div className='restaurante-descripcion'>
            <p>⭐⭐⭐⭐</p>
            <h2>{nombre}</h2>
            <p className='descripcion'>{descripcion}</p>
        </div>
        <Link to='/detalle' style={{ textDecoration: 'none' }}>
          Ver mas
        </Link>
    </article>
  )
}

export default Restaurante