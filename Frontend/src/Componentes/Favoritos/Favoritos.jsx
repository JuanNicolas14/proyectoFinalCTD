import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./favoritos.css";
import Swal from "sweetalert2";
import baseUrl from "../../utils/baseUrl.json";

const Favoritos = (props) => {
  const { user, token } = useContext(AuthContext);
  const [favoritos, setFavoritos] = useState([]);
  const [esFavorito, setEsFavorito] = useState(false);

  const url = baseUrl.url + "/favoritos";

  // Obtener los productos favoritos del usuario
  useEffect(() => {
    obtenerProductosFavoritos();
  }, []);

  const obtenerProductosFavoritos = async () => {
    try {
      // Realizar la solicitud al backend para obtener los productos favoritos
      const response = await fetch(`${url}/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Verificar la respuesta en la consola
        setFavoritos(data);
      }
    } catch (error) {
      // Manejar el error de la solicitud
      console.error("Error al obtener los favoritos del usuario:", error);
    }
  };

  const marcarComoFavorito = async (usuarioId) => {
    const idRestaurante = props.restauranteId;
    // Verificar si el usuario está autenticado
    if (!user) {
      Swal.fire({
        title: "Acción requerida",
        text: "Para marcar productos como favoritos, debes iniciar sesión.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ir a iniciar sesión",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redireccionar al usuario a la página de inicio de sesión
          window.location.href = "/login";
        }
      });
      return;
    }
    try {
      // Realizar la solicitud al backend para marcar o desmarcar un producto como favorito
      const response = await fetch(url + `/${usuarioId}/${idRestaurante}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Actualizar la lista de favoritos después de marcar o desmarcar un producto
        obtenerProductosFavoritos(token);
        setEsFavorito(!esFavorito); // Cambiar el estado de favorito
        if (esFavorito) {
          Swal.fire(
            "Éxito",
            "Has <b>eliminado</b> este restaurante de tus favoritos.",
            "success"
          );
        } else {
          Swal.fire(
            "Éxito",
            "Has <b>agregado</b> este restaurante a tus favoritos.",
            "success"
          );
        }
      }
    } catch (error) {
      console.error("Error al marcar como favorito:", error);
    }
  };

  return (
    <div className="container-fav-icon">
      <span className="fav-icon" onClick={() => marcarComoFavorito(user?.id)}>
        {esFavorito ? (
          <AiFillHeart title="Desmarcar favorito" />
        ) : (
          <AiOutlineHeart title="Marcar favorito" />
        )}
      </span>
    </div>
  );
};

export default Favoritos;