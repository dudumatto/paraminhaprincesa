const NOME_DELA = "Bia";
const INICIAL_DELA = "B";
const DATA_INICIO_NAMORO = "2026-01-24T15:30:00-03:00";

const FRASES_ROMANTICAS = {
  intro: "Desde o primeiro dia, cada detalhe ficou mais bonito porque existe voce.",
  contador: "E a nossa historia continua florescendo.",
  mensagem:
    `Meu amor,

Desde que começamos a conversar, eu sempre senti algo especial por você. Comecei a gostar de você muito antes do que imagina.

Desde o nosso primeiro beijo até hoje, eu venho me apaixonando cada vez mais por ti, percebendo o quanto você é uma pessoa incrível, de coração bom, linda e maravilhosa.

Mesmo com as nossas brigas e com tudo o que acontece às vezes, eu nunca deixei de te amar. E não é só pela sua beleza, mas principalmente pelo seu jeito comigo: carinhosa, cuidadosa e cheia de amor nos pequenos detalhes.

Às vezes eu brigo ou chamo sua atenção não porque eu queira estar certo ou porque sou chato, mas porque quero ver a pessoa que eu amo cada vez melhor, feliz e realizando tudo o que merece.

Você é a mulher mais linda desse mundo, tanto por fora quanto por dentro. Seu sorriso, seu jeito, seu coração… tudo em você me faz te amar ainda mais.

E eu quero que você nunca esqueça disso:

EEEEUUUUUU TEEEEEE AAAAAAMMMMMMMOOOOOO MUUUUUUUUIIIIIITOOOOOOO, meu neném mais lindo desse mundo. 💖

Minha princesa, meu amor e a futura mãe dos meus filhos.`,
};

const FOTOS_CARROSSEL = [
  "assets/fotosCarrosel/IMG-20251014-WA0014.jpg",
  "assets/fotosCarrosel/IMG-20251112-WA0119.jpg",
  "assets/fotosCarrosel/IMG-20251112-WA0121.jpg",
  "assets/fotosCarrosel/IMG-20260520-WA0019.jpg",
  "assets/fotosCarrosel/IMG-20260520-WA0026.jpg",
  "assets/fotosCarrosel/IMG-20260520-WA0030.jpg",
  "assets/fotosCarrosel/IMG-20260520-WA0033.jpg",
  "assets/fotosCarrosel/IMG-20260520-WA0035.jpg",
  "assets/fotosCarrosel/IMG-20260520-WA0043.jpg",
  "assets/fotosCarrosel/IMG-20260520-WA0048.jpg",
  "assets/fotosCarrosel/IMG-20260520-WA0067.jpg",
  "assets/fotosCarrosel/IMG-20260520-WA0069.jpg",
  "assets/fotosCarrosel/IMG_20251219_211429_203.jpg",
];

const ESTAGIOS_FLOR = [
  {
    limite: 30,
    imagem: "assets/fotosFlor/flor.gif",
    texto: "Nossa flor ainda e um broto, guardando tudo que esta por florescer.",
  },
  {
    limite: 90,
    imagem: "assets/fotosFlor/flor2.gif",
    texto: "Nossa flor esta crescendo com cada memoria que a gente cria.",
  },
  {
    limite: 180,
    imagem: "assets/fotosFlor/flor3.gif",
    texto: "Nossa flor ficou mais forte, bonita e cheia de cuidado.",
  },
  {
    limite: Infinity,
    imagem: "assets/fotosFlor/flor4.gif",
    texto: "Nossa flor floresceu com o tempo, como o amor que a gente escolhe todo dia.",
  },
];

const loadingScreen = document.querySelector("#loadingScreen");
const heartLoader = document.querySelector("#heartLoader");
const mainSite = document.querySelector("#mainSite");
const loadingInitial = document.querySelector("#loadingInitial");
const partnerNameTitle = document.querySelector("#partnerNameTitle");
const romanticIntro = document.querySelector("#romanticIntro");
const daysTogether = document.querySelector("#daysTogether");
const counterPhrase = document.querySelector("#counterPhrase");
const flowerImage = document.querySelector("#flowerImage");
const stageText = document.querySelector("#stageText");
const carouselImage = document.querySelector("#carouselImage");
const photoPlaceholder = document.querySelector("#photoPlaceholder");
const prevPhoto = document.querySelector("#prevPhoto");
const nextPhoto = document.querySelector("#nextPhoto");
const carouselDots = document.querySelector("#carouselDots");
const romanticMessage = document.querySelector("#romanticMessage");

