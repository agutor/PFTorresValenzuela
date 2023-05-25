import {
  sumaPokeBallPoints,
  sumaHonorBallPoints,
  sumaSuperBallPoints,
  sumaUltraBallPoints,
  sumaMasterBallPoints,
  pokeBallPoints,
  honorBallPoints,
  superBallPoints,
  ultraBallPoints,
  masterBallPoints,
  swalDuplicadoPokeball,
  swalDuplicadoHonorball,
  swalDuplicadoSuperball,
  swalDuplicadoUltraball,
  swalDuplicadoMasterball,
} from "./ballPoints.js";

const kantoPokedex = document.querySelector(".kanto-pokedex");
const unlockPoke = document.querySelector(".unlock-poke");
const contadorPuntos = document.querySelector(".contadorPuntos");
const showPoke = document.querySelector(".showPoke");
const hidePoke = document.querySelector(".hidePoke");

let URL = "https://pokeapi.co/api/v2/pokemon/";
export let pokedexArray = [];
let pokemonObtenidos = [];
let shinyObtenidoDom = [];
let cantidadDeCompras = 0;
export const pokeNormales = [
  10, 11, 13, 14, 16, 17, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46,
  48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 84, 86, 88, 90,
  92, 95, 96, 98, 100, 102, 104, 108, 109, 110, 111, 116, 118, 120, 122, 129,
  138, 140, 147,
];
export const pokeHonor = [
  1, 4, 7, 12, 15, 18, 20, 22, 24, 28, 30, 33, 36, 40, 42, 44, 47, 49, 51, 53,
  55, 57, 61, 64, 67, 70, 73, 75, 78, 80, 82, 83, 85, 87, 89, 91, 93, 97, 99,
  101, 103, 106, 107, 112, 114, 115, 117, 119, 121, 123, 131, 133,
];
export const pokeSuper = [
  2, 5, 8, 26, 31, 38, 45, 59, 62, 71, 105, 113, 124, 125, 126, 127, 128, 132,
  134, 135, 136, 139, 141, 142, 143, 148,
];
export const pokeUltra = [3, 6, 9, 34, 65, 68, 76, 94, 130, 137, 149];
export const pokeMaster = [144, 145, 146, 150, 151];
export let normalObtenido = [];
export let honorObtenido = [];
export let superObtenido = [];
export let ultraObtenido = [];
export let masterObtenido = [];
export let shinyObtenido = [];

class pokemon {
  constructor(imagen, id, nombre) {
    this.imagen = imagen;
    this.id = id;
    this.nombre = nombre;
  }
}

let puntos = 0;

function checkPokedex() {
  const getPuntos = JSON.parse(localStorage.getItem("puntos"));
  const getPokemonObtenidos = JSON.parse(
    localStorage.getItem("pokemonObtenidos")
  );
  const getNormalObtenido = JSON.parse(localStorage.getItem("normalObtenido"));
  const getHonorObtenido = JSON.parse(localStorage.getItem("honorObtenido"));
  const getSuperObtenido = JSON.parse(localStorage.getItem("superObtenido"));
  const getUltraObtenido = JSON.parse(localStorage.getItem("ultraObtenido"));
  const getMasterObtenido = JSON.parse(localStorage.getItem("masterObtenido"));
  const getCantidadDeCompras = JSON.parse(
    localStorage.getItem("cantidadDeCompras")
  );
  const getShinyObtenidoDom = JSON.parse(
    localStorage.getItem("shinyObtenidoDom")
  );

  if (getPuntos != null) {
    puntos = getPuntos;
  } else {
    puntos = 0;
  }
  if (getPokemonObtenidos != null) {
    getPokemonObtenidos.sort(function (a, b) {
      return a - b;
    });
    pokemonObtenidos = getPokemonObtenidos;
    pokemonObtenidosDOM();
  } else {
    pokemonObtenidos = [];
  }

  if (getNormalObtenido != null) {
    normalObtenido = getNormalObtenido;
  } else {
    normalObtenido = 0;
  }
  if (getHonorObtenido != null) {
    honorObtenido = getHonorObtenido;
  } else {
    honorObtenido = 0;
  }
  if (getSuperObtenido != null) {
    superObtenido = getSuperObtenido;
  } else {
    superObtenido = 0;
  }
  if (getUltraObtenido != null) {
    ultraObtenido = getUltraObtenido;
  } else {
    ultraObtenido = 0;
  }
  if (getMasterObtenido != null) {
    masterObtenido = getMasterObtenido;
  } else {
    masterObtenido = 0;
  }
  if (getCantidadDeCompras != null) {
    cantidadDeCompras = getCantidadDeCompras;
  } else {
    cantidadDeCompras = 0;
  }
  if (getShinyObtenidoDom != null) {
    shinyObtenidoDom = getShinyObtenidoDom;
    console.log(shinyObtenidoDom);
    cargaShinysDOM();
  } else {
    shinyObtenidoDom = [];
  }
}

