import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './agregarProducto.css'
import baseUrl from '../../utils/baseUrl.json'

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

  const [error, setError] = useState(false)
  const [productos, setProductos] = useState([])
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    imagen: null,
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
        setError(true)
        confirmador = true;
      }
    })

    if(confirmador){
      console.log("Nombre repetido en la base datos.")
    }else{
      const formData = new FormData()
      formData.append('nombre', producto.nombre)
      formData.append('descripcion', producto.descripcion)
      formData.append('imagen', producto.imagen)
      formData.append('precio', producto.precio)
      formData.append('plan_id', producto.plan_id)
      formData.append('calle', producto.calle)
      formData.append('numero', producto.numero)
      formData.append('localidad', producto.localidad)
      formData.append('ciudad', producto.ciudad)
      formData.append('pais_id', producto.pais_id)
      console.log("se creo el formData y se enviaran los datos !!!!")

      axios.post(url,formData)
      .then((response) => {
        // Maneja la respuesta exitosa
        console.log("Se guardaron los datos :)")
        console.log(response.data);
        setError(false)
      })
      .catch((error) => {
        // Maneja el error
        console.error(error);
      });
  
      setProducto({
        nombre: '',
        descripcion: '',
        imagen: null,
        precio: 0,
        plan_id: '',
        calle: 0,
        numero: 0,
        localidad:'',
        ciudad:'',
        pais_id:''
      })
    }  
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

            <p className="carga-imagen">
              <span>Imagen:</span>
              <input 
                type="file"
                className="input-imagen" 
                name="imagen" id="imagen" 
                placeholder="imagen" accept="image/*" 
                onChange={(e)=> setProducto({...producto, imagen: e.target.files[0]})}
                required
              />
              <label className="label-imagen" htmlFor="imagen">
                <span className="input-imagen_input-imagen-nombre">
                  {producto.imagen != null 
                  ? producto.imagen.name
                  : "Ningún archivo seleccionado"
                  }
                </span>
                <span className="input-imagen_input-imagen-boton">
                  Seleccionar archivo
                </span>
              </label>
            </p>

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
        {error && <div className='texto-error'>El nombre no puede estar repetido</div>}
      </section>
    </main>
  )
}

export default AgregarProducto