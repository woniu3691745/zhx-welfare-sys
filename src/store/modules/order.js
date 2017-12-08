/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-08 14:28:25
 * 订单 module
 */
import { findOrders, findOne, submit, pay, deleteOrder, finishOrder } from '@/api/order'
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
    // 订单列表
    FindOrders ({ commit, state }, orderInfo) {
      return new Promise((resolve, reject) => {
        findOrders(state.token, orderInfo).then(response => {
          resolve(response.data.bizData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 单个订单的详细信息
    FindOne ({ commit, state }, orderInfo) {
      return new Promise((resolve, reject) => {
        findOne(state.token, orderInfo).then(response => {
          resolve(response.data.bizData)
        }).catch(error => {
          reject(error)
        })
      })
    },
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
    },
    // 删除已完成的订单
    DeleteOrder ({ commit, state }, orderInfo) {
      return new Promise((resolve, reject) => {
        deleteOrder(state.token, orderInfo).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 订单确认收货
    FinishOrder ({ commit, state }, orderInfo) {
      return new Promise((resolve, reject) => {
        finishOrder(state.token, orderInfo).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default cart
