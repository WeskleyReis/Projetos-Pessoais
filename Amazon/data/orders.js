// Recupera os pedidos armazenados no localStorage ou inicializa com um array vazio, caso não haja pedidos armazenados
export const orders = JSON.parse(localStorage.getItem('orders')) || []

// Função para adicionar um novo pedido à lista de pedidos
export function addOrder(order) {
    orders.unshift(order)  // Adiciona o novo pedido no início da lista
    saveToStorage()  // Chama a função para salvar a lista de pedidos no localStorage
}

// Função privada para salvar a lista de pedidos no localStorage
function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders))  // Converte a lista de pedidos em JSON e a armazena no localStorage
}

// Função para buscar um pedido específico pelo ID
export function getOrder(orderId) {
    let matchingOrder  // Variável para armazenar o pedido encontrado

    // Percorre todos os pedidos e busca aquele que tem o ID correspondente
    orders.forEach((order) => {
        if (order.id === orderId) {
            matchingOrder = order  // Encontra o pedido e armazena na variável matchingOrder
        }
    })

    return matchingOrder  // Retorna o pedido encontrado (ou undefined, caso não encontre)
}
