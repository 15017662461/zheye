import axios from 'axios'
import store from '../store'
const instance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

instance.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  config.headers.Authorization = `Bearer ${store.state.token}`
  // console.log(store.state)
  return config;
})

instance.interceptors.response.use(resp => {
  store.commit('setLoading', false)
  return resp.data
}, e => {
  // console.log(e.response)
  const { error } = e.response.data;
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
  // return error
})

export default instance;