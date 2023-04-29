const inputTarea = document.querySelector("#input-tarea")
const selectorDificultad = document.querySelector("#select-dificultad")
const btnAgregar = document.querySelector("#agregar-form")
const listaTareas = document.querySelector("#lista-tareas")
const tareasCompletas = document.querySelector("#tareas-completas")
const xBtn =  document.querySelector("#deleteAll")


function agregarTarea(e) {
    e.preventDefault()
    const deleteBtn = document.createElement("i");
    deleteBtn.className = "fa-solid fa-delete-left fa-2xl";
    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        item.remove(item);
        onOffDeleteBtn()
    });
    const tarea = {
        actividad: inputTarea.value,
        dificultad: selectorDificultad.value,
    }
    let item = document.createElement("li")
    item.innerHTML = tarea.actividad + " (Dificultad : " + tarea.dificultad + ") " + "<input class='form-check-input' type='checkbox' name='asunto'></input>";
    let checkbox = item.querySelector("input[type='checkbox']");
    checkbox.addEventListener("click", function () {
        if (checkbox.checked) {
            item.classList.add("completado");
            deleteBtn.style.display = "none"
            tareasCompletas.append(item)
        } else {
            item.classList.remove("completado");
            deleteBtn.style.display = "inline"
            listaTareas.append(item)
        }
        onOffDeleteBtn()
    })
    onOffDeleteBtn()
    item.append(deleteBtn)
    listaTareas.append(item)
    inputTarea.focus()
    btnAgregar.reset()
    
}

function deleteAll(){
    const items = document.querySelectorAll("li.completado");
    items.forEach((item) => {
        item.remove();
    });
    onOffDeleteBtn()
}

function onOffDeleteBtn(){
    if (tareasCompletas.children.length > 0) {
        xBtn.style.display = "initial";
    } else{
        xBtn.style.display = "none";
    }
}



btnAgregar.addEventListener("submit", agregarTarea)
xBtn.addEventListener("click", deleteAll)