const NOME_DELA = "Bia";
const INICIAL_DELA = "B";
const DATA_INICIO_NAMORO = "2026-01-24T15:30:00-03:00";
const TEMPO_LOADING_MS = 7600;

const FRASES_ROMANTICAS = {
  intro: "Desde o primeiro dia, cada detalhe ficou mais bonito porque existe você.",
  contador: "E a nossa história continua florescendo.",
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
const mainSite = document.querySelector("#mainSite");
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
const heartWebgl = document.querySelector("#heartWebgl");
const heartParticlePath = document.querySelector("#heartParticlePath");

let fotoAtual = 0;
let intervaloCarrossel;
let pararAnimacaoLoading = () => {};

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

function configurarAnimacaoLoading() {
  const THREE = window.THREE;
  const gsap = window.gsap;

  if (!loadingScreen || !heartWebgl || !heartParticlePath || !THREE || !gsap) {
    configurarAnimacaoCanvasFallback();
    return;
  }

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    const controlsWebGL = window.THREE.OrbitControls
      ? new THREE.OrbitControls(camera, renderer.domElement)
      : null;
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });
    const length = heartParticlePath.getTotalLength();
    const vertices = [];
    let animationFrameId = 0;

    const ajustarDistanciaDaCamera = () => {
      camera.position.z = window.innerWidth < window.innerHeight ? 960 : 500;
    };

    ajustarDistanciaDaCamera();
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    heartWebgl.appendChild(renderer.domElement);

    if (controlsWebGL) {
      controlsWebGL.enableDamping = true;
    }

    for (let i = 0; i < length; i += 0.1) {
      const point = heartParticlePath.getPointAtLength(i);
      const vector = new THREE.Vector3(point.x, -point.y, 0);

      vector.x += (Math.random() - 0.5) * 30;
      vector.y += (Math.random() - 0.5) * 30;
      vector.z += (Math.random() - 0.5) * 70;

      vertices.push(vector);

      tl.from(
        vector,
        {
          x: 600 / 2,
          y: -552 / 2,
          z: 0,
          ease: "power2.inOut",
          duration: "random(2, 5)",
        },
        i * 0.002
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
    const material = new THREE.PointsMaterial({
      color: 0xee5282,
      blending: THREE.AdditiveBlending,
      size: 3,
    });
    const particles = new THREE.Points(geometry, material);

    particles.position.x -= 600 / 2;
    particles.position.y += 552 / 2;
    scene.add(particles);

    const rotationTween = gsap.fromTo(
      scene.rotation,
      {
        y: -0.2,
      },
      {
        y: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        duration: 3,
      }
    );

    const onWindowResize = () => {
      ajustarDistanciaDaCamera();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
      geometry.setFromPoints(vertices);
      if (controlsWebGL) {
        controlsWebGL.update();
      }
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", onWindowResize, false);
    animationFrameId = window.requestAnimationFrame(render);

    pararAnimacaoLoading = () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onWindowResize);
      tl.kill();
      rotationTween.kill();
      if (controlsWebGL) {
        controlsWebGL.dispose();
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  } catch (error) {
    configurarAnimacaoCanvasFallback();
  }
}

function configurarAnimacaoCanvasFallback() {
  if (!loadingScreen || !heartWebgl || !heartParticlePath) {
    return;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const pathLength = heartParticlePath.getTotalLength();
  const particles = [];
  let animationFrameId = 0;
  let startTime = performance.now();

  heartWebgl.appendChild(canvas);

  const resize = () => {
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    canvas.width = Math.floor(window.innerWidth * pixelRatio);
    canvas.height = Math.floor(window.innerHeight * pixelRatio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const scale = () => Math.min(window.innerWidth / 760, window.innerHeight / 710, 1.05);

  for (let distance = 0; distance < pathLength; distance += 0.45) {
    const point = heartParticlePath.getPointAtLength(distance);

    particles.push({
      x: point.x + (Math.random() - 0.5) * 30,
      y: point.y + (Math.random() - 0.5) * 30,
      z: (Math.random() - 0.5) * 70,
      delay: distance * 2,
      duration: 2000 + Math.random() * 3000,
    });
  }

  const easeInOut = (value) => {
    const clamped = Math.max(0, Math.min(1, value));
    return clamped < 0.5
      ? 2 * clamped * clamped
      : 1 - ((-2 * clamped + 2) ** 2) / 2;
  };

  const render = (time) => {
    const elapsed = (time - startTime) % 7600;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const currentScale = scale();

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "#ee5282";

    particles.forEach((particle) => {
      const cycle = particle.duration * 2;
      const local = Math.max(0, (elapsed - particle.delay) % cycle);
      const forward = local <= particle.duration;
      const rawProgress = forward ? local / particle.duration : 1 - ((local - particle.duration) / particle.duration);
      const progress = easeInOut(rawProgress);
      const startX = 300;
      const startY = 276;
      const x = startX + (particle.x - startX) * progress;
      const y = startY + (particle.y - startY) * progress;
      const projectedScale = currentScale * (1 + particle.z / 900);

      context.globalAlpha = Math.max(0.2, progress);
      context.fillRect(
        centerX + (x - 300) * projectedScale,
        centerY + (y - 276) * projectedScale,
        2.4,
        2.4
      );
    });

    context.globalAlpha = 1;
    animationFrameId = window.requestAnimationFrame(render);
  };

  resize();
  window.addEventListener("resize", resize, false);
  animationFrameId = window.requestAnimationFrame(render);

  pararAnimacaoLoading = () => {
    window.cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };
}

function revelarSite() {
  window.setTimeout(() => {
    if (mainSite) {
      mainSite.classList.add("is-visible");
    }

    if (!loadingScreen) {
      return;
    }

    loadingScreen.classList.add("is-hidden");
    loadingScreen.setAttribute("aria-hidden", "true");

    let overlayRemovido = false;
    const removerOverlay = () => {
      if (overlayRemovido) {
        return;
      }

      overlayRemovido = true;
      pararAnimacaoLoading();
      loadingScreen.remove();
    };

    window.setTimeout(removerOverlay, 120);
  }, TEMPO_LOADING_MS);
}

flowerImage.addEventListener("error", () => {
  flowerImage.classList.add("is-missing");
  flowerImage.alt = "Adicione os GIFs em assets/fotosFlor com os nomes flor.gif, flor2.gif, flor3.gif e flor4.gif.";
});

configurarAnimacaoLoading();
atualizarInformacoesDoCasal();
configurarCarrossel();
revelarSite();
