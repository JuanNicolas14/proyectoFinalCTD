import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import images from '../assets/images/images'
import {BiArrowBack} from 'react-icons/bi'
import baseUrl from '../utils/baseUrl.json'

const Detalle = () => {
  const [restaurante, setRestaurante] = useState({});

  const navigate = useNavigate()
  const { id } = useParams()
  const url = baseUrl.url + "/restaurante/" +id;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setRestaurante(data));
  }, []);

  {console.log(restaurante)}

  return (
    <main className="main-detail">
      {restaurante && 
        <section className="detalle-producto">
        <Link 
          onClick={() => navigate(-1)} 
          className='producto-nombre' 
          style={{ textDecoration: 'none' }}
        >
          <h2><span>Restaurante</span><br/> {restaurante?.nombre}</h2>
          <div>
            <BiArrowBack/> <span>Volver</span>
          </div>
        </Link>
        <article>
          <img src={images.plato3} alt="img-detalle-producto" />
          <div className='producto-plan'>
            <ul>
              <li>Plan:</li>
              <span> {restaurante?.plan?.nombre}</span>
              <li>Descripción:</li>
              <span>
              {restaurante?.descripcion}
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
              <p>{restaurante?.precio}</p>
              <button>Comprar</button>
            </div>
          </div>
        </article>
      </section>
      }
    </main>
  )
}

export default Detalle