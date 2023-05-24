import {
  selectPoke,
  pokedexArray,
  pokeNormales,
  pokeHonor,
  pokeSuper,
  pokeUltra,
  pokeMaster,
  normalObtenido,
  honorObtenido,
  superObtenido,
  ultraObtenido,
  masterObtenido,
} from "./pokedex.js";

const ball1 = document.querySelector(".ball-1");
const ball2 = document.querySelector(".ball-2");
const ball3 = document.querySelector(".ball-3");
const ball4 = document.querySelector(".ball-4");
const ball5 = document.querySelector(".ball-5");
const ball6 = document.querySelector(".ball-6");
const ball7 = document.querySelector(".ball-7");
const ball8 = document.querySelector(".ball-8");
const ball9 = document.querySelector(".ball-9");
const ball10 = document.querySelector(".ball-10");
const ball11 = document.querySelector(".ball-11");
const ball12 = document.querySelector(".ball-12");
const ball13 = document.querySelector(".ball-13");
const ball14 = document.querySelector(".ball-14");
const ball15 = document.querySelector(".ball-15");
const usePokeball = document.querySelector(".use-pokeball");
const useHonorball = document.querySelector(".use-honorball");
const useSuperball = document.querySelector(".use-superball");
const useUltraball = document.querySelector(".use-ultraball");
const useMasterball = document.querySelector(".use-masterball");
const buyHonorball = document.querySelector(".buy-honorball");
const buySuperball = document.querySelector(".buy-superball");
const buyUltraball = document.querySelector(".buy-ultraball");
const buyMasterball = document.querySelector(".buy-masterball");
const usePokerandom = document.querySelector(".use-pokerandom");

export let pokeBallPoints = 0;
export let honorBallPoints = 0;
export let superBallPoints = 0;
export let ultraBallPoints = 0;
export let masterBallPoints = 0;

let pokemonObtenidos = [];

function guardarBallPoints() {
  localStorage.setItem("pokeBallPoints", JSON.stringify(pokeBallPoints));
  console.log("poke ball points guardados. Total: " + pokeBallPoints);
  localStorage.setItem("honorBallPoints", JSON.stringify(honorBallPoints));
  console.log("honor ball points guardados. Total: " + honorBallPoints);
  localStorage.setItem("superBallPoints", JSON.stringify(superBallPoints));
  localStorage.setItem("ultraBallPoints", JSON.stringify(ultraBallPoints));
  localStorage.setItem("masterBallPoints", JSON.stringify(masterBallPoints));
  localStorage.setItem("pokemonObtenidos", JSON.stringify(pokemonObtenidos));
}

function checkPuntos() {
  const getPokemonObtenidos = JSON.parse(
    localStorage.getItem("pokemonObtenidos")
  );
  const getPokeBallPoints = JSON.parse(localStorage.getItem("pokeBallPoints"));
  const getHonorBallPoints = JSON.parse(
    localStorage.getItem("honorBallPoints")
  );
  const getSuperBallPoints = JSON.parse(
    localStorage.getItem("superBallPoints")
  );
  const getUltraBallPoints = JSON.parse(
    localStorage.getItem("ultraBallPoints")
  );
  const getMasterBallPoints = JSON.parse(
    localStorage.getItem("masterBallPoints")
  );
  if (getPokeBallPoints != null) {
    pokeBallPoints = getPokeBallPoints;
    sumaPokeBallPoints(0);
  } else {
    pokeBallPoints = 0;
  }
  if (getHonorBallPoints != null) {
    honorBallPoints = getHonorBallPoints;
    sumaHonorBallPoints(0);
  } else {
    honorBallPoints = 0;
  }
  if (getSuperBallPoints != null) {
    superBallPoints = getSuperBallPoints;
    sumaSuperBallPoints(0);
  } else {
    superBallPoints = 0;
  }
  if (getUltraBallPoints != null) {
    ultraBallPoints = getUltraBallPoints;
    sumaUltraBallPoints(0);
  } else {
    ultraBallPoints = 0;
  }
  if (getMasterBallPoints != null) {
    masterBallPoints = getMasterBallPoints;
    sumaMasterBallPoints(0);
  } else {
    masterBallPoints = 0;
  }

  if (getPokemonObtenidos != null) {
    pokemonObtenidos = getPokemonObtenidos;
    guardarBallPoints();
  } else {
    pokemonObtenidos = [];
  }
}
function selectorPitySistem(rareza) {
  checkPuntos();
  let i = Math.floor(Math.random() * pokedexArray.length);
  while (!rareza.includes(i)) {
    i = Math.floor(Math.random() * pokedexArray.length);
  }
  selectPoke(i);
  console.log("SE REPITE?");
}

