import formatCurrency from '../scripts/utils/money.js'

// Função que retorna um produto com base no ID
export function getProduct(productId) {
  let matchingProduct

  // Percorre todos os produtos procurando o que tem o ID correspondente
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product
    }
  })

  // Retorna o produto encontrado (ou undefined, se não encontrado)
  return matchingProduct
}

// Classe base para representar um produto genérico
export class Product {
  id
  image
  name
  rating
  priceCents
  keywords

  constructor(productDetails) {
    // Inicializa as propriedades do produto com os dados recebidos
    this.id = productDetails.id
    this.image = productDetails.image
    this.name = productDetails.name
    this.rating = productDetails.rating
    this.priceCents = productDetails.priceCents
    this.keywords = productDetails.keywords
  }

  // Retorna o caminho da imagem das estrelas de avaliação baseado na nota
  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  // Retorna o preço formatado como string (ex: "$49.99")
  getPrice() {
    return `$${formatCurrency(this.priceCents)}`
  }

  // Método que pode ser sobrescrito por subclasses para exibir info adicional
  extraInfoHTML() {
    return ''
  }
}

// Classe derivada para produtos do tipo roupa (Clothing)
export class Clothing extends Product {
  sizeChartLink

  constructor(productDetails) {
    super(productDetails) // Chama o construtor da classe base
    this.sizeChartLink = productDetails.sizeChartLink
  }

  // Retorna HTML com link para tabela de tamanhos
  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    `
  }
}

// Classe derivada para produtos do tipo eletrodoméstico (Appliance)
export class Appliance extends Product {
  instructionsLink
  warrantyLink

  constructor(productDetails) {
    super(productDetails) // Chama o construtor da classe base
    this.instructionsLink = productDetails.instructionsLink
    this.warrantyLink = productDetails.warrantyLink
  }

  // Retorna HTML com links para instruções e garantia
  extraInfoHTML() {
    return `
      <a href="${this.instructionsLink}" target="_blank">Instructions</a>
      <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `
  }
}

// Array global para armazenar os produtos carregados
export let products = []

// Função assíncrona que carrega produtos usando `fetch`
export function loadProductsFetch() {
  const promise = fetch('https://supersimplebackend.dev/products')
    .then((response) => {
      return response.json() // Converte a resposta para JSON
    })
    .then((productData) => {
      // Mapeia os dados em instâncias das classes correspondentes
      products = productData.map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails)
        }
        return new Product(productDetails)
      })

      console.log('load products')
    })
    .catch((error) => {
      // Em caso de erro na requisição
      console.log('Unexpected error. Please try again later.')
    })

  return promise // Retorna a Promise para permitir await fora
}

// Função que carrega produtos usando XMLHttpRequest (forma antiga)
export function loadProducts(fun) {
  const xhr = new XMLHttpRequest()

  // Evento disparado quando a resposta é carregada
  xhr.addEventListener('load', () => {
    // Converte a resposta em objetos das classes corretas
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails)
      }
      return new Product(productDetails)
    })

    console.log('load products')

    fun() // Chama a função de callback passada por parâmetro
  })

  // Evento de erro na requisição
  xhr.addEventListener('error', (error) => {
    console.log('Unexpected error. Please try again later.')
  })

  // Abre a requisição e envia
  xhr.open('GET', 'https://supersimplebackend.dev/products')
  xhr.send()
}
