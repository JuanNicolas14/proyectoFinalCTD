import React, {useContext, useState} from 'react'
import './agregarRol.css'
import axios from 'axios';
/*Herramientas */
import Swal from 'sweetalert2';
import ErrorPage from '../../Componentes/ErrorPage/ErrorPage';
import { AuthContext } from '../../utils/AuthContext';
import baseUrl from '../../utils/baseUrl.json'
import { useEffect } from 'react';

const AgregarRol = () => {
    const urlRoles = baseUrl.url + "/rol"
    const urlPermisos = baseUrl.url + "/permiso"
    //Estado global
    const {user,token} = useContext(AuthContext)

    const [rol, setRol] = useState({
      rol: '',
      permisos: []
    })

    const [roles, setRoles] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
      fetchRoles();
      fetchPermisos()
      console.log(permisos);
    }, []);
  
    const fetchRoles = async () => {
      try {
        const response = await fetch(urlRoles, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        } else {
          throw new Error('Error al obtener la lista de roles');
        }
      } catch (error) {
        console.error('Error al obtener la lista de roles:', error);
      }
    };
    
    const fetchPermisos = async () => {
      try {
        const response = await fetch(urlPermisos, {
          headers: {
            'Authorization': `Bearer ${token}`,
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
  
    const handlePermissionChange = (permission, isChecked) => {
      if (isChecked) {
        setSelectedPermissions([...selectedPermissions, permission]);
      } else {
        setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const data = {
          rol: rol.rol,
          permisos: selectedPermissions
        };
      
        try {
          const response = await fetch(urlRoles+"/agregar", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
              // El envío de datos fue exitoso
              console.log('Datos enviados correctamente');
              Swal.fire(
                {
                  title: 'Rol Guardado Correctamente',
                  text: `Rol: ${rol.rol}, ha sido agregado con éxito.`,
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Aceptar',
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/administracion';
                }
              })
          } else {
              // Ocurrió un error al enviar los datos
              console.error('Error al enviar los datos');
          }
      } catch (error) {
      console.error('Error en la conexión', error);
      }
  }

  return (
    <main className="agregar-rol">
        {user.rol == "ADMIN" || user.permisos.includes("CREAR ROL")
        ? (
          <section className="form-rol">
            <h2>Agregar Rol</h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                className='nombre-rol'
                type="text"
                id="nombre"
                value={rol.rol}
                onChange={(event) => setRol({ ...rol, rol: event.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="permisos"> Selecciona permisos:</label>
                {permisos.map((permission) => (
                  <div className='permiso' key={permission.id}>
                      <input
                        className='checkbox-rol'
                        type="checkbox"
                        value={permission.nombre}
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

export default AgregarRol