const estadisticasPokedex = document.querySelector(".estadisticas-pokedex");
const contadorNormales = document.querySelector(".contador-normales");
const contadorHonor = document.querySelector(".contador-honor");
const contadorSuper = document.querySelector(".contador-super");
const contadorUltra = document.querySelector(".contador-ultra");
const contadorMaster = document.querySelector(".contador-master");
const contadorShinys = document.querySelector(".contador-shinys");
const puntosActuales = document.querySelector(".puntos-actuales");
const pokedexReset = document.querySelector(".pokedex-reset");

//desde el storage se solicitan datos para llevar cuanta de los pokemon obtenidos
function getPokemonObtenidos() {
  const getPokemonObtenidos = JSON.parse(
    localStorage.getItem("pokemonObtenidos")
  );
  if (getPokemonObtenidos != null) {
    let getShinyObtenido = JSON.parse(localStorage.getItem("shinyObtenido"));
    let pokedex = getPokemonObtenidos.length + getShinyObtenido;
    const h3EstadisticaPokedex = document.createElement("h3");
    h3EstadisticaPokedex.classList.add("contador");
    h3EstadisticaPokedex.innerHTML = ` Pokémon Capturados <img class="filtro filtro-normal" src="./img/6-pokeRandom.png" alt="pokeball"> : ${pokedex}/151`;
    estadisticasPokedex.append(h3EstadisticaPokedex);
  } else {
    let pokedex = 0;
    const h3EstadisticaPokedex = document.createElement("h3");
    h3EstadisticaPokedex.classList.add("contador");
    h3EstadisticaPokedex.innerHTML = ` Pokémon Capturados <img class="filtro filtro-normal" src="./img/6-pokeRandom.png" alt="pokeball"> : ${pokedex}/151`;
    estadisticasPokedex.append(h3EstadisticaPokedex);
  }
}
function getNormalObtenido() {
  let getNormalObtenido = JSON.parse(localStorage.getItem("normalObtenido"));
  if (getNormalObtenido != null) {
    const h3Normal = document.createElement("h3");
    h3Normal.classList.add("contador");
    h3Normal.innerHTML = ` Pokémon Normales Capturados <img class="filtro filtro-normal" src="./img/1-pokeBall.png" alt="pokeball"> : ${getNormalObtenido}/57`;
    contadorNormales.append(h3Normal);
  } else {
    getNormalObtenido = 0;
    const h3Normal = document.createElement("h3");
    h3Normal.classList.add("contador");
    h3Normal.innerHTML = ` Pokémon Normales Capturados <img class="filtro filtro-normal" src="./img/1-pokeBall.png" alt="pokeball"> : ${getNormalObtenido}/57`;
    contadorNormales.append(h3Normal);
  }
}
function getHonorObtenido() {
  let getHonorObtenido = JSON.parse(localStorage.getItem("honorObtenido"));
  if (getHonorObtenido != null) {
    const h3Honor = document.createElement("h3");
    h3Honor.classList.add("contador");
    h3Honor.innerHTML = ` Pokémon Honor Capturados <img class="filtro " src="./img/2-honorBall.png" alt="honorball"> : ${getHonorObtenido}/52`;
    contadorHonor.append(h3Honor);
  } else {
    getHonorObtenido = 0;
    const h3Honor = document.createElement("h3");
    h3Honor.classList.add("contador");
    h3Honor.innerHTML = ` Pokémon Honor Capturados <img class="filtro " src="./img/2-honorBall.png" alt="honorball"> : ${getHonorObtenido}/52`;
    contadorHonor.append(h3Honor);
  }
}
function getSuperObtenido() {
  let getSuperObtenido = JSON.parse(localStorage.getItem("superObtenido"));
  if (getSuperObtenido != null) {
    const h3Super = document.createElement("h3");
    h3Super.classList.add("contador");
    h3Super.innerHTML = ` Pokémon Super Capturados <img class="filtro " src="./img/3-superBall.png" alt="superball"> : ${getSuperObtenido}/26`;
    contadorSuper.append(h3Super);
  } else {
    getSuperObtenido = 0;
    const h3Super = document.createElement("h3");
    h3Super.classList.add("contador");
    h3Super.innerHTML = ` Pokémon Super Capturados <img class="filtro " src="./img/3-superBall.png" alt="superball"> : ${getSuperObtenido}/26`;
    contadorSuper.append(h3Super);
  }
}
function getUltraObtenido() {
  let getUltraObtenido = JSON.parse(localStorage.getItem("ultraObtenido"));
  if (getUltraObtenido != null) {
    const h3Ultra = document.createElement("h3");
    h3Ultra.classList.add("contador");
    h3Ultra.innerHTML = ` Pokémon Ultra Capturados <img class="filtro " src="./img/4-ultraBall.png" alt="Ultraball"> : ${getUltraObtenido}/11`;
    contadorUltra.append(h3Ultra);
  } else {
    getUltraObtenido = 0;
    const h3Ultra = document.createElement("h3");
    h3Ultra.classList.add("contador");
    h3Ultra.innerHTML = ` Pokémon Ultra Capturados <img class="filtro " src="./img/4-ultraBall.png" alt="Ultraball"> : ${getUltraObtenido}/11`;
    contadorUltra.append(h3Ultra);
  }
}

