/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 15:59:11
 * 商品列表信息 module
 */
import { goodList, goodListById } from '@/api/goodList'
import { getToken } from '@/utils/auth'

const goodLists = {

  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 商品列表
    GoodList ({ commit, state }, viewNums) {
      return new Promise((resolve, reject) => {
        goodList(state.token, viewNums).then(response => {
          resolve(response.data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获得商品信息
    GoodListById ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        goodListById(state.token, id).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default goodLists
