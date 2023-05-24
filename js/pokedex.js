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
} from "./ballPoints.js";

const kantoPokedex = document.querySelector(".kanto-pokedex");
const unlockPoke = document.querySelector(".unlock-poke");
const contadorPuntos = document.querySelector(".contadorPuntos");
const showPoke = document.querySelector(".showPoke");

let URL = "https://pokeapi.co/api/v2/pokemon/";
export let pokedexArray = [];
let pokemonObtenidos = [];
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

class pokemon {
  constructor(imagen, id, nombre) {
    this.imagen = imagen;
    this.id = id;
    this.nombre = nombre;
  }
}
// function comprarBola(puntos, actualizar) {
//     if (puntos >= 5) {
//       puntos -= 5;
//       actualizar;
//       let randomPoke = Math.floor(Math.random() * 151) + 1;
//       pokeGatcha(randomPoke);
//       alert("¡Has comprado una bola! Tu pokemon es el Numero: " + randomPoke);
//       console.log(pokedex);
//     } else {
//       alert("No tienes suficientes puntos para comprar una bola");
//     }
//   }

let puntos = 0;
let obtenidos = localStorage.getItem("off");

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

  if (getPuntos != null) {
    puntos = getPuntos;
  } else {
    puntos = 0;
  }
  if (getPokemonObtenidos != null) {
    getPokemonObtenidos.sort(function (a, b) {
      return a - b;
    });
    console.log(getPokemonObtenidos);
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
  }
}

function pokemonObtenidosDOM() {
  //setTimeout(() => {
  const requests = [];
  pokemonObtenidos.forEach((poke) => {
    const limpiarPoke = document.querySelector(`.poke-${poke}`);
    console.log(limpiarPoke);
    limpiarPoke.remove();

    requests.push(fetch(URL + poke).then((response) => response.json()));
  });
  Promise.all(requests).then((data) => {
    data.forEach((pokemon) => newPoke(pokemon));
  });
  //}, 1500); // Espera 1 segundo por cada iteración antes de ejecutar el código
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
  actualizaContador();
}

let contador = document.createElement("h1");
function actualizaContador() {
  contador.innerText = "Puntos Disponibles: " + puntos;
  contadorPuntos.append(contador);
}

