import api from '../https'

export async function getCurrencyHistory(coin, currency, daysRange) {
  const response = await api.get(
    `coins/${coin}/market_chart?vs_currency=${currency}&days=${daysRange}`
  )
  return response.data
}
