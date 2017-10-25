/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:43
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-23 10:43:48
 * 登录API
 */
import fetch from '@/utils/fetch'

// 登录
export function loginByUserName (userId, userPassword) {
  const data = {
    userId,
    userPassword
  }
  return fetch({
    url: '/api/login.cp',
    method: 'post',
    data
  })
}
// 退出
export function logout (token) {
  const data = {
    token
  }
  return fetch({
    url: '/api/logout.cp',
    method: 'post',
    data
  })
}
// 用户信息
export function getUserInfo (token) {
  const data = {
    data: '',
    token
  }
  return fetch({
    url: '/api/user/info.cp',
    method: 'post',
    data
  })
}