function pokemonObtenidosDOM() {
  Swal.fire({
    title: "Cargando Pokedex!",
    html: "Aguarda un momento por favor",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
    willClose: () => {
      clearInterval();
    },
  });
  const requests = [];
  pokemonObtenidos.forEach((poke) => {
    const limpiarPoke = document.querySelector(`.poke-${poke}`);
    limpiarPoke.remove();

    requests.push(fetch(URL + poke).then((response) => response.json()));
  });
  Promise.all(requests).then((data) => {
    data.forEach((pokemon) => newPoke(pokemon));
  });
}

function cargaShinysDOM() {
  const shinyRequest = [];
  if (shinyObtenidoDom) {
    shinyObtenidoDom.forEach((shiny) => {
      const shinyDom = document.querySelector(`.poke-${shiny}`);
      console.log(shinyDom);
      shinyDom.remove();
      shinyRequest.push(fetch(URL + shiny).then((response) => response.json()));
    });
    Promise.all(shinyRequest).then((data) => {
      data.forEach((shinyPokemon) => newShiny(shinyPokemon));
    });
  }
}
function guardarPokedexEnLS() {
  localStorage.setItem("puntos", JSON.stringify(puntos));
  localStorage.setItem("pokemonObtenidos", JSON.stringify(pokemonObtenidos));
  localStorage.setItem("normalObtenido", JSON.stringify(normalObtenido));
  localStorage.setItem("honorObtenido", JSON.stringify(honorObtenido));
  localStorage.setItem("superObtenido", JSON.stringify(superObtenido));
  localStorage.setItem("ultraObtenido", JSON.stringify(ultraObtenido));
  localStorage.setItem("masterObtenido", JSON.stringify(masterObtenido));
  localStorage.setItem("cantidadDeCompras", JSON.stringify(cantidadDeCompras));
  localStorage.setItem("shinyObtenidoDom", JSON.stringify(shinyObtenidoDom));
  actualizaContador();
}

let contador = document.createElement("h1");
function actualizaContador() {
  contador.innerText = "Puntos Disponibles: " + puntos;
  contadorPuntos.append(contador);
}

function comprarBall() {
  cantidadDeCompras++;
  guardarPokedexEnLS();
  if (
    pokeBallPoints === 3 ||
    honorBallPoints === 3 ||
    superBallPoints === 3 ||
    ultraBallPoints === 3 ||
    masterBallPoints === 3
  ) {
    Swal.fire("Debes usar las Balls antes de continuar!");
  } else if (cantidadDeCompras === 10 || cantidadDeCompras === 20) {
    let i = Math.floor(Math.random() * pokedexArray.length);
    if (pokeUltra.includes(i) || pokeMaster.includes(i)) {
      let i = Math.floor(Math.random() * pokedexArray.length);
      if (pokeMaster.includes(i)) {
        i = Math.floor(Math.random() * pokedexArray.length);
        while (i === 0) {
          i = Math.floor(Math.random() * pokedexArray.length);
        }
        selectPoke(i);
      } else {
        selectPoke(i);
      }
    } else {
      selectPoke(i);
    }
  } else if (cantidadDeCompras === 30) {
    let i = Math.floor(Math.random() * pokedexArray.length);
    while (i === 0 || pokeNormales.includes(i) || pokeHonor.includes(i)) {
      i = Math.floor(Math.random() * pokedexArray.length);
    }
    selectPoke(i);
    cantidadDeCompras = 0;
    guardarPokedexEnLS();
  } else {
    if (puntos >= 1) {
      puntos -= 1;
      let i = Math.floor(Math.random() * pokedexArray.length);
      while (i === 0) {
        i = Math.floor(Math.random() * pokedexArray.length);
      }
      if (
        pokeHonor.includes(i) ||
        pokeSuper.includes(i) ||
        pokeUltra.includes(i) ||
        pokeMaster.includes(i)
      ) {
        let i = Math.floor(Math.random() * pokedexArray.length);
        while (i === 0) {
          i = Math.floor(Math.random() * pokedexArray.length);
        }
        if (
          pokeSuper.includes(i) ||
          pokeUltra.includes(i) ||
          pokeMaster.includes(i)
        ) {
          let i = Math.floor(Math.random() * pokedexArray.length);
          while (i === 0) {
            i = Math.floor(Math.random() * pokedexArray.length);
          }
          if (pokeUltra.includes(i) || pokeMaster.includes(i)) {
            let i = Math.floor(Math.random() * pokedexArray.length);
            while (i === 0) {
              i = Math.floor(Math.random() * pokedexArray.length);
            }
            if (pokeMaster.includes(i)) {
              i = Math.floor(Math.random() * pokedexArray.length);
              while (i === 0) {
                i = Math.floor(Math.random() * pokedexArray.length);
              }
              selectPoke(i);
            } else {
              selectPoke(i);
            }
          } else {
            selectPoke(i);
          }
        } else {
          selectPoke(i);
        }
      } else {
        selectPoke(i);
      }
    } else {
      Swal.fire("No tienes suficientes puntos para comprar una bola");
    }
  }
}

