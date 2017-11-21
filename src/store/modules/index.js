/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 15:42:05
 * 主页信息 module
 */
import { bonusPackagesInfo, competitiveProductsInfo, quotaInfo } from '@/api/index'
import { getToken } from '@/utils/auth'

const index = {

  // 定义数据状态
  state: {
    token: getToken()
  },

  // 改变数据状态
  // mutations -> state
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  // 触发
  // commit -> mutation
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
        quotaInfo(state.token, category).then(response => {
          console.log('response.data.data ' + response.data.data)
          resolve(response.data.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default index
