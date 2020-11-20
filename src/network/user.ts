import axios from './index'
export function toLogin(payload: object) {
  return axios.post('/user/login', payload)
}

export function getCurrentUser(){
  return axios.get('/user/current')
}

export function signup(payload: object){
  return axios.post('/users',payload)
}