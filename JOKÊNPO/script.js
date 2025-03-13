document.getElementById('pedra').addEventListener('click', () => escolha('pedra'))
document.getElementById('papel').addEventListener('click', () => escolha('papel'))
document.getElementById('tesoura').addEventListener('click', () => escolha('tesoura'))

const result = document.querySelector('.result')
const score = document.querySelector('.score')
const choices = document.querySelector('.choices')

let vitorias = 0
let derrotas = 0
let empates = 0

function escolha(jogador) {
    const computer = escolhaComputer()

    result.innerHTML = 'JO'
    setTimeout(() => {result.innerHTML = 'KÊN'}, 1000)
    setTimeout(() => {result.innerHTML = 'PO'}, 2000)

    setTimeout (() => {
    if (jogador === computer) {
        empates ++
        result.innerHTML = 'Empate!'
    } else if ((jogador === 'pedra' && computer === 'tesoura') ||
               (jogador === 'papel' && computer === 'pedra') ||
               (jogador === 'tesoura' && computer === 'papel')) {
        vitorias ++
        result.innerHTML = 'Você Venceu!'
    } else {
        derrotas ++
        result.innerHTML = 'Você Perdeu!'
    }

    score.innerHTML = `Vitorias: ${vitorias}, Derrotas: ${derrotas}, Empates: ${empates}`
    // Informa a pontuação atual do jogador.

    choices.innerHTML = `Você <img class="move-icon" src="imagens/${jogador}-emoji.png"> <img class="move-icon" src="imagens/${computer}-emoji.png"> Computador`
    // Imprime na tela a jogada tanto do jogador quanto do computador.
    }, 3000)
    // Utilização da função setTimeout para imprimir na tela JO-KÊN-PO cronometrado e apos isso imprimpir o resultado.
}

function escolhaComputer() {
    const randomNumber = Math.random()
    return randomNumber < 1 / 3 ? 'pedra' : randomNumber < 2 / 3 ? 'papel' : 'tesoura'
    // Retorna 'pedra' se o número aleatório for menor que 1/3, se não for passa para a próxima verificação e assim por diante.
}

function resetScore() {
    vitorias = 0
    derrotas = 0
    empates = 0
    score.innerHTML = 'Vitorias: 0, Derrotas: 0, Empates: 0'
    choices.innerHTML = ''
    result.innerHTML = ''
    // Reseta toda as contagens para 0 e atualiza o HTML.
}