import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Paginacion from '../../Componentes/Paginacion/Paginacion.jsx'
/*Url para hacer las peticiones */
import baseUrl from '../../utils/baseUrl.json'
/*Herramientas */
import {TiDelete} from 'react-icons/ti'
import Swal from 'sweetalert2';
/*Hoja de estilos */
import './eliminarProducto.css'
import { AuthContext } from '../../utils/AuthContext.jsx'
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage.jsx'

const EliminarProducto = () => {
    const {user} = useContext(AuthContext)

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
              Swal.fire(
                {
                  title: 'Producto Eliminado',
                  text: `Producto con ID: ${id} ha sido eliminado.`,
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Aceptar',
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              })
              // Realizar alguna acción adicional después de eliminar el producto
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
      {user.rol == "ADMIN" || user.permisos.includes("ELIMINAR PRODUCTO")
      ? (
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
                          <img src={productoActual.imagenes[0]} alt="" />
                      </td>
                      <td className='opcional'>{productoActual.plan}</td>
                      <td className='opcional'>{productoActual.precio}</td>
                      <td>{productoActual.ciudad}</td>
                      <td className='opcional'>{productoActual.pais}</td>
                      <td onClick={() => eliminarProducto(productoActual.id)} className='button'><button><TiDelete/></button></td>
                  </tr>)
              })}
            </tbody>
          </table>
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
        </section>
      )
      : <ErrorPage mensaje="No cuentas con los permisos necesarios para ingresar a esta página."/>
      }
      
      
    </main>
  )
}

export default EliminarProducto