import axios from 'axios'
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://127.0.0.1:9996',
  transformResponse: [function (data) {
    try {
      //  如果转换成功，直接返回
      return JSONBig.parse(data)
    } catch (error) {
      //  如果转换失败 返回原数据
      return data
    }
  }]
})

export default request
