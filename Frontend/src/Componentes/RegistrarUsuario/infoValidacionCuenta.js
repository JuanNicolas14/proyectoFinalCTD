import ReactDomServer from 'react-dom/server';
import baseUrl from '../../utils/baseUrl.json';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import errorDemasiadosIntentos from './errorDemasiadosIntentos';

const infoValidacionCuenta = (data, setRegistroData, retriesData) => {
  let { retries, initialTime } = retriesData;

  const errorToast = () => {
    Swal.fire({
      title: 'Error',
      text: 'Ha ocurrido un error al reenviar el correo de validación.',
      icon: 'error',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#d33',
      toast: true,
      position: 'top-end',
      timer: 5000,
      timerProgressBar: true,
    })

    return false;
  }

  const html = `
    <div style="text-align: left;">
      <p><b>${data.nombre + " " + data.apellido}</b>, recuerda validar tu cuenta.</p>
      <p>Se ha enviado un correo electrónico a <b>${data.email}</b> con un enlace para validar tu cuenta.</p>
      <p>Si no encuentras el correo electrónico, revisa tu carpeta de spam.</p>
    </div>
    `;

  Swal.fire({
    title: 'Validación de cuenta',
    html: html,
    icon: 'info',
    showConfirmButton: true,
    confirmButtonText: 'Re-enviar correo',
    confirmButtonColor: '#3085d6',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cerrar',
    position: 'center',
    preConfirm: async () => {
      try {
        // Evitamos mas de 3 re-envios en menos de 1 minuto
        const diff = (Date.now() - initialTime) / 1000;
        if (retries >= 3 && diff < 60) {
          return errorDemasiadosIntentos(data, setRegistroData, { retries, initialTime });
        } else if (diff > 60) {
          initialTime = Date.now();
          retries = 0;
        }

        // Reenviamos el correo
        try {
          await fetch(baseUrl.url + `/mail/validacion/${data.id}`)
          retries++;
        } catch (error) {
          errorToast();
          return infoValidacionCuenta(data, setRegistroData, { retries, initialTime });
        }
        return false
      } catch (error) {
        errorToast();
        return infoValidacionCuenta(data, setRegistroData, { retries, initialTime });
      }
    }
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        return;
      }

      if (result.isDismissed) {
        setRegistroData({
          nombre: '',
          apellido: '',
          email: '',
          password: '',
          confirmarPassword: ''
        })
        window.location.href = '/login';
      }
    })
    .catch((err) => {
      errorToast();
      return infoValidacionCuenta(data, setRegistroData, { retries, initialTime });
    })

  return;
}

export default infoValidacionCuenta;
