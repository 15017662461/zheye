import { ColumnProps, ImageProps, UserProps } from './store'

interface CheckCondition {
  format?: string[];
  size?: number;
}

type ErrorType = 'size' | 'format' | null


export function generateFitUrl(data: ImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}


export function beforeUploadCheck(file: File, condition: CheckCondition) {
  console.log(file.size)
  const isValidFormat = condition.format ? condition.format.includes(file.type) : true
  const isValidSize = condition.size ? (file.size / 1024 / 1024 < condition.size) : true
  let error: ErrorType = null;
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

export function addColumnAvatar(data: ColumnProps | UserProps, width: number, height: number) {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
    }
  }
}

export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}

export const arrToObj2 = <T extends {_id?: string}> (arr: Array<T>) => {
  const res = {} as {[id: string]: T}
  arr.forEach(a => {
    if(a._id){
      res[a._id] = a
    }
  })
  return res
}

export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map(key => obj[key])
}

// function testArrToObj<T extends { _id?: string }>(arr: Array<T>) {
//   return arr.reduce((prev, now) => {
//     if (now._id) {
//       prev[now._id] = now;
//     }
//     return prev
//   }, {} as { [index: string]: T })
// }

// const testArr = [{ _id: 'uwef', name: '132' }, { _id: 'ygwf', name: 'gyu' }]
// console.log(testArrToObj<{ _id: string; name?: string }>(testArr))


// function testObjToArr<T>(obj: { [index: string]: T }) {
//   return Object.keys(obj).map(item =>{
//     return obj[item]
//   })
// }

// const testObj = {'wuef':{_id:'wuef',sex:1},'qwe':{_id:'qwe',sex:0}}
// console.log(testObjToArr(testObj))

