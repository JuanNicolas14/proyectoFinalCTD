import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import baseUrl from "../../utils/baseUrl.json";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';

const GestionCiudades = () => {
  const url = baseUrl.url + "/ciudades"
  const [ciudades, setCiudades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newNombreCiudad, setNewNombreCiudad] = useState("");
  const [ciudadId, setCiudadId] = useState("");
  const [nuevaCiudad, setNuevaCiudad] = useState({
    nombreCiudad: ""
  });

  useEffect(() => {
    fetchCiudades();
  }, []);

  const fetchCiudades = async () => {
    try {
      const response = await axios.get(url);
      setCiudades(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const agregarCiudad = async () => {
    try {
      const response= await axios.post(url, nuevaCiudad);
      console.log(response);
      Swal.fire("Éxito", "Ciudad agregada correctamente", "success");
      fetchCiudades();
      setNuevaCiudad({ nombreCiudad: "" });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Error al agregar la ciudad", "error");
    }
  };

  const eliminarCiudad = async (ciudadId) => {
    try {
      await axios.delete(`${url}/${ciudadId}`);
      fetchCiudades();
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModal = (ciudad) => {
    setNewNombreCiudad(ciudad.nombreCiudad);
    setCiudadId(ciudad.id);
    setShowModal(true);
  };

  const {token} = useContext(AuthContext)

  const modificarCiudadEnvio = {
    nombreCiudad: newNombreCiudad,
    id: ciudadId
  };

  const modificarCiudad = ()=>{
    fetch(url+`/${ciudadId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(modificarCiudadEnvio)
    })
      .then(response => {
        if (response.ok) {
          console.log("Ciudad actualizada exitosamente");
        } else {
          console.error("Error al actualizar la ciudad");
        }
      })
      .catch(error => {
        console.error("Error en la petición:", error);
      })
  }
  

  const renderCiudades = () => {
    useEffect(() => {
      fetchCiudades();
    }, [ciudades]);

    return (
      <>
        {ciudades.map((ciudad) => (
          <tr key={ciudad.id}>
            <td>{ciudad.id}</td>
            <td>{ciudad.nombreCiudad}</td>
            <td>
              <button onClick={() => eliminarCiudad(ciudad.id)}>Eliminar</button>
            </td>
            <td>
              <button onClick={() => abrirModal(ciudad)}>Modificar</button>
            </td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td>
            <input
              type="text"
              placeholder="Ingrese el nombre de la nueva ciudad"
              value={nuevaCiudad.nombreCiudad}
              onChange={(e) =>
                setNuevaCiudad({ nombreCiudad: e.target.value })
              }
            />
          </td>
          <td></td>
          <td>
            <button onClick={agregarCiudad}>Agregar</button>
          </td>
        </tr>
      </>
    );
  };


  return (
    <div>
      <h2>Ciudades</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{renderCiudades()}</tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modificar Ciudad</h3>
            <input
              type="text"
              value={newNombreCiudad}
              onChange={(e) => setNewNombreCiudad(e.target.value)}
            />
            <button onClick={modificarCiudad}>Guardar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionCiudades;

