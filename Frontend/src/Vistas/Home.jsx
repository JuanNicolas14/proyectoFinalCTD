import React, { useContext, useEffect, useState } from 'react';
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useMediaQuery } from '@material-ui/core';

import Searchbar from '../Componentes/Searchbar/Searchbar';
import RestauranteRecomendado from '../Componentes/Recomendados/RestauranteRecomendado';
import baseUrl from '../utils/baseUrl.json';
import { AuthContext } from '../utils/AuthContext';
import solicitarValidacionCuenta from '../utils/solicitarValidacionCuenta';
import showError from '../utils/showError';
import { ERROR_CARGANDO_PLANES } from '../utils/errorConstants';
import Sidebar from '../Componentes/Sidebar/Sidebar';
import FacebookShareButton from '../Componentes/Facebook/FacebookShareButton';
import TwitterShareButton from '../Componentes/Twitter/TwitterShareButton';
import WhatsappShareButton from '../Componentes/Whatsapp/WhatsappShareButton';
import Categoria from '../Componentes/Categorias/Categoria'

const Home = () => {
  const isMobile = useMediaQuery('(max-width: 550px)');
  const isTablet = useMediaQuery('(min-width:551px) and (max-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const { user, token } = useContext(AuthContext);

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
    if (user) {
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
      <Searchbar />
      <section className='categorias'>
        <h2 className='titulo'>Restaurantes por plan</h2>
        <div className='listado-categorias'>
          {isMobile &&
            <Swiper
              modules={[Virtual]}
              spaceBetween={15}
              grabCursor={true}
              slidesPerView={1}
              virtual
            >
              {planesdb.map((planes, index) => (
                <SwiperSlide key={index}>
                  <Categoria
                    key={index}
                    nombre={planes.nombre}
                    dias={planes.dias}
                    descripcion={planes.descripcion}
                    imagen={planes.imagen}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          }
          {isTablet &&
            <Swiper
              modules={[Virtual]}
              spaceBetween={10}
              grabCursor={true}
              slidesPerView={2}
              virtual

            >
              {planesdb.map((planes, index) => (
                <SwiperSlide key={index}>
                  <Categoria
                    key={index}
                    nombre={planes.nombre}
                    dias={planes.dias}
                    descripcion={planes.descripcion}
                    imagen={planes.imagen}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          }
          {isDesktop &&
            <Swiper
              modules={[Virtual]}
              spaceBetween={20}
              grabCursor={true}
              slidesPerView={3}
              virtual
            >
              {planesdb.map((planes, index) => (
                <SwiperSlide key={index}>
                  <Categoria
                    key={index}
                    nombre={planes.nombre}
                    dias={planes.dias}
                    descripcion={planes.descripcion}
                    imagen={planes.imagen}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          }

        </div>
      </section>
      <section className='recomendados'>
        <h2>Restaurantes recomendados</h2>
        <div className='listado-recomendados'>
          {restaurantes.map(restaurante => (
            <RestauranteRecomendado key={restaurante.id} restaurante={restaurante} />
          ))
          }
        </div>
      </section>
      <Sidebar>
        <FacebookShareButton size="large" text="Compartir" link={baseUrl.appUrl} />
        <TwitterShareButton
          size="large"
          text="Compartir"
          message={`BukingFood. La app de suscripción a comida.! ${baseUrl.appUrl}`}
          hashtags="BukinFood"
        />
        <WhatsappShareButton
          size="large"
          text="Compartir"
          message={`Prueba esta nueva app que te va a encantar. Bukinfood, La app de suscripción a comida.! ${baseUrl.appUrl}`} />
      </Sidebar>
    </main>
  )
}

export default Home