import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.API_KEY || 'https://cards-marketplace-api.onrender.com/',

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'accept-language': 'br'
  }
})

api.interceptors.request.use(
  async (config) => {
    const dataStorage = localStorage.getItem('token')

    config.headers.Authorization = `Bearer ${dataStorage}`

    if (config.data && typeof config.data === 'object') {
      config.data = JSON.stringify(config.data)
    }

    return config
  },
  (error) => {
    if (!(error instanceof Error)) {
      return Promise.reject(new Error(error))
    }
    return Promise.reject(error)
  }
)

export default api
