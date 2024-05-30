import api from '../https'

export async function getCoinPrice(coin, currency) {
  const response = await api.get('/coins/markets', {
    params: {
      ids: coin,
      vs_currency: currency
    }
  })
  return response.data
}
export async function getCoinDetail(coin) {
  const response = await api.get(`/coins/${coin}`)
  return response.data
}
