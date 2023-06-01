import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
//Icono
import {BiArrowBack} from 'react-icons/bi'
import './errorpage.css'

const ErrorPage = ({mensaje}) => {

    const navigate = useNavigate()

  return (
    <section className='error-page'>
        <div>
            <Link 
                onClick={() => navigate(-1)} 
                style={{ textDecoration: 'none' }}
            >
                <BiArrowBack/>
            </Link>
        </div>
        <h2>{mensaje}</h2>
    </section>
  )
}

export default ErrorPage