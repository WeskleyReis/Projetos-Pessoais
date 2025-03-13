document.getElementById('pedra').addEventListener('click', () => escolha('pedra'), false)
document.getElementById('papel').addEventListener('click', () => escolha('papel'), false)
document.getElementById('tesoura').addEventListener('click', () => escolha('tesoura'), false)

let vitorias = 0
let derrotas = 0
let empates = 0

function escolha(jogador) {
    const computer = escolhaComputer()

    if (jogador === computer) {
        empates ++
        document.querySelector('.result').innerHTML = 'Empate!'
    } else if ((jogador === 'pedra' && computer === 'tesoura') ||
               (jogador === 'papel' && computer === 'pedra') ||
               (jogador === 'tesoura' && computer === 'papel')) {
        vitorias ++
        document.querySelector('.result').innerHTML = 'Você Venceu!'
    } else {
        derrotas ++
        document.querySelector('.result').innerHTML = 'Você Perdeu!'
    }

    document.querySelector('.score').innerHTML = `Vitorias: ${vitorias}, Derrotas: ${derrotas}, Empates: ${empates}`

    document.querySelector('.escolhas').innerHTML = `Você <img class="move-icon" src="imagens/${jogador}-emoji.png"> <img class="move-icon" src="imagens/${computer}-emoji.png"> Computador`
}

function escolhaComputer() {
    const randomNumber = Math.random()
    let computer
    if (randomNumber < (1/3)) {
        computer = 'pedra'
    } else if (randomNumber < (2/3)) {
        computer = 'papel'
    } else {
        computer = 'tesoura'
    }
    return computer
}

function resetScore() {
    vitorias = 0
    derrotas = 0
    empates = 0
    document.querySelector('.score').innerHTML = 'Vitorias: 0, Derrotas: 0, Empates: 0'
    document.querySelector('.escolhas').innerHTML = ''
    document.querySelector('.result').innerHTML = ''
}