function sumaPokeBallPoints(n) {
  pokeBallPoints += n;
  guardarBallPoints();
  if (pokeBallPoints === 1) {
    ball1.classList.remove("locked");
  } else if (pokeBallPoints === 2) {
    ball1.classList.remove("locked");
    ball2.classList.remove("locked");
  } else if (pokeBallPoints === 3) {
    ball1.classList.remove("locked");
    ball2.classList.remove("locked");
    ball3.classList.remove("locked");
    usePokeball.style.display = "inline";
    buyHonorball.style.display = "inline";
    Swal.fire({
      title: `Ya tienes tres PokeBalls! <img class="ball-1" src="../img/1-pokeBall.png" alt="pokeball">`,
      showDenyButton: true,
      denyButtonColor: "#3FB950",
      confirmButtonText: `Utilizar PokeBalls <img class="ball-1 buttonBall"
      src="../img/1-pokeBall.png" alt="pokeball">`,
      denyButtonText: `Comprar HonorBall <img class="ball-4 buttonBall"
      src="../img/2-honorBall.png" alt="HonorBall">`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        pityPokeBall();
      }
      if (result.isDenied) {
        swapBallToHonor();
      }
    });
  } else {
    ball1.classList.add("locked");
    ball2.classList.add("locked");
    ball3.classList.add("locked");
  }
}

function pityPokeBall() {
  ball1.classList.add("locked");
  ball2.classList.add("locked");
  ball3.classList.add("locked");
  usePokeball.style.display = "none";
  buyHonorball.style.display = "none";
  pokeBallPoints = 0;
  guardarBallPoints();
  selectorPitySistem(pokeNormales, normalObtenido);
}

function swapBallToHonor() {
  sumaPokeBallPoints(-3);
  sumaHonorBallPoints(1);
  usePokeball.style.display = "none";
  buyHonorball.style.display = "none";
}

function sumaHonorBallPoints(n) {
  honorBallPoints += n;
  guardarBallPoints();
  if (honorBallPoints === 1) {
    ball4.classList.remove("locked");
  } else if (honorBallPoints === 2) {
    ball4.classList.remove("locked");
    ball5.classList.remove("locked");
  } else if (honorBallPoints === 3) {
    ball4.classList.remove("locked");
    ball5.classList.remove("locked");
    ball6.classList.remove("locked");
    useHonorball.style.display = "inline";
    buySuperball.style.display = "inline";
    Swal.fire({
      title: `Ya tienes tres HonorBalls! <img class="ball-4" src="../img/2-honorBall.png" alt="HonorBall">`,
      showDenyButton: true,
      denyButtonColor: "#3FB950",
      confirmButtonText: `Utilizar HonorBalls <img class="ball-4 buttonBall"
      src="../img/2-honorBall.png" alt="HonorBall">`,
      denyButtonText: `Comprar SuperBall <img class="ball-7 buttonBall"
      src="../img/3-superBall.png" alt="superball">`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        pityHonorBall();
      } else if (result.isDenied) {
        swapBallToSuper();
      }
    });
  } else {
    ball4.classList.add("locked");
    ball5.classList.add("locked");
    ball6.classList.add("locked");
  }
}

function pityHonorBall() {
  ball4.classList.add("locked");
  ball5.classList.add("locked");
  ball6.classList.add("locked");
  useHonorball.style.display = "none";
  buySuperball.style.display = "none";
  honorBallPoints = 0;
  guardarBallPoints();
  selectorPitySistem(pokeHonor, honorObtenido);
}

function swapBallToSuper() {
  sumaHonorBallPoints(-3);
  sumaSuperBallPoints(1);
  useHonorball.style.display = "none";
  buySuperball.style.display = "none";
}

function sumaSuperBallPoints(n) {
  superBallPoints += n;
  console.log("superball points: " + superBallPoints);
  guardarBallPoints();
  if (superBallPoints === 1) {
    ball7.classList.remove("locked");
  } else if (superBallPoints === 2) {
    ball7.classList.remove("locked");
    ball8.classList.remove("locked");
  } else if (superBallPoints === 3) {
    ball7.classList.remove("locked");
    ball8.classList.remove("locked");
    ball9.classList.remove("locked");
    useSuperball.style.display = "inline";
    buyUltraball.style.display = "inline";
    Swal.fire({
      title: `Ya tienes tres SuperBalls! <img class="ball-1" src="../img/3-superBall.png" alt="SuperBall">`,
      showDenyButton: true,
      denyButtonColor: "#3FB950",
      confirmButtonText: `Utilizar SuperBalls <img class="ball-1 buttonBall" src="../img/3-superBall.png" alt="SuperBall">`,
      denyButtonText: `Comprar UltraBall <img class="ball-1 buttonBall"
      src="../img/4-ultraBall.png" alt="ultraball">`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        pitySuperBall();
      } else if (result.isDenied) {
        swapBallToUltra();
      }
    });
  } else {
    ball7.classList.add("locked");
    ball8.classList.add("locked");
    ball9.classList.add("locked");
  }
}

function pitySuperBall() {
  ball7.classList.add("locked");
  ball8.classList.add("locked");
  ball9.classList.add("locked");
  useSuperball.style.display = "none";
  buyUltraball.style.display = "none";
  superBallPoints = 0;
  guardarBallPoints();
  selectorPitySistem(pokeSuper, superObtenido);
}

function swapBallToUltra() {
  sumaSuperBallPoints(-3);
  sumaUltraBallPoints(1);
  useSuperball.style.display = "none";
  buyUltraball.style.display = "none";
}

