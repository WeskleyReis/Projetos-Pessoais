import { addToCart, calculateCartQuantity } from '../data/cart.js'
import { products, loadProducts } from '../data/products.js'

loadProducts(renderProductsGrid)
// Carrega produtos e renderiza a grade quando estiverem disponíveis

function renderProductsGrid() {
  let productsHTML = ''

    const url = new URL(window.location.href)
    const search = url.searchParams.get('search')
    // Pega o parâmetro "search" da URL

    
    let filteredProducts = products

    if (search) {
      filteredProducts = products.filter((product) => {
        let matchingKeyword = false
        // Filtra os produtos com base no termo de busca
        product.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(search.toLocaleLowerCase())) {
            matchingKeyword = true
            // Verifica se algum dos keywords combina com a busca
          }
        })

        return matchingKeyword || product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        // Retorna verdadeiro se o nome ou uma keyword bate com a busca
      })
    }

      // Gera o HTML de cada produto
    filteredProducts.forEach((product) => {
      productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                  src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                  ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
          </div>
      `
  })

  // Insere o HTML gerado no DOM
  document.querySelector('.js-products-grid').innerHTML = productsHTML

  // Mapa para armazenar timeouts de cada produto (evita conflitos ao clicar em múltiplos)
  const addedMessageTimeouts = {}

  // Atualiza o número de itens no carrinho
  function updateCartQuantity() {
      const cartQuantity = calculateCartQuantity()
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
  }

  updateCartQuantity()

  // Adiciona o evento de clique aos botões de adicionar ao carrinho
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
          const {productId} = button.dataset

          // Adiciona o produto ao carrinho
          addToCart(productId)
          updateCartQuantity()

          const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)

          addedMessage.classList.add('added-to-cart-visible')

          // Limpa timeout anterior, se existir
          if (addedMessageTimeouts[productId]) {
              clearTimeout(addedMessageTimeouts[productId])
          }

          // Define novo timeout para esconder a mensagem após 2 segundos
          addedMessageTimeouts[productId] = setTimeout(() => {
              addedMessage.classList.remove('added-to-cart-visible')
          }, 2000)
      })
  })

   // Evento para buscar produtos ao clicar no botão de busca
  document.querySelector('.js-search-button').addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value
    window.location.href = `amazon.html?search=${search}`
  })

  // Evento para buscar produtos ao apertar Enter
  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const searchTerm = document.querySelector('.js-search-bar').value
      window.location.href = `amazon.html?search=${searchTerm}`
    } 
  })
}