function comprarBall() {
  console.log(puntos);
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
    console.log("PITY SYSTEM INCOMING");
    let i = Math.floor(Math.random() * pokedexArray.length);
    if (pokeUltra.includes(i) || pokeMaster.includes(i)) {
      console.log("Posible Pokemon Super Super Raro");
      let i = Math.floor(Math.random() * pokedexArray.length);
      console.log("Salió: " + i);
      if (pokeMaster.includes(i)) {
        console.log("Posible Pokemon Ultra Raro");
        i = Math.floor(Math.random() * pokedexArray.length);
        console.log("Salió: " + i);
        while (i === 0) {
          console.log("PONGALE CERO");
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
    console.log("TIRADA LEGENDARIA");
    let i = Math.floor(Math.random() * pokedexArray.length);
    while (i === 0 || pokeNormales.includes(i) || pokeHonor.includes(i)) {
      console.log("LEGENDARIAAAAAAAAA");
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
        console.log("SALIÓ CERO D:");
        i = Math.floor(Math.random() * pokedexArray.length);
      }
      if (
        pokeHonor.includes(i) ||
        pokeSuper.includes(i) ||
        pokeUltra.includes(i) ||
        pokeMaster.includes(i)
      ) {
        console.log("Posible Pokemon Raro");
        let i = Math.floor(Math.random() * pokedexArray.length);
        while (i === 0) {
          console.log("SALIÓ CERO D:");
          i = Math.floor(Math.random() * pokedexArray.length);
        }
        if (
          pokeSuper.includes(i) ||
          pokeUltra.includes(i) ||
          pokeMaster.includes(i)
        ) {
          console.log("Posible Pokemon Super Raro");
          let i = Math.floor(Math.random() * pokedexArray.length);
          while (i === 0) {
            console.log("SALIÓ CERO D:");
            i = Math.floor(Math.random() * pokedexArray.length);
          }
          if (pokeUltra.includes(i) || pokeMaster.includes(i)) {
            console.log("Posible Pokemon Super Super Raro");
            let i = Math.floor(Math.random() * pokedexArray.length);
            while (i === 0) {
              console.log("SALIÓ CERO D:");
              i = Math.floor(Math.random() * pokedexArray.length);
            }
            if (pokeMaster.includes(i)) {
              console.log("Posible Pokemon Ultra Raro");
              i = Math.floor(Math.random() * pokedexArray.length);
              while (i === 0) {
                console.log("SALIÓ CERO D:");
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
      alert("No tienes suficientes puntos para comprar una bola");
    }
  }
}

export function selectPoke(i) {
  if (pokemonObtenidos.includes(i)) {
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
  } else {
    pokemonObtenidos.push(i);
    guardarPokedexEnLS();
    limpiezaDOMArray(i);
  }
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
    );
}

function limpiezaDOMArray(i) {
  if (pokeHonor.includes(i)) {
    honorObtenido++;
    swalRareza(i, "2-honorBall");
  } else if (pokeSuper.includes(i)) {
    superObtenido++;
    swalRareza(i, "3-superBall");
  } else if (pokeUltra.includes(i)) {
    ultraObtenido++;
    swalRareza(i, "4-ultraBall");
  } else if (pokeMaster.includes(i)) {
    masterObtenido++;
    swalRareza(i, "5-masterBall");
  } else {
    normalObtenido++;
    swalRareza(i, "1-pokeBall");
  }
  const limpiarPoke = document.querySelector(`.poke-${i}`);
  console.log(limpiarPoke);
  limpiarPoke.remove();
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => newPoke(data));
}

function newPoke(poke) {
  //FUNCION PARA ACTUALIZAR STORAGE ACAAAAA
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
    divHTML(div, poke, pokeId, "2-honorBall");
  } else if (pokeSuper.includes(poke.id)) {
    divHTML(div, poke, pokeId, "3-superBall");
  } else if (pokeUltra.includes(poke.id)) {
    divHTML(div, poke, pokeId, "4-ultraBall");
  } else if (pokeMaster.includes(poke.id)) {
    divHTML(div, poke, pokeId, "5-masterBall");
  } else {
    divHTML(div, poke, pokeId, "1-pokeBall");
  }

  let siguientePoke = document.querySelector(`.poke-${poke.id + 1}`);
  let anteriorPoke = document.querySelector(`.poke-${poke.id - 1}`);
  if (siguientePoke) {
    siguientePoke.before(div);
  } else {
    anteriorPoke.after(div);
  }

  function divHTML(div, poke, pokeId, rareza) {
    div.innerHTML = `
            <img src="${poke.sprites.front_default}" alt="${poke.name}">
            <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h4 class="pokemon-nombre">${poke.name}</h4>
            <img class="rarezaDom" src="../img/${rareza}.png" alt="${rareza}">
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

const balled = document.querySelector(".balled");

function mostrarObtenidos() {
  balled.classList.add(".off");
  localStorage.setItem("off", "activado");
}

function ocultarObtenidos() {
  balled.classList.remove(".off");
  localStorage.setItem("off", "desactivado");
}

if (obtenidos === "activado") {
  mostrarObtenidos();
} else {
  ocultarObtenidos();
}
unlockPoke.addEventListener("click", comprarBall);
showPoke.addEventListener("click", () => {
  obtenidos = localStorage.getItem("off");

  if (obtenidos === "activado") {
    ocultarObtenidos();
  } else {
    mostrarObtenidos();
  }
});

checkPokedex();
actualizaContador();

//////////////cleanPokedex();
//////////////getPokedex();
