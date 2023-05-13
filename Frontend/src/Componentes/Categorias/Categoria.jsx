import React from 'react'
import { Link } from 'react-router-dom'
import './categoria.css'

const Categoria = ({nombre, dias, descripcion}) => {
  return (
    <article>
        <div className='categoria-imagen'>
          <div className="wrap">
            <h2>{nombre}</h2>
            <p className='descripcion'>{descripcion}</p>
            {dias === 7 && <p className='medalla'>🥉</p>}
            {dias === 15 && <p className='medalla'>🥈</p>}
            {dias === 30 && <p className='medalla'>🥇</p>}
          </div>
        </div>
        <div className='descripcion-button'>
          <Link to='/restaurantes' style={{ textDecoration: 'none' }}>
            <button>Ver restaurantes</button>
          </Link>
        </div>
    </article>
  )
}

export default Categoria