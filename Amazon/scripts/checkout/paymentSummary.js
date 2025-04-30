import { cart, resetCart } from '../../data/cart.js'
import { getProduct } from '../../data/products.js'
import { getDeliveryOption } from '../../data/deliveryOptions.js'
import { formatCurrency } from '../utils/money.js'
import { addOrder } from '../../data/orders.js'

export function renderPaymentSummary() {
  // Inicializa variáveis para cálculo de preços e quantidade
  let productPriceCents = 0
  let shippingPriceCents = 0
  let cartQuantity = 0

  // Percorre os itens do carrinho para calcular os totais
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId)  // Obtém o produto com base no ID
    productPriceCents += product.priceCents * cartItem.quantity  // Calcula o preço total do produto

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)  // Obtém a opção de entrega
    shippingPriceCents += deliveryOption.priceCents  // Adiciona o preço de envio

    cartQuantity += cartItem.quantity  // Soma a quantidade total de itens no carrinho
  })

  // Calcula o subtotal (sem imposto), o imposto e o total final do pedido
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents  // Subtotal
  const taxCents = totalBeforeTaxCents * 0.1  // Calcula 10% de imposto
  const totalCents = totalBeforeTaxCents + taxCents  // Total com imposto

  // Gera o HTML do resumo de pagamento, com as informações calculadas
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `

  // Insere o HTML gerado no DOM para exibir o resumo de pagamento
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML

  // Adiciona um evento ao botão de "Place your order"
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      // Envia o pedido para o backend com os itens do carrinho
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart  // Envia os dados do carrinho
        })
      })

      // Recebe a resposta do servidor e adiciona o pedido
      const order = await response.json()
      addOrder(order)  // Adiciona o pedido ao sistema

    } catch (error) {
      // Exibe mensagem de erro caso algo dê errado ao tentar finalizar o pedido
      console.log('Unexpected error. Try again later.')
    }
    
    // Reseta o carrinho após o pedido ser finalizado
    resetCart()
    // Redireciona o usuário para a página de pedidos
    window.location.href = 'orders.html'
  })
}
