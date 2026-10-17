const SOLO_LETRAS_Y_ESPACIOS = /^[\p{L} ]+$/u;
const SOLO_DIGITOS = /^[0-9]+$/;

function obtenerTexto(datos, campo) {
  return String(datos?.[campo] ?? "");
}

export function validarDatosPersonales(datos) {
  const errores = {};
  const nombreCompleto = obtenerTexto(datos, "nombreCompleto");
  const numeroIdentificacion = obtenerTexto(datos, "numeroIdentificacion");
  const celular = obtenerTexto(datos, "celular");

  if (nombreCompleto && !SOLO_LETRAS_Y_ESPACIOS.test(nombreCompleto.normalize("NFC"))) {
    errores.nombreCompleto = "El nombre solo admite letras y espacios.";
  }

  if (numeroIdentificacion && !SOLO_DIGITOS.test(numeroIdentificacion)) {
    errores.numeroIdentificacion = "El número de identificación solo admite dígitos del 0 al 9.";
  }

  if (celular && !SOLO_DIGITOS.test(celular)) {
    errores.celular = "El celular solo admite dígitos del 0 al 9.";
  }

  return errores;
}