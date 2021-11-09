// declaração das variáveis
const baralho = []
const naipes = ["copas", "paus", "ouros", "espadas"]
const letras = ["A", "J", "Q", "K"]

// criar uma referência aos elementos da página sobre os quais o programa vai "agir"
const btComprarCarta = document.querySelector("#btComprarCarta")
const btApostar = document.querySelector("#btApostar")
const mensagem = document.querySelector(".mensagem")
const cards = document.querySelectorAll(".card-body")
const localPontos = document.querySelectorAll("span")

let quantCartas = 52
let pontosVoce = 0
let pontosPC = 0

// function montaBaralho() {}
const montaBaralho = () => {
  for (let i = 2; i <= 10; i++) {
    for (let naipe of naipes) {
      baralho.push(`${i}_${naipe}`)
    }
  }
  for (let letra of letras) {
    for (let naipe of naipes) {
      baralho.push(`${letra}_${naipe}`)
    }
  }
  //console.log(baralho)
}

montaBaralho()

// function pontosSimbolo(carta) { }
const pontosSimbolo = (carta) => {
  const simbolo = carta.substr(0, carta.indexOf("_"))
  let peso
  if (letras.includes(simbolo)) {
    if (simbolo == "A") {
      peso = 11
    } else {
      peso = 10
    }
  } else {
    peso = Number(simbolo)
  }
  return peso
}

btComprarCarta.addEventListener("click", () => {
  // sorteia um valor de forma aleatória que irá corresponder a carta obtida pelo jogador
  // e que será retirada do baralho
  const posicao = Math.floor(Math.random() * quantCartas);
  quantCartas--;

  // retira a carta do baralho e obtém essa carta
  const carta = baralho.splice(posicao, 1).toString()

  // cria uma imagem e define o atributo src para a imagem obtida
  const imgCarta = document.createElement("img")
  imgCarta.src = `/img/cartas/${carta}.png`
  imgCarta.alt = `/img/Carta ${carta}`
  cards[0].append(imgCarta)


  pontosVoce += pontosSimbolo(carta)
  localPontos[0].textContent = pontosVoce

  if (pontosVoce > 21) {
    mensagem.classList.add("alert")
    mensagem.classList.add("alert-danger")
    mensagem.innerHTML = "<h4><b>Ah... passou dos 21... Você perdeu!</b></h4>"
  }
})

btApostar.addEventListener("click", () => {
  // sorteia um valor de forma aleatória que irá corresponder a carta obtida pelo jogador
  // e que sesá retirada do baralho
  const posicao = Math.floor(Math.random() * quantCartas);
  quantCartas--;

  // retira a carta do baralho e obtém essa carta
  const carta = baralho.splice(posicao, 1).toString()

  // cria uma imagem e define o atributo src para a imagem obtida
  const imgCarta = document.createElement("img")
  imgCarta.src = `cartas/${carta}.png`
  imgCarta.alt = `Carta ${carta}`
  cards[1].append(imgCarta)

  pontosPC += pontosSimbolo(carta)
  localPontos[1].textContent = pontosPC

  if (pontosVoce > 21) {
    mensagem.classList.add("alert")
    mensagem.classList.add("alert-danger")
    mensagem.innerHTML = "<h4><b>Ah... passou dos 21... Você perdeu!</b></h4>"
  }
})

// aposta
btApostar.addEventListener("click", () => {

    do {
      // sorteia um valor de forma aleatória que irá corresponder a carta obtida pelo jogador
      // e que será retirada do baralho
      const posicao = Math.floor(Math.random() * quantCartas);
      quantCartas--;

      // retira a carta do baralho e obtém essa carta
      const carta = baralho.splice(posicao, 1).toString()
  
      // cria uma imagem e define o atributo src para a imagem obtida
      const imgCarta = document.createElement("img")
      imgCarta.src = `/img/cartas/${carta}.png`
      imgCarta.alt = `/img/Carta ${carta}`  
      cards[1].append(imgCarta)
  
      pontosPC += pontosSimbolo(carta)
      localPontos[1].textContent = pontosPC
    } while (pontosPC < pontosVoce)  
  
    mensagem.classList.add("alert")
    if (pontosVoce == pontosPC) {
      mensagem.classList.add("alert-success")
      mensagem.innerHTML = "<h4><b>Empate... Ninguém venceu essa!</b></h4>"
    } else if (pontosPC > 21) {
      mensagem.classList.add("alert-primary")
      mensagem.innerHTML = "<h4><b>Parabéns... Você venceu a máquina!!</b></h4>"
    } else {
      mensagem.classList.add("alert-danger")
      mensagem.innerHTML = "<h4><b>Ahh... Não foi dessa vez... Você perdeu!</b></h4>"
    }
  })