import assert from "node:assert/strict";
import test from "node:test";
import { validarDatosPersonales } from "../src/utils/ValidacionRegistro.mjs";

test("acepta letras Unicode y espacios en el nombre y dígitos con ceros iniciales", () => {
  assert.deepEqual(
    validarDatosPersonales({
      nombreCompleto: "María José Muñoz",
      numeroIdentificacion: "001234",
      celular: "0300456",
    }),
    {},
  );
});

test("acepta nombres con acentos representados en forma Unicode descompuesta", () => {
  assert.deepEqual(
    validarDatosPersonales({
      nombreCompleto: "Jose\u0301 Luis",
      numeroIdentificacion: "001234",
      celular: "0300456",
    }),
    {},
  );
});

test("rechaza números y puntuación en el nombre", () => {
  assert.equal(
    validarDatosPersonales({ nombreCompleto: "María2" }).nombreCompleto,
    "El nombre solo admite letras y espacios.",
  );
  assert.equal(
    validarDatosPersonales({ nombreCompleto: "María-José" }).nombreCompleto,
    "El nombre solo admite letras y espacios.",
  );
});

test("rechaza caracteres que no sean dígitos ASCII en identificación y celular", () => {
  assert.equal(
    validarDatosPersonales({ numeroIdentificacion: "12 34" }).numeroIdentificacion,
    "El número de identificación solo admite dígitos del 0 al 9.",
  );
  assert.equal(
    validarDatosPersonales({ numeroIdentificacion: "١٢٣" }).numeroIdentificacion,
    "El número de identificación solo admite dígitos del 0 al 9.",
  );
  assert.equal(
    validarDatosPersonales({ celular: "+57-300" }).celular,
    "El celular solo admite dígitos del 0 al 9.",
  );
});

test("deja los campos vacíos a la validación obligatoria existente", () => {
  assert.deepEqual(
    validarDatosPersonales({
      nombreCompleto: "",
      numeroIdentificacion: "",
      celular: "",
    }),
    {},
  );
});