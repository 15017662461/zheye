import axios from 'axios'
import store from '../store'
const instance = axios.create({
  baseURL:'/api',
  timeout:5000
})

instance.interceptors.request.use(config => {
    store.commit('setLoading',true)
  config.params = { ...config.params}
  return config;
})

instance.interceptors.response.use(resp => {
  setTimeout(() =>{
    store.commit('setLoading',false)
  },1000)
  return resp.data
})

export default instance;