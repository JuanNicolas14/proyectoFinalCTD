import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const RegistrarUsuario = () => {
    const [registroData, setRegistroData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: 'USER'
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRegistroData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        let validationErrors = {};

        // Validar nombre
        if (!registroData.nombre) {
            validationErrors.nombre = 'Ingrese su nombre';
        }
        else if (registroData.nombre.length<4){
            validationErrors.nombre = "Ingrese un nombre valido";
        }

        // Validar apellido
        if (!registroData.apellido) {
            validationErrors.apellido = 'Ingrese su apellido';
        }
        else if (registroData.apellido.length<4){
            validationErrors.apellido = 'ingrese un apellido valido'
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!registroData.email) {
            validationErrors.email = 'Ingrese su correo electrónico';
        } 
        else if (!emailRegex.test(registroData.email)) {
            validationErrors.email = 'Ingrese un correo electrónico válido';
        }

        // Validar contraseña
        if (!registroData.password) {
            validationErrors.password = 'Ingrese una contraseña';
        } else if (registroData.password.length < 5) {
            validationErrors.password = 'La contraseña debe tener al menos 5 caracteres';
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

    const enviarRegistro = (data) => {
        axios.post('usuario/registrar', data)
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
        <div>
            <h2>Formulario de Registro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={registroData.nombre}
                        onChange={handleInputChange}
                    />
                    {errors.nombre && <span>{errors.nombre}</span>}
                </div>

                <div>
                    <label htmlFor="apellido">Apellido:</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={registroData.apellido}
                        onChange={handleInputChange}
                    />
                    {errors.apellido && <span>{errors.apellido}</span>}
                </div>

                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={registroData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span>{errors.email}</span>}
                </div>

                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={registroData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <span>{errors.password}</span>}
                </div>

                <div>
                    <label htmlFor="rol">Rol:</label>
                    <select
                        id="rol"
                        name="rol"
                        value={registroData.rol}
                        onChange={handleInputChange}
                    >
                        <option value="USER">Usuario</option>
                        <option value="ADMIN">Administrador</option>
                    </select>
                </div>

                <div>
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
}

export default RegistrarUsuario