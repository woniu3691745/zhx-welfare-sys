/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-30 12:18:16
 * 主页信息 module
 */
import { bonusPackagesInfo, competitiveProductsInfo, quotaInfo, count } from '@/api/index'
import { getToken } from '@/utils/auth'

const index = {

  state: {
    token: getToken(),
    cartCount: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // 购物车数量
    CART_COUNT: (state, cartCount) => {
      state.cartCount = cartCount
    }
  },

  actions: {
    // 超级大礼包
    BonusPackagesInfo ({ commit, state }, viewNums) {
      return new Promise((resolve, reject) => {
        bonusPackagesInfo(state.token, viewNums).then(response => {
          resolve(response.data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 精品推荐
    CompetitiveProductsInfo ({ commit, state }, viewNums) {
      return new Promise((resolve, reject) => {
        competitiveProductsInfo(state.token, viewNums).then(response => {
          resolve(response.data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 通过额度种类获得种类额度信息
    QuotaInfo ({ commit, state }, category) {
      return new Promise((resolve, reject) => {
        quotaInfo(state.token, category.productTypeId).then(response => {
          resolve(response.data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 购物车数量
    Count ({ commit, state }, cartType) {
      return new Promise((resolve, reject) => {
        count(state.token, cartType).then(response => {
          commit('CART_COUNT', response.data.bizData.total)
          resolve(response.data.bizData)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default index
