import api from '@/services/api/http'
export async function userRegister(payload) {
  return await api.post('/register', payload)
}
