/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-04 17:17:03
 * 订单 module
 */
import { submit, pay } from '@/api/order'
import { getToken } from '@/utils/auth'

const cart = {

  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 订单提交
    Submit ({ commit, state }, orderInfo) {
      return new Promise((resolve, reject) => {
        submit(state.token, orderInfo).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 订单支付
    Pay ({ commit, state }, orderInfo) {
      return new Promise((resolve, reject) => {
        pay(state.token, orderInfo).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default cart
