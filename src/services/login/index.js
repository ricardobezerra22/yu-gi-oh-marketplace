import api from '@/services/api/https'

export async function userLogin(payload) {
  const response = await api.post('/login', payload)

  return response
}
