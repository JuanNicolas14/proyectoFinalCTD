import React from 'react'
import  { useEffect, useState } from 'react'
import Paginacion from '../Componentes/Paginacion/Paginacion.jsx'
import Restaurante from '../Componentes/Restaurante/Restaurante.jsx'
import baseUrl from '../utils/baseUrl.json'
import '../index.css'

const Listado = () => {

  const [restaurantes, setRestaurantes] = useState([])
  const [pagina, setPagina] = useState(1)
  const [cantidadPorPagina, setCantidadPorPagina] = useState(10)

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
    <main className="home">
      <section className='restaurantes'>
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
            
      </section>
      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
    </main>
  )
}

export default Listado