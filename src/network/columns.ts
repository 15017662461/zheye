import axios from './index'

export function getColumns(){
  return axios.get('/columns')
}

export function getColumn(cid: string){
  return axios.get(`/columns/${cid}`)
  // axios.patch
}

export function getPosts(cid: string){
  return axios.get(`/columns/${cid}/posts`)
}