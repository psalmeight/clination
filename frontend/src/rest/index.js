import axios from 'axios'

//const auth0BaseUrl = 'https://srv.hisd3.com'
const auth0BaseUrl = 'http://localhost:8000'

let instance = axios.create({
  baseURL: auth0BaseUrl,
})

export const get = (path, params, config) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  return instance.get(path, params, config)
}

export const post = (path, body, config) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  return instance.post(path, body || {}, config)
}

export const patch = (path, body, config) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  return instance.patch(path, body || {}, config)
}

export const destroy = (path, config) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  return instance.delete(path, config)
}
