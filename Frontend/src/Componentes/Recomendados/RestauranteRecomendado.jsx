import React from 'react'
import images from '../../assets/images/images'
import { Link } from 'react-router-dom'
import './recomendados.css'

const RestauranteRecomendado = ({nombre}) => {
  return (
    <article>
        <img src={images.plato1} alt="" />
        <div className='descripcion'>
            <div>
                <p>⭐⭐⭐⭐</p>
                <h2>{nombre}</h2>
                <p>Una descripcion del restaurante y el tipo de comida que oferta, una descripcion del restaurante y el tipo de comida que podrian estar sirviendo.</p>
            </div>
            <Link to='/detalle' style={{ textDecoration: 'none' }}>
              <button>Ver mas</button>
            </Link>
        </div>
    </article>
  )
}

export default RestauranteRecomendado