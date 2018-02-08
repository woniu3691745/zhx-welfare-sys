/*
 * @Author: lidongliang
 * @Date: 2017-10-17 18:40:46
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-18 15:28:27
 * mock 请求
 */

import Mock from 'mockjs'
// import loginAPI from './login'
// import userAPI from './user'
import orderAPI from './order'

Mock.setup({
  timeout: '350-600'
})

// 登录
// Mock.mock(/\/api\/login.cp/, 'post', loginAPI.loginByUserName)
// Mock.mock(/\/api\/logout.cp/, 'post', loginAPI.logout)

// // 用户信息
// Mock.mock(/\/api\/user\/info.cp\.*/, 'post', loginAPI.getUserInfo)
// // 获得验证码
// Mock.mock(/\/captacha\/sendCaptacha.cp\.*/, 'post', userAPI.GetIdCode)
// // 重置支付密码下一步
// Mock.mock(/\/api\/user\/getidcodenext.cp\.*/, 'post', userAPI.resPassword)
// // 重置支付密码
// Mock.mock(/\/api\/user\/resPasswords.cp\.*/, 'post', userAPI.resPassword)
// 是否支付完成
Mock.mock(/\/userorder\/isPayCom.cp\.*/, 'post', orderAPI.isPayCom)
// 支付宝支付
Mock.mock(/\/pay\/third-party-pay\.*/, 'post', orderAPI.AliPay)
// 混合支付
Mock.mock(/\/pay\/combination-pay.cp\.*/, 'post', orderAPI.MixPay)
export default Mock
