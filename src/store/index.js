/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:32:53
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-23 16:26:18
 * vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import index from './modules/index'
import goodList from './modules/goodList'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    index,
    goodList
  },
  getters
})
