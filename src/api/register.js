/*
 * @Author: lidongliang
 * @Date: 2017-10-23 10:40:22
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-15 11:26:38
 * 注册API
 */
import fetch from '@/utils/fetch'
import axios from 'axios'

const tdDomain = 'http://10.7.13.109:8080'

export function verfiyCardAndPwd (reqData) {
  return axios.post(tdDomain + '/register/validateWelfare.cp', reqData)
}

export function getCaptcha (reqData) {
  return axios.post(tdDomain + '/register/sendCaptacha.cp', reqData)
}

export function verfiyCaptcha (reqData) {
  return axios.post(tdDomain + '/register/validateCaptacha.cp', reqData)
}

export function setPayPwd (reqData) {
  return axios.post(tdDomain + '/register/verifyIdentity.cp', reqData)
}

// step 1 -> 福利卡
export function cardInfo (token, cardInfo) {
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

// step 1 ->  绑定手机号
export function bindPhoneInfo (token, bindPhoneInfo) {
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

// step 1 ->  设置登录密码
export function stLoginPassWordInfo (token, setLoginPassWordInfo) {
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

// step 1 ->  设置支付密码
export function setPayPassWordInfo (token, setPayPassWordInfo) {
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
