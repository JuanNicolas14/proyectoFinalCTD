import React from 'react'
import  { useEffect, useState } from 'react'
import Restaurante from '../Componentes/Recomendados/RestauranteRecomendado.jsx'
import '../index.css'
import baseUrl from '../utils/baseUrl.json'

const Listado = () => {

  const [restaurantes, setRestaurantes] = useState([])

  const url = baseUrl+"/restaurante"

  //const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  useEffect(() => {
    fetch( url)
      .then((res) => res.json())
      .then((data) => setRestaurantes(data))
      .catch((err) => console.log(err));
    
  }, [url]);

  console.log(restaurantes);

  return (
    <section className='contenedor-restaurantes'>
        <h2>Restaurantes</h2>
          <div className='listado-restaurantes'>
            {restaurantes.map((restaurante,key) => (
              <Restaurante 
                key={key} 
                nombre={restaurante.nombre}
                descripcion={restaurante.descripcion}
                plan={restaurante.plan_id}
              />
            ))
            }
          </div>
    </section>
  )
}

export default Listado