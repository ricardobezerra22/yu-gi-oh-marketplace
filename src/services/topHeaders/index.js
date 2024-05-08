import api from '../https'

export async function getTopHeaders(params) {
  const response = await api.get('/everything', {
    params: {
      q: params
    }
  })
  return response.data
}
export async function getTopHeadlines(country, category) {
  const response = await api.get('/top-headlines', {
    params: {
      country: country,
      category: category
    }
  })
  return response
}
