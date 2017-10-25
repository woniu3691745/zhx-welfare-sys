/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-23 16:28:24
 * 商品列表信息 module
 */
import { goodList } from '@/api/goodList'
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
    }
  }
}
export default goodLists
