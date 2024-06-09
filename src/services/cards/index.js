import api from '@/services/api/http'

export async function getAllCards({ rpp, page }) {
  const queryParams = new URLSearchParams({ rpp, page }).toString()
  const url = `/cards?${queryParams}`
  return await api.get(url)
}

export async function getMyCards() {
  return await api.get('/me')
}
export async function addCardToDeck(payload) {
  return await api.post('/me/cards', payload)
}
