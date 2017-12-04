/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:32:53
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-04 16:23:59
 * vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import index from './modules/index'
import goodList from './modules/goodList'
import register from './modules/register'
import mall from './modules/mall'
import cart from './modules/cart'
import order from './modules/order'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    register,
    index,
    mall,
    goodList,
    cart,
    order
  },
  getters
})
