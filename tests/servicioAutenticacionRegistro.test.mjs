import assert from "node:assert/strict";
import test from "node:test";
import { ServicioAutenticacion } from "../src/services/ServicioAutenticacion.mjs";

function crearServicioConAlmacenamientoVacio() {
  let cantidadGuardados = 0;
  let ultimoEstadoGuardado = null;
  let siguienteId = 0;
  let estadoActual = {
    clientes: [],
    productos: [],
    movimientos: [],
    transaccionesTarjeta: [],
  };
  const almacenamiento = {
    cargar() {
      return estadoActual;
    },
    guardar(estado) {
      cantidadGuardados += 1;
      ultimoEstadoGuardado = estado;
      estadoActual = estado;
    },
  };
  const servicio = new ServicioAutenticacion({
    almacenamiento,
    generadorId: () => `id-${++siguienteId}`,
    reloj: () => new Date("2026-10-16T12:00:00"),
  });

  return {
    servicio,
    obtenerCantidadGuardados: () => cantidadGuardados,
    obtenerUltimoEstadoGuardado: () => ultimoEstadoGuardado,
  };
}

const datosValidos = {
  numeroIdentificacion: "001234",
  nombreCompleto: "María José",
  celular: "0300456",
  usuario: "maria",
  contrasena: "clave-segura",
  confirmacionContrasena: "clave-segura",
  saldoAhorros: "0",
  saldoCorriente: "0",
  limiteCredito: "0",
};

const casosInvalidos = [
  ["rechaza números en el nombre", { nombreCompleto: "María2" }],
  ["rechaza puntuación en el nombre", { nombreCompleto: "María-José" }],
  ["rechaza espacios en la identificación antes de recortarla", { numeroIdentificacion: " 001234 " }],
  ["rechaza separadores en la identificación", { numeroIdentificacion: "00-1234" }],
  ["rechaza letras en el celular", { celular: "300ABC" }],
  ["rechaza separadores en el celular", { celular: "300 4567" }],
];

test("registra datos personales válidos y conserva ceros iniciales", () => {
  const { servicio, obtenerCantidadGuardados, obtenerUltimoEstadoGuardado } =
    crearServicioConAlmacenamientoVacio();

  const resultado = servicio.registrar(datosValidos);
  const estadoGuardado = obtenerUltimoEstadoGuardado();

  assert.equal(obtenerCantidadGuardados(), 1);
  assert.equal(estadoGuardado.clientes.length, 1);
  assert.equal(estadoGuardado.productos.length, 3);
  assert.equal(estadoGuardado.clientes[0].nombreCompleto, "María José");
  assert.equal(estadoGuardado.clientes[0].numeroIdentificacion, "001234");
  assert.equal(estadoGuardado.clientes[0].celular, "0300456");
  assert.equal(resultado.productoIds.length, 3);
});

test("conserva la validación de campos obligatorios", () => {
  const { servicio, obtenerCantidadGuardados } = crearServicioConAlmacenamientoVacio();

  assert.throws(
    () => servicio.registrar({ ...datosValidos, nombreCompleto: "" }),
    /Completa todos los datos obligatorios/,
  );
  assert.equal(obtenerCantidadGuardados(), 0);
});

test("conserva la unicidad de identificación y usuario", () => {
  const { servicio, obtenerCantidadGuardados } = crearServicioConAlmacenamientoVacio();
  servicio.registrar(datosValidos);

  assert.throws(
    () => servicio.registrar({ ...datosValidos, usuario: "otro-usuario" }),
    /ya están registrados/,
  );
  assert.throws(
    () => servicio.registrar({ ...datosValidos, numeroIdentificacion: "001235" }),
    /ya están registrados/,
  );
  assert.equal(obtenerCantidadGuardados(), 1);
});

for (const [descripcion, cambios] of casosInvalidos) {
  test(`registrar ${descripcion} sin guardar`, () => {
    const { servicio, obtenerCantidadGuardados } = crearServicioConAlmacenamientoVacio();

    assert.throws(
      () => servicio.registrar({ ...datosValidos, ...cambios }),
      /admite/,
    );
    assert.equal(obtenerCantidadGuardados(), 0);
  });
}