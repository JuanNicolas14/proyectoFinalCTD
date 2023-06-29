import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
//Iconos
import { BiArrowBack } from "react-icons/bi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdPlace } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { BiTimer } from "react-icons/bi";
import { BsFillDoorClosedFill } from "react-icons/bs";
/*Herramienta Alertas */
import Swal from 'sweetalert2';
//Imagenes
import images from "../../assets/images/images";
//Hojas de estilos
import "./detalle.css";
//Url para consumir api
import baseUrl from "../../utils/baseUrl.json";
//Material UI
import Carrousel from "../../Componentes/Carrousel/Carrousel";
import Slider from "../../Componentes/Slider/Slider";
import {FilterContext} from "../../utils/FilterContext";
import { AuthContext } from "../../utils/AuthContext";
import Puntuacion from "../../Componentes/Puntuacion/Puntuacion";
import MapsDistancia from "../../Componentes/MapsDistancia/MapsDistancia";
import Favoritos from "../../Componentes/Favoritos/Favoritos";

import FacebookShareButton from '../../Componentes/Facebook/FacebookShareButton'
import WhatsappShareButton from '../../Componentes/Whatsapp/WhatsappShareButton'
import TwitterShareButton from '../../Componentes/Twitter/TwitterShareButton'
import Popup from '../../Componentes/Popup/Popup';
import { red } from '@mui/material/colors'
import { ReservaContext } from "../../utils/ReservaContext";

//Importar fecha actual
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Configurar calendario al español
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";


