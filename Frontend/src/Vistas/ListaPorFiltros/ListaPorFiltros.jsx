import React, { useContext, useEffect, useState } from 'react'
import { FilterContext } from '../../utils/FilterContext'
import Paginacion from '../../Componentes/Paginacion/Paginacion'
import Restaurante from '../../Componentes/Restaurante/Restaurante'
import Searchbar from '../../Componentes/Searchbar/Searchbar'
import RestauranteRecomendado from '../../Componentes/Recomendados/RestauranteRecomendado'
//Icono
import {BiArrowBack} from 'react-icons/bi'
import './listaPorFiltros.css'

const ListaPorFiltros = () => {
    const {restaurantesFiltradosGuardados,restaurantesRecomendados,plan, ciudad, hora} = useContext(FilterContext)
    const [pagina, setPagina] = useState(1)
    const [cantidadPorPagina, setCantidadPorPagina] = useState(4)


    /* Codigo paginacion */
    const maximo = restaurantesFiltradosGuardados.length / cantidadPorPagina

    //Funcion para convertir primera letra en mayuscula
    const primerLetraMayuscula = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

  return (
    <main className="home">
        <Searchbar/>
        {restaurantesFiltradosGuardados.length >=1
        ?(
        <>
          <section className='restaurantes'>
            {plan.length > 1 && ciudad.length > 1 && hora.length > 1
            ?(
              <h2>{`Restaurantes en ${ciudad} con plan ${plan} y hora de entrega:${hora}`}</h2>
            )
            :(
              plan.length > 1 && ciudad.length > 1
              ? (
                <h2>{`Restaurantes en ${ciudad} con plan ${plan}`}</h2>
              )
              :(
                plan.length > 1 && hora.length > 1
                ?(
                  <h2>{`Restaurantes con plan ${plan} y hora de entrega:${hora}`}</h2>
                )
                :(
                  hora.length > 1 && ciudad.length > 1
                  ?(
                    <h2>{`Restaurantes en ${ciudad} y hora de entrega:${hora}`}</h2>
                  )
                  :(
                    plan.length > 1
                    ?(
                      <h2>{`Restaurantes con plan ${plan}`}</h2>
                    )
                    :(
                      ciudad.length > 1
                      ?(
                        <h2>{`Restaurantes en ${ciudad}`}</h2>
                      )
                      :(
                        <h2>{`Restaurantes con hora de entrega: ${hora}`}</h2>
                      )
                    )
                  )
                )
              )
            )
            }
            
            <div className='listado-restaurantes'>
              {restaurantesFiltradosGuardados.slice(
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

          <section className='recomendados'>
            <h2>{`Recomendados por ${plan} ${ciudad} ${hora}`}</h2>
            <div className='listado-recomendados'>
              {restaurantesRecomendados.map(restaurante => (
                <RestauranteRecomendado key={restaurante.id} restaurante={restaurante}/>
              ))
              }
            </div>
          </section>        
        </>
        )
        : 
        <div className='error-filtro'>
          <h2>No se encontraron resultados con los filtros indicados</h2>
        </div>
        }
    </main>
  )
}

export default ListaPorFiltros