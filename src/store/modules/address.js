/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-06 14:35:12
 * 地址 module
 */
import { findDefaultOne } from '@/api/addressMan'
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
    FindDefaultOne ({ commit, state }) {
      return new Promise((resolve, reject) => {
        findDefaultOne(state.token).then(response => {
          resolve(response.data.bizData.Address)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default address
