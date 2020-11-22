import axios from './index'

export function getColumns(currentPage: number,pageSize: number){
  return axios.get(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`)
}

export function getColumn(cid: string){
  return axios.get(`/columns/${cid}`)
  // axios.patch
}

export function getPosts(cid: string){
  return axios.get(`/columns/${cid}/posts`)
}