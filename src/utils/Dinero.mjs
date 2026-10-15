const formatoCop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function parsearCentavosNoNegativos(valor) {
  if (typeof valor === "string" && valor.trim() === "") {
    throw new TypeError("Ingresa un valor numérico.");
  }

  const cantidad = typeof valor === "number" ? valor : Number(valor);
  if (!Number.isFinite(cantidad) || cantidad < 0) {
    throw new RangeError("El valor debe ser numérico y no negativo.");
  }

  return Math.round(cantidad * 100);
}

export function parsearCentavosPositivos(valor) {
  const centavos = parsearCentavosNoNegativos(valor);
  if (centavos <= 0) {
    throw new RangeError("El valor debe ser mayor que cero.");
  }

  return centavos;
}

export function validarCentavosNoNegativos(centavos) {
  if (!Number.isSafeInteger(centavos) || centavos < 0) {
    throw new RangeError("El valor en centavos debe ser un entero no negativo.");
  }

  return centavos;
}

export function formatearCentavos(centavos) {
  if (!Number.isSafeInteger(centavos)) {
    throw new RangeError("El saldo en centavos debe ser un entero seguro.");
  }
  return formatoCop.format(centavos / 100);
}

export function redondearAcentavos(cantidad) {
  if (!Number.isFinite(cantidad) || cantidad < 0) {
    throw new RangeError("El valor para redondear debe ser no negativo.");
  }

  return Math.round(cantidad * 100);
}
