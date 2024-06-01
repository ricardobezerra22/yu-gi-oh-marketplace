import api from '../https'

export async function getCoinPrice(currency) {
  const response = await api.get('/coins/markets', {
    params: {
      vs_currency: currency
    }
  })
  return response.data
}
export async function getCoinDetail(coin) {
  const response = await api.get(`/coins/${coin}`)
  return response.data
}
