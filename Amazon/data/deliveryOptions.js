import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

// Definindo as opções de entrega com seus respectivos prazos e preços
export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,   // Entrega em 7 dias úteis
    priceCents: 0      // Preço gratuito
}, {
    id: '2',
    deliveryDays: 3,   // Entrega em 3 dias úteis
    priceCents: 499    // Preço de $4.99
}, {
    id: '3',
    deliveryDays: 1,   // Entrega em 1 dia útil
    priceCents: 999    // Preço de $9.99
}]

// Função para obter uma opção de entrega com base no ID fornecido
export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption  // Variável para armazenar a opção de entrega encontrada

    // Percorre todas as opções de entrega e encontra a que corresponde ao ID
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option  // Armazena a opção de entrega correspondente
        }
    })

    // Se não encontrar uma opção correspondente, retorna a primeira opção da lista (padrão)
    return deliveryOption || deliveryOptions[0]
}

// Função para verificar se uma opção de entrega é válida
export function validDeliveryOption(deliveryOptionId) {
    let found = false  // Variável para indicar se a opção foi encontrada

    // Percorre todas as opções de entrega e verifica se o ID fornecido é válido
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            found = true  // Marca como encontrada
        }
    })

    // Retorna true se a opção foi encontrada, caso contrário, retorna false
    return found
}

// Função para verificar se uma data é no final de semana (sábado ou domingo)
function isWeekend(date) {
    const dayOfWeek = date.format('dddd')  // Obtém o nome do dia da semana (ex: "Monday")
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'  // Verifica se é sábado ou domingo
}

// Função para calcular a data de entrega com base no prazo de entrega (excluindo finais de semana)
export function calculateDeliveryDate(deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays  // Número de dias úteis restantes
    let deliveryDate = dayjs()  // Obtém a data atual

    // Enquanto houver dias restantes, adiciona dias úteis
    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day')  // Adiciona um dia

        // Se o dia não for fim de semana, decrementa o contador de dias restantes
        if (!isWeekend(deliveryDate)) {
            remainingDays--
        }
    }

    // Formata a data final para exibir como "Dia da semana, Mês Dia"
    const dateString = deliveryDate.format('dddd, MMMM D')

    return dateString  // Retorna a data formatada
}
