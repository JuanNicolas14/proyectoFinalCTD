import React, {useContext, useState} from 'react'
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import {AppContext} from '../../utils/EstadoGlobal'
/*Herramientas */
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate();
    //Estado global
    const {userJwt, setUserJwt} = useContext(AppContext)

    //State datos del form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://3.19.61.55:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          //Guardamos el jwt en el estado global
          setUserJwt({...userJwt, jwt: data.jwt})
          Swal.fire(
            {
              title: 'Inicio de Sesión',
              text: `Inicio de Sesión realizado con exito, Presionar aceptar para ir a la pagina de detalle`,
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar',
            }
          ).then((result) => {
            navigate('/usuario/detalle')
          })
          
        } else {
          Swal.fire(
            {
              title: 'Error de Inicio de Sesión',
              text: `Inicio de Sesión realizado rechazado, email o password incorrecto`,
              icon: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar',
            }
          ).then((result) => {
            window.location.reload();
          })
        }
    };


  return (
    <main className='form-login'>
    <section className='form-container'>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <label htmlFor='email'>Correo electrónico:</label>
          <input
            type="email"
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='input-box'>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
        <p>
          ¿Aún no tienes cuenta?{" "}
          <span className='link-registro'>
            <Link to="/usuario/registrar">Regístrate</Link>
          </span>
        </p>
      </form>
    </section>

    </main>
  )
}

export default Login