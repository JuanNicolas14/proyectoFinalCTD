import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl.json';
import { FaPencilAlt,FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage.jsx'
import Paginacion from '../../Componentes/Paginacion/Paginacion';
import Swal from "sweetalert2";
import './GestionRol.css'


const GestionRol = () => {
  const urlRoles = baseUrl.url + "/rol"
  const { user, token } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [pagina, setPagina] = useState(1)
  const [cantidadPorPagina, setCantidadPorPagina] = useState(8)

  /* Codigo paginacion */
  const maximo = roles.length / cantidadPorPagina

  useEffect(() => {
    fetchRoles();
    fetchPermisos()
    console.log(permisos);
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch(baseUrl.url + '/rol', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRoles(data);
      }
    } catch (error) {
      console.error('Error al obtener la lista de roles:', error);
    }
  };

  const fetchPermisos = async () => {
    try {
      const response = await fetch(baseUrl.url + '/permiso', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPermisos(data);
      } else {
        throw new Error('Error al obtener la lista de permisos');
      }
    } catch (error) {
      console.error('Error al obtener la lista de permisos:', error);
    }
  };  

  const eliminarRol = async (rolId) => {
    try {
      // Mostrar el mensaje de confirmación
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el rol permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // El usuario confirmó la eliminación, enviar la solicitud DELETE
          const response = await fetch(`${urlRoles}/${rolId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            // Eliminar el rol de la lista en el estado
            const nuevaLista = roles.filter((rol) => rol.id !== rolId);
            setRoles(nuevaLista);
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: "success",
              title: "Rol eliminado",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            // Mostrar mensaje de error
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el rol",
              text: "Por favor, inténtalo nuevamente",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error al eliminar el rol:", error);
    }
  };

  return (
    <main className="gestion-rol">
      {user.rol == "ADMIN" || user.permisos.includes("GESTIÓN ROL")
      ? (
      <div>
        <section className="seccion-roles">
          <table className="tabla-roles">
            <caption className='caption-roles'>Gestión de roles</caption>
            <thead>
              <tr>
                <th>Id</th>
                <th>Rol</th>
                <th>Permisos</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {roles.slice(
                (pagina - 1) * cantidadPorPagina,
                (pagina - 1) * cantidadPorPagina + cantidadPorPagina
              ).map( rol=> (
                <tr key={rol.id}>
                  <td className='centrar-campo-rol'>{rol.id}</td>
                  <td>{rol.rol}</td>
                  <td>
                    {rol.permisos.map((permiso, index) => (
                      <span key={index}>
                        {permiso}
                        {index !== rol.permisos.length - 1 && ", "}
                      </span>
                    ))}
                  </td>

                  <td
                    className='centrar-campo-rol'
                  >
                    <Link to={'/administracion/editarRol/'+rol.id} style={{ textDecoration: 'none' }}>
                    <FaPencilAlt />
                    </Link>
                  </td>
                  <td
                    className="centrar-campo-rol"
                    onClick={() => eliminarRol(rol.id)}
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

export default GestionRol;

