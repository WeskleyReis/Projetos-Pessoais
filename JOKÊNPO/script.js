const result = document.querySelector('.result')

const placar = JSON.parse(localStorage.getItem('placar')) || {vitorias: 0, derrotas: 0, empates: 0}
// Busca no armazenamento local o placar, se não tiver, inicia com as contagens em 0.

updateScore()

function updateScore() {
    document.querySelector('.score').innerHTML = `Vitorias: ${placar.vitorias}, Derrotas: ${placar.derrotas}, Empates: ${placar.empates}` 
    // Atualiza a pontuação na tela.  
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

    document.querySelector('.choices').innerHTML = `Você <img class="move-icon" src="imagens/${jogador}-emoji.png">
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

function resetScore() {
    placar.vitorias = 0; placar.derrotas = 0; placar.empates = 0

    localStorage.setItem('placar', JSON.stringify(placar))
    updateScore()

    document.querySelector('.choices').innerHTML = ''
    result.innerHTML = 'CLIQUE EM UM DOS BOTÕES PARA INICIAR'
    // Reseta toda as contagens para 0 e atualiza as informações na tela.
}