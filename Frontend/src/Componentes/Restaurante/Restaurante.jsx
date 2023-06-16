import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./restaurante.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Favoritos from "../Favoritos/Favoritos";
import { AuthContext } from "../../utils/AuthContext";
import images from "../../assets/images/images";

const Restaurante = ({ restaurante }) => {
  const { token } = useContext(AuthContext);

  const puntuacionPromedio = restaurante?.puntuacionPromedio;
  let calidad = "";
  let numEstrellas = 0;

  if (puntuacionPromedio < 1) {
    calidad = "Nuevo";
    numEstrellas = 0;
  } else if (puntuacionPromedio < 2) {
    calidad = "Malo";
    numEstrellas = 1;
  } else if (puntuacionPromedio < 3) {
    calidad = "Malo";
    numEstrellas = 2;
  } else if (puntuacionPromedio < 4) {
    calidad = "Regular";
    numEstrellas = 3;
  } else if (puntuacionPromedio < 4.5) {
    calidad = "Bueno";
    numEstrellas = 4;
  } else {
    calidad = "Muy Bueno";
    numEstrellas = 5;
  }

  const generarEstrellas = () => {
    const estrellas = [];
    for (let i = 0; i < numEstrellas; i++) {
      estrellas.push(<AiFillStar key={i} />);
    }
    for (let i = numEstrellas; i < 5; i++) {
      estrellas.push(<AiOutlineStar key={i} />);
    }
    return estrellas;
  };
  return (
    <article className="restaurante-info">
      <Favoritos restauranteId={restaurante.id} jwt={token} />
      <img
        src={restaurante.imagenes[0] ? restaurante.imagenes[0] : images.notFound}
        alt="imagen principal del restaurante"
      />
      <div className="descripcion">
        <div>
          <div className="puntuaciones-encontrados">
            <div className="estrellas">{generarEstrellas()}</div>

            <div className="contenedor-calidad-promedio">
              <div className="calidad-encontrados">{calidad}</div>
              <div className="puntuacion-promedio-encontrados">
                <p>{restaurante?.puntuacionPromedio * 2}</p>
              </div>
            </div>
          </div>

          <h2>{restaurante.nombre}</h2>
          <p className="restaurante-descripcion">{restaurante.descripcion}</p>
        </div>

        <button>
          <Link
            to={"/detalle/" + restaurante.id}
            style={{ textDecoration: "none" }}
          >
            Ver más
          </Link>
        </button>
      </div>
    </article>
  );
};

export default Restaurante;
