import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js'
import { products, getProduct } from '../../data/products.js'
import formatCurrency from '../utils/money.js'
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js'
import { renderCheckoutHeader } from './checkoutHeader.js'

export function renderOrderSummary() {
    let cartSummaryHTML = ''  // Inicializa a variável que armazenará o HTML do resumo do carrinho
  
    // Itera sobre cada item no carrinho
    cart.forEach((cartItem) => {
      const { productId } = cartItem  // Obtém o ID do produto
  
      const matchingProduct = getProduct(productId)  // Busca o produto com base no ID
      
      const { deliveryOptionId } = cartItem  // Obtém a opção de entrega selecionada
  
      const deliveryOption = getDeliveryOption(deliveryOptionId)  // Obtém os detalhes da opção de entrega
  
      const dateString = calculateDeliveryDate(deliveryOption)  // Calcula a data de entrega com base na opção selecionada
  
      // Adiciona as informações do produto e da entrega ao HTML do resumo
      cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
            Delivery date: ${dateString}
            </div>
  
            <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">
  
            <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                </span>
                </div>
            </div>
  
            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}  <!-- Chama a função para gerar opções de entrega -->
            </div>
            </div>
        </div>
      `
    })
  
    // Função para gerar as opções de entrega HTML
    function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = ''  // Inicializa a variável HTML para as opções de entrega
  
      // Itera sobre as opções de entrega disponíveis
      deliveryOptions.forEach((deliveryOption) => {
        const dateString = calculateDeliveryDate(deliveryOption)  // Calcula a data de entrega para a opção
        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`  // Formata o preço da entrega
  
        // Verifica se esta opção de entrega está selecionada
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId
  
        // Adiciona a opção de entrega ao HTML
        html += `
          <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}" name="delivery-option-${matchingProduct.id}">
          <div>
              <div class="delivery-option-date">
              ${dateString}
              </div>
              <div class="delivery-option-price">
              ${priceString} Shipping
              </div>
          </div>
          </div>
        `
      })
      
      return html  // Retorna o HTML gerado com as opções de entrega
    }
  
    // Insere o HTML do resumo do carrinho na página
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML
  
    // Adiciona evento de clique nos links para deletar itens do carrinho
    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset  // Obtém o ID do produto
        removeFromCart(productId)  // Remove o item do carrinho
  
        // Re-renderiza as seções após a remoção do item
        renderCheckoutHeader()
        renderOrderSummary()
        updateCartQuantity()
        renderPaymentSummary()
      })
    })
  
    // Adiciona evento de clique nas opções de entrega para atualizar a seleção
    document.querySelectorAll('.js-delivery-option').forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset  // Obtém os IDs do produto e da opção de entrega
        updateDeliveryOption(productId, deliveryOptionId)  // Atualiza a opção de entrega do produto
        renderOrderSummary()  // Re-renderiza o resumo do pedido
        renderPaymentSummary()  // Re-renderiza o resumo de pagamento
      })
    })
  
    // Função para atualizar a quantidade de itens no carrinho
    function updateCartQuantity() {
      const cartQuantity = calculateCartQuantity()  // Calcula a quantidade total de itens no carrinho
      document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`  // Atualiza o número de itens no link
    }
  
    updateCartQuantity()  // Chama a função para atualizar a quantidade
  
    // Adiciona evento de clique nos links para editar a quantidade dos itens
    document.querySelectorAll('.js-update-link').forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset  // Obtém o ID do produto
      
        const container = document.querySelector(`.js-cart-item-container-${productId}`)  // Obtém o contêiner do item
        container.classList.add('is-editing-quantity')  // Adiciona classe para permitir a edição da quantidade
      })
    })
    
    // Adiciona evento de clique nos links para salvar a quantidade
    document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
      const { productId } = link.dataset  // Obtém o ID do produto
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)  // Obtém o campo de input da quantidade
      link.addEventListener('click', () => {
        handleUpdateQuantity(productId, quantityInput)  // Chama a função para atualizar a quantidade
      })
  
      // Permite salvar a quantidade ao pressionar 'Enter'
      quantityInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          handleUpdateQuantity(productId, quantityInput)  // Chama a função para atualizar a quantidade
        }
      })
    })
  
    // Função para tratar a atualização da quantidade
    function handleUpdateQuantity(productId, quantityInput) {
      const newQuantity = Number(quantityInput.value)  // Obtém o valor da nova quantidade
      
      // Valida se a quantidade é válida (entre 1 e 1000)
      if (newQuantity <= 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 1 and less than 1000')
        return
      }
  
      updateQuantity(productId, newQuantity)  // Atualiza a quantidade no carrinho
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`)  // Obtém o contêiner do item
      container.classList.remove('is-editing-quantity')  // Remove a classe de edição de quantidade
      
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)  // Obtém o rótulo da quantidade
      quantityLabel.innerHTML = newQuantity  // Atualiza o rótulo com a nova quantidade
      
      updateCartQuantity()  // Atualiza a quantidade total do carrinho
      renderPaymentSummary()  // Re-renderiza o resumo de pagamento
    }
  }
  