function sumaUltraBallPoints(n) {
  ultraBallPoints += n;
  guardarBallPoints();
  if (ultraBallPoints === 1) {
    ball10.classList.remove("locked");
  } else if (ultraBallPoints === 2) {
    ball10.classList.remove("locked");
    ball11.classList.remove("locked");
  } else if (ultraBallPoints === 3) {
    ball10.classList.remove("locked");
    ball11.classList.remove("locked");
    ball12.classList.remove("locked");
    useUltraball.style.display = "inline";
    buyMasterball.style.display = "inline";
    Swal.fire({
      title: `Ya tienes tres UltraBalls! <img class="ball-1" src="../img/4-ultraBall.png" alt="UltraBall">`,
      showDenyButton: true,
      denyButtonColor: "#3FB950",
      confirmButtonText: `Utilizar UltraBalls <img class="ball-1 buttonBall" src="../img/4-ultraBall.png" alt="ultraBall">`,
      denyButtonText: `Comprar MasterBall <img class="ball-1 buttonBall"
      src="../img/5-masterBall.png" alt="masterball">`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        pityUltraBall();
      } else if (result.isDenied) {
        swapBallToMaster();
      }
    });
  } else {
    ball10.classList.add("locked");
    ball11.classList.add("locked");
    ball12.classList.add("locked");
  }
}
function pityUltraBall() {
  ball10.classList.add("locked");
  ball11.classList.add("locked");
  ball12.classList.add("locked");
  useUltraball.style.display = "none";
  buyMasterball.style.display = "none";
  ultraBallPoints = 0;
  guardarBallPoints();
  selectorPitySistem(pokeUltra, ultraObtenido);
}

function swapBallToMaster() {
  sumaUltraBallPoints(-3);
  sumaMasterBallPoints(1);
  useUltraball.style.display = "none";
  buyMasterball.style.display = "none";
}

function sumaMasterBallPoints(n) {
  masterBallPoints += n;
  guardarBallPoints();
  if (masterBallPoints === 1) {
    ball13.classList.remove("locked");
  } else if (masterBallPoints === 2) {
    ball13.classList.remove("locked");
    ball14.classList.remove("locked");
  } else if (masterBallPoints === 3) {
    ball13.classList.remove("locked");
    ball14.classList.remove("locked");
    ball15.classList.remove("locked");
    useMasterball.style.display = "inline";
    usePokerandom.style.display = "inline";
    Swal.fire({
      title: `Ya tienes tres MasterBalls! <img class="ball-1" src="../img/5-masterBall.png" alt="masterBall">`,
      showDenyButton: true,
      denyButtonColor: "#3FB950",
      confirmButtonText: `Utilizar UltraBalls <img class="ball-1 buttonBall" src="../img/5-masterBall.png" alt="masterBall">`,
      denyButtonText: `Selecciona un Pokemon manualmente <img class="ball-1 buttonBall"
      src="../img/6-pokeRandom.png" alt="masterball">`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        pityMasterBall();
      } else if (result.isDenied) {
        seleccionarPokeManual();
      }
    });
  } else {
    ball13.classList.add("locked");
    ball14.classList.add("locked");
    ball15.classList.add("locked");
  }
}
function pityMasterBall() {
  ball13.classList.add("locked");
  ball14.classList.add("locked");
  ball15.classList.add("locked");
  useMasterball.style.display = "none";
  usePokerandom.style.display = "none";
  masterBallPoints = 0;
  guardarBallPoints();
  selectorPitySistem(pokeMaster, masterObtenido);
}

async function seleccionarPokeManual() {
  const { value: poke } = await Swal.fire({
    title: "Selecciona el Pokemon que necesitas",
    input: "number",
    inputLabel: "Ingresa el Numero",
    inputPlaceholder: "001",
    inputAttributes: {
      maxlength: 3,
    },
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Ingresa el numero del Pokemon que buscas";
      } else if (value.length > 3) {
        return "No puedes usar mas de 3 caracteres";
      } else if (pokemonObtenidos.includes(parseInt(value))) {
        return "Ese pokemon ya lo tienes!";
      }
    },
  });

  if (poke) {
    selectPoke(parseInt(poke));
  }
  useMasterball.style.display = "none";
  usePokerandom.style.display = "none";
}
checkPuntos();
export { sumaPokeBallPoints };
export { sumaHonorBallPoints };
export { sumaSuperBallPoints };
export { sumaUltraBallPoints };
export { sumaMasterBallPoints };

usePokeball.addEventListener("click", pityPokeBall);
useHonorball.addEventListener("click", pityHonorBall);
useSuperball.addEventListener("click", pitySuperBall);
useUltraball.addEventListener("click", pityUltraBall);
useMasterball.addEventListener("click", pityMasterBall);

buyHonorball.addEventListener("click", swapBallToHonor);
buySuperball.addEventListener("click", swapBallToSuper);
buyUltraball.addEventListener("click", swapBallToUltra);
buyMasterball.addEventListener("click", swapBallToMaster);
