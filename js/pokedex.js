const kantoPokedex = document.querySelector(".kanto-pokedex");
const unlockPoke = document.querySelector(".unlock-poke");
const contadorPuntos = document.querySelector(".contadorPuntos");
const ball1 = document.querySelector(".ball-1");
const ball2 = document.querySelector(".ball-2");
const ball3 = document.querySelector(".ball-3");
const useBall = document.querySelector(".use-ball");

let URL = "https://pokeapi.co/api/v2/pokemon/";
let pokedexArray = [];
let pokemonObtenidos = [];
const pokeRaro = [
  1, 4, 7, 12, 15, 18, 20, 22, 24, 28, 30, 33, 36, 40, 42, 44, 47, 49, 51, 53,
  55, 57, 61, 64, 67, 70, 73, 75, 78, 80, 82, 83, 85, 87, 89, 91, 93, 97, 99,
  101, 103, 106, 107, 112, 114, 115, 117, 119, 121, 123, 131, 133, 2, 5, 8, 26,
  31, 38, 45, 59, 62, 71, 105, 113, 124, 125, 126, 127, 128, 132, 134, 135, 136,
  139, 141, 142, 143, 148, 3, 6, 9, 34, 65, 68, 76, 94, 130, 137, 149, 144, 145,
  146, 150, 151,
];
const pokeSuperRaro = [
  2, 5, 8, 26, 31, 38, 45, 59, 62, 71, 105, 113, 124, 125, 126, 127, 128, 132,
  134, 135, 136, 139, 141, 142, 143, 148, 3, 6, 9, 34, 65, 68, 76, 94, 130, 137,
  149, 144, 145, 146, 150, 151,
];
const pokeSuperSuperRaro = [
  3, 6, 9, 34, 65, 68, 76, 94, 130, 137, 149, 144, 145, 146, 150, 151,
];
const pokeUltraRaro = [144, 145, 146, 150, 151];

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
function checkPokedex() {
  const getPuntos = JSON.parse(localStorage.getItem("puntos"));
  const getPokemonObtenidos = JSON.parse(
    localStorage.getItem("pokemonObtenidos")
  );
  const getBallPoints = JSON.parse(localStorage.getItem("ballPoints"));
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
    pokemonObtenidos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
  if (getBallPoints != null) {
    pokeBallPoints = getBallPoints;
    sumaPokeBallPoints(0);
  } else {
    pokeBallPoints = 0;
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
  localStorage.setItem("ballPoints", JSON.stringify(pokeBallPoints));
  actualizaContador();
}

let contador = document.createElement("h1");
function actualizaContador() {
  contador.innerText = "Puntos Disponibles: " + puntos;
  contadorPuntos.append(contador);
}

function comprarBall() {
  console.log(puntos);
  if (pokeBallPoints === 3) {
    alert("DEBES USAR LAS POKEBALLS ANTES DE CONTINUAR");
  } else {
    if (puntos >= 1) {
      puntos -= 1;
      let i = Math.floor(Math.random() * pokedexArray.length);
      if (pokeRaro.includes(i)) {
        console.log("Posible Pokemon Raro");
        let i = Math.floor(Math.random() * pokedexArray.length);
        if (pokeSuperRaro.includes(i)) {
          console.log("Posible Pokemon Super Raro");
          let i = Math.floor(Math.random() * pokedexArray.length);
          if (pokeSuperSuperRaro.includes(i)) {
            console.log("Posible Pokemon Super Super Raro");
            let i = Math.floor(Math.random() * pokedexArray.length);
            if (pokeUltraRaro.includes(i)) {
              console.log("Posible Pokemon Ultra Raro");
              i = Math.floor(Math.random() * pokedexArray.length);
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

function selectPoke(i) {
  if (pokemonObtenidos.includes(i)) {
    console.log("DUPLICADO: " + i);
    sumaPokeBallPoints(1);
    alert("DUPLICADO! POKE NUMERO: " + i);
  } else {
    pokemonObtenidos.push(i);
    guardarPokedexEnLS();
    limpiezaDOMArray(i);
    fetch(URL + i)
      .then((response) => response.json())
      .then((poke) =>
        Swal.fire({
          title: `#${poke.id} ${poke.name}`,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`,
        })
      );
  }
}
let pokeBallPoints = 0;
function sumaPokeBallPoints(n) {
  pokeBallPoints += n;
  guardarPokedexEnLS();
  if (pokeBallPoints === 1) {
    ball1.classList.remove("locked");
  } else if (pokeBallPoints === 2) {
    ball1.classList.remove("locked");
    ball2.classList.remove("locked");
  } else if (pokeBallPoints === 3) {
    ball1.classList.remove("locked");
    ball2.classList.remove("locked");
    ball3.classList.remove("locked");
    useBall.style.display = "inline";
  }
}
function pitySistem() {
  ball1.classList.add("locked");
  ball2.classList.add("locked");
  ball3.classList.add("locked");
  pokeBallPoints = 0;
  let i = Number(prompt("ingresa pokemon"));
  pokemonObtenidos.push(i);
  guardarPokedexEnLS();
  limpiezaDOMArray(i);
}

function limpiezaDOMArray(i) {
  const limpiarPoke = document.querySelector(`.poke-${i}`);
  console.log(limpiarPoke);
  limpiarPoke.remove();
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => newPoke(data));
}

function returnPokemon() {
  const limpiarPoke = document.querySelector(`.poke-${i}`);
  console.log(limpiarPoke);
  limpiarPoke.remove();
  const requests = [];
  for (let i = 1; i <= 9; i++) {
    requests.push(fetch(URL + i).then((response) => response.json()));
  }
  Promise.all(requests).then((data) => {
    data.forEach((pokemon) => mostrarPokemon(pokemon));
  });
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
  div.innerHTML = `
            <img src="${poke.sprites.front_default}" alt="${poke.name}">
            <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h4 class="pokemon-nombre">${poke.name}</h4>
            </div>
    `;
  let siguientePoke = document.querySelector(`.poke-${poke.id + 1}`);
  let anteriorPoke = document.querySelector(`.poke-${poke.id - 1}`);
  if (siguientePoke) {
    siguientePoke.before(div);
  } else {
    anteriorPoke.after(div);
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
  kantonians += `<div class='pokemon poke-${poke.id} ' >
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
unlockPoke.addEventListener("click", comprarBall);
useBall.addEventListener("click", pitySistem);

checkPokedex();
actualizaContador();

//////////////cleanPokedex();
//////////////getPokedex();
