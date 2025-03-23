const result = document.querySelector('.result')
const choices = document.querySelector('.choices')
const autoPlayButton = document.querySelector('.auto-play-button')
const ResetScoreButton = document.querySelector('.reset-score-button')

const placar = JSON.parse(localStorage.getItem('placar')) || {vitorias: 0, derrotas: 0, empates: 0}
// Busca no armazenamento local o placar, se não tiver, inicia com as contagens em 0.

updateScore()

function updateScore() {
    document.querySelector('.score').innerHTML = `Vitorias: ${placar.vitorias}, Derrotas: ${placar.derrotas}, Empates: ${placar.empates}` 
    // Atualiza a pontuação na tela.  
}

function escolha(jogador) {
    choices.innerHTML = ''
    const computer = escolhaComputer()

    result.innerHTML = 'JO'
    setTimeout(() => {result.innerHTML = 'KÊN'}, 1000)
    setTimeout(() => {result.innerHTML = 'PO'}, 2000)

    setTimeout (() => {
    if (jogador === computer) {
        placar.empates ++
        result.innerHTML = 'Empate!'
    } else if ((jogador === 'pedra' && computer === 'tesoura') ||
               (jogador === 'papel' && computer === 'pedra') ||
               (jogador === 'tesoura' && computer === 'papel')) {
                placar.vitorias ++
        result.innerHTML = 'Você Venceu!'
    } else {
        placar.derrotas ++
        result.innerHTML = 'Você Perdeu!'
    }

    localStorage.setItem('placar', JSON.stringify(placar))
    // Salva as informações do placar no armazenamento local.

    updateScore()

    choices.innerHTML = `Você <img class="move-icon" src="imagens/${jogador}-emoji.png">
    <img class="move-icon" src="imagens/${computer}-emoji.png"> Computador`
    // Imprime na tela a jogada tanto do jogador quanto do computador.
    }, 3000)
    // Utilização da função setTimeout para imprimir na tela JO-KÊN-PO cronometrado e apos isso imprimpir o resultado.
}

function escolhaComputer() {
    const opcoes = ['pedra', 'papel', 'tesoura']
    return opcoes[Math.floor(Math.random() * 3)]
    // Retorna aleatoriamente 'pedra', 'papel' ou 'tesoura' com probabilidade igual.
}

ResetScoreButton.addEventListener('click', () => showResetConfirmation())

function showResetConfirmation() {
    choices.innerHTML = `Tem certeza de que deseja zerar a pontuação? <button class="confirmation confirmation-yes">Sim</button>
    <button class="confirmation confirmation-no">Não</button>`
    
    document.querySelector('.confirmation-yes').addEventListener('click', () => {
        resetScore()
        choices.innerHTML = ''
    })

    document.querySelector('.confirmation-no').addEventListener('click', () => choices.innerHTML = '')
}

function resetScore() {
    placar.vitorias = 0; placar.derrotas = 0; placar.empates = 0

    localStorage.setItem('placar', JSON.stringify(placar))
    updateScore()

    choices.innerHTML = ''
    result.innerHTML = 'CLIQUE EM UM DOS BOTÕES PARA INICIAR'
    // Reseta toda as contagens para 0 e atualiza as informações na tela.
}

autoPlayButton.addEventListener('click', () => autoPlay())

let isInterval = null
let isAutoPlaying = false

function autoPlay() {
    if (!isAutoPlaying) {
        isInterval = setInterval(() => escolha(escolhaComputer()), 4000)
        isAutoPlaying = true

        autoPlayButton.innerHTML = 'Parar Jogada Automática'
    } else {
        clearInterval(isInterval)
        isAutoPlaying = false

        autoPlayButton.innerHTML = 'Jogada Automática'
    }
}

document.body.addEventListener('keydown', (event) => {
    if (event.key === '1'){
        escolha('pedra')
    } else if (event.key === '2'){
        escolha('papel')
    } else if (event.key === '3'){
        escolha('tesoura')
    } else if (event.key === 'a'){
        autoPlay()
    } else if (event.key === ' '){
        showResetConfirmation()
    }
    // Mapeamento de teclas
})