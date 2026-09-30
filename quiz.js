/* ============================================================
   Indústria Conectada - quiz.js
   Lógica do jogo de Quiz + banco de questões estilo SAEP/ENEM.
   ============================================================ */

// ---------------------------------------------------------------
// Banco de questões (10 no total):
// 1 Robô | 2 Sensores | 1 Multímetro | 2 Arduino | 1 ESP8266 | 3 Código
// Cada questão tem: tema, contexto, gatilho, mídia (opcional),
// 4 alternativas (apenas uma correta) e uma explicação de feedback.
// ---------------------------------------------------------------
const bancoQuestoes = [

  // 1) ROBÔ
  {
    tema: "Robótica Industrial",
    contexto: "Uma fábrica automotiva está automatizando a linha de solda a ponto de carrocerias de veículos. O setor de engenharia precisa escolher um robô cuja cinemática seja formada por juntas exclusivamente rotativas, dispostas em série, semelhantes à estrutura de um braço humano (ombro, cotovelo e punho), garantindo grande liberdade de orientação da tocha de solda em qualquer ponto da carroceria.",
    gatilho: "Considerando as classificações de robôs industriais apresentadas no catálogo técnico, qual modelo atende a essa exigência?",
    midia: null,
    alternativas: [
      "Robô Cartesiano, pois se movimenta apenas em três eixos lineares perpendiculares entre si.",
      "Robô Delta, pois sua estrutura paralela suspensa é voltada para movimentos leves e muito rápidos de picking.",
      "Robô Articulado, pois é formado por juntas rotativas em série, semelhante a um braço humano, com grande liberdade de orientação.",
      "Robô Cilíndrico, pois combina uma junta rotativa na base com eixos lineares, gerando uma área de trabalho cilíndrica."
    ],
    correta: 2,
    explicacao: "O robô Articulado é composto exclusivamente por juntas rotativas conectadas em série (como ombro, cotovelo e punho), o que lhe dá a maior liberdade de orientação entre os modelos apresentados — por isso é o mais usado em soldagem automotiva."
  },

  // 2) SENSOR 1
  {
    tema: "Sensores",
    contexto: "Em uma linha de envase, uma indústria de bebidas precisa detectar, sem contato físico, a presença de tampas metálicas antes de uma etapa de prensagem, mas não pode gerar falsas detecções quando embalagens plásticas vazias passam pela mesma esteira.",
    gatilho: "Qual sensor de proximidade é o mais adequado para esse cenário?",
    midia: null,
    alternativas: [
      "Sensor capacitivo LJ18A3, pois detecta qualquer tipo de material, inclusive plásticos.",
      "Sensor indutivo LJ12A3, pois detecta exclusivamente objetos metálicos, ignorando embalagens plásticas.",
      "Sensor PIR HC-SR501, pois detecta a variação de radiação infravermelha emitida por corpos quentes.",
      "Sensor LDR, pois mede a luminosidade do ambiente onde a esteira está instalada."
    ],
    correta: 1,
    explicacao: "O sensor indutivo gera um campo eletromagnético que só é perturbado por materiais metálicos (correntes de Foucault), por isso ignora embalagens plásticas vazias — diferente do capacitivo, que detecta qualquer material."
  },

  // 3) SENSOR 2
  {
    tema: "Sensores",
    contexto: "Uma cervejaria artesanal precisa monitorar continuamente a temperatura do líquido dentro de vários tanques de fermentação em pontos diferentes, usando um único fio de dados conectado a um Arduino, já que o espaço disponível dentro do painel elétrico é limitado.",
    gatilho: "Qual sensor é o mais indicado para essa aplicação?",
    midia: null,
    alternativas: [
      "DHT11, pois mede a temperatura do ar e a umidade relativa com boa precisão para líquidos.",
      "LM35, pois é um sensor analógico que dispensa qualquer tipo de calibração externa.",
      "DS18B20, pois é um sensor digital à prova d'água que utiliza o protocolo 1-Wire, permitindo vários sensores no mesmo fio de dados.",
      "LDR, pois sua resistência varia proporcionalmente à temperatura do ambiente."
    ],
    correta: 2,
    explicacao: "O DS18B20 é digital, resistente à imersão em líquidos e usa o protocolo 1-Wire, que permite que vários sensores compartilhem o mesmo fio de dados — ideal para monitorar vários tanques com poucos fios."
  },

  // 4) MULTÍMETRO (com imagem)
  {
    tema: "Multímetro",
    contexto: "Durante a manutenção de um painel elétrico industrial, um técnico suspeita que um fusível de proteção esteja rompido. Ele retira o fusível do circuito e realiza a medição apresentada na imagem, com o multímetro configurado no modo de teste de continuidade.",
    gatilho: "Com base na leitura exibida no display do multímetro, o que o técnico pode concluir sobre o estado do fusível?",
    midia: { tipo: "img", src: "./imagens/quiz/quiz-multimetro.png", alt: "Multímetro em modo de continuidade testando um fusível, com o display exibindo OL" },
    alternativas: [
      "O fusível está em bom estado, pois o display indica um valor de resistência igual a zero.",
      "O fusível está rompido, pois o display indica \"OL\" (circuito aberto), sinal de que não há continuidade elétrica entre os terminais.",
      "O fusível está em curto-circuito interno, já que o multímetro está configurado no modo de corrente.",
      "A medição é inconclusiva, pois o modo de continuidade não pode ser utilizado para testar fusíveis."
    ],
    correta: 1,
    explicacao: "A leitura \"OL\" (Open Line / overload) no modo de continuidade indica que não há caminho elétrico contínuo entre as pontas de prova — ou seja, o fusível está rompido internamente."
  },

  // 5) ARDUINO 1
  {
    tema: "Arduino",
    contexto: "Um estudante está montando um circuito com um Arduino Uno para acender um LED somente quando o nível de luminosidade do ambiente, capturado por um LDR, estiver abaixo de um valor mínimo definido no código.",
    gatilho: "Para capturar corretamente a variação contínua de luminosidade do LDR (um sinal analógico), qual função deve ser utilizada na leitura do sensor?",
    midia: null,
    alternativas: [
      "digitalRead(), pois todos os sensores do Arduino retornam sinais binários (LOW ou HIGH).",
      "analogRead(), pois o LDR gera um sinal analógico que é convertido pelo Arduino em um valor entre 0 e 1023.",
      "digitalWrite(), pois essa função é usada para realizar leituras de sensores conectados às portas digitais.",
      "Serial.read(), pois essa função é responsável por capturar sinais analógicos recebidos pela porta serial."
    ],
    correta: 1,
    explicacao: "O LDR produz um sinal contínuo (analógico), que precisa ser lido com analogRead(), função que converte a tensão recebida em um valor de 0 a 1023 usando o conversor analógico-digital (ADC) do Arduino."
  },

  // 6) ARDUINO 2
  {
    tema: "Arduino",
    contexto: "Um técnico em desenvolvimento de sistemas está corrigindo o código de um colega, que escreveu toda a lógica de configuração dos pinos (pinMode) dentro da função loop() em vez da função setup().",
    gatilho: "Qual é a principal consequência prática desse erro de organização do código no Arduino?",
    midia: null,
    alternativas: [
      "O código não compila, pois a função pinMode() só pode ser utilizada dentro de setup().",
      "O comportamento do programa não muda em nada, pois setup() e loop() são executadas exatamente na mesma ordem sempre.",
      "A configuração dos pinos passa a ser repetida a cada execução do laço principal, desperdiçando processamento, já que loop() se repete continuamente enquanto setup() deveria rodar apenas uma vez.",
      "O Arduino entra automaticamente em modo de baixo consumo ao detectar pinMode() fora de setup()."
    ],
    correta: 2,
    explicacao: "setup() executa uma única vez ao ligar a placa e é o local correto para configurações como pinMode(); loop() se repete indefinidamente, então colocar pinMode() nela faz a configuração ser refeita a cada ciclo, sem necessariamente quebrar o circuito, mas desperdiçando processamento."
  },

  // 7) ESP8266
  {
    tema: "ESP8266",
    contexto: "Uma startup de automação residencial precisa desenvolver um protótipo de tomada inteligente capaz de ser ligada e desligada remotamente por um aplicativo de celular, conectando-se diretamente à rede Wi-Fi doméstica, sem a necessidade de um módulo de rede adicional.",
    gatilho: "Entre os componentes apresentados no catálogo, qual é o mais indicado para esse protótipo, considerando o requisito de conectividade?",
    midia: null,
    alternativas: [
      "Arduino Uno, pois seu processador de 16 MHz é suficiente para controlar qualquer tipo de rede sem fio.",
      "ESP8266, pois é um SoC que já integra um módulo Wi-Fi 802.11 b/g/n, dispensando hardware de rede adicional.",
      "Sensor DHT11, pois é o único componente do catálogo capaz de se conectar a redes Wi-Fi.",
      "Módulo RFID MFRC522, pois utiliza radiofrequência para se comunicar diretamente com a internet."
    ],
    correta: 1,
    explicacao: "O ESP8266 é um System-on-Chip que já integra Wi-Fi 802.11 b/g/n, permitindo conectar o protótipo diretamente à rede doméstica sem nenhum módulo de rede externo, ao contrário do Arduino Uno."
  },

  // 8) CÓDIGO 1 (com imagem de código)
  {
    tema: "Leitura de Código",
    contexto: "Em uma bancada de testes, um técnico programou o trecho de código exibido na imagem para controlar um LED indicador conectado a um Arduino Uno, a partir da leitura de um sensor analógico.",
    gatilho: "Considerando o código apresentado, em qual situação o LED permanecerá aceso?",
    midia: { tipo: "img", src: "./imagens/quiz/quiz-codigo1.png", alt: "Código Arduino que liga um LED quando a leitura de um sensor analógico ultrapassa 600" },
    alternativas: [
      "O LED permanece aceso sempre que a leitura do sensor for menor que 600.",
      "O LED permanece aceso sempre que a leitura do sensor for maior que 600.",
      "O LED pisca continuamente, independentemente do valor lido pelo sensor.",
      "O LED nunca acende, pois a variável limite nunca é comparada com a leitura do sensor."
    ],
    correta: 1,
    explicacao: "A condição \"if (leitura > limite)\" liga o LED (HIGH) somente quando o valor lido no sensor analógico for maior que 600; caso contrário, o LED é desligado (LOW)."
  },

  // 9) CÓDIGO 2 (com imagem de código)
  {
    tema: "Leitura de Código",
    contexto: "Durante uma aula prática, uma estudante escreveu o programa Arduino exibido na imagem e o carregou na placa, abrindo em seguida o Monitor Serial para observar o resultado impresso.",
    gatilho: "Qual valor será exibido no Monitor Serial após a execução deste programa?",
    midia: { tipo: "img", src: "./imagens/quiz/quiz-codigo2.png", alt: "Código Arduino com um laço for que soma os valores de 1 a 5 em uma variável contador" },
    alternativas: [
      "5",
      "10",
      "15",
      "25"
    ],
    correta: 2,
    explicacao: "O laço \"for\" soma os valores de i de 1 até 5 na variável contador: 1+2+3+4+5 = 15, valor que é impresso no Monitor Serial com Serial.println(contador)."
  },

  // 10) CÓDIGO 3 (com imagem de código)
  {
    tema: "Leitura de Código",
    contexto: "Uma empresa de segurança patrimonial instalou um sistema de alarme com um sensor de movimento (PIR) e um sensor magnético de porta (reed switch), controlados pelo código Arduino exibido na imagem.",
    gatilho: "De acordo com a lógica implementada no código, em qual situação o buzzer (alarme sonoro) será acionado?",
    midia: { tipo: "img", src: "./imagens/quiz/quiz-codigo3.png", alt: "Código Arduino que aciona um buzzer quando há movimento OU a porta é aberta, usando o operador ||" },
    alternativas: [
      "Somente quando o movimento e a abertura da porta forem detectados ao mesmo tempo.",
      "Somente quando a porta for aberta, independentemente da detecção de movimento.",
      "Quando houver movimento OU a porta for aberta, bastando que uma das duas condições ocorra.",
      "O buzzer nunca será acionado, pois o operador lógico || sempre retorna falso nesse contexto."
    ],
    correta: 2,
    explicacao: "O operador lógico \"||\" (OU) faz a condição ser verdadeira quando pelo menos uma das duas variáveis for HIGH — ou seja, o alarme dispara tanto com movimento quanto com a porta aberta, não sendo necessário que as duas ocorram juntas."
  },
];

