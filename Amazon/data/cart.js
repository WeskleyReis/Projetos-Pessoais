import { validDeliveryOption } from './deliveryOptions.js'

// Declaração da variável global "cart", que armazenará o carrinho de compras
export let cart

// Carrega o carrinho de compras do localStorage ao iniciar o módulo
loadFromStorage()

// Função para carregar o carrinho de compras do localStorage
export function loadFromStorage() {
    // Tenta obter o carrinho de compras armazenado no localStorage
    cart = JSON.parse(localStorage.getItem('cart'))

    // Se não houver um carrinho armazenado, cria um carrinho com itens padrões
    if (!cart) {
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',  // ID do produto
            quantity: 2,  // Quantidade do produto
            deliveryOptionId: '1'  // Opção de entrega (ID)
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',  // ID do produto
            quantity: 1,  // Quantidade do produto
            deliveryOptionId: '2'  // Opção de entrega (ID)
        }]
    }
}

// Função para salvar o carrinho de compras no localStorage
function saveToStorage() {
    // Salva o carrinho como uma string JSON no localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
}

// Função para adicionar um produto ao carrinho de compras
export function addToCart(productId) {
    let matchingItem  // Variável para armazenar o item correspondente no carrinho

    // Percorre os itens do carrinho para verificar se o produto já está no carrinho
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem  // Encontra o item correspondente
            return
        }
    })

    // Obtém a quantidade desejada do produto através de um seletor na interface
    const matchingItemQuantity = document.querySelector(`.js-quantity-selector-${productId}`)

    let quantity  // Variável para armazenar a quantidade desejada

    // Se a quantidade foi especificada na interface, usa o valor informado; caso contrário, usa 1
    if (matchingItemQuantity) {
        quantity = Number(matchingItemQuantity.value)
    } else {
        quantity = 1
    }

    // Se o produto já estiver no carrinho, atualiza a quantidade
    if (matchingItem) {
        matchingItem.quantity += quantity
    } else {
        // Caso contrário, adiciona o produto com a quantidade especificada e opção de entrega padrão (ID '1')
        cart.push({ productId: productId, quantity: quantity, deliveryOptionId: '1' })
    }

    // Salva o carrinho atualizado no localStorage
    saveToStorage()
}

// Função para remover um produto do carrinho de compras
export function removeFromCart(productId) {
    const newCart = []  // Novo array para armazenar os itens restantes

    // Percorre o carrinho e adiciona apenas os itens que não correspondem ao produto a ser removido
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)  // Adiciona ao novo carrinho os itens restantes
        }
    })
    cart = newCart  // Substitui o carrinho antigo pelo novo carrinho sem o produto removido

    // Salva o carrinho atualizado no localStorage
    saveToStorage()
}

// Função para calcular a quantidade total de itens no carrinho
export function calculateCartQuantity() {
    let cartQuantity = 0  // Variável para armazenar a quantidade total de itens

    // Percorre os itens do carrinho e soma as quantidades
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
    })

    return cartQuantity  // Retorna a quantidade total de itens no carrinho
}

// Função para atualizar a quantidade de um produto no carrinho
export function updateQuantity(productId, newQuantity) {
    let matchingItem  // Variável para armazenar o item correspondente no carrinho

    // Percorre os itens do carrinho para encontrar o produto que deve ter a quantidade atualizada
    cart.forEach((carItem) => {
        if (productId === carItem.productId) {
            matchingItem = carItem  // Encontra o item correspondente
        }
    })

    // Atualiza a quantidade do produto no carrinho
    matchingItem.quantity = newQuantity

    // Salva o carrinho atualizado no localStorage
    saveToStorage()
}

// Função para atualizar a opção de entrega de um produto no carrinho
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem  // Variável para armazenar o item correspondente no carrinho

    // Percorre os itens do carrinho para encontrar o produto que deve ter a opção de entrega atualizada
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem  // Encontra o item correspondente
        }
    })

    // Se não encontrar o item correspondente, retorna
    if (!matchingItem) {
        return
    }

    // Verifica se a opção de entrega é válida
    if (!validDeliveryOption(deliveryOptionId)) {
        return
    }

    // Atualiza a opção de entrega do produto no carrinho
    matchingItem.deliveryOptionId = deliveryOptionId

    // Salva o carrinho atualizado no localStorage
    saveToStorage()
}

// Função assíncrona para carregar o carrinho de um backend (exemplo de fetch)
export async function loadCartFetch() {
    // Faz uma requisição HTTP para obter o carrinho de um backend
    const response = await fetch('https://supersimplebackend.dev/cart')

    // Obtém a resposta como texto
    const text = await response.text()

    // Exibe o texto da resposta no console (apenas para debug)
    console.log(text)

    // Retorna o texto obtido da resposta
    return text
}

// Função para resetar o carrinho de compras, limpando todos os itens
export function resetCart() {
    cart = []  // Limpa o array do carrinho
    saveToStorage()  // Salva o carrinho vazio no localStorage
}
