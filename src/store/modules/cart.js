/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-04 16:38:10
 * 购物车 module
 */
import { addCart, addCartPlus, addCartMinus, delCart, cleanupCart, listCart, countCart, cartImgs, settleCart } from '@/api/cart'
import { getToken } from '@/utils/auth'

const cart = {

  state: {
    token: getToken(),
    orderInfo: '',
    productImg: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // 订单信息
    SET_CONFIRM_ORDER_INFO: (state, orderInfo) => {
      state.orderInfo = orderInfo
    },
    // 订单信息购物车图片列表
    SET_CONFIRM_ORDER_PRODUCT_IMG: (state, productImg) => {
      state.productImg = productImg
    }
  },

  actions: {
    // 加入购物车
    AddCart ({ commit, state }, cartForm) {
      return new Promise((resolve, reject) => {
        addCart(state.token, cartForm).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 购物车加
    AddCartPlus ({ commit, state }, cartForm) {
      return new Promise((resolve, reject) => {
        addCartPlus(state.token, cartForm).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 购物车减
    AddCartMinus ({ commit, state }, cartForm) {
      return new Promise((resolve, reject) => {
        addCartMinus(state.token, cartForm).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 从购物车移除
    DelCart ({ commit, state }, cartForm) {
      return new Promise((resolve, reject) => {
        delCart(state.token, cartForm).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 清空购物车
    CleanupCart ({ commit, state }, cartForm) {
      return new Promise((resolve, reject) => {
        cleanupCart(state.token, cartForm).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询购物车列表
    ListCart ({ commit, state }, cartForm) {
      return new Promise((resolve, reject) => {
        listCart(state.token, cartForm).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取购物车数量
    CountCart ({ commit, state }, cartForm) {
      return new Promise((resolve, reject) => {
        countCart(state.token, cartForm).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取购物车图片列表
    CartImgs ({ commit, state }, cartForm) {
      return new Promise((resolve, reject) => {
        cartImgs(state.token, cartForm).then(response => {
          commit('SET_CONFIRM_ORDER_PRODUCT_IMG', response.data.bizData.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 结算
    SettleCart ({ commit, state }, cartForm) {
      return new Promise((resolve, reject) => {
        settleCart(state.token, cartForm).then(response => {
          // 订单信息保存到vuex
          commit('SET_CONFIRM_ORDER_INFO', response.data.bizData)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default cart
