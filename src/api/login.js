/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:43
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-15 11:27:20
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

// 重置密码
export function resetLoginPassword (token, resetLoginPasswordForm) {
  const data = {
    token
  }
  return fetch({
    url: '/api/user/',
    method: 'post',
    data
  })
}

// 获取验证码
export function getIdCode (token, bindIdCodeInfo) {
  const data = {
    data: {
    },
    token
  }
  return fetch({
    url: '/api/',
    method: 'post',
    data
  })
}
