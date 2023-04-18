let numLista = 1

//array de tareas del usuario
const tareas = [ ]

//objetos que van dentro del array
class toDoTarea {
    constructor(numLista, tarea, dificultad) {
        this.numLista = numLista
        this.tarea = tarea;
        this.dificultad = dificultad;
    }
}

//ordena las tareas del usuario en una string para mostrarselas en el ultimo alert
function listadorDeTareas(){
    let listadoDeTareas = "";
    for(let i = 0; i < tareas.length; i++){
    let listado = tareas[i];
    let tareasListadas = "\n" + listado.numLista + ".º tarea: " + listado.tarea + "\nNivel de Dificultad: " + listado.dificultad + "\n";
    listadoDeTareas += tareasListadas ;
    }
    return listadoDeTareas
}

//valida que los caracteres son ingrasados son letras
function validarLetras(letra) {
    let letraValida = /^[a-zA-Z]+$/;
    while (!letraValida.test(letra)) {
      letra = prompt("El dato ingresado no es válido, solo se permiten letras");
    }
    return letra;
  }
  

//valida que los caracteres ingresados son numeros y que esten en el rango solicitado
function validarNumeros(num, a, b){
    while (isNaN(num) || num < a || num > b ) {
        num = parseInt(prompt("El número ingresado no es válido. Ingresa un número del " + a + " al " + b))
    }
    return num;
}

// comienzo de la app
let nombre = prompt("¡Hola! ¿Cuál es tu nombre?");
nombre = validarLetras(nombre);
let numTareas = parseInt(prompt("¡Hola " + nombre + "! ¿Cuántas tareas tienes que realizar el día de hoy? Limite de tareas: 15"))
numTareas = validarNumeros(numTareas, 1, 15)

//si el numero de tareas es menor o igual que tres indica que es un dia ligero o de lo contrario un dia atareado
//el bucle while esta para que el primer prompt contenga el mensaje indicando si son muchas tareas o no 
if (numTareas <= 3) {
    let tarea = prompt("¡Entonces hoy tenemos un día ligero! ¿Cuál es la tarea n.º" + numLista + "?");
    let dificultad = parseInt(prompt("Del 1 al 5, ¿qué nivel de dificultad le das a esta tarea?"));
    dificultad = validarNumeros(dificultad, 1, 5)
    const toDo = new toDoTarea(numLista, tarea, dificultad)
    tareas.push(toDo);
    while (numLista < numTareas) {
        numLista++;
        tarea = prompt("¿La tarea n.º" + numLista + "?");
        let dificultad = parseInt(prompt("Del 1 al 5, ¿qué nivel de dificultad le das a esta tarea?"));
        dificultad = validarNumeros(dificultad, 1, 5)
        const toDo = new toDoTarea(numLista, tarea, dificultad)
        tareas.push(toDo);
    }
    listadoDeTareas = listadorDeTareas();
    alert("¡Acá están listadas todas las tareas! \n" + listadoDeTareas + "\n¡Que tengas un día muy productivo, " + nombre + "!" + "\n \n\n PD: Mas detalles en la consola.");
} else {
    let tarea = prompt("¿Un día movido? ¡Entonces hay que empezar con energías! ¿Cuál es la tarea n.º" + numLista + "?");
    let dificultad =  parseInt(prompt("Del 1 al 5, ¿qué nivel de dificultad le das a esta tarea?"));
    dificultad = validarNumeros(dificultad, 1, 5)
    const toDo = new toDoTarea(numLista, tarea, dificultad)
    tareas.push(toDo);
    while (numLista < numTareas) {
        numLista++;
        tarea = prompt("¿La tarea n.º" + numLista + "?");
        let dificultad =  parseInt(prompt("Del 1 al 5, ¿qué nivel de dificultad le das a esta tarea?"));
        dificultad = validarNumeros(dificultad, 1, 5)
        const toDo = new toDoTarea(numLista, tarea, dificultad)
        tareas.push(toDo);
    }
    listadoDeTareas = listadorDeTareas()
    alert("¡Acá están listadas todas las tareas! \n" + listadoDeTareas + "\n¡Que tengas un día muy productivo, " + nombre + "!" + "\n \n\n PD: Mas detalles en la consola.");
}

const usuario = {
    nombreUsuario : nombre,
    cantidadTareas : numTareas,
    listado : tareas,
}

// aca se enlistan algunos datos porporcionados por el usuario y almacenados en el objeto "usuario" + la variable listadoDeTareas 
// que contiene la string generada de la funcion listadorDeTareas
console.log("Usuario: " + usuario.nombreUsuario)
console.log("Cantidad de Tareas: " + usuario.cantidadTareas)
console.log("Lista de tareas:\n" + listadoDeTareas)
console.log(tareas)

//este es un enlistado de las tareas utilizando .forEach()
tareas.forEach((listar) => {
    console.log(listar.numLista + ".º tarea: " + listar.tarea)
});

// y este es un enlistado utilizando .map()
const listador = tareas.map ((toDoList) =>{
    return toDoList.numLista + ".º tarea: " + toDoList.tarea;
})

console.log (listador)