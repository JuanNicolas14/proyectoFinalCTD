import Swal from 'sweetalert2';
import infoValidacionCuenta from './infoValidacionCuenta';

const errorDemasiadosIntentos = (data, setRegistroData, retriesData) => {
  Swal.fire({
    title: 'Demasiados intentos',
    text: 'Por favor, espera un minuto antes de volver a intentarlo.',
    icon: 'error',
    confirmButtonText: 'Cerrar',
    confirmButtonColor: '#d33',
    position: 'center',
    timer: 5000,
    timerProgressBar: true,
  })
    .then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        infoValidacionCuenta(data, setRegistroData, retriesData);
      }
    }).catch((error) => {
      Swal.fire({
        title: 'Oops...Algo salió mal!',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d33',
        toast: true,
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
      })
      console.error(error);
      infoValidacionCuenta(data, setRegistroData, retriesData);
    });

  return false;
}

export default errorDemasiadosIntentos;
