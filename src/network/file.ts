import axios from './index'

export function uploadFile(actions: string,formData: FormData) {
  return axios.post(`${actions}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}