let fotoAtual = 0;
let intervaloCarrossel;

function criarCoracaoDePalavras() {
  const pontos = 92;
  const escala = Math.min(11, heartLoader.clientWidth / 38);

  for (let i = 0; i < pontos; i += 1) {
    const t = (Math.PI * 2 * i) / pontos;
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const palavra = document.createElement("span");

    palavra.className = "heart-word";
    palavra.textContent = i % 3 === 0 ? "I love you" : "te amo";
    palavra.style.transform = `translate(calc(-50% + ${x * escala}px), calc(-50% + ${-y * escala}px)) rotate(${x * 1.8}deg)`;
    palavra.style.animationDelay = `${120 + i * 11}ms`;

    heartLoader.appendChild(palavra);
  }
}

function calcularDiasJuntos(dataInicial) {
  const inicio = new Date(dataInicial);
  const hoje = new Date();
  const diferenca = hoje.getTime() - inicio.getTime();

  return Math.max(0, Math.floor(diferenca / 86400000));
}

function atualizarInformacoesDoCasal() {
  const dias = calcularDiasJuntos(DATA_INICIO_NAMORO);
  const estagio = ESTAGIOS_FLOR.find((item) => dias <= item.limite);

  document.title = `Para ${NOME_DELA}`;
  loadingInitial.textContent = INICIAL_DELA;
  partnerNameTitle.textContent = NOME_DELA;
  romanticIntro.textContent = FRASES_ROMANTICAS.intro;
  daysTogether.textContent = `Estamos juntos ha ${dias} ${dias === 1 ? "dia" : "dias"}`;
  counterPhrase.textContent = FRASES_ROMANTICAS.contador;
  romanticMessage.textContent = FRASES_ROMANTICAS.mensagem;

  flowerImage.src = estagio.imagem;
  flowerImage.alt = `Flor do relacionamento - ${estagio.texto}`;
  stageText.textContent = estagio.texto;
}

function criarIndicadoresDoCarrossel() {
  carouselDots.innerHTML = "";

  FOTOS_CARROSSEL.forEach((_, indice) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "carousel-dot";
    botao.setAttribute("aria-label", `Mostrar foto ${indice + 1}`);
    botao.addEventListener("click", () => mostrarFoto(indice));
    carouselDots.appendChild(botao);
  });
}

function atualizarIndicadores() {
  const dots = carouselDots.querySelectorAll(".carousel-dot");
  dots.forEach((dot, indice) => {
    dot.classList.toggle("is-active", indice === fotoAtual);
  });
}

function mostrarFoto(indice) {
  fotoAtual = (indice + FOTOS_CARROSSEL.length) % FOTOS_CARROSSEL.length;
  carouselImage.classList.add("is-changing");

  window.setTimeout(() => {
    carouselImage.src = FOTOS_CARROSSEL[fotoAtual];
    carouselImage.alt = `Memoria do casal ${fotoAtual + 1}`;
    atualizarIndicadores();
    carouselImage.classList.remove("is-changing");
  }, 180);

  reiniciarCarrosselAutomatico();
}

function reiniciarCarrosselAutomatico() {
  window.clearInterval(intervaloCarrossel);
  intervaloCarrossel = window.setInterval(() => {
    mostrarFoto(fotoAtual + 1);
  }, 4000);
}

function configurarCarrossel() {
  criarIndicadoresDoCarrossel();
  carouselImage.addEventListener("error", () => {
    photoPlaceholder.classList.add("is-visible");
  });

  carouselImage.addEventListener("load", () => {
    photoPlaceholder.classList.remove("is-visible");
  });

  prevPhoto.addEventListener("click", () => mostrarFoto(fotoAtual - 1));
  nextPhoto.addEventListener("click", () => mostrarFoto(fotoAtual + 1));
  mostrarFoto(0);
}

function revelarSite() {
  window.setTimeout(() => {
    loadingScreen.classList.add("is-hidden");
    mainSite.classList.add("is-visible");
  }, 3600);
}

flowerImage.addEventListener("error", () => {
  flowerImage.classList.add("is-missing");
  flowerImage.alt = "Adicione os GIFs em assets/fotosFlor com os nomes flor.gif, flor2.gif, flor3.gif e flor4.gif.";
});

criarCoracaoDePalavras();
atualizarInformacoesDoCasal();
configurarCarrossel();
revelarSite();
