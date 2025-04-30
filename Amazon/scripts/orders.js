import { getProduct, loadProductsFetch } from '../data/products.js'
import { orders } from '../data/orders.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import formatCurrency from './utils/money.js'
import { addToCart, calculateCartQuantity } from '../data/cart.js'

// Atualiza a quantidade total no carrinho
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity()
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
}

// Gera o HTML dos produtos de um pedido
function productsListHTML(order) {
  let productsListHTML = ''

  order.products.forEach((productsDetails) => {
    const product = getProduct(productsDetails.productId)

    productsListHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${dayjs(productsDetails.estimatedDeliveryTime).format('MMMM D')}
        </div>
        <div class="product-quantity">
          Quantity: ${productsDetails.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again"
        data-product-id="${product.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary js-track-package-button">
            Track package
          </button>
        </a>
      </div>
    `
  })

  return productsListHTML
}

// Carrega a página de pedidos
async function loadPage() {
  await loadProductsFetch()

  let ordersHTML = ''

  // Para cada pedido, gera o HTML correspondente
  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D')

    ordersHTML += `
      <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `
  })

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML

  // Gerencia os botões "Buy it again"
  const buyAgainTimeouts = {}

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId

      addToCart(productId)
      updateCartQuantity()

      button.innerHTML = 'Added'

      // Evita conflito de múltiplos timeouts
      if (buyAgainTimeouts[productId]) {
        clearTimeout(buyAgainTimeouts[productId])
      }

      buyAgainTimeouts[productId] = setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `
        delete buyAgainTimeouts[productId]
      }, 1000)
    })
  })

  updateCartQuantity()
}

loadPage()
