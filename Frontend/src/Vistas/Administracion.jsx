import React from 'react'
import { Link } from 'react-router-dom'

const Administracion = () => {
  return (
    <main className='home'>
        <section className='administracion-panel'>
            <h2>Administracion</h2>
            <div className='opciones'>
                <ul>
                    <li>
                        <Link to="/administracion/agregarProducto" style={{ textDecoration: 'none' }}>
                            <span>Agregar Producto</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/administracion/eliminarProducto" style={{ textDecoration: 'none' }}>
                        <span>Eliminar Producto</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/plan/registrar" style={{ textDecoration: 'none' }}>
                        <span>Agregar Plan</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    </main>
  )
}

export default Administracion