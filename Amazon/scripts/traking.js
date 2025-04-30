import { getOrder } from '../data/orders.js'
import { getProduct, loadProductsFetch } from '../data/products.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { calculateCartQuantity } from '../data/cart.js'

async function loadPage() {
  // Carrega os produtos antes de continuar
  await loadProductsFetch()

  // Extrai os parâmetros da URL (orderId e productId)
  const url = new URL(window.location.href)
  const orderId = url.searchParams.get('orderId')
  const productId = url.searchParams.get('productId')

  // Busca a ordem e o produto com base nos IDs da URL
  const order = getOrder(orderId)
  const product = getProduct(productId)

  // Encontra os detalhes específicos do produto dentro da ordem
  let productDetails
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details
    }
  })

  // Define datas para o cálculo de progresso da entrega
  const today = dayjs()
  const orderTime = dayjs(order.orderTime)
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime)

  // Calcula o progresso da entrega em porcentagem
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100

  // Define mensagem de entrega com base na data atual
  const deliveryMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on'

  // Monta o HTML de rastreamento do pedido
  const trackingHTML = ` 
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      ${deliveryMessage} ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${(percentProgress < 50) ? 'current-status' : ''}">
        Preparing
      </div>
      <div class="progress-label ${(percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label ${(percentProgress >= 100) ? 'current-status' : ''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div> 
  `

  // Renderiza o conteúdo HTML na página
  document.querySelector('.js-order-tracking').innerHTML = trackingHTML

  // Atualiza a quantidade de itens no carrinho no header
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity()
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
  }

  updateCartQuantity()
}

// Executa a função ao carregar a página
loadPage()
