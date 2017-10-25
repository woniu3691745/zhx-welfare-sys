/*
 * @Author: lidongliang
 * @Date: 2017-10-12 17:58:36
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-24 16:11:46
 * 路由
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: resolve => require(['@/views/login.vue'], resolve) },
  { path: '/home', component: resolve => require(['@/views/home.vue'], resolve) },
  { path: '/goods', component: resolve => require(['@/components/goods.vue'], resolve) },
  { path: '/detail', component: resolve => require(['@/components/detail.vue'], resolve) }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