// ---------------------------------------------------------------
// Estado do jogo
// ---------------------------------------------------------------
let ordemQuestoes = [];
let indiceAtual = 0;
let acertos = 0;
let erros = 0;
let respondeuAtual = false;

const letras = ["A", "B", "C", "D"];

function embaralhar(array) {
  const copia = array.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function iniciarQuiz() {
  ordemQuestoes = embaralhar(bancoQuestoes.map((_, i) => i));
  indiceAtual = 0;
  acertos = 0;
  erros = 0;

  document.getElementById("telaIntro").style.display = "none";
  document.getElementById("telaResultado").classList.remove("ativo");
  document.getElementById("quizContainer").classList.add("ativo");

  renderizarQuestaoAtual();
}

function renderizarQuestaoAtual() {
  respondeuAtual = false;
  const q = bancoQuestoes[ordemQuestoes[indiceAtual]];
  const total = bancoQuestoes.length;

  document.getElementById("progressoTexto").textContent = `Questão ${indiceAtual + 1} de ${total}`;
  document.getElementById("progressoPlacar").textContent = `Acertos: ${acertos} · Erros: ${erros}`;
  document.getElementById("barraPreenchida").style.width = `${(indiceAtual / total) * 100}%`;

  document.getElementById("questaoTema").textContent = q.tema;
  document.getElementById("questaoContexto").textContent = q.contexto;
  document.getElementById("questaoGatilho").textContent = q.gatilho;

  const midiaEl = document.getElementById("questaoMidia");
  midiaEl.innerHTML = "";
  if (q.midia && q.midia.tipo === "img") {
    const img = document.createElement("img");
    img.src = q.midia.src;
    img.alt = q.midia.alt || "";
    midiaEl.appendChild(img);
  }

  const altEl = document.getElementById("questaoAlternativas");
  altEl.innerHTML = "";
  q.alternativas.forEach((texto, i) => {
    const div = document.createElement("div");
    div.className = "quiz-alt";
    div.setAttribute("data-indice", i);
    div.innerHTML = `<span class="letra">${letras[i]}</span><span>${texto}</span>`;
    div.addEventListener("click", () => selecionarAlternativa(i));
    altEl.appendChild(div);
  });

  const feedbackEl = document.getElementById("questaoFeedback");
  feedbackEl.className = "quiz-feedback";
  feedbackEl.textContent = "";

  document.getElementById("btnProxima").style.display = "none";
}

function selecionarAlternativa(indiceEscolhido) {
  if (respondeuAtual) return; // impede responder duas vezes
  respondeuAtual = true;

  const q = bancoQuestoes[ordemQuestoes[indiceAtual]];
  const opcoes = document.querySelectorAll("#questaoAlternativas .quiz-alt");

  opcoes.forEach((op) => op.classList.add("desabilitada"));

  const acertou = indiceEscolhido === q.correta;
  if (acertou) {
    acertos++;
    opcoes[indiceEscolhido].classList.add("correta");
  } else {
    erros++;
    opcoes[indiceEscolhido].classList.add("incorreta");
    opcoes[q.correta].classList.add("correta");
  }

  const feedbackEl = document.getElementById("questaoFeedback");
  feedbackEl.classList.add("mostrar", acertou ? "ok" : "erro");
  feedbackEl.innerHTML = `<strong>${acertou ? "✅ Resposta correta!" : "❌ Resposta incorreta."}</strong><br>${q.explicacao}`;

  document.getElementById("progressoPlacar").textContent = `Acertos: ${acertos} · Erros: ${erros}`;

  const btnProxima = document.getElementById("btnProxima");
  btnProxima.style.display = "inline-block";
  btnProxima.textContent = (indiceAtual === bancoQuestoes.length - 1) ? "Ver resultado →" : "Próxima questão →";
}

function proximaQuestao() {
  if (indiceAtual < bancoQuestoes.length - 1) {
    indiceAtual++;
    renderizarQuestaoAtual();
  } else {
    finalizarQuiz();
  }
}

function finalizarQuiz() {
  const total = bancoQuestoes.length;
  document.getElementById("barraPreenchida").style.width = "100%";
  document.getElementById("quizContainer").classList.remove("ativo");
  document.getElementById("telaResultado").classList.add("ativo");

  document.getElementById("placarFinal").textContent = `${acertos} / ${total}`;
  document.getElementById("totalAcertos").textContent = acertos;
  document.getElementById("totalErros").textContent = erros;

  let mensagem;
  const percentual = acertos / total;
  if (percentual === 1) {
    mensagem = "Nota máxima! Você domina robótica industrial, sensores, multímetro, Arduino, ESP8266 e leitura de código.";
  } else if (percentual >= 0.7) {
    mensagem = "Muito bom! Você já tem uma base sólida sobre os conteúdos do catálogo, com pequenos pontos para revisar.";
  } else if (percentual >= 0.4) {
    mensagem = "Bom começo! Vale revisar as páginas de Robôs, Sensores IoT e Projetos (Tinkercad) para fortalecer os pontos que errou.";
  } else {
    mensagem = "Continue estudando! Percorra as páginas de Robôs, Sensores IoT e ESP8266 do site e tente o quiz novamente.";
  }
  document.getElementById("mensagemFinal").textContent = mensagem;
}

function reiniciarQuiz() {
  document.getElementById("telaResultado").classList.remove("ativo");
  document.getElementById("telaIntro").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const btnJogar = document.getElementById("btnJogar");
  const btnProxima = document.getElementById("btnProxima");
  const btnJogarNovamente = document.getElementById("btnJogarNovamente");

  if (btnJogar) btnJogar.addEventListener("click", iniciarQuiz);
  if (btnProxima) btnProxima.addEventListener("click", proximaQuestao);
  if (btnJogarNovamente) btnJogarNovamente.addEventListener("click", reiniciarQuiz);
});
