/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-01 19:21:33
 * 用户信息 module
 *
 * 1.通过commit -> 2.经过mutation -> 3.改变数据state
 */
import { loginByUserName, logout, getUserInfo, resetLoginPassword, ResetgetIdCode, ZHX_PASSWORD_CHANGE, ResetgetIdCodeNext, ZHX_LOGINPASSWORD_CHANGE } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {

  state: {
    token: getToken(),
    name: '',
    roles: [],
    quota: [],
    updatedpaypassword: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_QUOTA: (state, quota) => {
      state.quota = quota
    },
    UPDATE_PAY_PASSWORD (state, data) {
      state.updatedpaypassword.ID = data
    },
    UPDATE_LOGIN_PASSWORD (state, data) {
      state.updatedpaypassword.LOGINID = data
    }

  },

  actions: {
    // 用户名登录
    LoginByUserName ({ commit }, userInfo) {
      const userId = userInfo.bizData.Login.PhoneNo.trim()
      return new Promise((resolve, reject) => {
        loginByUserName(userId, userInfo.bizData.Login.SigninPwd).then(response => {
          const data = response.data
          if (data.result) {
            setToken(response.data.bizData.Login.Token)
            commit('SET_TOKEN', data.bizData.Login.Token)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data
          commit('SET_QUOTA', data.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_QUOTA', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 重置登录密码
    ResetLoginPassword ({ commit, state }, resetLoginPasswordForm) {
      return new Promise((resolve, reject) => {
        resetLoginPassword(state.token, resetLoginPasswordForm).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 短信验证码
    ResetGetIdCode ({ commit, state }, idCodeForm) {
      let type = idCodeForm.bizData.Captacha.Type
      return new Promise((resolve, reject) => {
        ResetgetIdCode(state.token, idCodeForm).then(response => {
          const data = response.data
          if (data.result) {
            if (type === '04') {
              commit('UPDATE_PAY_PASSWORD', data.bizData.Captacha.ID)
            } else if (type === '03') {
              commit('UPDATE_LOGIN_PASSWORD', data.bizData.Captacha.ID)
            }
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 重置支付密码下一步
    ResetGetIdCodeNext ({ commit, state }, idCodeForm) {
      return new Promise((resolve, reject) => {
        ResetgetIdCodeNext(state.token, idCodeForm).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 重置支付密码
    ZHX_PASSWORD_CHANGE ({ commit, state }, idCodeForm) {
      return new Promise((resolve, reject) => {
        ZHX_PASSWORD_CHANGE(state.token, idCodeForm).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 重置登录密码
    ZHX_LOGINPASSWORD_CHANGE ({ commit, state }, idCodeForm) {
      return new Promise((resolve, reject) => {
        ZHX_LOGINPASSWORD_CHANGE(state.token, idCodeForm).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