function borrarTareasCompletas() {
  localStorage.removeItem("listaDeTareasCompletas");
}

export function selectPoke(i) {
  borrarTareasCompletas();
  Swal.fire({
    title: "Buscando Pokemon!",
    html: "Aguarda un momento por favor",
    timer: 1000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
    willClose: () => {
      clearInterval();
    },
  }).then(() => {
    if (pokemonObtenidos.includes(i)) {
      let shiny = Math.floor(Math.random() * 100) + 1;
      if (shiny === 81) {
        console.log("shiny obtenidos array: " + shinyObtenidoDom);
        limpiezaDOMArray(i);
        guardarPokedexEnLS();
      } else {
        if (pokeHonor.includes(i)) {
          sumaHonorBallPoints(1);
          guardarPokedexEnLS();
          swalDuplicado(i, "2-honorBall");
        } else if (pokeSuper.includes(i)) {
          sumaSuperBallPoints(1);
          guardarPokedexEnLS();
          swalDuplicado(i, "3-superBall");
        } else if (pokeUltra.includes(i)) {
          sumaUltraBallPoints(1);
          guardarPokedexEnLS();
          swalDuplicado(i, "4-ultraBall");
        } else if (pokeMaster.includes(i)) {
          sumaMasterBallPoints(1);
          guardarPokedexEnLS();
          swalDuplicado(i, "5-masterBall");
        } else {
          sumaPokeBallPoints(1);
          guardarPokedexEnLS();
          swalDuplicado(i, "1-pokeBall");
        }
      }
    } else {
      guardarPokedexEnLS();
      limpiezaDOMArray(i);
    }
  });
}

function swalRareza(i, rareza) {
  guardarPokedexEnLS();
  fetch(URL + i)
    .then((response) => response.json())
    .then((poke) =>
      Swal.fire({
        title: `#${poke.id} ${poke.name}`,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`,
        html: `<p>Rareza: </p><img src="../img/${rareza}.png" class="rarezaSwal"> `,
      })
    );
}

function swalShiny(i, rareza) {
  guardarPokedexEnLS();
  fetch(URL + i)
    .then((response) => response.json())
    .then((poke) =>
      Swal.fire({
        title: `Encontraste un ${poke.name} shiny`,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${i}.png`,
        html: `<p>Rareza: </p><img src="../img/${rareza}.png" class="rarezaSwal"> `,
      })
    );
}

function swalDuplicado(i, rareza) {
  guardarPokedexEnLS();
  fetch(URL + i)
    .then((response) => response.json())
    .then((poke) =>
      Swal.fire({
        title: `ESTE POKEMON YA LO TIENES`,
        text: `#${poke.id} ${poke.name}`,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`,
        html: `<p>#${poke.id} ${poke.name}</p><p>En su lugar obtienes: </p><img src="../img/${rareza}.png" class="rarezaSwal"> `,
      })
    )
    .then(() => {
      if (
        pokeBallPoints === 3 ||
        honorBallPoints === 3 ||
        superBallPoints === 3 ||
        ultraBallPoints === 3 ||
        masterBallPoints === 3
      ) {
        if (rareza === "1-pokeBall") {
          swalDuplicadoPokeball();
        } else if (rareza === "2-honorBall") {
          swalDuplicadoHonorball();
        } else if (rareza === "3-superBall") {
          swalDuplicadoSuperball();
        } else if (rareza === "4-ultraBall") {
          swalDuplicadoUltraball();
        } else if (rareza === "5-masterBall") {
          swalDuplicadoMasterball();
        }
      }
    });
}

