import React, { useContext, useEffect, useState } from 'react'
import Searchbar from '../Componentes/Searchbar/Searchbar'
import Categoria from '../Componentes/Categorias/Categoria'
import RestauranteRecomendado from '../Componentes/Recomendados/RestauranteRecomendado'
import baseUrl from '../utils/baseUrl.json'

const Home = () => {
  
  const planes = [
    {
      nombre: 'Semanal',
      dias: 7,
      descripcion: 'Un almuerzo por dia, durante 7 dias.'
    },
    {
      nombre: 'Quincenal',
      dias: 15,
      descripcion: 'Un almuerzo por dia, durante 15 dias.'
    },
    {
      nombre: 'Mensual',
      dias: 30,
      descripcion: 'Un almuerzo por dia, durante 30 dias.'
    },
    {
      nombre: 'Trimestral',
      dias: 90,
      descripcion: 'Un almuerzo por dia, durante 90 dias.'
    },

  ]

  const [restaurantes, setRestaurantes] = useState([])

  const url = baseUrl.url + "/restaurante";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Mezcla aleatoria de los restaurantes
        const restaurantesAleatorios = shuffleArray(data);
  
        // Obtener los primeros 4 restaurantes aleatorios
        const restaurantesSeleccionados = restaurantesAleatorios.slice(0, 4);
  
        setRestaurantes(restaurantesSeleccionados);

        console.log(restaurantes);
      })
      .catch((err) => console.log(err));
  }, [url]);
  
  console.log(restaurantes);
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  return (
    <main className='home'>
        <Searchbar/>
        <section className='categorias'>
          <h2 className='titulo'>Restaurantes por plan</h2>
          <div className='listado-categorias'>
            {planes.map((planes,key) => (              
              <Categoria 
                key={key} 
                nombre={planes.nombre}
                dias={planes.dias}
                descripcion={planes.descripcion}
              />
            ))
            }
          </div>
        </section>
        <section className='recomendados'>
          <h2>Restaurantes recomendados</h2>
          <div className='listado-recomendados'>
            {restaurantes.map(restaurante => (
              <RestauranteRecomendado key={restaurante.id} restaurante={restaurante}/>
            ))
            }
          </div>
        </section>
    </main>
  )
}

export default Home