import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
  params: {
    apiKey: import.meta.env.API_KEY
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'accept-language': 'br'
  }
})

export default api
