import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './agregarProducto.css'
import baseUrl from '../../utils/baseUrl.json'
/*Herramientas */
import Swal from 'sweetalert2';

const AgregarProducto = () => {
  const url = baseUrl.url + "/restaurante"
  let confirmador = false;

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

  const [productos, setProductos] = useState([])
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    imagenes: [],
    precio: 0,
    plan_id: '',
    calle: 0,
    numero: 0,
    localidad:'',
    ciudad:'',
    pais_id:''
  })

  useEffect(() => {
    fetch( url)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.log(err));
    
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault()

    productos.map((productoActual) => {
      if(productoActual.nombre.toLowerCase() === producto.nombre.toLowerCase()){
        confirmador = true;
      }
    })

    if(confirmador){
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
            localidad:'',
            ciudad:'',
            pais_id:''
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
        localidad:'',
        ciudad:'',
        pais_id:''
      })

      return

    }else{
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
      formData.append('ciudad', producto.ciudad)
      console.log("se creo el formData y se enviaran los datos !!!!")

      axios.post(url,formData)
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
              localidad:'',
              ciudad:'',
              pais_id:''
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
    setProducto({...producto, imagenes: [...producto.imagenes, e.target.files[0]]})
  }

 /*  const eliminarImagen = nombre => {
    let nuevaLista = producto.imagenes.filter(imagen => imagen.name != nombre )
    setProducto({...producto, imagenes: nuevaLista})
  } */

  const eliminarImagen = posicion => {

    let posicionNumber = Number(posicion)
    let nuevaLista = [];
    let contador = 0;

    producto.imagenes.map(imagen => {
      if(contador !== posicionNumber){
        nuevaLista.push(imagen)
      }
      contador++;
    })
    setProducto({...producto, imagenes: nuevaLista})
  }

  return (
    <main className="form-add-product">
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
                onChange={(e)=> setProducto({...producto, nombre: e.target.value})}
                required
              />
            </p>

            <div className="carga-imagen">
              <span>Imagen:</span>
              <input 
                type="file"
                className="input-imagen" 
                name="imagen" id="imagen" 
                placeholder="imagen 1" accept="image/*" 
                onChange={e => handleImages(e)}
                required
              />
              {producto?.imagenes?.length > 0 &&
                <div className='imagenes-selectas'>
                  <ul>

                  {producto.imagenes.map((imagen,index) => {
                    return <li key={index}> {imagen.name} <span onClick={()=> eliminarImagen(index)}>X</span></li>
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

              <input 
                type="radio" name="plan" 
                id="plan_1" value="1" 
                onChange={(e)=> setProducto({...producto, plan_id: e.target.value})}
                required/>
              <label htmlFor="plan_1">Semanal</label>

              <input 
                type="radio" name="plan" 
                id="plan_2" value="2" 
                onChange={(e)=> setProducto({...producto, plan_id: e.target.value})}
                required/>
              <label htmlFor="plan_2">Quincenal</label>

              <input
                type="radio" name="plan" 
                id="plan_3" value="3" 
                onChange={(e)=> setProducto({...producto, plan_id: e.target.value})}
                required/>
              <label htmlFor="plan_3">Mensual</label>

              <input
                type="radio" name="plan" 
                id="plan_4" value="4" 
                onChange={(e)=> setProducto({...producto, plan_id: e.target.value})}
                required/>
              <label htmlFor="plan_4">Trimestral</label>
            </fieldset>
            <p className="descripcion">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea 
                value={producto.descripcion}
                id="descripcion" 
                cols="30" rows="5" maxLength="250" 
                onChange={(e)=> setProducto({...producto, descripcion: e.target.value})}
                required
              ></textarea>
            </p>

            <p className="precio">
              <label htmlFor="precio">Precio:</label>
              <input 
                value={producto.precio}
                type='number' id="precio" 
                name="precio"  placeholder="$ 0,00" step="any"  
                onChange={(e)=> setProducto({...producto, precio: e.target.value})}
                required/>
            </p>
          </section>
          
          <section className="form-parte-B">
            <div className="direccion">
              <h3>--Direccion--</h3>
              <p>
                <label htmlFor="calle">Calle:</label>
                <input 
                  value={producto.calle}
                  type="number" id="calle"
                  onChange={(e)=> setProducto({...producto, calle: e.target.value})}
                  required
                />
              </p>
              <p>
                <label htmlFor="numero">Número:</label>
                <input 
                  value={producto.numero}
                  type="number" id="numero" 
                  onChange={(e)=> setProducto({...producto, numero: e.target.value})}
                  required
                />
              </p>
              <p>
                <label htmlFor="localidad">Localidad:</label>
                <input 
                  value={producto.localidad}
                  type="text" id="localidad"
                  onChange={(e)=> setProducto({...producto, localidad: e.target.value})} 
                  required/>
              </p>
              <p>
                <label htmlFor="ciudad">Ciudad:</label>
                <input 
                  value={producto.ciudad}
                  type="text" id="ciudad"
                  onChange={(e)=> setProducto({...producto, ciudad: e.target.value})} 
                  required
                />
              </p>
              
              <fieldset className="tipo-plan">
                <legend>Pais</legend>

                <input 
                  type="radio" name="pais" 
                  id="plan_1" value="1" 
                  onChange={(e)=> setProducto({...producto, pais_id: e.target.value})}
                  required/>
                <label htmlFor="plan_1">Colombia</label>

                <input 
                  type="radio" name="pais" 
                  id="plan_2" value="2" 
                  onChange={(e)=> setProducto({...producto, pais_id: e.target.value})}
                  required/>
                <label htmlFor="plan_2">Argentina</label>

                <input 
                  type="radio" name="pais" 
                  id="plan_3" value="3" 
                  onChange={(e)=> setProducto({...producto, pais_id: e.target.value})}
                  required/>
                <label htmlFor="plan_3">Brasil</label>
              </fieldset>
            </div>
          </section>
          <section className="form-parte-C">
            <button type="submit">Guardar</button>
          </section>
        </form>
      </section>
    </main>
  )
}

export default AgregarProducto