function limpiezaDOMArray(i) {
  if (pokemonObtenidos.includes(i)) {
    shinyObtenido++;
    shinyObtenidoDom.push(i);
    const actPokemonObtenidos = pokemonObtenidos.indexOf(i);
    if (actPokemonObtenidos !== -1) {
      pokemonObtenidos.splice(actPokemonObtenidos, 1);
    }
    guardarPokedexEnLS();
    if (pokeHonor.includes(i)) {
      swalShiny(i, "8-shinyHonorBall");
    } else if (pokeSuper.includes(i)) {
      swalShiny(i, "9-shinySuperBall");
    } else if (pokeUltra.includes(i)) {
      swalShiny(i, "10-shinyUltraBall");
    } else if (pokeMaster.includes(i)) {
      swalShiny(i, "11-shinyMasterBall");
    } else {
      swalShiny(i, "7-shinyPokeBall");
      console.log("shiny?" + i);
    }
    console.log("shiny bro");
    const limpiarPoke = document.querySelector(`.poke-${i}`);
    limpiarPoke.remove();

    fetch(URL + i)
      .then((response) => response.json())
      .then((data) => newShiny(data));
  } else {
    if (pokeHonor.includes(i)) {
      honorObtenido++;
      pokemonObtenidos.push(i);
      swalRareza(i, "2-honorBall");
      limpiarPokes(i);
    } else if (pokeSuper.includes(i)) {
      superObtenido++;
      pokemonObtenidos.push(i);
      swalRareza(i, "3-superBall");
      limpiarPokes(i);
    } else if (pokeUltra.includes(i)) {
      ultraObtenido++;
      pokemonObtenidos.push(i);
      swalRareza(i, "4-ultraBall");
      limpiarPokes(i);
    } else if (pokeMaster.includes(i)) {
      masterObtenido++;
      pokemonObtenidos.push(i);
      swalRareza(i, "5-masterBall");
      limpiarPokes(i);
    } else {
      normalObtenido++;
      pokemonObtenidos.push(i);
      swalRareza(i, "1-pokeBall");
      limpiarPokes(i);
    }
  }
}

function limpiarPokes(i) {
  const limpiarPoke = document.querySelector(`.poke-${i}`);
  limpiarPoke.remove();
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => newPoke(data));
}

function newPoke(poke) {
  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add(`pokemon`);
  div.classList.add(`poke-${poke.id}`);
  div.classList.add("obtenido");

  if (pokeHonor.includes(poke.id)) {
    divHTML(div, poke, pokeId, "2-honorBall", "honor");
  } else if (pokeSuper.includes(poke.id)) {
    divHTML(div, poke, pokeId, "3-superBall", "super");
  } else if (pokeUltra.includes(poke.id)) {
    divHTML(div, poke, pokeId, "4-ultraBall", "ultra");
  } else if (pokeMaster.includes(poke.id)) {
    divHTML(div, poke, pokeId, "5-masterBall", "master");
  } else {
    divHTML(div, poke, pokeId, "1-pokeBall", "normal");
  }

  let siguientePoke = document.querySelector(`.poke-${poke.id + 1}`);
  let anteriorPoke = document.querySelector(`.poke-${poke.id - 1}`);

  siguientePoke ? siguientePoke.before(div) : anteriorPoke.after(div);

  function divHTML(div, poke, pokeId, pokeball, rareza) {
    div.innerHTML = `
            <img src="${poke.sprites.front_default}" alt="${poke.name}">
            <div class="nombre-contenedor ${rareza}">
            <p class="pokemon-id">#${pokeId}</p>
            <h4 class="pokemon-nombre">${poke.name}</h4>
            <img class="rarezaDom" src="../img/${pokeball}.png" alt="${pokeball}">
            </div>
    `;
  }
}

function newShiny(poke) {
  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add(`pokemon`);
  div.classList.add(`poke-${poke.id}`);
  div.classList.add("shiny");

  if (pokeHonor.includes(poke.id)) {
    divHTML(div, poke, pokeId, "8-shinyHonorBall", "honor");
  } else if (pokeSuper.includes(poke.id)) {
    divHTML(div, poke, pokeId, "9-shinySuperBall", "super");
  } else if (pokeUltra.includes(poke.id)) {
    divHTML(div, poke, pokeId, "10-shinyUltraBall", "ultra");
  } else if (pokeMaster.includes(poke.id)) {
    divHTML(div, poke, pokeId, "11-shinyMasterBall", "master");
  } else {
    divHTML(div, poke, pokeId, "7-shinyPokeBall", "normal");
  }

  let siguientePoke = document.querySelector(`.poke-${poke.id + 1}`);
  let anteriorPoke = document.querySelector(`.poke-${poke.id - 1}`);

  siguientePoke ? siguientePoke.before(div) : anteriorPoke.after(div);

  function divHTML(div, poke, pokeId, pokeball, rareza) {
    div.innerHTML = `
            <img src="${poke.sprites.front_shiny}" alt="${poke.name}">
            <div class="nombre-contenedor ${rareza}">
            <p class="pokemon-id">#${pokeId}</p>
            <h4 class="pokemon-nombre">${poke.name}</h4>
            <img class="rarezaDom" src="../img/${pokeball}.png" alt="${pokeball}">
            </div>
    `;
  }
}

