import React, { useContext, useEffect, useState } from 'react';
import Searchbar from '../Componentes/Searchbar/Searchbar';
import Categoria from '../Componentes/Categorias/Categoria';
import RestauranteRecomendado from '../Componentes/Recomendados/RestauranteRecomendado';
import baseUrl from '../utils/baseUrl.json';
import { AuthContext } from '../utils/AuthContext';
import solicitarValidacionCuenta from '../utils/solicitarValidacionCuenta';
import showError from '../utils/showError';
import { ERROR_CARGANDO_PLANES } from '../utils/errorConstants';
import Sidebar from '../Componentes/Sidebar/Sidebar';
import FacebookShareButton from '../Componentes/Facebook/FacebookShareButton';
import TwitterShareButton from '../Componentes/Twitter/TwitterShareButton';

const Home = () => {
  const {user, token} = useContext(AuthContext);

  const [restaurantes, setRestaurantes] = useState([])
  const [planesdb, setPlanesdb] = useState([])

  const urlRestaurantes = baseUrl.url + "/restaurante";
  const urlPlanes = baseUrl.url + "/plan"

  useEffect(() => {
    const fetchData = async () => {

      try {
        // Realiza la primera petición de los planes
        const fetchPlanes = await fetch(urlPlanes);
        const planes = await fetchPlanes.json();
        setPlanesdb(planes)
      } catch (error) {
        showError(ERROR_CARGANDO_PLANES);
      }

      try {
        // Realiza la segunda petición de los restaurantes recomendados.
        const fetchProductos = await fetch(urlRestaurantes)
        const productos = await fetchProductos.json();
        // Mezcla aleatoria de los restaurantes
        const restaurantesAleatorios = shuffleArray(productos);
  
        // Obtener los primeros 4 restaurantes aleatorios
        const restaurantesSeleccionados = restaurantesAleatorios.slice(0, 4);
        setRestaurantes(restaurantesSeleccionados)

      } catch (error) {
        showError(ERROR_CARGANDO_RESTAURANTE);
      }
    };

    fetchData();
  }, [urlRestaurantes]);

  // Verificamos si el usuario está logueado y si está validada la cuenta
  useEffect(() => {
    if(user){
      solicitarValidacionCuenta(user, token);
    }
  }, [user])

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
        <Sidebar>
          <FacebookShareButton />
          <TwitterShareButton />
        </Sidebar>
    </main>
  )
}

export default Home