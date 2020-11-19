import axios from 'axios'

const instance = axios.create({
  baseURL:'/api',
  timeout:5000
})

instance.interceptors.request.use(config => {
  config.params = { ...config.params}
  return config;
})

instance.interceptors.response.use(resp => {
  return resp.data
})

export default instance;