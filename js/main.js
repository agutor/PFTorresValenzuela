const inputTarea = document.querySelector("#input-tarea")
const selectorDificultad = document.querySelector("#select-dificultad")
const btnAgregar = document.querySelector("#agregar-form")
const listaTareas = document.querySelector("#lista-tareas")
const tareasCompletas = document.querySelector("#tareas-completas")
const aviso = document.querySelector("#aviso")


function agregarTarea(e) {
    e.preventDefault()
    const tarea = {
        actividad : inputTarea.value,
        dificultad : selectorDificultad.value
    }
    
    if(inputTarea.value != ""){
        let item = document.createElement("li")
        item.innerHTML = tarea.actividad + " (Dificultad : " + tarea.dificultad + ") " + "<input class='form-check-input' type='checkbox' name='asunto'></input>"
        
        let checkbox = item.querySelector("input[type='checkbox']");
        checkbox.addEventListener("click", function() {
            if (checkbox.checked) {
                item.classList.add("completado");
                tareasCompletas.append(item)
            } else {
                item.classList.remove("completado");
                listaTareas.append(item)
            }
        })
        listaTareas.append(item)
        inputTarea.focus()
        btnAgregar.reset()}
    else{
        aviso.innerText = "campo vacio"
    }
}

btnAgregar.addEventListener("submit", agregarTarea)