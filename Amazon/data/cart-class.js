import { validDeliveryOption } from './deliveryOptions.js'

// Classe que gerencia o carrinho de compras
class Cart {
    // Propriedade que armazena os itens do carrinho
    cartItems

    // Propriedade privada para chave do localStorage
    #localStorageKey

    // Construtor que recebe a chave do localStorage para identificar o carrinho
    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey
        this.#loadFromStorage() // Carrega os itens do carrinho do localStorage
    }

    // Método privado para carregar os itens do carrinho do localStorage
    #loadFromStorage() {
        // Tenta carregar os itens do localStorage
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))

        // Caso não haja itens no localStorage, inicializa com um carrinho padrão
        if (!this.cartItems) {
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }]
        }
    }

    // Método para salvar os itens do carrinho no localStorage
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    }
    
    // Método para adicionar um item ao carrinho
    addToCart(productId) {
        let matchingItem
    
        // Verifica se o item já está no carrinho
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem
                return
            }
        })
    
        // Obtém a quantidade do item selecionado no DOM
        const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
    
        // Se o item já está no carrinho, aumenta a quantidade. Caso contrário, adiciona o item
        if (matchingItem) {
            matchingItem.quantity += quantity
        } else {
            this.cartItems.push({productId: productId, quantity: quantity, deliveryOptionId: '1'}) 
        }
    
        // Salva as alterações no localStorage
        this.saveToStorage()
    }

    // Método para remover um item do carrinho
    removeFromCart(productId) {
        const newCart = []
    
        // Cria um novo carrinho sem o item removido
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem)
            }
        })
        this.cartItems = newCart
        
        // Salva as alterações no localStorage
        this.saveToStorage()
    }

    // Método para calcular a quantidade total de itens no carrinho
    calculateCartQuantity() {
        let cartQuantity = 0
    
        // Soma as quantidades de cada item
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity
        })
        return cartQuantity
    }

    // Método para atualizar a quantidade de um item no carrinho
    updateQuantity(productId, newQuantity) {
        let matchingItem
    
        // Encontra o item no carrinho
        this.cartItems.forEach((carItem) => {
            if (productId === carItem.productId) {
                matchingItem = carItem
            }
        })
        
        // Atualiza a quantidade do item
        matchingItem.quantity = newQuantity
        
        // Salva as alterações no localStorage
        this.saveToStorage()
    }

    // Método para atualizar a opção de entrega de um item
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem
    
        // Encontra o item no carrinho
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem
            }
        })
    
        // Se o item não for encontrado, não faz nada
        if (!matchingItem) {
            return
        }
    
        // Verifica se a opção de entrega é válida
        if (!validDeliveryOption(deliveryOptionId)) {
            return
        }
    
        // Atualiza a opção de entrega do item
        matchingItem.deliveryOptionId = deliveryOptionId
    
        // Salva as alterações no localStorage
        this.saveToStorage()
    }
}

// Cria instâncias do carrinho com diferentes chaves para localStorage
export const cart = new Cart('cart-oop') // Carrinho padrão
const businessCart = new Cart('cart-business') // Carrinho para negócios
