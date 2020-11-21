import axios from './index'
import { PostProps} from '../store'
export function uploadFile(actions: string,formData: FormData) {
  return axios.post(`${actions}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function post(upload: PostProps){
  return axios.post('posts',upload)
}