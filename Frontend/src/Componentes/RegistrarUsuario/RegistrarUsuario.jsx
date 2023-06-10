
import { useState } from 'react';
import axios from 'axios';
import './RegistrarUsuario.css'
import baseUrl from '../../utils/baseUrl.json'
import { Link } from 'react-router-dom';

import validateForm from './validateForm';
import LoadingSpinner from '../Spinner/Spinner';

/*Herramienta alertas */
import infoValidacionCuenta from './infoValidacionCuenta';
import Swal from 'sweetalert2';

const RegistrarUsuario = () => {
  const [registroData, setRegistroData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistroData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const enviarRegistro = async (data) => {
    const url = baseUrl.url + '/usuario/registrar';
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      errorRegistro(error.response.data);
    }
    return null;
  };

  const errorRegistro = (error) => {
    Swal.fire({
      icon: 'error',
      title: `${error}`,
      showConfirmButton: false,
      timer: 5000,
      toast: true,
      timerProgressBar: true,
      position: 'top-end',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm(registroData, setErrors)) {
      try {
        // Enviar los datos de registro al servidor
        setIsLoading(true);
        const data = await enviarRegistro(registroData);
        setIsLoading(false);
        if (!data) {
          return;
        }
        // Si el registro fue exitoso, mostrar mensaje de validación de cuenta
        const retriesData = {
          initialTime: Date.now(),
          retries: 0
        }
        infoValidacionCuenta(data, setRegistroData, retriesData);
      } catch (error) {
        errorRegistro("Oops... Algo salió mal!");
      }
    }
  };

  return (
    <div className="main-registro-usuario">
      <section className="form-container">
        <h2>Formulario de Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs-nombre-y-apellido">
            <div className="input-box">
              <label htmlFor="nombre">Nombre</label>
              {errors.nombre && (
                <span className="mensaje-error">{errors.nombre}</span>
              )}
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={registroData.nombre}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-box">
              <label htmlFor="apellido">Apellido</label>
              {errors.apellido && (
                <span className="mensaje-error">{errors.apellido}</span>
              )}
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={registroData.apellido}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="input-box">
            <label htmlFor="email">Correo electrónico</label>
            {errors.email && (
              <span className="mensaje-error">{errors.email}</span>
            )}
            <input
              type="email"
              id="email"
              name="email"
              value={registroData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-box">
            <span className="icono">
              <ion-icon
                id="togglePassword"
                name="eye-outline"
                onclick="togglePasswordVisibility()"
              ></ion-icon>
            </span>
            <label htmlFor="password">Contraseña</label>
            {errors.password && (
              <span className="mensaje-error">{errors.password}</span>
            )}
            <input
              type="password"
              id="password"
              name="password"
              value={registroData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-box">
            <label htmlFor="confirmarPassword">Confirmar contraseña</label>
            {errors.confirmarPassword && (
              <span className="mensaje-error">
                {errors.confirmarPassword}
              </span>
            )}
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              value={registroData.confirmarPassword}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">{isLoading ? LoadingSpinner() : 'Registrarse'}</button>
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span>Iniciar sesión</span>
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default RegistrarUsuario;
