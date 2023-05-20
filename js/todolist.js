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

function sumaPuntoFacil(n) {
  puntos += n;
  if (puntos <= 0) {
    puntos = 0;
  }
  console.log(puntos);
  actualizaContador();
}

function sumaPuntoNormal(n) {
  puntos += n;
  if (puntos <= 0) {
    puntos = 0;
  }
  console.log(puntos);
  actualizaContador();
}

function sumaPuntoDificil(n) {
  puntos += n;
  if (puntos <= 0) {
    puntos = 0;
  }
  console.log(puntos);
  actualizaContador();
}

// Check() se fija si hay contenido en el storage, ejecutando la funcion que solicita los datos del mismo
// y pone las tareas en sus respectivas categorias, de lo contrario define las arrays
function check() {
  const getListaDeTareas = JSON.parse(localStorage.getItem("listaDeTareas"));
  const getListaDeTareasCompletas = JSON.parse(
    localStorage.getItem("listaDeTareasCompletas")
  );
  const getPuntos = JSON.parse(localStorage.getItem("puntos"));
  if (getListaDeTareas != null || getListaDeTareasCompletas != null) {
    listaDeTareas = getListaDeTareas;
    listaDeTareasCompletas = getListaDeTareasCompletas;
    recargaDOM();
  } else {
    listaDeTareas = [];
    listaDeTareasCompletas = [];
  }
  if (getPuntos != null) {
    puntos = getPuntos;
    actualizaContador();
  } else {
    puntos = 0;
  }
}

// RecargaDOM() solicita los datos del storage y pone las tareas en sus respectivas categorias con la funcion newItem()
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
  console.log(listaDeTareas);
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
  const newTarea = new tarea(inputTarea.value, selectorDificultad.value);
  listaDeTareas.push(newTarea);
  newItem(true, newTarea, "on", listaTareas, true);
  inputTarea.focus();
  btnAgregar.reset();
  guardarEnLS();
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
  if (agregar) {
    item.append(deleteBtn);
  } else {
    item.append(deleteBtn);
    deleteBtn.style.display = "none";
  }
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

//Determina cuando aparece el botonde borrado de tareas completadas
function onOffDeleteBtn() {
  if (tareasCompletas.children.length > 0) {
    xBtn.style.display = "initial";
  } else {
    xBtn.style.display = "none";
  }
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
      if (item.classList.contains("Fácil")) {
        sumaPuntoFacil(1);
      }
      if (item.classList.contains("Normal")) {
        sumaPuntoNormal(2);
      }
      if (item.classList.contains("Difícil")) {
        sumaPuntoDificil(3);
      }
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
      if (item.classList.contains("Fácil")) {
        sumaPuntoFacil(-1);
      }
      if (item.classList.contains("Normal")) {
        sumaPuntoNormal(-2);
      }
      if (item.classList.contains("Difícil")) {
        sumaPuntoDificil(-3);
      }
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
  onOffDeleteBtn(); //CAMBIAR NOMBRE DE ESTA FUNCION A ONOFFDELETEALLBTN
}

export { check };
export { agregarTarea };
export { deleteAll };
export { actualizaContador };