function getMasterObtenido() {
  let getMasterObtenido = JSON.parse(localStorage.getItem("masterObtenido"));
  if (getMasterObtenido != null) {
    const h3Master = document.createElement("h3");
    h3Master.classList.add("contador");
    h3Master.innerHTML = ` Pokémon Master Capturados <img class="filtro " src="./img/5-masterBall.png" alt="Masterball"> : ${getMasterObtenido}/5`;
    contadorMaster.append(h3Master);
  } else {
    getMasterObtenido = 0;
    const h3Master = document.createElement("h3");
    h3Master.classList.add("contador");
    h3Master.innerHTML = ` Pokémon Master Capturados <img class="filtro " src="./img/5-masterBall.png" alt="Masterball"> : ${getMasterObtenido}/5`;
    contadorMaster.append(h3Master);
  }
}
function getShinyObtenido() {
  let getShinyObtenido = JSON.parse(localStorage.getItem("shinyObtenido"));
  if (getShinyObtenido != null) {
    const h3Shiny = document.createElement("h3");
    h3Shiny.classList.add("contador");
    h3Shiny.innerHTML = ` Pokémon Shiny Capturados <img class="filtro " src="./img/7-shinyPokeBall.png" alt="shinyball"> : ${getShinyObtenido}/151`;
    contadorShinys.append(h3Shiny);
  } else {
    getShinyObtenido = 0;
    const h3Shiny = document.createElement("h3");
    h3Shiny.classList.add("contador");
    h3Shiny.innerHTML = ` Pokémon Shiny Capturados <img class="filtro " src="./img/7-shinyPokeBall.png" alt="shinyball"> : ${getShinyObtenido}/151`;
    contadorShinys.append(h3Shiny);
  }
}

//boton para reiniciar la pokedex y todas sus estadisticas
function resetPokedex() {
  Swal.fire({
    title: "Si aceptas, tu pokedex se reiniciará",
    text: "Esto no se puede revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Si, quiero reiniciar mi Pokedex!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("pokemonObtenidos");
      localStorage.removeItem("normalObtenido");
      localStorage.removeItem("honorObtenido");
      localStorage.removeItem("superObtenido");
      localStorage.removeItem("ultraObtenido");
      localStorage.removeItem("masterObtenido");
      localStorage.removeItem("shinyObtenidoDom");
      localStorage.removeItem("shinyObtenido");
      localStorage.removeItem("pokeBallPoints");
      localStorage.removeItem("honorBallPoints");
      localStorage.removeItem("superBallPoints");
      localStorage.removeItem("ultraBallPoints");
      localStorage.removeItem("masterBallPoints");
      reiniciarDom();
      Swal.fire("Reiniciada!", "Tu Pokedex Fue Reiniciada");
    }
  });
}

function reiniciarDom() {
  const contadores = document.querySelectorAll(".contador");
  contadores.forEach((contador) => {
    contador.remove();
  });
  getPokemonObtenidos();
  getNormalObtenido();
  getHonorObtenido();
  getSuperObtenido();
  getUltraObtenido();
  getMasterObtenido();
  getShinyObtenido();
}
pokedexReset.addEventListener("click", resetPokedex);
getPokemonObtenidos();
getNormalObtenido();
getHonorObtenido();
getSuperObtenido();
getUltraObtenido();
getMasterObtenido();
getShinyObtenido();
