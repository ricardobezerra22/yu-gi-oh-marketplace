import api from '../https'

export async function getTopCoins(currency) {
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

export async function getSpecificCoinsPrice(currency, coinIds) {
  const ids = coinIds.join(',')

  const response = await api.get('/coins/markets', {
    params: {
      vs_currency: currency,
      ids: ids
    }
  })
  return response.data
}
