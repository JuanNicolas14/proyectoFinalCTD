import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Paginacion from '../../Componentes/Paginacion/Paginacion.jsx'
import baseUrl from '../../utils/baseUrl.json'
import {TiDelete} from 'react-icons/ti'
import './eliminarProducto.css'

const EliminarProducto = () => {

    const [pagina, setPagina] = useState(1)
    const [cantidadPorPagina, setCantidadPorPagina] = useState(8)

    const [productosAdmin, setProductosAdmin] = useState([])

    const url = baseUrl.url + "/restaurante"
    /* Codigo paginacion */
    const maximo = productosAdmin.length / cantidadPorPagina

    useEffect(() => {
      fetch( url)
        .then((res) => res.json())
        .then((data) => setProductosAdmin(data))
        .catch((err) => console.log(err));
      
    }, [url]);

    const eliminarProducto = (id) => {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
              console.log('El producto se eliminó correctamente');
              // Realizar alguna acción adicional después de eliminar el producto
              window.location.reload();
            } else {
              console.error('Error al eliminar el producto');
              console.log(response)
            }
          })
          .catch(error => {
            console.error('Error en la petición DELETE:', error);
          });
    }
  
  return (
    <main className="eliminar-productos">
      <section className="table-container">
        <table>
          <caption>Restaurantes Registrados</caption>
          <thead>
            <tr>
              <th className="centrar opcional-id">No.</th>
              <th>Nombre</th>
              <th className="centrar">Imagen</th>
              <th className='opcional'>Plan</th>
              <th className='opcional'>Precio</th>
              <th>Ciudad</th>
              <th className='opcional'>País</th>
              <th className="centrar">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {productosAdmin.slice(
              (pagina - 1) * cantidadPorPagina,
              (pagina - 1) * cantidadPorPagina + cantidadPorPagina
            ).map((productoActual,i) => {
                return(
                <tr key={i}>
                    <td className='opcional-id'>{productoActual.id}</td>
                    <td>
                        <Link to={'/detalle/'+productoActual.id} style={{ textDecoration: 'none' }}>
                            {productoActual.nombre}
                        </Link>
                    </td>
                    <td className='imagen-table'>
                        <img src={productoActual.imagen} alt="" />
                    </td>
                    <td className='opcional'>{productoActual.plan.nombre}</td>
                    <td className='opcional'>{productoActual.precio}</td>
                    <td>{productoActual.domicilio.ciudad}</td>
                    <td className='opcional'>{productoActual.domicilio.pais.nombre}</td>
                    <td onClick={() => eliminarProducto(productoActual.id)} className='button'><button><TiDelete/></button></td>
                </tr>)
            })}
          </tbody>
        </table>
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
      </section>
    </main>
  )
}

export default EliminarProducto