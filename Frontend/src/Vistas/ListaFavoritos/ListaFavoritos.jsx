import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import baseUrl from "../../utils/baseUrl.json";
import { FaTrash } from "react-icons/fa";
import "./listaFavoritos.css";
import Swal from "sweetalert2";

const ListaFavoritos = () => {
  const { user, token } = useContext(AuthContext);
  const [listaFavoritos, setListaFavoritos] = useState([]);

  const url = baseUrl.url + "/favoritos";

  useEffect(() => {
    if (user) obtenerProductosFavoritos();
  }, []);

  const obtenerProductosFavoritos = async () => {
    try {
      const response = await fetch(`${url}/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setListaFavoritos(data);
      }
    } catch (error) {
      console.error("Error al obtener los productos favoritos:", error);
    }
  };

  const eliminarRestaurante = async (usuarioId, restauranteId) => {
    try {
      const response = await fetch(`${url}/${usuarioId}/${restauranteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Eliminar el restaurante de la lista en el estado
        const nuevaLista = listaFavoritos.filter(
          (restaurante) => restaurante.id !== restauranteId
        );
        setListaFavoritos(nuevaLista);
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: "success",
          title: "Restaurante eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error al eliminar el restaurante:", error);
    }
  };

  return (
    <div className="restaurantes-favoritos">
      <h2>Mis Restaurantes Favoritos</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Plan</th>
            <th>Precio</th>
            <th>Puntuación</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {listaFavoritos.map((restaurante, index) => (
            <tr key={restaurante.id}>
              <td>{index + 1}</td>
              <td>{restaurante.nombre}</td>
              <td>{restaurante.domicilio.ciudad.nombreCiudad}</td>
              <td>{restaurante.plan.nombre}</td>
              <td>{restaurante.precio}</td>
              <td>{restaurante.puntuacionPromedio}</td>
              <td
                className="fa-trash"
                onClick={() => eliminarRestaurante(user.id, restaurante.id)}
              >
                <FaTrash />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaFavoritos;