const Detalle = () => {
  const [distanciaUser, setDistanciaUser] = useState(0);
  const navigate = useNavigate()
  const {hora} = useContext(FilterContext);
  const { user, token} = useContext(AuthContext);
  const { fechaInicio, fechaFinalizacion, horaEntrega, dispatchReserva, restauranteContext } = useContext(ReservaContext) 
  const [restaurante, setRestaurante] = useState({});
  const [reserva, setReserva] = useState({
    fechaInicio: '',
    fechaFinal: '',
    hora: hora?.length > 1 ? hora : '',
  });
  const [sliderShow, setShowSlider] = useState(false);
  const [ratingWindowShow, setRatingWindowShow] = useState(false);
  // para el componente de MapsDistancia
  const [userLocation, setUserLocation] = useState(null);
  const restauranteLocation = {
    lat: restaurante.latitud,
    lng: restaurante.longitud,
  };

  //Obtener fecha mañana
  const fechaMañana = new Date();
  fechaMañana.setDate(fechaMañana.getDate() + 1);
    // Registrar el idioma español
  registerLocale("es", es);
  // Establecer el idioma español como idioma predeterminado para el calendario
  setDefaultLocale("es");

  //Obtenemos el id que trae la url por medio de useParams()
  const { id } = useParams();
  const url = baseUrl.url + "/restaurante/" + id;

  const handleUserLocation = (position) => {
    const { latitude, longitude } = position.coords;
    setUserLocation({ lat: latitude, lng: longitude });
  };

  const handleUserLocationError = (error) => {
    console.error("Error al obtener la ubicación del usuario:", error);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleUserLocation,
        handleUserLocationError
      );
    } else {
      console.error("El navegador no soporta la geolocalización");
    }
  };

  //Hacemos la peticion una vez se carga el componente
  useEffect(() => {
    //para obtener ubicacion del usuario por el navegador
    getUserLocation();

    function calcularDistancia(lat1, lon1, lat2, lon2) {
      const radioTierra = 6371; // Radio promedio de la Tierra en kilómetros

      // Convertir las latitudes y longitudes de grados a radianes
      const latitud1 = (lat1 * Math.PI) / 180;
      const longitud1 = (lon1 * Math.PI) / 180;
      const latitud2 = (lat2 * Math.PI) / 180;
      const longitud2 = (lon2 * Math.PI) / 180;

      // Calcular la diferencia entre las latitudes y longitudes
      const diferenciaLatitud = latitud2 - latitud1;
      const diferenciaLongitud = longitud2 - longitud1;

      // Calcular la distancia utilizando la fórmula del haversine
      const a =
        Math.sin(diferenciaLatitud / 2) * Math.sin(diferenciaLatitud / 2) +
        Math.cos(latitud1) *
        Math.cos(latitud2) *
        Math.sin(diferenciaLongitud / 2) *
        Math.sin(diferenciaLongitud / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distancia = radioTierra * c;

      return distancia;
    }

    const getLocation = (restauranteParams) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let distanciaEntre = calcularDistancia(
              restauranteParams.latitud,
              restauranteParams.longitud,
              position.coords.latitude,
              position.coords.longitude
            ).toFixed(1);
            setDistanciaUser(distanciaEntre);
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setRestaurante(data);
        getLocation(data);
      } catch (error) {
        throw Error;
      }
    };

    fetchData();
  }, []);

  useEffect( () =>{
    console.log(reserva);
  },[reserva])

  //Puntuación del producto
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

  useEffect(() => {
    if (reserva.fechaInicio) {
      if (restaurante?.plan === "Semanal") {
        const fecha = new Date(reserva.fechaInicio);
        fecha.setDate(fecha.getDate() + 6);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReserva({ ...reserva, fechaFinal: fechaFinalFormateada });
      } else if (restaurante?.plan === "Quincenal") {
        const fecha = new Date(reserva.fechaInicio);
        fecha.setDate(fecha.getDate() + 13);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReserva({ ...reserva, fechaFinal: fechaFinalFormateada });
      } else if (restaurante?.plan === "Mensual") {
        const fecha = new Date(reserva.fechaInicio);
        fecha.setDate(fecha.getDate() + 29);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReserva({ ...reserva, fechaFinal: fechaFinalFormateada });
      } else if (restaurante?.plan === "Trimestral") {
        const fecha = new Date(reserva.fechaInicio);
        fecha.setDate(fecha.getDate() + 89);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReserva({ ...reserva, fechaFinal: fechaFinalFormateada });
      } else if (restaurante?.plan === "Semestral") {
        const fecha = new Date(reserva.fechaInicio);
        fecha.setDate(fecha.getDate() + 179);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReserva({ ...reserva, fechaFinal: fechaFinalFormateada });
      } else if (restaurante?.plan === "Anual") {
        const fecha = new Date(reserva.fechaInicio);
        fecha.setDate(fecha.getDate() + 364);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReserva({ ...reserva, fechaFinal: fechaFinalFormateada });
      }
    }
  }, [reserva.fechaInicio]);

  const handleCambioFechaInicio = (date) => {
    const fechaSeleccionada = moment(date).format('YYYY-MM-DD');
    setReserva({ ...reserva, fechaInicio: fechaSeleccionada });
  }

  const handleReserva = () => {
    if (user?.nombre.length > 1) {
      if(reserva?.fechaFinal?.length > 1
        && reserva?.fechaInicio?.length > 1
        && reserva?.hora?.length > 1
      ){
        dispatchReserva({
          type: "RESERVA",
          payload: {
            fechaInicio: reserva.fechaInicio,
            fechaFinalizacion: reserva.fechaFinal,
            horaEntrega: reserva.hora,
            restauranteContext: restaurante
          }
        })
        // Guardar un valor en el localStorage
        localStorage.setItem('fechas', JSON.stringify({
          fechaInicial: reserva.fechaInicio,
          fechaFinal: reserva.fechaFinal,
          hora: reserva.hora
        }))
        localStorage.setItem('restaurante', JSON.stringify(restaurante));
        navigate('/reserva')
      }else{
        console.log("datos incompletos")
        console.log(reserva);
        Swal.fire(
          {
            title: 'Datos incompletos.',
            text: `Para realizar una reserva,  necesitas digitar fechas y hora.`,
            icon: 'error',
            showCancelButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar"
          }
        )
      }      
    } else {
      Swal.fire(
        {
          title: 'No tienes permiso.',
          text: `Para realizar una reserva, debes iniciar sesión.`,
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: "Ir a iniciar sesión",
          cancelButtonText: "Cancelar"
        }
      ).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    }
  }

  return (
    <main className="main-detail">
      {sliderShow && (
        <section className="slider-imagenes">
          {restaurante.imagenes && (
            <Slider
              imagenes={restaurante.imagenes}
              setShowSlider={setShowSlider}
            />
          )}
        </section>
      )}

      {ratingWindowShow && (
        <section className="slider-imagenes">
          <Puntuacion
            setRatingWindowShow={setRatingWindowShow}
            restaurante={restaurante}
          />
        </section>
      )}

      {restaurante && (
        <section className="informacion-relevante">
          <div className="producto-nombre">
            <h2>{restaurante?.nombre}</h2>
            <Link
              onClick={() => navigate(-1)}
              style={{ textDecoration: "none" }}
            >
              <BiArrowBack />
            </Link>
          </div>
          <div className="producto-info">
            <div className="ubicacion">
              <div className="ciudad">
                <MdPlace />
                <p>
                  {restaurante?.ciudad}, {restaurante?.pais},{" "}
                  {distanciaUser > 1 &&
                    `estás a ${distanciaUser} km de distancia`}
                </p>
              </div>
              <div className='iconos'>
                <div className="container-share-icon">
                  <Popup
                    icon={<HiOutlineShare className="share-icon" />}
                    direction="row"
                    borderColor={red[800]}
                    x={100}
                    y={220}
                  >
                    <FacebookShareButton size="small" link={`${baseUrl.appUrl}/restuarante/${restaurante?.id}`} />
                    <TwitterShareButton size="small" message={`Te recomiendo este genial restaurante ${restaurante?.nombre} ! ${baseUrl.appUrl}/restaurante/${restaurante?.id}`} hashtags="BukinFood" />
                    <WhatsappShareButton size="small" message={`Este restaurante ${restaurante?.id} esta super! ${baseUrl.appUrl}/restaurante/${restaurante?.id}`} />
                  </Popup>
                </div>
                <Favoritos restauranteId={restaurante.id} jwt={token} />
              </div>
            </div>

            <div className="calificacion">
              <div className="estrellas">
                <p className="adjetivo-descripcion">{calidad}</p>
                <div>{generarEstrellas()}</div>

                <p className="numero-valoraciones">
                  {restaurante.numeroValoraciones} valoraciones
                </p>

                <div className="boton-puntuacion">
                  {user?.rol ? (
                    <button
                      className="boton-dar-puntuacion"
                      onClick={() => setRatingWindowShow(true)}
                    >
                      Califica
                    </button>
                  ) : (
                    <button className="boton-dar-puntuacion">
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Califica
                      </Link>
                    </button>
                  )}
                </div>
              </div>

              <div className="numero">
                <p>{restaurante?.puntuacionPromedio * 2}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {restaurante?.imagenes && (
        <section className="detalle-producto">
          <article>
            <section className="carrousel">
              <Carrousel imagenes={restaurante.imagenes} />
            </section>
            <section className="galeria-imagenes">
              <div className="imagenes">
                <div className="principal">
                  <img
                    src={restaurante?.imagenes[0] ? restaurante.imagenes[0] : images.notFound}
                    alt="img-detalle-producto"
                  />
                </div>
                <div className="secundarias">
                  <img
                    src={restaurante?.imagenes[1] ? restaurante.imagenes[1] : images.notFound}
                    alt="img-detalle-producto"
                  />
                  <img
                    src={restaurante?.imagenes[2] ? restaurante.imagenes[2] : images.notFound}
                    alt="img-detalle-producto"
                  />
                  <img
                    src={restaurante?.imagenes[3] ? restaurante.imagenes[3] : images.notFound}
                    alt="img-detalle-producto"
                    className="imagen"
                  />
                  <img
                    src={restaurante?.imagenes[4] ? restaurante.imagenes[4] : images.notFound}
                    alt="img-detalle-producto"
                    className="imagen"
                  />
                </div>
              </div>
              <div className="buttons">
                <button onClick={() => setShowSlider(true)}>Ver más</button>
              </div>
            </section>

            {/* <div>
              <h1>Ubicacion en el mapa</h1>
              <button onClick={getUserLocation}>Obtener ubicación del usuario</button>
            </div> */}
            <section>
              <MapsDistancia
                userLocation={userLocation}
                restauranteLocation={restauranteLocation}
                nombreRestaurante={restaurante.nombre}
              />
            </section>

            <section className="producto-plan">
              <h2>Sobre Nosotros..</h2>
              <ul>
                <li>
                  <h3>Plan:</h3>
                  <p> {restaurante?.plan}</p>
                </li>

                <li>
                  <h3>Descripción:</h3>
                  <p>{restaurante?.descripcion}</p>
                </li>
                <li>
                  <h3>Precio:</h3>
                  <p> {restaurante?.precio}$</p>
                </li>
              </ul>
              <div className="menu">
                <h3>Menú:</h3>
                <p>{restaurante?.menu}</p>
              </div>
            </section>
            <section className="producto-ventajas">
              <div>
                <h2>¿ Qué ofrecemos ?</h2>
              </div>
              <ul>
                <li>
                  <MdOutlineDeliveryDining />
                  <p>Domicilio</p>
                </li>
                <li>
                  <BiTimer />
                  <p>Cumplimiento</p>
                </li>
                <li>
                  <BsFillDoorClosedFill />
                  <p>En la puerta de tu casa o trabajo</p>
                </li>
              </ul>
            </section>
            <section className="reserva-producto">
              <div className="titulo">
                <h2>Reserva</h2>
              </div>
              <section className="formulario">
                <div className="datepickers">
                  <div className="datepicker-fechaInicio div-datepicker">
                  <label htmlFor="startDate">Fecha inicial:</label>
                  <DatePicker
                    id="startDate"
                    selected={reserva.fechaInicio ? moment(reserva.fechaInicio).toDate() : null}
                    onChange={handleCambioFechaInicio}
                    minDate={new Date(fechaMañana)}
                    className="custom-datepicker"
                    calendarClassName="custom-calendar"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd /mm/ aaaa"
                    showIcon
                  />
                  </div>
                  <div className="datepicker-fechaFinal div-datepicker">
                    <label htmlFor="endDate">Fecha final:</label>
                    <DatePicker
                      type="date"
                      id="endDate"
                      selected={reserva.fechaFinal ? moment(reserva.fechaFinal).toDate() : null}
                      className="custom-datepicker"
                      placeholderText="dd /mm/ aaaa"
                      dateFormat="dd/MM/yyyy"
                      showIcon
                      readOnly
                    />
                  </div>
                  <div className="hora div-datepicker">
                    <label htmlFor="hora">
                      Selecciona la hora en la que deseas recibir tus almuerzos:
                    </label>
                    <select
                      id="hora"
                      value={reserva?.hora}
                      onChange={(e) =>
                        setReserva({ ...reserva, hora: e.target.value })
                      }
                    >
                      <option value="">--Escoge una hora--</option>
                      <option value={restaurante?.horaApertura}>{restaurante?.horaApertura}</option>
                    </select>
                  </div>
                </div>

                <div className="container-button">
                  <div className="button">
                    <p className="leyenda-button-reserva">
                      Agrega la fecha en la que quieres comenzar a recibir el
                      servicio, al igual que la fecha a finalizar.
                    </p>
                    <button onClick={handleReserva}>Iniciar Reserva</button>
                  </div>
                </div>
              </section>
            </section>
            <section className="politicas">
              <div className="titulo">
                <h2>Qué necesitas saber</h2>
              </div>
              <div className="contenedor">
                <div>
                  <h3>Normas de la casa</h3>
                  {restaurante?.reglas?.length > 1 ? (
                    <p>{restaurante.reglas}</p>
                  ) : (
                    <>
                      <p>Check-out:10:00</p>
                      <p>No se permiten fiestas</p>
                      <p>No fumar</p>
                    </>
                  )}
                </div>
                <div>
                  <h3>Salud y seguridad</h3>
                  {restaurante?.saludYseguridad?.length > 1 ? (
                    <p>{restaurante.saludYseguridad}</p>
                  ) : (
                    <>
                      <p>
                        Se aplican las pautas de distanciamiento social y otras
                        normas relacionadas con el coronavirus.
                      </p>
                      <p>Detector de humo</p>
                      <p>Deposito de seguridad</p>
                    </>
                  )}
                </div>
                <div>
                  <h3>Política de cancelación</h3>
                  {restaurante?.politicas?.length > 1 ? (
                    <p>{restaurante.politicas}</p>
                  ) : (
                    <>
                      <p>
                        Agrega las fechas de tu viaje para obtener los detalles
                        de cancelacion de esa estadia.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </section>
          </article>
        </section>
      )}
    </main>
  );
};

export default Detalle;
