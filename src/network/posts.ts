import axios from './index'

export function findPostById(id: string){
  return axios.get(`/posts/${id}`)
}