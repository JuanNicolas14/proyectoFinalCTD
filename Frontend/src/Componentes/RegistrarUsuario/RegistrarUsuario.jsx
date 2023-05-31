import React from "react";
import { useState } from "react";
import axios from "axios";
import "./RegistrarUsuario.css";
import baseUrl from "../../utils/baseUrl.json";

const RegistrarUsuario = () => {
  const [registroData, setRegistroData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [confirmarPassword, setConfirmarPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "confirmarPassword") {
      setConfirmarPassword(value);
    } else {
      setRegistroData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    // Validar nombre
    if (!registroData.nombre) {
      validationErrors.nombre = "* Ingrese su nombre";
    } else if (registroData.nombre.length < 4) {
      validationErrors.nombre = "* Ingrese un nombre válido";
    }

    // Validar apellido
    if (!registroData.apellido) {
      validationErrors.apellido = "* Ingrese su apellido";
    } else if (registroData.apellido.length < 4) {
      validationErrors.apellido = "* Ingrese un apellido válido";
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registroData.email) {
      validationErrors.email = "* Ingrese su correo electrónico";
    } else if (!emailRegex.test(registroData.email)) {
      validationErrors.email = "* Ingrese un correo electrónico válido";
    }

    // Validar contraseña
    if (!registroData.password) {
      validationErrors.password = "* Ingrese una contraseña";
    } else if (registroData.password.length < 5) {
      validationErrors.password =
        "* La contraseña debe tener al menos 5 caracteres";
    } else if (confirmarPassword !== registroData.password) {
      validationErrors.confirmarPassword = "* Las contraseñas no coinciden";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Enviar los datos de registro al servidor
      enviarRegistro(registroData);
    }
  };

  const url = baseUrl.url + "/usuario/registrar";

  const enviarRegistro = (data) => {
    axios
      .post(url, data)
      .then((response) => {
        // La solicitud se completó con éxito
        console.log(response.data);
      })
      .catch((error) => {
        // Ocurrió un error durante la solicitud
        console.error(error);
      });
  };

  return (
    <main>
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
                // oninput="capitalizeFirstLetter('nombre')"
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
                // oninput="capitalizeFirstLetter('apellido')"
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
              <span className="mensaje-error">{errors.confirmarPassword}</span>
            )}
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              value={confirmarPassword}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Registrarse</button>
          <p>
            ¿Ya tienes cuenta? <span>Iniciar sesión</span>
          </p>
        </form>
      </section>
    </main>
  );
};

export default RegistrarUsuario;