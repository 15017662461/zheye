import axios from './index'

interface SendDataType {
  id: string;
  payload: object;
}

export function findPostById(id: string){
  return axios.get(`/posts/${id}`)
}

export function updatePost(sendData: SendDataType){
  return axios.patch(`/posts/${sendData.id}`,sendData.payload)
}

export function deletePost(id: string){
  return axios.delete(`/posts/${id}`)
}