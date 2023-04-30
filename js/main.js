const inputTarea = document.querySelector("#input-tarea")
const selectorDificultad = document.querySelector("#select-dificultad")
const btnAgregar = document.querySelector("#agregar-form")
const listaTareas = document.querySelector("#lista-tareas")
const tareasCompletas = document.querySelector("#tareas-completas")
const xBtn = document.querySelector("#deleteAll")




// const getListaDeTareas = JSON.parse(localStorage.getItem("listaDeTareas"))
// const getListaDeTareasCompletas = JSON.parse(localStorage.getItem("listaDeTareasCompletas"))

function check(){
    const getListaDeTareas = JSON.parse(localStorage.getItem("listaDeTareas"))
    const getListaDeTareasCompletas = JSON.parse(localStorage.getItem("listaDeTareasCompletas"))    
    if(getListaDeTareas != null || getListaDeTareasCompletas != null){
        listaDeTareas = getListaDeTareas
        listaDeTareasCompletas = getListaDeTareasCompletas
        recargaDOM()
    }
    else{
        listaDeTareas = [ ]
        listaDeTareasCompletas = [ ]
    }
}

function guardarEnLS() {
    localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas))
    localStorage.setItem("listaDeTareasCompletas", JSON.stringify(listaDeTareasCompletas))
}
check()
function recargaDOM(){
    listaDeTareas.forEach((tarea) => {
        const item = document.createElement("li");
        item.innerHTML =
            tarea.actividad +
            " (Dificultad : " +
            tarea.dificultad +
            ") " +
            "<input class='form-check-input' type='checkbox' name='asunto'></input>";
        let checkbox = item.querySelector("input[type='checkbox']");
        checkbox.addEventListener("click", function () {
            if (checkbox.checked) {
                item.classList.add("completado");
                deleteBtn.style.display = "none"
                tareasCompletas.append(item)
    
                // Mover la tarea de listaDeTareas a listaDeTareasCompletas
                const tareaCompletada = listaDeTareas.splice(listaDeTareas.indexOf(tarea), 1)[0];
                listaDeTareasCompletas.push(tareaCompletada);
                guardarEnLS()
                console.log(listaDeTareasCompletas)
            } else {
                item.classList.remove("completado");
                deleteBtn.style.display = "inline"
                listaTareas.append(item)
                // Mover la tarea de listaDeTareasCompletas a listaDeTareas
                const tareaIncompleta = listaDeTareasCompletas.splice(listaDeTareasCompletas.indexOf(tarea), 1)[0];
                listaDeTareas.push(tareaIncompleta);
                guardarEnLS()
                console.log(listaDeTareas)
            }
            onOffDeleteBtn();
        });
        const deleteBtn = document.createElement("i");
        deleteBtn.className = "fa-solid fa-delete-left fa-2xl";
        deleteBtn.addEventListener("click", (e) => {
            const item = e.target.parentElement;
            item.remove(item);
            listaDeTareas.splice(
                listaDeTareas.findIndex((t) => t.actividad === tarea.actividad),
                1
            )[0];
            onOffDeleteBtn();
            guardarEnLS()
        });
        item.append(deleteBtn);
        listaTareas.append(item);
        onOffDeleteBtn();
    });
    

    listaDeTareasCompletas.forEach((tarea) => {
        const item = document.createElement("li");
        item.classList.add("completado")
        item.innerHTML =
            tarea.actividad +
            " (Dificultad : " +
            tarea.dificultad +
            ") " +
            "<input class='form-check-input' type='checkbox' checked name='asunto'></input>";
        let checkbox = item.querySelector("input[type='checkbox']");
        checkbox.addEventListener("click", function () {
            if (checkbox.checked) {
                item.classList.add("completado");
                deleteBtn.style.display = "none"
                tareasCompletas.append(item)
    
                // Mover la tarea de listaDeTareas a listaDeTareasCompletas
                const tareaCompletada = listaDeTareas.splice(listaDeTareas.indexOf(tarea), 1)[0];
                listaDeTareasCompletas.push(tareaCompletada);
                guardarEnLS()
            } else {
                item.classList.remove("completado");
                deleteBtn.style.display = "inline"
                listaTareas.append(item)
                item.append(deleteBtn)
                // Mover la tarea de listaDeTareasCompletas a listaDeTareas
                const tareaIncompleta = listaDeTareasCompletas.splice(listaDeTareasCompletas.indexOf(tarea), 1)[0];
                listaDeTareas.push(tareaIncompleta);
                guardarEnLS()
            }
            onOffDeleteBtn();
        });
        const deleteBtn = document.createElement("i");
        deleteBtn.className = "fa-solid fa-delete-left fa-2xl";
        deleteBtn.addEventListener("click", (e) => {
            const item = e.target.parentElement;
            item.remove(item);
            listaDeTareas.splice(
                listaDeTareas.findIndex((t) => t.actividad === tarea.actividad),
                1
            )[0];
            onOffDeleteBtn();
            guardarEnLS()
        });
        ;
        tareasCompletas.append(item);
        onOffDeleteBtn();
        guardarEnLS()
    });
} 


function agregarTarea(e) {
    e.preventDefault()
    const deleteBtn = document.createElement("i");
    deleteBtn.className = "fa-solid fa-delete-left fa-2xl";
    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        item.remove(item)
        listaDeTareas.splice(listaDeTareas.findIndex(t => t.actividad === tarea.actividad), 1)[0];
        guardarEnLS();
        onOffDeleteBtn();
    });
    const tarea = {
        actividad: inputTarea.value,
        dificultad: selectorDificultad.value,
    }
    listaDeTareas.push(tarea)
    let item = document.createElement("li")
    item.innerHTML = tarea.actividad + " (Dificultad : " + tarea.dificultad + ") " + "<input class='form-check-input' type='checkbox' name='asunto'></input>";
    let checkbox = item.querySelector("input[type='checkbox']");
    checkbox.addEventListener("click", function () {
        if (checkbox.checked) {
            item.classList.add("completado");
            deleteBtn.style.display = "none"
            tareasCompletas.append(item)

            // Mover la tarea de listaDeTareas a listaDeTareasCompletas
            const tareaCompletada = listaDeTareas.splice(listaDeTareas.indexOf(tarea), 1)[0];
            listaDeTareasCompletas.push(tareaCompletada);
            guardarEnLS()
        } else {
            item.classList.remove("completado");
            deleteBtn.style.display = "inline"
            listaTareas.append(item)
            // Mover la tarea de listaDeTareasCompletas a listaDeTareas
            const tareaIncompleta = listaDeTareasCompletas.splice(listaDeTareasCompletas.indexOf(tarea), 1)[0];
            listaDeTareas.push(tareaIncompleta);
            guardarEnLS()
        }
        onOffDeleteBtn()
    })
    onOffDeleteBtn()


    item.append(deleteBtn)
    listaTareas.append(item)
    inputTarea.focus()
    btnAgregar.reset()
    guardarEnLS()
    console.log(listaDeTareas)
    console.log(listaDeTareasCompletas)
}

function deleteAll() {
    const items = document.querySelectorAll("li.completado");
    items.forEach((item) => {
        item.remove();
    });
    listaDeTareasCompletas.forEach(() => {
        listaDeTareasCompletas.length = 0;
    });
    guardarEnLS()
    onOffDeleteBtn();
}

function onOffDeleteBtn() {
    if (tareasCompletas.children.length > 0) {
        xBtn.style.display = "initial";
    } else {
        xBtn.style.display = "none";
    }
}


btnAgregar.addEventListener("submit", agregarTarea)
xBtn.addEventListener("click", deleteAll)