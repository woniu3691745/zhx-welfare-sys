/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:14
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 20:27:07
 * 商城 module
 */
import { catalogueInfo } from '@/api/mall'
import { getToken } from '@/utils/auth'

const mall = {

  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 商城目录
    CatalogueInfo ({ commit, state }, catalogueForm) {
      return new Promise((resolve, reject) => {
        catalogueInfo(state.token, catalogueForm).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default mall
