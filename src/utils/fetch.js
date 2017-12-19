/*
 * @Author: lidongliang
 * @Date: 2017-10-17 18:37:24
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-19 15:14:40
 * axios config
 */
import axios from 'axios'

import store from '@/store'
// import { getToken } from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000                 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    // config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response,

  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
