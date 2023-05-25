import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
//Iconos
import {BiArrowBack} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
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

const Detalle = () => {
  const [restaurante, setRestaurante] = useState({});
  const [reserva, setReserva] = useState({
    fechaInicio: null,
    fechaFinal: null,
  });

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

  {console.log(restaurante)}

  return (
    <main className="main-detail">
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
                <p>{restaurante?.domicilio?.ciudad}, {restaurante?.domicilio?.pais.nombre}</p>
              </div>
              <div className='iconos'>
                <HiOutlineShare/>
                <FiHeart/>
              </div>
            </div>
            <div className='calificacion'>
              <div className='estrellas'>
                <p>Muy Bueno</p>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
              </div>
              <div className='numero'>
                <p>8</p>
              </div>
            </div>
          </div>
        </section>
      }
      {restaurante &&        
        <section className="detalle-producto">
          <article>
            <section className="galeria-imagenes">
              <div className='imagenes'>
                <div className='principal'>
                  <img src={restaurante?.imagen} alt="img-detalle-producto" />
                </div>
                <div className='secundarias'>
                  <img src={restaurante?.imagen} alt="img-detalle-producto" />
                  <img src={restaurante?.imagen} alt="img-detalle-producto" />
                  <img src={restaurante?.imagen} alt="img-detalle-producto" className='imagen' />                
                  <img src={restaurante?.imagen} alt="img-detalle-producto" className='imagen'/>               
                </div>
              </div>
              <div className='buttons'>
                <button>Ver mas</button>
              </div>
            </section>
            
            <section className='producto-plan'>
              <h2>Sobre Nosotros..</h2>
              <ul>
                <li>
                  <h3>Plan:</h3>
                  <p> {restaurante?.plan?.nombre}</p>
                </li>
                
                <li>
                  <h3>Descripción:</h3>
                  <p>
                  |{restaurante?.descripcion}
                  </p>
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
          </article>
      </section>
      }
    </main>
  )
}

export default Detalle