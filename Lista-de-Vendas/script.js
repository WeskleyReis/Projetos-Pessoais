let totalDetergente = 0
let totalCloro = 0
let totalSabao = 0
let totalDesinfetante = 0
let totalLimpaAluminio = 0
let totalAmaciante = 0
let valoresAdicionados = [] // Lista para armazenar os valores adicionados

function adicionarLista(classe, valor, container) {
    const novaDiv = document.createElement('div')
    novaDiv.classList.add(classe, 'tabela-conteudo')
    novaDiv.innerHTML = valor
    const elementoContainer = document.querySelector(container)
    elementoContainer.appendChild(novaDiv)

    // Cria uma nova 'DIV' com todas as informações
 }

function cadastrar() {
    const nome = document.querySelector('.nome').value.trim()
    const erro = document.querySelector('.erro')
    const erroRemover = document.querySelector('.erro-remover')

    if (!nome) {
        erro.innerHTML = 'NOME INVÁLIDO: Por favor, digite um nome!' // Verificação do nome para o dacastro
        return
    }
    erro.innerHTML = ''
    erroRemover.innerHTML = ''

    let detergente = Number(document.querySelector('.detergente').value) || 0
    let cloro = Number(document.querySelector('.cloro').value) || 0
    let sabao = Number(document.querySelector('.sabao').value) || 0
    let desinfetante = Number(document.querySelector('.desinfetante').value) || 0
    let limpaAluminio = Number(document.querySelector('.limpa-aluminio').value) || 0
    let amaciante = Number(document.querySelector('.amaciante').value) || 0

    adicionarLista('tabela-nome', nome, '.js-tabela-nomes')
    adicionarLista('tabela-detergente', detergente, '.js-tabela-detergente')
    adicionarLista('tabela-cloro', cloro, '.js-tabela-cloro')
    adicionarLista('tabela-sabao', sabao, '.js-tabela-sabao')
    adicionarLista('tabela-desinfetante', desinfetante, '.js-tabela-desinfetante')
    adicionarLista('tabela-limpa-aluminio', limpaAluminio, '.js-tabela-limpa-aluminio')
    adicionarLista('tabela-amaciante', amaciante, '.js-tabela-amaciante')

    valoresAdicionados.push({ detergente, cloro, sabao, desinfetante, limpaAluminio, amaciante})  // Armazena os valores para remoção correta
    calculoTotal(detergente, cloro, sabao, desinfetante, limpaAluminio, amaciante)
}


function calculoTotal(detergente, cloro, sabao, desinfetante, limpaAluminio, amaciante) {
    totalDetergente += detergente
    totalCloro += cloro
    totalSabao += sabao
    totalDesinfetante += desinfetante
    totalLimpaAluminio += limpaAluminio
    totalAmaciante += amaciante

    // Armazena o total de cada item da lista

    atualizarTotais()
}

function atualizarTotais() {
    document.querySelector('.detergente-total').innerHTML = totalDetergente
    document.querySelector('.cloro-total').innerHTML = totalCloro
    document.querySelector('.sabao-total').innerHTML = totalSabao
    document.querySelector('.desinfetante-total').innerHTML = totalDesinfetante
    document.querySelector('.limpa-aluminio-total').innerHTML = totalLimpaAluminio
    document.querySelector('.amaciante-total').innerHTML = totalAmaciante

    // Atualiza na tela o total de cada item da lista
}

function removerUltimaEntrada() {
    const erroRemover = document.querySelector('.erro-remover')
    if (valoresAdicionados.length === 0){
        erroRemover.innerHTML = 'ERRO: Nenhum cadastro foi feito até o momento!'
        return // Evita erro ao tentar remover sem registros
    }
    erroRemover.innerHTML = ''

    const ultimo = valoresAdicionados.pop() // Obtém e remove o último item da lista

    totalDetergente -= ultimo.detergente
    totalCloro -= ultimo.cloro
    totalSabao -= ultimo.sabao
    totalDesinfetante -= ultimo.desinfetante
    totalLimpaAluminio -= ultimo.limpaAluminio
    totalAmaciante -= ultimo.amaciante

    const classes = [
        ".js-tabela-nomes",
        ".js-tabela-detergente",
        ".js-tabela-cloro",
        ".js-tabela-sabao",
        ".js-tabela-desinfetante",
        ".js-tabela-limpa-aluminio",
        ".js-tabela-amaciante"
    ]

    classes.forEach(container => {
        const elementoContainer = document.querySelector(container)
        if (elementoContainer && elementoContainer.lastElementChild) {
            elementoContainer.removeChild(elementoContainer.lastElementChild)
        }
    })
    
    // Remove o último cadastro por completo

    atualizarTotais()
}