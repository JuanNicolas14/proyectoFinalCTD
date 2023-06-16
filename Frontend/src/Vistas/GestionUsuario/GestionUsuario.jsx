import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl.json';
import { FaPencilAlt,FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage.jsx'
import Paginacion from '../../Componentes/Paginacion/Paginacion';
import Swal from "sweetalert2";
import './GestionUsuario.css'


const GestionUsuario = () => {
  const urlUsuarios = baseUrl.url + "/usuario"
  const { user, token } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [pagina, setPagina] = useState(1)
  const [cantidadPorPagina, setCantidadPorPagina] = useState(10)

  /* Codigo paginacion */
  const maximo = usuarios.length / cantidadPorPagina

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(urlUsuarios, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsuarios(data);
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  const eliminarUsuario = async (usuarioId) => {
    try {
      // Mostrar el mensaje de confirmación
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el usuario permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // El usuario confirmó la eliminación, enviar la solicitud DELETE
          const response = await fetch(`${urlUsuarios}/${usuarioId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            // Eliminar el usuario de la lista en el estado
            const nuevaLista = usuarios.filter((usuario) => usuario.id !== usuarioId);
            setUsuarios(nuevaLista);
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: "success",
              title: "Usuario eliminado",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            // Mostrar mensaje de error
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el usuario",
              text: "Por favor, inténtalo nuevamente",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <main className="gestion-usuario">
      {user.rol == "ADMIN" || user.permisos.includes("GESTIÓN USUARIO")
      ? (
      <div>
        <section className="seccion-usuarios">
          <table className="tabla-usuarios">
            <caption className='caption-usuarios'>Gestión de usuarios</caption>
            <thead>
              <tr>
                <th className='campo-esconder-id'>Id</th>
                <th className='campo-esconder-nombre'>Nombre</th>
                <th>Apellido</th>
                <th className='campo-esconder-email'>Email</th>
                <th>Rol</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.slice(
                (pagina - 1) * cantidadPorPagina,
                (pagina - 1) * cantidadPorPagina + cantidadPorPagina
              ).map( usuario=> (
                <tr key={usuario.id}>
                  <td className='centrar-campo-usuario campo-esconder-id'>{usuario.id}</td>
                  <td className='usuario-campo-nombre campo-esconder-nombre'>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td className='campo-esconder-email'>{usuario.email}</td>
                  <td>{usuario.rol}</td>
                  <td
                    className='centrar-campo-usuario'
                  >
                    <Link to={'/administracion/editarUsuario/'+usuario.id} style={{ textDecoration: 'none' }}>
                    <FaPencilAlt />
                    </Link>
                  </td>
                  <td
                    className="centrar-campo-usuario"
                    onClick={() => eliminarUsuario(usuario.id)}
                  >
                    <FaTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
          </section>
        
      </div>
      )
      : <ErrorPage mensaje="No cuentas con los permisos necesarios para ingresar a esta página."/>
      }
    </main>
  );
};

export default GestionUsuario;

