import React from 'react'
import './searchbar.css'

const Searchbar = () => {
  return (
    <section className="busqueda">
        <div>
          <h2>Buscar restaurantes por ciudad y fecha</h2>
          <div className="formulario">
            <form>
              <input type="text" placeholder=" 📍 Digita tu ciudad" />
              <input type="text" placeholder=" 🗓️ Inicio - Final" />
              <button>Buscar</button>
            </form>
          </div>
        </div>
    </section>
  )
}

export default Searchbar