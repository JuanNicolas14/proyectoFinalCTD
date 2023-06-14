import React, { useContext, useState } from 'react'
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../utils/AuthContext';
/*Herramienta Alertas */
import Swal from 'sweetalert2';
import baseUrl from '../../utils/baseUrl.json'

const Login = () => {
  const navigate = useNavigate();
  //Estado global
  const { dispatch } = useContext(AuthContext)

  //State datos del form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const traerDetallesUsuario = async (jwt) => {
    try {

      // Configura el encabezado de la solicitud HTTP con el token JWT
      const config = {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      };

      // Realiza la solicitud HTTP para obtener los detalles del usuario
      const response = await fetch(baseUrl.url + '/usuario/detalle', config)
      if (response.ok) {
        const data = await response.json();
        let resUser = {
          id: data.id,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          rol: data.rol,
          fechaCreacion: data.fechaCreacion,
          validado: data.validado,
          permisos:data.permisos
        }
        dispatch({ type: "LOGIN", payload: { user: resUser, accessToken: jwt } })
      }

    } catch (error) {
      // Maneja el error
      console.error('Error al obtener los detalles del usuario:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(baseUrl.url + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      //Guardamos el jwt 
      const jwt = data.jwt
      traerDetallesUsuario(jwt)

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
      ).then(() => {
        navigate('/home')
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
      ).then(() => {
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