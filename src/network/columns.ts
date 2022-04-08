import axios from './index'

export function getColumns(currentPage: number,pageSize: number){
  return axios.get(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`)
}

export function getColumn(cid: string){
  return cid ? axios.get(`/columns/${cid}`) : {data: null}
  // axios.patch
}

export function getPosts(cid: string){
  return cid ? axios.get(`/columns/${cid}/posts`) : {data: null}
}