/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-05 15:25:38
 * 地址 module
 */
import { findOne } from '@/api/address'
import { getToken } from '@/utils/auth'

const address = {

  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 默认地址
    FindOne ({ commit, state }, addressId) {
      return new Promise((resolve, reject) => {
        findOne(state.token, addressId).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default address
