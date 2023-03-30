let tarea = 1;
function listador(){
    tarea++;
    while (tarea <= numTareas) {
        lista = prompt("¿La tarea n.º" + tarea + "?");
        console.log(tarea + ".º tarea: " + lista);
        tarea++;
    }
    alert("¡Ya están listadas todas las tareas! ¡Que tengas un día muy productivo, " + nombre + "!");
}



let nombre = prompt("¡Hola! ¿Cuál es tu nombre?");
while (!/^[a-zA-Z]+$/.test(nombre)) {
    nombre = prompt("El nombre ingresado no es válido, solo se permiten letras");
} 

let numTareas = parseInt(prompt("¡Hola " + nombre + "! ¿Cuántas tareas tienes que realizar el día de hoy?"));
while (isNaN(numTareas) || numTareas <= 0) {
    if (isNaN (numTareas)){
        numTareas = parseInt(prompt("Debes ingresar el número de tareas"));
    } else (numTareas >=0);{
        numTareas = parseInt(prompt("Debes ingresar un número válido de tareas"));
    }
}

if (numTareas <= 3) {
    let lista = prompt("¡Entonces hoy tenemos un día ligero! ¿Cuál es la tarea n.º" + tarea + "?");
    console.log(tarea + ".º tarea: " + lista);
    listador();
} else {
    let lista = prompt("¿Un día movido? ¡Entonces hay que empezar con energías! ¿Cuál es la tarea n.º" + tarea + "?");
    console.log(tarea + ".º tarea: " + lista);
    listador();
}





