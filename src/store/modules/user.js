/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 15:42:44
 * 用户信息 module
 */
import { loginByUserName, logout, getUserInfo, resetLoginPassword, getIdCode } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {

  // 定义数据状态
  state: {
    token: getToken(),
    name: '',
    roles: [],
    quota: []
  },

  // 改变数据状态
  // mutations -> state
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
    }
  },

  // commit -> mutation
  actions: {
    // 用户名登录
    LoginByUserName ({ commit }, userInfo) {
      const userId = userInfo.bizData.Login.PhoneNo.trim()
      return new Promise((resolve, reject) => {
        loginByUserName(userId, userInfo.bizData.Login.SigninPwd).then(response => {
          const data = response.data
          setToken(response.data.bizData.Login.Token)
          commit('SET_TOKEN', data.bizData.Login.Token)
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
export default user
