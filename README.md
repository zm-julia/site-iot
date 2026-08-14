# Indústria Conectada — Robôs Industriais e Sensores IoT

Site estático desenvolvido como avaliação prática da unidade curricular **Internet das Coisas**
(Curso Técnico em Desenvolvimento de Sistemas — SENAI SC).

Catálogo técnico e educativo apresentando:

- Os 7 principais modelos de robôs industriais (Cartesiano, SCARA, Articulado, Cilíndrico,
  Delta, Polar e Colaborativo), com conceito, funcionamento, características técnicas,
  aplicações, integração com IoT/automação e 3 modelos comerciais de fabricantes distintos
  para cada tipo.
- Mais de 20 sensores usados com Arduino, ESP32, Raspberry Pi e CLPs, organizados em 5
  categorias, cada um com conceito, princípio de funcionamento, especificações técnicas, tipo
  de sinal, aplicações, exemplo de uso e fabricantes/modelos comerciais.
- Uma página dedicada ao Arduino com 10 exemplos comentados de programação para leitura de
  sensores diferentes, além de um simulador interativo de leituras.

## Estrutura do projeto

```
index.html                 → Página inicial (conceitos de IoT, robótica e automação)
indexRobos.html             → Catálogo de robôs industriais
indexRobo*.html              → Ficha técnica de cada um dos 7 modelos de robô
indexSensoresIoT.html       → Página do Arduino + catálogo de sensores por categoria
indexSens*.html              → Fichas técnicas dos sensores, agrupadas por categoria
indexSobre.html             → Sobre o projeto e contexto acadêmico

style.css                   → Estilos da página inicial e dos hubs de navegação
styleDetalhe.css            → Estilos das páginas de ficha técnica (robôs e sensores)
scripts.js                  → Menu ativo, busca/filtro de sensores, abas e simulador de leitura

imagens/                    → Pasta com todas as ilustrações e ícones vetoriais (SVG) próprios
```

## Como visualizar

Basta abrir o arquivo `index.html` em qualquer navegador — não há dependências externas nem
processo de build. O projeto também pode ser publicado diretamente em serviços de hospedagem
estática, como Vercel ou GitHub Pages.

## Tecnologias

- HTML5 semântico
- CSS3 (Flexbox, gradientes, media queries para responsividade)
- JavaScript puro (sem frameworks)
- SVG para toda a parte gráfica (ícones, banners e logotipo)
