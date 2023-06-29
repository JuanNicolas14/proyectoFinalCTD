import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import baseUrl from '../../utils/baseUrl.json'
import { useContext } from 'react'
import { AuthContext } from '../../utils/AuthContext'
import { useState } from 'react'
import Paginacion from '../../Componentes/Paginacion/Paginacion'
import './reservaHistorial.css'
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage'

const ReservaHistorial = () => {
    const [reservasUser, setReservasUser] = useState([])
    const [pagina, setPagina] = useState(1)
    const [cantidadPorPagina, setCantidadPorPagina] = useState(10)
    const { user, token } = useContext(AuthContext)
    const urlHistorial = baseUrl.url + `/reserva/buscar/${user?.id}`

    /* Codigo paginacion */
    const maximo = reservasUser.length / cantidadPorPagina


    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {

                // Verificar si hay un token
                if (token && user) {
                    // Configurar los encabezados de la solicitud con el token JWT
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    };

                    // Realizar la petición GET al servidor
                    const response = await fetch(urlHistorial, { headers });
                    const responseData = await response.json();

                    // Guardar los datos recibidos en el estado del componente
                    console.log(responseData);
                    setReservasUser(responseData)
                } else {
                    // Si no hay token, manejar el caso de error o redirigir al usuario al inicio de sesión
                    console.log('No se encontró ningún token.');
                }
            } catch (error) {
                console.error('Error al realizar la petición GET:', error);
            }
        };

        fetchData();
    }, [])

    return (
        <section className='historial-user'>
            <h2>Historial de reservas</h2>
            {user?.rol == "ADMIN" || user?.rol == "USER"
                ? reservasUser.length > 0 
                
                    ? (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fecha Inicio</th>
                                        <th>Fecha Fin</th>
                                        <th>Hora Entrega</th>
                                        <th>Restaurante</th>
                                        <th className='historial-plan'>Plan</th>
                                        <th>Ciudad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservasUser.slice(
                                        (pagina - 1) * cantidadPorPagina,
                                        (pagina - 1) * cantidadPorPagina + cantidadPorPagina
                                    ).map((reserva, index) => (
                                        <tr key={index}>
                                            <td>{reserva.fechaInicio.slice(0, 10)}</td>
                                            <td>{reserva.fechaFinalizacion.slice(0, 10)}</td>
                                            <td>{reserva.horaEntrega}</td>
                                            <td>{reserva.nombreRestaurante}</td>
                                            <td className='historial-plan'>{reserva.nombrePlan}</td>
                                            <td>{reserva.nombreCiudad}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                        </>
                        )
                    : <ErrorPage mensaje="No se han encontrado reservas hechas." />
                : <ErrorPage mensaje="No cuenta con los permisos necesarios para ingresar a esta página." />
            }

        </section>
    )
}

export default ReservaHistorial