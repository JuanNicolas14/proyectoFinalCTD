import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import baseUrl from "../../utils/baseUrl.json";
import { FaPencilAlt , FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage.jsx'
import Paginacion from '../../Componentes/Paginacion/Paginacion';
import Swal from "sweetalert2";
import './GestionCiudad.css'

const GestionCiudades = () => {
  const url = baseUrl.url + "/ciudades"
  const { user, token } = useContext(AuthContext);
  const [ciudades, setCiudades] = useState([]);
  const [pagina, setPagina] = useState(1)
  const [cantidadPorPagina, setCantidadPorPagina] = useState(10)

  /* Codigo paginacion */
  const maximo = ciudades.length / cantidadPorPagina

  useEffect(() => {
    fetchCiudades();
  }, []);

  const fetchCiudades = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCiudades(data);
      }
    } catch (error) {
      console.error('Error al obtener la lista de ciudades:', error);
    }
  };

  const eliminarCiudad = async (ciudadId) => {
    try {
      // Mostrar el mensaje de confirmación
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la ciudad permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // El usuario confirmó la eliminación, enviar la solicitud DELETE
          const response = await fetch(`${url}/${ciudadId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            // Eliminar el rol de la lista en el estado
            const nuevaLista = ciudades.filter((ciudad) => ciudad.id !== ciudadId);
            setCiudades(nuevaLista);
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: "success",
              title: "Ciudad eliminada",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            // Mostrar mensaje de error
            Swal.fire({
              icon: "error",
              title: "Error al eliminar la ciudad",
              text: "Por favor, inténtalo nuevamente",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error al eliminar la ciudad:", error);
    }
  };

  return (
    <main className="gestion-ciudad">
      {user.rol == "ADMIN" || user.permisos.includes("GESTIÓN CIUDAD")
      ? (
      <div>
        <section className="seccion-ciudades">
          <table className="tabla-ciudades">
            <caption className='caption-ciudades'>Gestión de ciudades</caption>
            <thead>
              <tr>
                <th>Id</th>
                <th>Ciudad</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {ciudades.slice(
                (pagina - 1) * cantidadPorPagina,
                (pagina - 1) * cantidadPorPagina + cantidadPorPagina
              ).map( ciudad=> (
                <tr key={ciudad.id}>
                  <td className='centrar-campo-ciudad'>{ciudad.id}</td>
                  <td>{ciudad.nombreCiudad}</td>
                  <td
                    className='centrar-campo-ciudad'
                  >
                    <Link to={'/administracion/editarCiudad/'+ciudad.id} style={{ textDecoration: 'none' }}>
                    <FaPencilAlt />
                    </Link>
                  </td>
                  <td
                    className="centrar-campo-ciudad"
                    onClick={() => eliminarCiudad(ciudad.id)}
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

export default GestionCiudades;

