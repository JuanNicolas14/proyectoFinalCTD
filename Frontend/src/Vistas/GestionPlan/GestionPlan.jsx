import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import baseUrl from "../../utils/baseUrl.json";
import { FaPencilAlt , FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage.jsx'
import Paginacion from '../../Componentes/Paginacion/Paginacion';
import Swal from "sweetalert2";
import './GestionPlan.css'

const GestionPlan = () => {
  const url = baseUrl.url + "/plan"
  const { user, token } = useContext(AuthContext);
  const [planes, setPlanes] = useState([]);
  const [pagina, setPagina] = useState(1)
  const [cantidadPorPagina, setCantidadPorPagina] = useState(10)

  /* Codigo paginacion */
  const maximo = planes.length / cantidadPorPagina

  useEffect(() => {
    fetchPlanes();
  }, []);

  const fetchPlanes = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPlanes(data);
      }
    } catch (error) {
      console.error('Error al obtener la lista de planes:', error);
    }
  };

  const eliminarPlan = async (planId) => {
    try {
      // Mostrar el mensaje de confirmación
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el plan permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // El usuario confirmó la eliminación, enviar la solicitud DELETE
          const response = await fetch(`${url}/${planId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            // Eliminar el plan de la lista en el estado
            const nuevaLista = planes.filter((plan) => plan.id !== planId);
            setPlanes(nuevaLista);
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: "success",
              title: "Plan eliminado",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            // Mostrar mensaje de error
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el plan",
              text: "Por favor, inténtalo nuevamente",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error al eliminar el plan:", error);
    }
  };

  return (
    <main className="gestion-plan">
      {user.rol == "ADMIN" || user.permisos.includes("GESTIÓN PLAN")
      ? (
      <div>
        <section className="seccion-planes">
          <table className="tabla-planes">
            <caption className='caption-planes'>Gestión de planes</caption>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Descripción</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {planes.slice(
                (pagina - 1) * cantidadPorPagina,
                (pagina - 1) * cantidadPorPagina + cantidadPorPagina
              ).map( plan=> (
                <tr key={plan.id}>
                  <td>{plan.nombre}</td>
                  <td>{plan.descripcion}</td>
                  <td
                    className='centrar-campo-plan'
                  >
                    <Link to={'/administracion/editarPlan/'+plan.id} style={{ textDecoration: 'none' }}>
                    <FaPencilAlt />
                    </Link>
                  </td>
                  <td
                    className="centrar-campo-plan"
                    onClick={() => eliminarPlan(plan.id)}
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

export default GestionPlan;

