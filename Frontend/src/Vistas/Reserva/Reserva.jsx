import React from 'react'
import { useNavigate } from 'react-router'
import { ReservaContext } from '../../utils/ReservaContext'
import { useContext } from 'react'
import { AuthContext } from '../../utils/AuthContext'
import Carrousel from '../../Componentes/Carrousel/Carrousel'
import './reserva.css'
import baseUrl from '../../utils/baseUrl.json'
import { useState } from 'react'
import { useEffect } from 'react'
/*Herramientas */
import Swal from 'sweetalert2';
//Importar fecha actual
import moment from 'moment';

const Reserva = () => {
  const navigate = useNavigate()
  const urlReserva = baseUrl.url + "/reserva/registrar"
  const urlCiudades = baseUrl.url + "/ciudades"
  const { fechaInicio, fechaFinalizacion, horaEntrega, restauranteContext } = useContext(ReservaContext)
  const { user, token } = useContext(AuthContext)
  const [reservaFinal, setReservaFinal] = useState({
    fechaInicioReserva: JSON.parse(localStorage.getItem('fechas')).fechaInicial.length > 1
      ? JSON.parse(localStorage.getItem('fechas')).fechaInicial : '',
    fechaFinal: JSON.parse(localStorage.getItem('fechas')).fechaFinal.length > 1
      ? JSON.parse(localStorage.getItem('fechas')).fechaFinal : '',
    hora: JSON.parse(localStorage.getItem('fechas')).hora.length > 1
      ? JSON.parse(localStorage.getItem('fechas')).hora : '',
    direccion: '',
    ciudadNumero: 0,
    telefonoUser: ''
  });
  const [restauranteReserva, setRestauranteReserva] = useState({})
  //Obtener fecha mañana
  const fechaMañana = moment().add(1, 'day').format('YYYY-MM-DD');

  useEffect(() => {
    const fetchData = async () => {
      try {

        //Realiza la peticion de las ciudades
        const fetchCiudades = await fetch(urlCiudades)
        const ciudades = await fetchCiudades.json();
        ciudades?.map(ciudad => {
          if (ciudad?.nombreCiudad == restauranteContext.ciudad) {
            setReservaFinal({ ...reservaFinal, ciudadNumero: ciudad?.id })
          }
        })

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
    setRestauranteReserva(JSON.parse(localStorage.getItem('restaurante')))
  }, [])


  useEffect(() => {
    if (reservaFinal?.fechaInicioReserva) {
      if (restauranteReserva?.plan === "Semanal") {
        const fecha = new Date(reservaFinal.fechaInicioReserva);
        fecha.setDate(fecha.getDate() + 6);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReservaFinal({ ...reservaFinal, fechaFinal: fechaFinalFormateada });
      } else if (restauranteReserva?.plan === "Quincenal") {
        const fecha = new Date(reservaFinal.fechaInicioReserva);
        fecha.setDate(fecha.getDate() + 14);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReservaFinal({ ...reservaFinal, fechaFinal: fechaFinalFormateada });
      } else if (restauranteReserva?.plan === "Mensual") {
        const fecha = new Date(reservaFinal.fechaInicioReserva);
        fecha.setDate(fecha.getDate() + 29);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReservaFinal({ ...reservaFinal, fechaFinal: fechaFinalFormateada });
      } else if (restauranteReserva?.plan === "Trimestral") {
        const fecha = new Date(reservaFinal.fechaInicioReserva);
        fecha.setDate(fecha.getDate() + 89);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReservaFinal({ ...reservaFinal, fechaFinal: fechaFinalFormateada });
      } else if (restauranteReserva?.plan === "Semestral") {
        const fecha = new Date(reservaFinal.fechaInicioReserva);
        fecha.setDate(fecha.getDate() + 179);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReservaFinal({ ...reservaFinal, fechaFinal: fechaFinalFormateada });
      } else if (restauranteReserva?.plan === "Anual") {
        const fecha = new Date(reservaFinal.fechaInicioReserva);
        fecha.setDate(fecha.getDate() + 364);
        const fechaFinalFormateada = fecha.toISOString().slice(0, 10);
        setReservaFinal({ ...reservaFinal, fechaFinal: fechaFinalFormateada });
      }
    }
  }, [reservaFinal?.fechaInicioReserva]);

  const handleReserva = (e) => {
    e.preventDefault()
    if (reservaFinal?.direccion != '' 
        && reservaFinal?.horaEntrega != '' 
        && reservaFinal?.ciudadNumero != 0
        && reservaFinal?.telefonoUser != '') {
      const formDataReserva = new FormData()
      formDataReserva.append('horaEntrega', reservaFinal.hora)
      formDataReserva.append('fechaInicio', reservaFinal.fechaInicioReserva)
      formDataReserva.append('fechaFinalizacion', reservaFinal.fechaFinal)
      formDataReserva.append('direccionEntrega', reservaFinal.direccion)
      formDataReserva.append('usuarioId', user.id)
      formDataReserva.append('ciudadId', reservaFinal.ciudadNumero)
      formDataReserva.append('restauranteId', restauranteContext.id)
      formDataReserva.append('telefonoUsuario', reservaFinal.telefonoUser)
      // Realiza la petición Fetch
      fetch(urlReserva, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataReserva
      })
        .then(response => response.json())
        .then(data => {
          // Maneja la respuesta del servidor
          console.log(data);
          setReservaFinal({
            fechaInicioReserva: '',
            fechaFinal: '',
            hora: '',
            direccion: '',
            ciudadNumero: 0,
            telefonoUser: ''
          })
          localStorage.removeItem('fechas')
          localStorage.removeItem('restaurante')
          navigate('/reserva/exito')
        })
        .catch(error => {
          // Maneja cualquier error ocurrido durante la petición
          console.error('Error:', error);
        });
    } else {
      Swal.fire(
        {
          title: 'Datos incompletos.',
          text: `Para realizar una reserva,  debe llenar todos los campos del formulario.`,
          icon: 'error',
          showCancelButton: false,
          cancelButtonColor: '#d33',
          cancelButtonText: "Cancelar"
        }
      )
    }
  }

  return (
    <section className='reserva'>
      <h2>RESERVA</h2>
      <div className='reserva-user'>
        <h3>Detalles del Usuario</h3>
        <div className='user-container'>
          <div className='reserva-avatar'>
            <span>{user.nombre[0]}{user.apellido[0]}</span>
          </div>
          <p>
            Nombre: <span>{user.nombre}</span>
          </p>
          <p>
            Apellido: <span>{user.apellido}</span>
          </p>
          <p>
            Email: <span>{user.email}</span>
          </p>
          <p>
            Rol:{" "}
            <span>{user.rol == "ADMIN" ? "Administrador" : "Usuario"}</span>
          </p>
        </div>
      </div>
      {restauranteReserva &&
        <div className='reserva-restaurante'>
          <h3>Detalles del Restaurante</h3>
          <div className='restaurante-container'>
            <div className='reserva-imagenes'>
              {restauranteReserva?.imagenes &&
                <Carrousel
                  imagenes={restauranteReserva?.imagenes}
                />
              }

            </div>
            <div className='restaurante-info'>
              <p>
                Nombre: <span>{restauranteReserva?.nombre}</span>
              </p>
              <p>
                Ubicación: <span>{restauranteReserva?.ciudad}, {restauranteReserva?.pais}</span>
              </p>
              <p>Descripción: <span>{restauranteReserva?.descripcion}</span></p>
              <p>
                Plan: <span>{restauranteReserva?.plan}</span>
              </p>
              <p>
                Valor: <span>${restauranteReserva?.precio}</span>
              </p>
              <p>
                Puntuación: <span>{restauranteReserva?.puntuacionPromedio}</span>
              </p>
            </div>
          </div>
        </div>
      }

      <form onSubmit={(e) => handleReserva(e)} className='detalle-reserva'>
        <h3>Detalle de la reserva</h3>
        <div className="datepickers">
          <fieldset className="datepicker-fechaInicio">
            <legend htmlFor="startDate">Fecha inicial:</legend>
            <input
              type="date"
              id="startDate"
              value={reservaFinal.fechaInicioReserva}
              onChange={(e) => setReservaFinal({ ...reservaFinal, fechaInicioReserva: e.target.value })}
              min={fechaMañana}
            />
          </fieldset>
          <fieldset className="datepicker-fechaFinal">
            <legend htmlFor="endDate">Fecha final:</legend>
            <input
              type="date"
              id="endDate"
              value={reservaFinal.fechaFinal}
              readOnly
            />
          </fieldset>
        </div>
        <fieldset className="tipo-plan">
          <legend htmlFor="horaEntrega">Hora de entrega</legend>
          <select
            id='horaEntrega'
            className='select-reserva'
            value={reservaFinal.hora}
            onChange={(e) => setReservaFinal({ ...reservaFinal, hora: e.target.value })}
          >
            <option value="">Selecciona una hora</option>
            <option value={restauranteReserva.horaApertura}>{restauranteReserva.horaApertura}</option>
          </select>
        </fieldset>
        <fieldset className="tipo-plan">
          <legend htmlFor="direccion">Dirección de entrega</legend>
          <p className='info'>A donde llevaremos tu almuerzo ?</p>
          <input
            id='direccion'
            type="text"
            placeholder='Digita tu dirección'
            onChange={(e) => setReservaFinal({ ...reservaFinal, direccion: e.target.value })}
          />
        </fieldset>
        <fieldset className="tipo-plan">
          <legend htmlFor="telefonoUser">Telefono</legend>
          <p className='info'>Necesitamos contactarte en caso de alguna eventualidad</p>
          <input
            id='telefonoUser'
            type="text"
            placeholder='Digita tu telefono'
            onChange={(e) => setReservaFinal({ ...reservaFinal, telefonoUser: e.target.value })}
          />
        </fieldset>
        <button type='submit'>Reservar</button>
      </form>

    </section>
  )
}

export default Reserva