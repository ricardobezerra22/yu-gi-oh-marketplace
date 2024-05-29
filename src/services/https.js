import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
  params: {
    apiKey: 'CG-ciedPk3GbTJhy6pD8Kccw2Qb'
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'accept-language': 'br'
  }
})

export default api
