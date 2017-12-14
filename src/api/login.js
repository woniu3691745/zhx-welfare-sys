/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:43
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-28 14:44:30
 * 登录API
 */
import fetch from '@/utils/fetch'

// 登录
export function loginByUserName (PhoneNo, SigninPwd) {
  const data = {
    bizData: {
      Login: {
        PhoneNo,
        SigninPwd
      }
    },
    equipmentInfo: window.navigator.userAgent // 设备信息字段
  }
  return fetch({
    url: '/login.cp',
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
    url: '/logout.cp',
    method: 'post',
    data
  })
}
// 用户信息
export function getUserInfo (token) {
  const data = {
    token
  }
  return fetch({
    url: '/wcc/balance.cp',
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
    url: '/user/',
    method: 'post',
    data
  })
}

// 获取验证码
export function ResetgetIdCode (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  return fetch({
    url: '/captacha/sendCaptacha.cp',
    method: 'post',
    data
  })
}
// 重置支付密码下一步
export function ResetgetIdCodeNext (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  console.log(data)
  return fetch({
    url: '/reset/PayPWDValid.cp',
    method: 'post',
    data
  })
}
// 重置支付密码
export function ZHX_PASSWORD_CHANGE (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}

  return fetch({
    url: '/reset/PayPWD.cp',
    method: 'post',
    data
  })
}
// 重置登录密码
export function ZHX_LOGINPASSWORD_CHANGE (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  return fetch({
    url: '/reset/loginPassword.cp',
    method: 'post',
    data
  })
}
// 重置手机号
export function ZHX_BINDPHONE_CHANGE (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  return fetch({
    url: '/reset/PhoneNo.cp',
    method: 'post',
    data
  })
}
