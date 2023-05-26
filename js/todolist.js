const inputTarea = document.querySelector("#input-tarea");
const selectorDificultad = document.querySelector("#select-dificultad");
const btnAgregar = document.querySelector("#agregar-form");
const listaTareas = document.querySelector("#lista-tareas");
const tareasCompletas = document.querySelector("#tareas-completas");
const xBtn = document.querySelector("#deleteAll");
const contadorPuntos = document.querySelector(".contadorPuntos");
const btnComprarPoke = document.querySelector(".comprarPoke");

let listaDeTareas = [];
let listaDeTareasCompletas = [];

let puntos = 0;
let contador = document.createElement("h1");
function actualizaContador() {
  contador.innerText = "Puntos Disponibles: " + puntos;
  contadorPuntos.append(contador);
}

function sumaPunto(n) {
  puntos += n;
  puntos = puntos <= 0 ? 0 : puntos;
  puntosToast();
  actualizaContador();
}

function puntosToast() {
  Toastify({
    text: `Puntos Disponibles: ${puntos}`,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#3FB950",
      color: "black",
    },
    stopOnFocus: true,
  }).showToast();
}

// Check() se fija si hay contenido en el storage, ejecutando la funcion que solicita los datos del mismo
// y pone las tareas en sus respectivas categorias, de lo contrario define las arrays
function check() {
  const getListaDeTareas = JSON.parse(localStorage.getItem("listaDeTareas"));
  const getListaDeTareasCompletas = JSON.parse(
    localStorage.getItem("listaDeTareasCompletas")
  );
  const getPuntos = JSON.parse(localStorage.getItem("puntos"));
  if (getListaDeTareas != null) {
    listaDeTareas = getListaDeTareas;
    recargaDOM();
  } else {
    listaDeTareas = [];
  }
  if (getListaDeTareasCompletas != null) {
    listaDeTareasCompletas = getListaDeTareasCompletas;
  } else {
    listaDeTareasCompletas = [];
  }
  if (getPuntos != null) {
    puntos = getPuntos;
    actualizaContador();
  } else {
    puntos = 0;
  }
}

// solicita los datos del storage y pone las tareas en sus respectivas categorias con la funcion newItem()
function recargaDOM() {
  listaDeTareas.forEach((tarea) => {
    newItem(true, tarea, "on", listaTareas, true);
  });
  listaDeTareasCompletas.forEach((tarea) => {
    newItem(false, tarea, "completado", tareasCompletas, false);
  });
}

//Almacena las dos arrays en el storage
function guardarEnLS() {
  localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas));
  localStorage.setItem(
    "listaDeTareasCompletas",
    JSON.stringify(listaDeTareasCompletas)
  );
  localStorage.setItem("puntos", JSON.stringify(puntos));
}

class tarea {
  constructor(actividad, dificultad) {
    this.actividad = actividad;
    this.dificultad = dificultad;
  }
}

//Con los datos ingresados por el usuario crea un objeto que va al array listaDeTareas(tareas por completar),
// luego crea el item que va en el html con la funcion newItem()
function agregarTarea(e) {
  e.preventDefault();
  if (listaDeTareas.length === 10) {
    Swal.fire("No puedes tener mas de 10 tareas sin terminar!");
  } else {
    const newTarea = new tarea(inputTarea.value, selectorDificultad.value);
    listaDeTareas.push(newTarea);
    newItem(true, newTarea, "on", listaTareas, true);
    inputTarea.focus();
    btnAgregar.reset();
    guardarEnLS();
  }
}

// Funcion utilizada para determinar si la casilla de las tareas aparece marcada, o no, en el html
function checked(item, objetoTarea, noCheck = false) {
  if (noCheck) {
    item.innerHTML =
      objetoTarea.actividad +
      " (Dificultad : " +
      objetoTarea.dificultad +
      ") " +
      "<input class='form-check-input " +
      objetoTarea.dificultad +
      "' type='checkbox' name='asunto'></input>";
  } else {
    item.innerHTML =
      objetoTarea.actividad +
      " (Dificultad : " +
      objetoTarea.dificultad +
      ") " +
      "<input class='form-check-input " +
      objetoTarea.dificultad +
      "' type='checkbox' checked name='asunto'></input>";
  }
}

//Funcion utilizada para determinar si el boton de borrado individual de cada tarea aparece en el html
function addDeleteBtn(item, deleteBtn, agregar = true) {
  item.append(deleteBtn);
  deleteBtn.style.display = !agregar ? "none" : deleteBtn.style.display;
}

// Crea un boton para borrar todas las tareas completadas
function deleteAll() {
  const items = document.querySelectorAll("li.completado");
  items.forEach((item) => {
    item.remove();
  });
  listaDeTareasCompletas.forEach(() => {
    listaDeTareasCompletas.length = 0;
  });
  guardarEnLS();
  onOffDeleteBtn();
}

//Determina cuando aparece el boton de borrado de tareas completadas
function onOffDeleteBtn() {
  xBtn.style.display = tareasCompletas.children.length > 0 ? "initial" : "none";
}

// Crea un LI en el UL del html con la informacion de la tarea proporcionada por el usuario
// con casilla para marcar si la tarea esta completada o no y boton de borrado individual de tarea.
// La casilla determina si la tarea aparece completada de forma visual, en el DOM, en el array correspondiente
// y por consecuencia en el storage al igual que el boton de borrado individual de tarea
function newItem(checkCheck, objetoTarea, visibilidad, listaStorage, btn) {
  const item = document.createElement("li");
  item.classList.add(visibilidad);
  item.classList.add(objetoTarea.dificultad);
  checked(item, objetoTarea, checkCheck);
  const checkbox = item.querySelector("input[type='checkbox'] ");
  checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
      item.classList.add("completado");

      item.classList.contains("Fácil") ? sumaPunto(1) : undefined;
      item.classList.contains("Normal") ? sumaPunto(2) : undefined;
      item.classList.contains("Difícil") ? sumaPunto(3) : undefined;

      deleteBtn.style.display = "none";
      tareasCompletas.append(item);
      const tareaCompletada = listaDeTareas.splice(
        listaDeTareas.indexOf(objetoTarea),
        1
      )[0];
      listaDeTareasCompletas.push(tareaCompletada);
      guardarEnLS();
    } else {
      item.classList.remove("completado");
      item.classList.contains("Fácil") ? sumaPunto(-1) : undefined;
      item.classList.contains("Normal") ? sumaPunto(-2) : undefined;
      item.classList.contains("Difícil") ? sumaPunto(-3) : undefined;

      deleteBtn.style.display = "inline";
      listaTareas.append(item);
      const tareaIncompleta = listaDeTareasCompletas.splice(
        listaDeTareasCompletas.indexOf(objetoTarea),
        1
      )[0];
      listaDeTareas.push(tareaIncompleta);
      guardarEnLS();
    }
    onOffDeleteBtn();
  });
  onOffDeleteBtn();
  const deleteBtn = document.createElement("i");
  deleteBtn.className = "fa-solid fa-delete-left fa-2xl";
  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    item.remove(item);
    listaDeTareas.splice(
      listaDeTareas.findIndex((t) => t.actividad === objetoTarea.actividad),
      1
    )[0];
    guardarEnLS();
    onOffDeleteBtn();
  });
  addDeleteBtn(item, deleteBtn, btn);
  listaStorage.append(item);
  onOffDeleteBtn();
}

export { check };
export { agregarTarea };
export { deleteAll };
export { actualizaContador };
