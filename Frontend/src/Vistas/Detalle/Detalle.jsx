import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
//Iconos
import {BiArrowBack} from 'react-icons/bi'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import {MdPlace} from 'react-icons/md'
import {HiOutlineShare} from 'react-icons/hi'
import {FiHeart} from 'react-icons/fi'
import {MdOutlineDeliveryDining} from 'react-icons/md'
import {BiTimer} from 'react-icons/bi'
import {BsFillDoorClosedFill} from 'react-icons/bs'
//Hojas de estilos
import './detalle.css'
//Url para consumir api
import baseUrl from '../../utils/baseUrl.json'
//Material UI
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Carrousel from '../../Componentes/Carrousel/Carrousel'
import Slider from '../../Componentes/Slider/Slider'
import { AuthContext } from '../../utils/AuthContext'
import Puntuacion from '../../Componentes/Puntuacion/Puntuacion'

const Detalle = () => {

  const {user} = useContext(AuthContext)
  const [restaurante, setRestaurante] = useState({});
  const [reserva, setReserva] = useState({
    fechaInicio: null,
    fechaFinal: null,
  });
  const [sliderShow, setShowSlider] = useState(false)
  const [ratingWindowShow, setRatingWindowShow] = useState(false)

  //Obtenemos el id que trae la url por medio de useParams()
  const navigate = useNavigate()
  const { id } = useParams()
  const url = baseUrl.url + "/restaurante/" +id;
  

  //Hacemos la peticion una vez se carga el componente
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setRestaurante(data));
  }, []);
  
  return (
    <main className="main-detail">
      {sliderShow && 
        <section className='slider-imagenes'>
          {restaurante.imagenes &&
            <Slider
              imagenes={restaurante.imagenes}
              setShowSlider={setShowSlider}
            />
          }
        </section>      
      }

      {ratingWindowShow && 
        <section className='slider-imagenes'>
            <Puntuacion
              setRatingWindowShow={setRatingWindowShow}
              restaurante={restaurante}
            />
        </section>      
      }

      {restaurante &&
        <section className='informacion-relevante'>
          <div className='producto-nombre'>
            <h2>{restaurante?.nombre}</h2>
            <Link 
              onClick={() => navigate(-1)} 
              style={{ textDecoration: 'none' }}
            >
              <BiArrowBack/> 
            </Link>
          </div>
          <div className='producto-info'>
            <div className='ubicacion'>
              <div className='ciudad'>
                <MdPlace/>
                <p>{restaurante?.ciudad}, {restaurante?.pais}</p>
              </div>
              <div className='iconos'>
                <HiOutlineShare/>
                <FiHeart/>
              </div>
            </div>

            <div className='calificacion'>
              <div className='estrellas'>
                {restaurante?.puntuacionPromedio < 1 && (           
                  <>
                    <p className='adjetivo-descripcion'>Nuevo</p>
                    <div>
                      <AiOutlineStar/>
                      <AiOutlineStar/>
                      <AiOutlineStar/>
                      <AiOutlineStar/>
                      <AiOutlineStar/>
                    </div>               
                  </>
                )}
                {restaurante?.puntuacionPromedio >= 1 && restaurante?.puntuacionPromedio < 2 && (           
                  <>
                    <p className='adjetivo-descripcion'>Malo</p>
                    <div>
                      <AiFillStar/>
                      <AiOutlineStar/>
                      <AiOutlineStar/>
                      <AiOutlineStar/>
                      <AiOutlineStar/>
                    </div>
                  </>
                )}
                {restaurante?.puntuacionPromedio >= 2 && restaurante?.puntuacionPromedio < 3 && (           
                  <>
                    <p className='adjetivo-descripcion'>Malo</p>
                    <div>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiOutlineStar/>
                      <AiOutlineStar/>
                      <AiOutlineStar/>
                    </div>
                  </>
                )}
                {restaurante?.puntuacionPromedio >= 3 && restaurante?.puntuacionPromedio < 4 && (           
                  <>
                    <p className='adjetivo-descripcion'>Regular</p>
                    <div>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiOutlineStar/>
                      <AiOutlineStar/>
                    </div>
                  </>
                )}
                {restaurante?.puntuacionPromedio >= 4 && restaurante?.puntuacionPromedio < 4.5 && (           
                  <>
                    <p className='adjetivo-descripcion'>Bueno</p>
                    <div>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiOutlineStar/>
                    </div>
                  </>
                )}
                {restaurante?.puntuacionPromedio >= 4.5 && (            
                  <>
                    <p className='adjetivo-descripcion'>Muy Bueno</p>
                    <div>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                    </div>
                  </>
                )}

                <p className='numero-valoraciones'>{restaurante.numeroValoraciones} valoraciones</p>

                {user.rol && (
                  <div className='boton-puntuacion'>
                    <button className='boton-dar-puntuacion' onClick={() => setRatingWindowShow(true)}>
                      Califica
                    </button>
                  </div>          
                )}
              </div>

              <div className='numero'>
                <p>{restaurante?.puntuacionPromedio}</p>
              </div>

            </div>
          </div>
        </section>
      }
      
      {restaurante.imagenes &&        
        <section className="detalle-producto">
          <article>
            <section className='carrousel'>
              <Carrousel 
                imagenes={restaurante.imagenes}
              />
            </section>
            <section className="galeria-imagenes">
              <div className='imagenes'>
                <div className='principal'>
                  <img src={restaurante?.imagenes[0]} alt="img-detalle-producto" />
                </div>
                <div className='secundarias'>
                  <img src={restaurante?.imagenes[1]} alt="img-detalle-producto" />
                  <img src={restaurante?.imagenes[2]} alt="img-detalle-producto" />
                  <img src={restaurante?.imagenes[3]} alt="img-detalle-producto" className='imagen' />                
                  <img src={restaurante?.imagenes[4]} alt="img-detalle-producto" className='imagen'/>               
                </div>
              </div>
              <div className='buttons'>
                <button
                  onClick={() => setShowSlider(true)}
                >Ver mas</button>
              </div>
            </section>
            
            <section className='producto-plan'>
              <h2>Sobre Nosotros..</h2>
              <ul>
                <li>
                  <h3>Plan:</h3>
                  <p> {restaurante?.plan}</p>
                </li>
                
                <li>
                  <h3>Descripción:</h3>
                  <p>
                  {restaurante?.descripcion}
                  </p>
                </li>
                <li>
                  <h3>Precio:</h3>
                  <p> {restaurante?.precio}$</p>
                </li>
                
              </ul>
            </section>
            <section className='producto-ventajas'>
              <div>
                <h2>¿ Que ofrecemos ?</h2>
              </div>
              <ul>
                <li>
                  <MdOutlineDeliveryDining/>
                  <p>Domicilio</p>
                </li>
                <li>
                  <BiTimer/>
                  <p>Cumplimiento</p>
                </li>
                <li>
                  <BsFillDoorClosedFill/>
                  <p>En la puerta de tu casa o trabajo</p>
                </li>
              </ul>
            </section>
            <section className='reserva'>
              <div className="titulo">
                <h2>Reserva</h2>
              </div>
              <section className='formulario'>
                <div className='datepickers'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha Inicio"
                      className='datepicker'
                      value={dayjs(reserva.fechaInicio)}
                      onChange={value => setReserva({...reserva, fechaInicio: value.$d.toLocaleDateString()})}
                    />
                    <DatePicker
                      label="Fecha Final"
                      value={dayjs(reserva.fechaFinal)}
                      onChange={value => setReserva({...reserva, fechaFinal: value.$d.toLocaleDateString()})}
                    />
                  </LocalizationProvider>
                </div>
                <div className='button'>
                  <p>Agrega la fecha en la que quieres comenzar a recibir el servicio, al igual que la fecha a finalizar.</p>
                  <button>Iniciar Reserva</button>
                </div>
              </section>
            </section>
            <section className='politicas'>
              <div className='titulo'>
                <h2>Que necesitas saber</h2>
              </div>
              <div className='contenedor'>
                <div>
                  <h3>Normas de la casa</h3>
                  {restaurante?.reglas?.length > 1
                  ?<p>{restaurante.reglas}</p>
                  :(
                  <>
                    <p>Check-out:10:00</p>
                    <p>No se permiten fiestas</p>
                    <p>No fumar</p>
                  </>
                  )}
                  
                </div>
                <div>
                  <h3>Salud y seguridad</h3>
                  {restaurante?.saludYseguridad?.length > 1
                  ?<p>{restaurante.saludYseguridad}</p>
                  :(
                  <>
                    <p>
                    Se aplican las pautas de distanciamiento social y otras normas
                    relacionadas con el coronavirus.
                    </p>
                    <p>
                      Detector de humo
                    </p>
                    <p>
                      Deposito de seguridad
                    </p>
                  </>
                  )}
                  
                </div>
                <div>
                  <h3>Política de cancelación</h3>
                  {restaurante?.politicas?.length > 1
                  ?<p>{restaurante.politicas}</p>
                  :(
                  <>
                    <p>
                      Agrega las fechas de tu viaje para obtener los detalles de cancelacion
                      de esa estadia.
                    </p>
                  </>
                  )}
                </div>
              </div>
            </section>
          </article>
      </section>
      }
    </main>
  )
}

export default Detalle