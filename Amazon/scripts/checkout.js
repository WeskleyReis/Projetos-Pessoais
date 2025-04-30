import { renderCheckoutHeader } from './checkout/checkoutHeader.js'
import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js'
import { loadProductsFetch } from '../data/products.js'
import { loadCartFetch } from '../data/cart.js'

// Função assíncrona que carrega os dados iniciais da página e renderiza os resumos
async function loadPage() {
    try {
        // Aguarda carregar produtos e carrinho em paralelo
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ])

        // Renderiza a interface do checkout após os dados estarem disponíveis
        renderCheckoutHeader()
        renderOrderSummary()
        renderPaymentSummary()

    } catch (error) {
        // Loga erro genérico em caso de falha
        console.log('Unexpected error. Please try again later.')
    }
}

// Inicia o carregamento da página
loadPage()
