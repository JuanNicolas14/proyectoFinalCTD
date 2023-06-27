import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillPatchCheckFill } from "react-icons/bs"
import './reservaExitosa.css'

const ReservaExitosa = () => {
    return (
        <section className='reserva-exitosa'>
            <div>
                <BsFillPatchCheckFill />
                <h3 className='agradecimiento'>¡Muchas gracias!</h3>
                <p>Su reserva se ha realizado con éxito</p>
                <Link
                    className='button-exito'
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                >
                    Ok
                </Link>
            </div>
        </section>
    )
}

export default ReservaExitosa