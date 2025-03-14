document.getElementById('pedra').addEventListener('click', () => escolha('pedra'))
document.getElementById('papel').addEventListener('click', () => escolha('papel'))
document.getElementById('tesoura').addEventListener('click', () => escolha('tesoura'))

const result = document.querySelector('.result')
const score = document.querySelector('.score')
const choices = document.querySelector('.choices')

const placar = JSON.parse(localStorage.getItem('placar')) || {vitorias: 0, derrotas: 0, empates: 0}
// Busca no armazenamento local o placar, se não tiver ele inicia com as contagens em 0.

updateScore()

function updateScore() {
    score.innerHTML = `Vitorias: ${placar.vitorias}, Derrotas: ${placar.derrotas}, Empates: ${placar.empates}` 
    // Informa a pontuação atual do jogador.   
}

function escolha(jogador) {
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
    placar.vitorias = 0; placar.derrotas = 0; placar.empates = 0

    localStorage.setItem('placar', JSON.stringify(placar))
    updateScore()

    choices.innerHTML = ''
    result.innerHTML = ''
    // Reseta toda as contagens para 0 e atualiza o HTML.
}