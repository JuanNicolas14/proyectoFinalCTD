import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import images from '../assets/images/images'
import {BiArrowBack} from 'react-icons/bi'

const Detalle = () => {
  const navigate = useNavigate()
  return (
    <main className="main-detail">
      <section className="detalle-producto">
        <Link 
          onClick={() => navigate(-1)} 
          className='producto-nombre' 
          style={{ textDecoration: 'none' }}
        >
          <h2>Restaurante Donde Leito</h2>
          <div>
            <BiArrowBack/> <span>Volver</span>
          </div>
        </Link>
        <article>
          <img src={images.plato3} alt="img-detalle-producto" />
          <div className='producto-plan'>
            <ul>
              <li>Plan:</li>
              <span> Semanal</span>
              <li>Descripción:</li>
              <span>
                Recibe un almuerzo diario <br />
                durante la semana
              </span>
              <li>Incluye:</li>
              <span> Domicilio</span>
            </ul>
          </div>
          <div className='producto-precio'>
            <div className='suscripcion'>
              <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
              <span>1 suscripción</span>
            </div>
            <div className='precio'>
              <p>US $20,50</p>
              <button>Comprar</button>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Detalle