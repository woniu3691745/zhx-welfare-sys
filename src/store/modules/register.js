/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-15 11:28:11
 * 注册 module
 */
import { cardInfo, bindPhoneInfo, stLoginPassWordInfo, setPayPassWordInfo, getIdCode, getCaptcha } from '@/api/register'
import { getToken } from '@/utils/auth'
import config from '@/config'
const captchaCooldownDuration = config.captchaCooldownDuration

const register = {
  state: {
    token: getToken(),
    captchaId: '',
    captchaDate: '',
    cardNo: '',
    phoneNo: '',
    signinPwd: ''
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
    },
    VX_SET_CARD_NO ({commit}, cardNo) {
      commit('VX_SET_CARD_NO', cardNo)
    },
    // 获取验证码
    VX_GET_CAPTCHA ({commit, state}, phoneNo) {
      return new Promise((resolve, reject) => {
        const reqData = {
          bizData: {
            Captacha: {
              PhoneNo: phoneNo
            }
          }
        }
        if (!state.captchaDate || new Date() - new Date(state.captchaDate) > captchaCooldownDuration) {
          getCaptcha(reqData).then(res => {
            const data = res.data
            const bizData = data.bizData
            if (data.result) {
              const captchaInfo = {
                captchaId: bizData.Captacha.ID,
                captchaDate: new Date()
              }
              commit('VX_GET_CAPTCHA', captchaInfo)
              resolve(data.result)
            } else {
              reject(data.message)
            }
          }).catch(() => {
            const err = {
              info: '获取短信验证码失败，请重试'
            }
            reject(err.info)
          })
        } else {
          const err = {
            info: '短信发送过于频繁'
          }
          reject(err.info)
        }
      })
    },
    VX_SET_PHONE_NO ({commit}, phoneNo) {
      commit('VX_SET_PHONE_NO', phoneNo)
    },
    VX_SET_SIGNIN_PWD ({commit}, signinPwd) {
      commit('VX_SET_SIGNIN_PWD', signinPwd)
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    VX_SET_CARD_NO (state, cardNo) {
      state.cardNo = cardNo
    },
    VX_GET_CAPTCHA (state, captchaInfo) {
      state.captchaId = captchaInfo.captchaId
      state.captchaDate = captchaInfo.captchaDate
    },
    VX_SET_PHONE_NO (state, phoneNo) {
      state.phoneNo = phoneNo
    },
    VX_SET_SIGNIN_PWD (state, signinPwd) {
      state.signinPwd = signinPwd
    }
  }
}
export default register
