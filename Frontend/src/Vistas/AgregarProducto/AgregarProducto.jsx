import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './agregarProducto.css'
import baseUrl from '../../utils/baseUrl.json'
/*Herramientas */
import Swal from 'sweetalert2';
import { AuthContext } from '../../utils/AuthContext';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage';
import Map from '../../Componentes/Maps/Map';


const AgregarProducto = () => {
  const urlRestaurantes = baseUrl.url + "/restaurante"
  const urlPlanes = baseUrl.url + "/plan"
  const urlCiudades = baseUrl.url + "/ciudades"
  const urlPaises = baseUrl.url + "/paises"
  let confirmador = false;
  //Estado global
  const { user, token } = useContext(AuthContext)

  /*-----*/

  /*const inputPrecio = document.getElementById("precio");

  inputPrecio.addEventListener("blur", function () {
    const value = this.value.replace(/[^\d]/g, ""); // Eliminar todos los caracteres que no sean dígitos
    const formattedValue = formatCurrency(value);

    this.value = formattedValue;
  });

  function formatCurrency(value) {
    const number = Number(value);
    if (isNaN(number)) return "";

    const formattedNumber = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(number);

    return formattedNumber;
  } */
  //estado para mapas
  const [markerPosition, setMarkerPosition] = useState({ lat: 9.0, lng: -74.0 });
  const [latitude, setLatitude] = useState(markerPosition.lat);
  const [longitude, setLongitude] = useState(markerPosition.lng);

  const handleMarkerPositionChange = (position) => {
    setMarkerPosition(position);
    setLatitude(position.lat);
    setLongitude(position.lng);
  };

  const handleLatitudeChange = (e) => {
    const newLatitude = parseFloat(e.target.value);
    setLatitude(newLatitude);
    setMarkerPosition({ ...markerPosition, lat: newLatitude });
  };

  const handleLongitudeChange = (e) => {
    const newLongitude = parseFloat(e.target.value);
    setLongitude(newLongitude);
    setMarkerPosition({ ...markerPosition, lng: newLongitude });
  };


  const [paisesdb, setPaisesdb] = useState([])
  const [ciudadesdb, setCiudadesdb] = useState([])
  const [planesdb, setPlanesdb] = useState([])
  const [productos, setProductos] = useState([])
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    imagenes: [],
    precio: 0,
    plan_id: '',
    calle: 0,
    numero: 0,
    localidad: '',
    ciudad: '',
    pais_id: '',
    reglas: '',
    politicas: '',
    saludYseguridad: '',
    menu: '',
    hora:''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la primera petición con JWT (POST con autenticación)
        const fetchPlanes = await fetch(urlPlanes, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const planes = await fetchPlanes.json();
        setPlanesdb(planes)



        // Realiza la segunda petición de los productos sin JWT.
        const fetchProductos = await fetch(urlRestaurantes)
        const productos = await fetchProductos.json();
        setProductos(productos)

        //Realiza la tercer peticion de las ciudades
        const fetchCiudades = await fetch(urlCiudades)
        const ciudades = await fetchCiudades.json();
        setCiudadesdb(ciudades)

        //Realiza la cuarta peticion de los paises
        const fetchPaises = await fetch(urlPaises)
        const paises = await fetchPaises.json();
        setPaisesdb(paises)


      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault()

    productos.map((productoActual) => {
      if (productoActual.nombre.toLowerCase() === producto.nombre.toLowerCase()) {
        confirmador = true;
      }
    })

    if (confirmador) {
      Swal.fire(
        {
          title: 'Nombre Repetido',
          text: `Restaurante ${producto.nombre.toLowerCase()} No se puede guardar ya que existe uno con el mismo nombre.`,
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        }
      ).then((result) => {
        if (result.isConfirmed) {
          setProducto({
            nombre: '',
            descripcion: '',
            imagenes: [],
            precio: 0,
            plan_id: '',
            calle: 0,
            numero: 0,
            localidad: '',
            ciudad_id: 0,
            pais_id: '',
            reglas: '',
            politicas: '',
            saludYseguridad: '',
            menu: '',
            hora: ''
          })
          window.location.reload()
        }
      })

      setProducto({
        nombre: '',
        descripcion: '',
        imagenes: [],
        precio: 0,
        plan_id: '',
        calle: 0,
        numero: 0,
        localidad: '',
        ciudad_id: 0,
        pais_id: '',
        reglas: '',
        politicas: '',
        saludYseguridad: '',
        menu: '',
        hora: ''

      })

      return

    } else {
      const formData = new FormData()

      formData.append('nombre', producto.nombre)
      // Agrega las imágenes seleccionadas al formulario
      for (let i = 0; i < producto.imagenes.length; i++) {
        formData.append('imagenes', producto.imagenes[i]);
      }
      formData.append('plan_id', producto.plan_id)
      formData.append('descripcion', producto.descripcion)
      formData.append('precio', producto.precio)
      formData.append('calle', producto.calle)
      formData.append('numero', producto.numero)
      formData.append('localidad', producto.localidad)
      formData.append('pais_id', producto.pais_id)
      formData.append('ciudad_id', producto.ciudad_id)
      formData.append('reglas', producto.reglas)
      formData.append('politicas', producto.politicas)
      formData.append('saludYseguridad', producto.saludYseguridad)
      formData.append('longitud', longitude)
      formData.append('latitud', latitude)
      formData.append('menu', producto.menu)
      formData.append('horaApertura', producto.hora)

      console.log("se creo el formData y se enviaran los datos !!!!")

      axios.post(urlRestaurantes, formData)
        .then((response) => {
          // Maneja la respuesta exitosa
          console.log("Se guardaron los datos :)")
          Swal.fire(
            {
              title: 'Restaurante Guardado',
              text: `Restaurante ${producto.nombre} ha sido guardado con exito.`,
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar',
            }
          ).then((result) => {
            if (result.isConfirmed) {
              setProducto({
                nombre: '',
                descripcion: '',
                imagenes: [],
                precio: 0,
                plan_id: '',
                calle: 0,
                numero: 0,
                localidad: '',
                ciudad_id: 0,
                pais_id: '',
                reglas: '',
                politicas: '',
                saludYseguridad: '',
                menu: '',
                hora: ''
              })
              window.location.reload()
            }
          })
        })
        .catch((error) => {
          // Maneja el error
          console.error(error);
        });


    }
  }

  const handleImages = (e) => {
    setProducto({ ...producto, imagenes: [...producto.imagenes, e.target.files[0]] })
  }

  //HANDLE PARA EL CAMBIO DE MARCADOR
  const handleMarkerDragEnd = (event) => {
    const latLng = event.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setMarkerPosition({ lat, lng });
  };

  /*  const eliminarImagen = nombre => {
     let nuevaLista = producto.imagenes.filter(imagen => imagen.name != nombre )
     setProducto({...producto, imagenes: nuevaLista})
   } */

  const eliminarImagen = posicion => {

    let posicionNumber = Number(posicion)
    let nuevaLista = [];
    let contador = 0;

    producto.imagenes.map(imagen => {
      if (contador !== posicionNumber) {
        nuevaLista.push(imagen)
      }
      contador++;
    })
    setProducto({ ...producto, imagenes: nuevaLista })
  }

  return (
    <main className="form-add-product">
      {user?.rol == "ADMIN" || user.permisos.includes("CREAR PRODUCTO")
        ? (
          <section className="form">
            <h2>Agregar Restaurante</h2>
            <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
              <section className="form-parte-A">
                <p>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    value={producto.nombre}
                    onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
                    required
                  />
                </p>

                <div className="carga-imagen">
                  <span>Imagen:</span>
                  <input
                    type="file"
                    className="input-imagen"
                    name="imagen" id="imagen"
                    placeholder="imagen" accept="image/*"
                    onChange={e => handleImages(e)}
                    required
                    multiple
                  />
                  {producto?.imagenes?.length > 0 &&
                    <div className='imagenes-selectas'>
                      <ul>

                        {producto.imagenes.map((imagen, index) => {
                          return <li key={index}> {imagen.name} <span onClick={() => eliminarImagen(index)}>X</span></li>
                        })}
                      </ul>
                    </div>
                  }

                  <label className="label-imagen" htmlFor="imagen">
                    <span className="input-imagen_input-imagen-nombre">
                      {producto.imagenes?.length > 0
                        ? `${producto.imagenes.length} ${producto.imagenes.length > 1
                          ? "archivos seleccionados"
                          : "archivo seleccionado"}`
                        : "Ningún archivo seleccionado"
                      }
                    </span>
                    <span className="input-imagen_input-imagen-boton">
                      Seleccionar archivo
                    </span>
                  </label>
                </div>

                <fieldset className="tipo-plan">
                  <legend>Tipo de Plan</legend>
                  <select
                    className='select-categorias'
                    value={producto.plan_id}
                    onChange={(e) => setProducto({ ...producto, plan_id: e.target.value })}
                  >
                    <option value="">Selecciona una opción</option>
                    {planesdb.map(plan => {
                      return <option key={plan.id} value={plan.id}>{plan.nombre}</option>
                    })}

                  </select>
                </fieldset>
                <fieldset className="tipo-plan">
                  <legend>Horario de entrega</legend>
                  <select
                    className='select-categorias'
                    value={producto.hora}
                    onChange={(e) => setProducto({ ...producto, hora: e.target.value })}
                  >
                    <option value="">Selecciona una hora</option>
                    <option value="12:00 - 13:00">12:00 - 13:00</option>
                    <option value="13:00 - 14:00">13:00 - 14:00</option>
                    <option value="14:00 - 15:00">14:00 - 15:00</option>
                  </select>
                </fieldset>
                <p className="descripcion">
                  <label htmlFor="descripcion">Descripción:</label>
                  <textarea
                    value={producto.descripcion}
                    id="descripcion"
                    cols="30" rows="5" maxLength="250"
                    onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })}
                    required
                  ></textarea>
                </p>

                <p className="precio">
                  <label htmlFor="precio">Precio:</label>
                  <input
                    value={producto.precio}
                    type='number' id="precio"
                    name="precio" placeholder="$ 0,00" step="any"
                    onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
                    required />
                </p>
                <p className="descripcion">
                  <label htmlFor="politicas">Políticas del restaurante:</label>
                  <textarea
                    value={producto.politicas}
                    id="politicas"
                    cols="30" rows="5" maxLength="250"
                    onChange={(e) => setProducto({ ...producto, politicas: e.target.value })}
                    required
                  ></textarea>
                </p>
                <p className="descripcion">
                  <label htmlFor="menu">Menú del restaurante:</label>
                  <textarea
                    value={producto.menu}
                    id="menu"
                    cols="30" rows="5" maxLength="250"
                    onChange={(e) => setProducto({ ...producto, menu: e.target.value })}
                    required
                  ></textarea>
                </p>
              </section>

              <section className="form-parte-B">
                <p className="descripcion">
                  <label htmlFor="reglas">Reglas del restaurante:</label>
                  <textarea
                    value={producto.reglas}
                    id="reglas"
                    cols="30" rows="5" maxLength="250"
                    onChange={(e) => setProducto({ ...producto, reglas: e.target.value })}
                    required
                  ></textarea>
                </p>
                <p className="descripcion">
                  <label htmlFor="saludYseguridad">Medidas de salud y seguridad:</label>
                  <textarea
                    value={producto.saludYseguridad}
                    id="saludYseguridad"
                    cols="30" rows="5" maxLength="250"
                    onChange={(e) => setProducto({ ...producto, saludYseguridad: e.target.value })}
                    required
                  ></textarea>
                </p>

                <div className="direccion">
                  <h3>--Dirección--</h3>
                  <p>
                    <label htmlFor="calle">Calle:</label>
                    <input
                      value={producto.calle}
                      type="number" id="calle"
                      onChange={(e) => setProducto({ ...producto, calle: e.target.value })}
                      required
                    />
                  </p>
                  <p>
                    <label htmlFor="numero">Número:</label>
                    <input
                      value={producto.numero}
                      type="number" id="numero"
                      onChange={(e) => setProducto({ ...producto, numero: e.target.value })}
                      required
                    />
                  </p>
                  <p>
                    <label htmlFor="localidad">Localidad:</label>
                    <input
                      value={producto.localidad}
                      type="text" id="localidad"
                      onChange={(e) => setProducto({ ...producto, localidad: e.target.value })}
                      required />
                  </p>
                  <fieldset className="tipo-plan">
                    <legend>Ciudad</legend>
                    <select
                      className='select-categorias'
                      value={producto.ciudad_id}
                      onChange={(e) => setProducto({ ...producto, ciudad_id: e.target.value })}
                    >
                      <option value="">Selecciona una ciudad</option>
                      {ciudadesdb?.map(ciudad => {
                        return <option key={ciudad.id} value={ciudad.id}>{ciudad.nombreCiudad}</option>
                      })}

                    </select>
                  </fieldset>

                  <fieldset className="tipo-plan">
                    <legend>País</legend>
                    <select
                      className='select-categorias'
                      value={producto.pais_id}
                      onChange={(e) => setProducto({ ...producto, pais_id: e.target.value })}
                    >
                      <option value="">Selecciona un pais</option>
                      {paisesdb?.map(pais => {
                        return <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                      })}

                    </select>
                  </fieldset>
                </div>
              </section>
              <div id="map" className='map'>
                <fieldset className='mapa'>
                  <legend>Ubicación en el mapa</legend>
                  <Map onMarkerPositionChange={handleMarkerPositionChange} />
                </fieldset>
              </div>

              <section className="form-parte-C">
                <button type="submit">Guardar</button>
              </section>
            </form>
          </section>
        )
        : <ErrorPage mensaje="No cuentas con los permisos necesarios para ingresar a esta página." />
      }

    </main>
  )
}

export default AgregarProducto