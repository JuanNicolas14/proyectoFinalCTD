import React from 'react'
import { Link } from 'react-router-dom'
import {FaMedal,FaTrophy} from 'react-icons/fa'
import './categoria.css'

const Categoria = ({nombre, dias, descripcion, imagen}) => {
  return (
    <article className='article-categoria'>
        <div className='categoria-imagen' style={{ backgroundImage: `url(${imagen})`}}>
          <div className="wrap">
            <h2>{nombre}</h2>
            <p className='descripcion'>{descripcion}</p>
            {nombre === 'Semanal' && 
              <p className='medalla'>
                <FaMedal style={{ color: '#CD7F32'}}/>
              </p>
            }
            {nombre === 'Quincenal' && 
              <p className='medalla'>
                <FaMedal style={{ color: '#BEBEBE'}}/>
              </p>
            }
            {nombre === 'Mensual' && 
              <p className='medalla'>
                <FaMedal style={{ color: 'yellow'}}/>
              </p>
            }
            {nombre === 'Trimestral' && 
              <p className='medalla'>
                <FaTrophy style={{ color: 'yellow'}}/>
              </p>
            }
            {nombre === 'Semestral' && 
              <p className='medalla'>
                <FaTrophy style={{ color: 'yellow'}}/>
              </p>
            }
            {nombre === 'Anual' && 
              <p className='medalla'>
                <FaTrophy style={{ color: 'yellow'}}/>
              </p>
            }
          </div>
        </div>
        <div className='descripcion-button'>
          <Link to={'/restaurantes/'+nombre.toLowerCase()} style={{ textDecoration: 'none' }}>
            <button>Ver restaurantes</button>
          </Link>
        </div>
    </article>
  )
}

export default Categoria