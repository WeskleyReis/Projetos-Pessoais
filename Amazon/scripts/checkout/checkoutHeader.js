import { cart } from '../../data/cart.js'

// Função responsável por renderizar o cabeçalho da página de checkout
export function renderCheckoutHeader() {
    // Inicializa a quantidade total de itens no carrinho
    let cartQuantity = 0

    // Soma a quantidade de cada item presente no carrinho
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
    })

    // Gera o HTML do cabeçalho do checkout
    const checkoutHeaderHTML = `
    <div class="header-content">
      
      <!-- Seção esquerda: logo da Amazon -->
      <div class="checkout-header-left-section">
        <a href="amazon.html">
          <img class="amazon-logo" src="images/amazon-logo.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
        </a>
      </div>

      <!-- Seção do meio: texto de checkout com link para voltar à home -->
      <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link js-return-to-home-link"
          href="amazon.html">${cartQuantity} items</a>)
      </div>

      <!-- Seção direita: ícone de cadeado para indicar segurança -->
      <div class="checkout-header-right-section">
        <img src="images/icons/checkout-lock-icon.png">
      </div>
    </div>
    `

    // Insere o HTML gerado no elemento com a classe .js-checkout-header na página
    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML
}
