/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-15 11:28:11
 * 注册 module
 */
import { cardInfo, bindPhoneInfo, stLoginPassWordInfo, setPayPassWordInfo, getIdCode } from '@/api/register'
import { getToken } from '@/utils/auth'

const register = {

  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // step 1 -> 福利卡
    CardInfo ({ commit, state }, cardForm) {
      return new Promise((resolve, reject) => {
        cardInfo(state.token, cardForm).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // step 2 -> 绑定手机号
    BindPhoneInfo ({ commit, state }, bindPhoneForm) {
      return new Promise((resolve, reject) => {
        bindPhoneInfo(state.token, bindPhoneForm).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // step 3 -> 设置登录密码
    SetLoginPassWordInfo ({ commit, state }, setLoginPassWordForm) {
      return new Promise((resolve, reject) => {
        stLoginPassWordInfo(state.token, setLoginPassWordForm).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // step 4 -> 设置支付密码
    SetPayPassWordInfo ({ commit, state }, setPayPassWordForm) {
      return new Promise((resolve, reject) => {
        setPayPassWordInfo(state.token, setPayPassWordForm).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 短信验证码
    GetIdCode ({ commit, state }, idCodeForm) {
      return new Promise((resolve, reject) => {
        getIdCode(state.token, idCodeForm).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default register
