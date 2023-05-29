import React from 'react'
import  { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

import Paginacion from '../../Componentes/Paginacion/Paginacion.jsx'
import Restaurante from '../../Componentes/Restaurante/Restaurante.jsx'
import baseUrl from '../../utils/baseUrl.json'
import '../../index.css'

const ListaPorPlan = () => {
    const { plan } = useParams()
    console.log(plan)

    const [restaurantesPorPlan, setRestaurantesPorPlan] = useState([])
    const [pagina, setPagina] = useState(1)
    const [cantidadPorPagina, setCantidadPorPagina] = useState(10)
    
    console.log("desde lista por plan")

    useEffect(() => {

        // Parámetros de la consulta
        const parametrosAenviar = {
            plan,
        };

        
        // Convierte los parámetros de la consulta en una cadena de consulta
        const queryString = new URLSearchParams(parametrosAenviar).toString();

        const apiUrl = baseUrl.url + `/restaurante?${queryString}`
    
        // Realiza la petición Fetch
        fetch(apiUrl)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error en la solicitud de datos.');
        })
        .then(data => {
            // Hacer algo con los datos recibidos
            console.log("Datos filtrados")
            setRestaurantesPorPlan(data)
            console.log(data);
        })
        .catch(error => {
            // Manejar el error
            console.error(error);
        });
      
    }, [])
    
    //Funcion para convertir primera letra en mayuscula
    const primerLetraMayuscula = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    /* Codigo paginacion */
    const maximo = restaurantesPorPlan.length / cantidadPorPagina


  return (
    <main className="home">
      <section className='restaurantes'>
          <h2>{`Restaurantes con plan ${primerLetraMayuscula(plan)}`}</h2>
            <div className='listado-restaurantes'>
              {restaurantesPorPlan.slice(
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

export default ListaPorPlan