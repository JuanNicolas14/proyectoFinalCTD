import React from 'react'

const AgregarProducto = () => {
  return (
    <main className="form-add-product">
      <section className="form">
        <h2>Agregar Restaurante</h2>
        <form method="post">
            <p>
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre"/>
            </p>
            <p>
              <label for="url-img">Imagen:</label>
              <input type="url" id="url-img" placeholder="URL de la imagen"/>
            </p>
            <fieldset>
              <legend>Tipo de Plan:</legend>
              <input type="radio" id="plan_1" name='tipo-plan' value="semanal"/>
              <label for="plan_1">Semanal</label>
              <input type="radio" id="plan_2" name='tipo-plan' value="quincenal"/>
              <label for="plan_2">Quincenal</label>
              <input type="radio" id="plan_3" name='tipo-plan' value="mensual"/>
              <label for="plan_3">Mensual</label>
            </fieldset>
            <p>
              <label for="descripcion">Descripción:</label>
              <textarea id="descripcion" cols="30" rows="5"></textarea>
            </p>
            <p>
              <label for="precio">Precio:</label>
              <input type="number" id="precio" min="5" step="0.5"/>
            </p>
            <fieldset>
              <legend>Dirección:</legend>
            <p>
              <label for="calle">Calle:</label>
              <input type="text" id="calle"/>
            </p>
            <p>
              <label for="numero">Número:</label>
              <input type="text" id="numero"/>
            </p>
            <p>
              <label for="localidad">Localidad:</label>
              <input type="text" id="localidad"/>
            </p>
            <p>
              <label for="ciudad">Ciudad:</label>
              <input type="text" id="ciudad"/>
            </p>
            <p>
              <label for="pais">País:</label>
              <input type="text" id="pais"/>
            </p>
            </fieldset>
          <br/>
          <button type="submit">Guardar</button>
        </form>
      </section>
    </main>
  )
}

export default AgregarProducto