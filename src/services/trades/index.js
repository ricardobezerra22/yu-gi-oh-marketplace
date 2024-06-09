import api from '@/services/api/http'

export async function getRequestedCards({ rpp, page }) {
  const queryParams = new URLSearchParams({ rpp, page }).toString()
  const url = `/trades?${queryParams}`
  return await api.get(url)
}
export async function requestTrade(payload) {
  return await api.post('/trades', payload)
}

export async function deleteRequest(payload) {
  return await api.delete(`/trades/${payload}`)
}
