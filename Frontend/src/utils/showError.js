import Swal from "sweetalert2";

import { GENERICO } from "./errorConstants";


const showError = (error = GENERICO) => {
  Swal.fire({
    title: "Error",
    text: error,
    icon: "error",
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    position: "top-end",
  });
};

export default showError;