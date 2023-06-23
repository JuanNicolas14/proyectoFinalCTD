import React, {useContext, useState} from 'react'
import './EditarUsuario.css'
import axios from 'axios';
/*Herramientas */
import Swal from 'sweetalert2';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage';
import { AuthContext } from '../../utils/AuthContext';
import baseUrl from '../../utils/baseUrl.json'
import { useEffect } from 'react';
import { useParams } from 'react-router';
import validateForm from './validateForm';
import LoadingSpinner from '../../Componentes/Spinner/Spinner';

const EditarUsuario = () => {
    const { id } = useParams();
    const urlRoles = baseUrl.url + "/rol"
    const urlUsuario = baseUrl.url + "/usuario/"+id
    
    //Estado global
    const {user,token} = useContext(AuthContext)

    const [usuario, setUsuario] = useState([]);
    const [roles, setRoles] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
      fetchUsuario()
      fetchRoles()
    }, []);

    useEffect(() => {
      console.log(usuario);
      console.log(roles);
    }, [usuario,roles]);
  
    const fetchUsuario = async () => {
      try {
        const response = await fetch(urlUsuario, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        } else {
          throw new Error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    

    const fetchRoles = async () => {
      try {
        const response = await fetch(urlRoles, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        } else {
          throw new Error('Error al obtener el rol');
        }
      } catch (error) {
        console.error('Error al obtener el rol:', error);
      }
    };
    

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUsuario((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (validateForm(usuario, setErrors)) {
        try {
          const usuarioActualizado = { ...usuario};
          const response = await fetch(baseUrl.url + '/usuario/actualizar' + `/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(usuarioActualizado),
          });
        
          if (response.ok) {
            // El envío de datos fue exitoso
            console.log('Datos enviados correctamente');
            Swal.fire({
              title: 'Usuario Actualizado Correctamente',
              text: `Usuario: ${usuario.nombre}, ha sido actualizado con éxito.`,
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/administracion/gestionUsuario';
              }
            });
          } else {
            // Ocurrió un error al enviar los datos
            Swal.fire({
              icon: "error",
              title: "Error al actualizar el usuario",
              text: "Por favor, inténtalo nuevamente",
            });
            console.error('Error al enviar los datos');
          }
        } catch (error) {
          console.error('Error al actualizar el usuario:', error);
          // Mostrar mensaje de error
        }
      }
    };

  return (
    <div className="editar-usuario">
      {user.rol == "ADMIN" || user.permisos.includes("GESTIÓN USUARIO")
      ? (
      <section className="form-container">
      <h2>Editar usuario</h2>
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
              value={usuario.nombre}
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
              value={usuario.apellido}
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
            value={usuario.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-box">
        <label htmlFor="rol">Selecciona un rol</label>
          <select
            className='select-rol'
            value={usuario.rol} 
            onChange={(e)=> setUsuario({...usuario, rol: e.target.value})}
          >
            {roles?.map(rol => {
              return <option key={rol.id} value={rol.rol}>{rol.rol}</option>
            })}
            
          </select>
        </div>

          
          <button type="submit">{isLoading ? LoadingSpinner() : 'Enviar'}</button>
        </form>
      </section>
        )
        : <ErrorPage mensaje="No cuentas con los permisos necesarios para ingresar a esta página." />
        }
    </div>
  )
}

export default EditarUsuario