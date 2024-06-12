import api from '@/services/api/https'

export async function userLogin(payload) {
  const response = await api.post('/login', payload)
  const { token } = response.data

  localStorage.setItem('token', token)

  return response
}

export function userLogout() {
  localStorage.removeItem('token')
}
