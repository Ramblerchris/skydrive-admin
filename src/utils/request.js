import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store/index.js'
import config from '@/config/index.js'
import route from '@/router/index.js'

const request = axios.create({
  baseURL: config.BaseUrl,
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

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = store.getters.getToken
  console.log('interceptors', token)
  if (token !== null && token !== '') {
    console.log('axios.interceptors ', config)
    config.headers.token = `${token}`
    //  config.headers['token'] = `${token}`
    console.log('axios.interceptors2 ', config)
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    // this.$message.error('登录过期')
    store.commit('loginOut')
    route.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

export default request
