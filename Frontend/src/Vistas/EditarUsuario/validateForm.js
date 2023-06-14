const validateForm = (usuario, setErrors) => {
  let validationErrors = {};

  // Validar nombre
  if (!usuario.nombre) {
    validationErrors.nombre = '* Ingrese su nombre';
  } else if (usuario.nombre.length < 4) {
    validationErrors.nombre = '* Ingrese un nombre válido';
  }

  // Validar apellido
  if (!usuario.apellido) {
    validationErrors.apellido = '* Ingrese su apellido';
  } else if (usuario.apellido.length < 4) {
    validationErrors.apellido = '* Ingrese un apellido válido';
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!usuario.email) {
    validationErrors.email = '* Ingrese su correo electrónico';
  } else if (!emailRegex.test(usuario.email)) {
    validationErrors.email = '* Ingrese un correo electrónico válido';
  }

  setErrors(validationErrors);

  return Object.keys(validationErrors).length === 0;
};

export default validateForm;
