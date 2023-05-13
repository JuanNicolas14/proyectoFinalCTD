import React from 'react'
import { Link } from 'react-router-dom'
import {FaMedal} from 'react-icons/fa'
import './categoria.css'
import images from '../../assets/images/images'

const Categoria = ({nombre, dias, descripcion}) => {
  return (
    <article>
        <div className='categoria-imagen'>
          <div className="wrap">
            <h2>{nombre}</h2>
            <p className='descripcion'>{descripcion}</p>
            {dias === 7 && 
              <p className='medalla'>
                <FaMedal style={{ color: '#CD7F32'}}/>
              </p>
            }
            {dias === 15 && 
              <p className='medalla'>
                <FaMedal style={{ color: '#BEBEBE'}}/>
              </p>
            }
            {dias === 30 && 
              <p className='medalla'>
                <FaMedal style={{ color: 'yellow'}}/>
              </p>
            }
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