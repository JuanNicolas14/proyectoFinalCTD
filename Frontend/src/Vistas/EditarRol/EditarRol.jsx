import React, {useContext, useState} from 'react'
import './EditarRol.css'
import axios from 'axios';
/*Herramientas */
import Swal from 'sweetalert2';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage';
import { AuthContext } from '../../utils/AuthContext';
import baseUrl from '../../utils/baseUrl.json'
import { useEffect } from 'react';
import { useParams } from 'react-router';

const EditarRol = () => {
    const { id } = useParams();
    const urlRolId = baseUrl.url + "/rol/"+id
    const urlPermisos = baseUrl.url + "/permiso"
    
    //Estado global
    const {user,token} = useContext(AuthContext)

    const [permisos, setPermisos] = useState([]);
    const [rolEncontrado, setRolEncontrado] = useState(null);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
      fetchRol()
      fetchPermisos()
      
    }, []);

    useEffect(() => {
      console.log(permisos);
      console.log(rolEncontrado);
      console.log("Permisos del rol");
      console.log(selectedPermissions);
    }, [permisos,rolEncontrado,selectedPermissions]);
  
    const fetchPermisos = async () => {
      try {
        const response = await fetch(urlPermisos, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
          const data = await response.json();
          setPermisos(data);
        } else {
          throw new Error('Error al obtener la lista de permisos');
        }
      } catch (error) {
        console.error('Error al obtener la lista de permisos:', error);
      }
    };

    const fetchRol = async () => {
      try {
        const response = await fetch(urlRolId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRolEncontrado(data);
          setSelectedPermissions([...data.permisos]);
        } else {
          throw new Error('Error al obtener el rol');
        }
      } catch (error) {
        console.error('Error al obtener el rol:', error);
      }
    };    
  
    const handlePermissionChange = (permission, isChecked) => {
      if (isChecked) {
        setSelectedPermissions([...selectedPermissions, permission]);
      } else {
        setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
      }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const updatedRole = { ...rolEncontrado, permisos: selectedPermissions };
        const response = await fetch(baseUrl.url + '/rol/actualizar' + `/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(updatedRole),
        });
    
        if (response.ok) {
          // El envío de datos fue exitoso
          console.log('Datos enviados correctamente');
          Swal.fire({
            title: 'Rol Actualizado Correctamente',
            text: `Rol: ${rolEncontrado.rol}, ha sido actualizado con éxito.`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/administracion/gestionRol';
            }
          });
        } else {
          // Ocurrió un error al enviar los datos
          console.error('Error al enviar los datos');
          Swal.fire({
            icon: "error",
            title: "Error al actualizar el rol",
            text: "Por favor, inténtalo nuevamente",
          });
        }
      } catch (error) {
        console.error('Error al actualizar los permisos del rol:', error);
        // Mostrar mensaje de error
      }
    };
    


  return (
    <main className="editar-rol">
        {user.rol == "ADMIN" || user.permisos.includes("GESTIÓN ROL")
        ? (
          <section className="form-rol">
            <h2>Editar Rol</h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                className='nombre-rol'
                type="text"
                id="nombre"
                value={rolEncontrado?.rol}
                onChange={(event) => setRolEncontrado({ ...rolEncontrado, rol: event.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="permisos"> Permisos para el Rol:</label>
                {permisos.map((permission) => (
                  <div className='permiso' key={permission.id}>
                      <input
                        className='checkbox-rol'
                        type="checkbox"
                        value={permission?.nombre}
                        checked={selectedPermissions.includes(permission.nombre)}
                        onChange={(e) =>
                          handlePermissionChange(permission.nombre, e.target.checked)
                        }
                      />
                      {permission.nombre}
                      
                  </div>
                ))}
              </div>
              
  
              <button type="submit">Enviar</button>
            </form>
          </section>
        )
        : <ErrorPage mensaje="No cuentas con los permisos necesarios para ingresar a esta página." />
        }
    </main>
  )
}

export default EditarRol