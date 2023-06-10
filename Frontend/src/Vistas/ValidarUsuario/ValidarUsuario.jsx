import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import baseUrl from '../../utils/baseUrl.json'

import './validarUsuario.css'

import Swal from "sweetalert2";
import { red } from "@mui/material/colors";

const ValidarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const validarUsuario = async () => {
    try {
      Swal.fire({
        icon: 'info',
        title: 'Validando usuario...',
        text: 'Por favor espere',
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await fetch(
          `${baseUrl.url}/usuario/validar/${id}`,
          {
              method: 'PUT',
          }
      );

      if(response.ok){
          Swal.fire({
            icon: 'success',
            title: 'Usuario validado!',
            text: 'Ya puedes iniciar sesion',
            confirmButtonText: 'Iniciar sesion',
            confirmButtonColor: red[800],
          })
          .then((result) => {
            if (result.isConfirmed) {
              navigate('/login');
            }
          });

          return;
      }

      throw new Error(await response.text());
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...Algo salio mal!',
        text: error ? error : 'No se pudo validar el usuario. Refresque la pagina para volver a intentarlo',
        showConfirmButton: error === 'Error: La cuenta ya está validada',
        confirmButtonText: 'Volver a intentar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
        navigate('/login')
      });
    }

  }

  useEffect(() => {
    validarUsuario();
  })

  return <main className="validarUsuario">
  </main>
}

export default ValidarUsuario;
