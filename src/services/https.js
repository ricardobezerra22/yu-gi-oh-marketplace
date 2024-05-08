import axios from 'axios'

const api = axios.create({
  baseURL: 'https://newsapi.org/v2/',
  params: {
    apiKey: '48d826abdca44ba69ad4585ed2c70f8b'
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'accept-language': 'br'
  }
})

export default api
