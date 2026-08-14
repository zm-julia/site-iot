
function marcarMenuAtivo() {
  const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((link) => {
    const destino = link.getAttribute("href").replace("./", "");
    if (destino === paginaAtual) {
      link.classList.add("ativo");
    }
  });
}


function filtrarCards() {
  const campoBusca = document.getElementById("buscaSensor");
  const filtroCategoria = document.getElementById("filtroCategoria");
  if (!campoBusca) return;

  const termo = campoBusca.value.trim().toLowerCase();
  const categoria = filtroCategoria ? filtroCategoria.value : "todas";
  const fichas = document.querySelectorAll(".ficha[data-nome]");
  let visiveis = 0;

  fichas.forEach((ficha) => {
    const nome = (ficha.dataset.nome || "").toLowerCase();
    const cat = ficha.dataset.categoria || "";
    const bateNome = nome.includes(termo);
    const bateCategoria = categoria === "todas" || cat === categoria;

    if (bateNome && bateCategoria) {
      ficha.style.display = "";
      visiveis++;
    } else {
      ficha.style.display = "none";
    }
  });

  const aviso = document.getElementById("semResultado");
  if (aviso) {
    aviso.style.display = visiveis === 0 ? "block" : "none";
  }
}


function ativarRolagemSuave() {
  document.querySelectorAll('.indice a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (evento) {
      const destino = document.querySelector(this.getAttribute("href"));
      if (destino) {
        evento.preventDefault();
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}


const faixasSimulador = {
  dht11: { min: 20, max: 32, unidade: "°C", label: "Temperatura (DHT11)" },
  ldr: { min: 0, max: 1023, unidade: "", label: "Luminosidade (LDR - leitura ADC)" },
  hcsr04: { min: 2, max: 400, unidade: "cm", label: "Distância (HC-SR04)" },
  mq2: { min: 100, max: 900, unidade: "ppm", label: "Gás/Fumaça (MQ-2)" },
  acs712: { min: 0, max: 5, unidade: "A", label: "Corrente elétrica (ACS712)" },
};

function simularLeitura() {
  const seletor = document.getElementById("sensorSimulado");
  const saida = document.getElementById("saidaSimulador");
  if (!seletor || !saida) return;

  const chave = seletor.value;
  const faixa = faixasSimulador[chave];
  const valor = (Math.random() * (faixa.max - faixa.min) + faixa.min).toFixed(1);
  const agora = new Date().toLocaleTimeString("pt-BR");

  const linha = document.createElement("p");
  linha.innerHTML = `<strong>[${agora}]</strong> ${faixa.label}: <span style="color:#4fd7ff">${valor} ${faixa.unidade}</span>`;
  saida.prepend(linha);

  
  while (saida.children.length > 6) {
    saida.removeChild(saida.lastChild);
  }
}


function abrirAba(idAba, botao) {
  const container = botao.closest(".abas-wrapper");
  if (!container) return;

  container.querySelectorAll(".aba-conteudo").forEach((c) => c.classList.remove("aba-ativa"));
  container.querySelectorAll(".aba-botao").forEach((b) => b.classList.remove("aba-botao-ativo"));

  document.getElementById(idAba).classList.add("aba-ativa");
  botao.classList.add("aba-botao-ativo");
}


function abrirLightbox(src, titulo, descricao) {
  const overlay = document.getElementById("lightboxOverlay");
  const imagem = document.getElementById("lightboxImagem");
  const tituloEl = document.getElementById("lightboxTitulo");
  const descEl = document.getElementById("lightboxDescricao");
  if (!overlay) return;

  imagem.src = src;
  imagem.alt = titulo;
  tituloEl.textContent = titulo;
  descEl.textContent = descricao;
  overlay.classList.add("ativo");
}

function fecharLightbox() {
  const overlay = document.getElementById("lightboxOverlay");
  if (overlay) overlay.classList.remove("ativo");
}


document.addEventListener("DOMContentLoaded", function () {
  marcarMenuAtivo();
  ativarRolagemSuave();

  const campoBusca = document.getElementById("buscaSensor");
  if (campoBusca) {
    campoBusca.addEventListener("input", filtrarCards);
  }
  const filtroCategoria = document.getElementById("filtroCategoria");
  if (filtroCategoria) {
    filtroCategoria.addEventListener("change", filtrarCards);
  }

  const botaoSimular = document.getElementById("botaoSimular");
  if (botaoSimular) {
    botaoSimular.addEventListener("click", simularLeitura);
  }

  const overlayGaleria = document.getElementById("lightboxOverlay");
  if (overlayGaleria) {
    overlayGaleria.addEventListener("click", function (evento) {
      if (evento.target === overlayGaleria) fecharLightbox();
    });
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") fecharLightbox();
    });
  }
});