let kantonians = "";

for (let i = 0; i <= 151; i++) {
  let poke = new pokemon(
    "https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg",
    i,
    "??????"
  );
  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }
  kantonians += `<div class='balled poke-${poke.id}' id="${poke.id}" >
                  <img class='pokemon-imagen' data-id=${poke.id} src=${poke.imagen}>
                    <div class="nombre-contenedor">
                      <p> #${pokeId}</p>
                      <h4>${poke.nombre}</h4>
                    </div>
                  </div>
      `;
  pokedexArray.push(i);
}
kantoPokedex.innerHTML = kantonians;

document.addEventListener("DOMContentLoaded", function () {
  let obtenidos = localStorage.getItem("off");
  const balled = document.querySelectorAll(".balled");
  const filtro = document.querySelectorAll(".filtro");
  function mostrarObtenidos() {
    balled.forEach(function (e) {
      e.classList.add("off");
    });
    filtro.forEach(function (e) {
      e.classList.remove("off");
    });
    hidePoke.classList.remove("btnActivado");
    showPoke.classList.add("btnActivado");
    localStorage.setItem("off", "activado");
  }

  function ocultarObtenidos() {
    balled.forEach(function (e) {
      e.classList.remove("off");
    });
    hidePoke.classList.add("btnActivado");
    showPoke.classList.remove("btnActivado");
    filtro.forEach(function (e) {
      e.classList.add("off");
    });
    localStorage.setItem("off", "desactivado");
  }
  const filtroNormal = document.querySelector(".filtro-normal");
  const filtroHonor = document.querySelector(".filtro-honor");
  const filtroSuper = document.querySelector(".filtro-super");
  const filtroUltra = document.querySelector(".filtro-ultra");
  const filtroMaster = document.querySelector(".filtro-master");

  filtroNormal.addEventListener("click", hideNormal);
  filtroHonor.addEventListener("click", hideHonor);
  filtroSuper.addEventListener("click", hideSuper);
  filtroUltra.addEventListener("click", hideUltra);
  filtroMaster.addEventListener("click", hideMaster);

  function hideNormal() {
    const normal = document.querySelectorAll(".normal");
    normal.forEach(function (e) {
      const pokeNormal = e.parentElement;
      pokeNormal.classList.toggle("off");
    });
    filtroNormal.classList.toggle("filtroDesactivado");
  }
  function hideHonor() {
    const honor = document.querySelectorAll(".honor");
    honor.forEach(function (e) {
      const pokeHonor = e.parentElement;
      pokeHonor.classList.toggle("off");
    });
    filtroHonor.classList.toggle("filtroDesactivado");
  }
  function hideSuper() {
    const superP = document.querySelectorAll(".super");
    superP.forEach(function (e) {
      const pokeSuper = e.parentElement;
      pokeSuper.classList.toggle("off");
    });
    filtroSuper.classList.toggle("filtroDesactivado");
  }
  function hideUltra() {
    const ultra = document.querySelectorAll(".ultra");
    ultra.forEach(function (e) {
      const pokeUltra = e.parentElement;
      pokeUltra.classList.toggle("off");
    });
    filtroUltra.classList.toggle("filtroDesactivado");
  }
  function hideMaster() {
    const master = document.querySelectorAll(".master");
    master.forEach(function (e) {
      const pokeMaster = e.parentElement;
      pokeMaster.classList.toggle("off");
    });
    filtroMaster.classList.toggle("filtroDesactivado");
  }

  if (obtenidos === "activado") {
    mostrarObtenidos();
  } else {
    ocultarObtenidos();
  }
  obtenidos === "activado" ? mostrarObtenidos() : ocultarObtenidos;
  showPoke.addEventListener("click", () => {
    obtenidos = localStorage.getItem("off");
    mostrarObtenidos();
  });

  hidePoke.addEventListener("click", () => {
    obtenidos = localStorage.getItem("off");
    ocultarObtenidos();
  });
});
unlockPoke.addEventListener("click", comprarBall);
checkPokedex();
actualizaContador();
