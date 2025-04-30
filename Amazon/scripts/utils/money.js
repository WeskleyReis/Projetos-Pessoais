// Função que formata um valor em centavos para uma string representando o valor em dólares
export function formatCurrency(priceCents) {
    // Converte o valor de centavos para reais (dividindo por 100), arredonda para o valor mais próximo
    // e formata como uma string com 2 casas decimais
    return (Math.round(priceCents) / 100).toFixed(2)
}

// Exporta a função formatCurrency como exportação padrão
export default formatCurrency
