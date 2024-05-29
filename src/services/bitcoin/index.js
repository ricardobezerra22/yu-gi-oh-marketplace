import api from '../https'

export async function getBitcoinPrice(coin, currency) {
  const response = await api.get('/simple/price', {
    params: {
      ids: coin,
      vs_currencies: currency
    }
  })
  return response.data
}
