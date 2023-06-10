const validateForm = (registroData, setErrors) => {
  let validationErrors = {};

  // Validar nombre
  if (!registroData.nombre) {
    validationErrors.nombre = '* Ingrese su nombre';
  } else if (registroData.nombre.length < 4) {
    validationErrors.nombre = '* Ingrese un nombre válido';
  }

  // Validar apellido
  if (!registroData.apellido) {
    validationErrors.apellido = '* Ingrese su apellido';
  } else if (registroData.apellido.length < 4) {
    validationErrors.apellido = '* Ingrese un apellido válido';
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!registroData.email) {
    validationErrors.email = '* Ingrese su correo electrónico';
  } else if (!emailRegex.test(registroData.email)) {
    validationErrors.email = '* Ingrese un correo electrónico válido';
  }

  // Validar contraseña
  if (!registroData.password) {
    validationErrors.password = '* Ingrese una contraseña';
  } else if (registroData.password.length < 5) {
    validationErrors.password = '* La contraseña debe tener al menos 5 caracteres';
  } else if (registroData.confirmarPassword !== registroData.password){
    validationErrors.confirmarPassword = '* Las contraseñas no coinciden';
  }

  setErrors(validationErrors);

  return Object.keys(validationErrors).length === 0;
};

export default validateForm;
