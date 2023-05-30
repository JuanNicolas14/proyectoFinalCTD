import React, { useEffect, useState } from 'react'
import Searchbar from '../Componentes/Searchbar/Searchbar'
import Categoria from '../Componentes/Categorias/Categoria'
import RestauranteRecomendado from '../Componentes/Recomendados/RestauranteRecomendado'
import baseUrl from '../utils/baseUrl.json'

const Home = () => {

  const [restaurantes, setRestaurantes] = useState([])
  const [planesdb, setPlanesdb] = useState([])

  const urlRestaurantes = baseUrl.url + "/restaurante";
  const urlPlanes = baseUrl.url + "/plan"

  useEffect(() => {
    const fetchData = async () => {
      console.log("realizando las dos peticiones")
      try {
        // Realiza la primera petición de los planes
        const fetchPlanes = await fetch(urlPlanes);
        const planes = await fetchPlanes.json();
        setPlanesdb(planes)
        console.log(planesdb)

        // Realiza la segunda petición de los restaurantes recomendados.
        const fetchProductos = await fetch(urlRestaurantes)
        const productos = await fetchProductos.json();
        // Mezcla aleatoria de los restaurantes
        const restaurantesAleatorios = shuffleArray(productos);
  
        // Obtener los primeros 4 restaurantes aleatorios
        const restaurantesSeleccionados = restaurantesAleatorios.slice(0, 4);
        setRestaurantes(restaurantesSeleccionados)

        
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [urlRestaurantes]);
  console.log(planesdb)
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
            {planesdb.map((planes,key) => (              
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