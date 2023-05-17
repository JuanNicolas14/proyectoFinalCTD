import React from 'react'
import  { useEffect, useState } from 'react'
import Restaurante from '../Componentes/Restaurante/Restaurante.jsx'
import Paginacion from '../Componentes/Paginacion/Paginacion.jsx'
import '../index.css'
import baseUrl from '../utils/baseUrl.json'

const Listado = () => {

  const [restaurantes, setRestaurantes] = useState([])
  const [pagina, setPagina] = useState(1)
  const [cantidadPorPagina, setCantidadPorPagina] = useState(8)

  const url = baseUrl.url + "/restaurante"

  useEffect(() => {
    fetch( url)
      .then((res) => res.json())
      .then((data) => setRestaurantes(data))
      .catch((err) => console.log(err));
    
  }, [url]);


  /* Codigo paginacion */
  const maximo = restaurantes.length / cantidadPorPagina

  console.log(restaurantes)

  return (
    <section className='contenedor-restaurantes'>
        <h2>Restaurantes</h2>
          <div className='listado-restaurantes'>
            {restaurantes.slice(
              (pagina - 1) * cantidadPorPagina,
              (pagina - 1) * cantidadPorPagina + cantidadPorPagina
            ).map((restaurante,key) => (
              <Restaurante 
                key={key} 
                restaurante={restaurante}
              />
            ))
            }
            
          </div>
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
    </section>
  )
}

export default Listado