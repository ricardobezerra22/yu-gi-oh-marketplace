import api from '@/services/api/https'
export async function userRegister(payload) {
  return await api.post('/register', payload)
}
