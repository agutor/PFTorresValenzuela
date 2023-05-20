const inputTarea = document.querySelector("#input-tarea");
const selectorDificultad = document.querySelector("#select-dificultad");
const btnAgregar = document.querySelector("#agregar-form");
const listaTareas = document.querySelector("#lista-tareas");
const tareasCompletas = document.querySelector("#tareas-completas");
const xBtn = document.querySelector("#deleteAll");
const contadorPuntos = document.querySelector(".contadorPuntos");
const btnComprarPoke = document.querySelector(".comprarPoke");

////////////////////Aca esta el sistema de puntos//////////////////
import {
  actualizaContador,
  check,
  agregarTarea,
  deleteAll,
} from "./todolist.js";
actualizaContador();

check();
btnAgregar.addEventListener("submit", agregarTarea);
xBtn.addEventListener("click", deleteAll);

// Tenia la intencion de filtrar las tareas por la dificultad asignada, pero mi idea es implementar un sistema de puntos
// basando los mismos en la dificultad de cada tarea/habito.
// En este momento crei mas conveniente centrarme en la funcionalidad de la aplicacion.
