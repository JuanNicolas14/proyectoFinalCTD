import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './searchbar.css'
import baseUrl from '../../utils/baseUrl.json'
import { AuthContext } from '../../utils/AuthContext'
import { FilterContext } from '../../utils/FilterContext'
/*Herramientas */
import Swal from 'sweetalert2';

const Searchbar = () => {

  let ciudadesData = [
    "bogota dc",
    "medellin",
    "barranquilla"
  ]
  const navigate = useNavigate();
  const urlPlanes = baseUrl.url + "/plan"
  const urlCiudades = baseUrl.url + "/ciudades"
  const {token} = useContext(AuthContext)
  const {dispatchFilter} = useContext(FilterContext)
  

  const [planesdb, setPlanesdb] = useState([])
  const [ciudadesdb, setCiudadesdb] = useState([])
  const [filtro, setFiltro] = useState({
    ciudad:'',
    plan:''
  })

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  } 

  useEffect(() => {
    const fetchData = async () => {
      console.log("realizando las dos peticiones")
      try {
        // Realiza la primera petición de los planes
        const fetchPlanes = await fetch(urlPlanes);
        const planes = await fetchPlanes.json();
        setPlanesdb(planes)
        
        const fetchCiudades = await fetch(urlCiudades)
        const ciudades = await fetchCiudades.json()
        setCiudadesdb(ciudades)
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if(filtro.plan.length != '' || filtro.ciudad.length != ''){
      const fetchData = async () => {
        try {
          const response = await fetch(baseUrl.url + `/restaurante/${filtro.plan}/${filtro.ciudad}`);
          const jsonData = await response.json();
          // Mezcla aleatoria de los restaurantes
          const restaurantesAleatorios = shuffleArray(jsonData);
          // Obtener los primeros 4 restaurantes aleatorios
          const restaurantesSeleccionados = restaurantesAleatorios.slice(0, 2);
  
          dispatchFilter({type:"SAVE", payload:{
                                          ciudad: filtro.ciudad,
                                          plan: filtro.plan,
                                          restaurantesFiltrados: jsonData,
                                          restaurantesRecomendados:restaurantesSeleccionados
          }})
          navigate('/restaurantes/ciudad-y-plan');
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();

    }else {
      Swal.fire(
        {
          title: 'Espacios en blanco',
          text: `No se puede realizar la busqueda ya que existe espacios en blanco.`,
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        }
      ).then((result) => {
        if (result.isConfirmed) {
          setFiltro({
            ciudad:'',
            plan:''
          })
          navigate('/home');
        }
      })
    }
    
  }

  
  return (
    <section className="busqueda">
        <div>
          <h2>Buscar restaurantes por ciudad y fecha</h2>
          <div className="formulario">
            <form onSubmit={e => handleSubmit(e)}>
              <input
                value={filtro.ciudad} 
                onChange={(e)=> setFiltro({...filtro, ciudad: e.target.value})} 
                type="text" 
                placeholder=" 📍 Digita tu ciudad" 
              />
              <select
                value={filtro.plan} 
                onChange={(e)=> setFiltro({...filtro, plan: e.target.value})}
              >
                <option value="">Selecciona una opción</option>
                {planesdb.map(plan => {
                  return <option key={plan.id} value={plan.nombre}>{plan.nombre}</option>
                })}
                    
              </select>
              <button type='submit'>Buscar</button>
            </form>
            {filtro.ciudad?.length >=1
            && (
              <ul className='sugerencias'>
                {ciudadesdb?.filter((ciudadActual) => {
                  const searchTerm = filtro.ciudad.toLowerCase()
                  const nombreCiudad = ciudadActual.nombreCiudad.toLowerCase()
                  return (
                    searchTerm &&
                    nombreCiudad.startsWith(searchTerm) &&
                    nombreCiudad !== searchTerm
                  )
                }).map((ciudadActual) => (
                  <li
                    onClick={() => setFiltro({...filtro, ciudad: ciudadActual.nombreCiudad})}
                    key={ciudadActual.nombreCiudad}
                  >
                    {ciudadActual.nombreCiudad}
                  </li>
                ))
                
                }
              </ul>
            )
            }
            
          </div>
        </div>
    </section>
  )
}

export default Searchbar