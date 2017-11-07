/*
 * @Author: lidongliang
 * @Date: 2017-10-12 17:58:36
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-07 16:10:34
 * 路由
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: resolve => require(['@/views/login.vue'], resolve) },
  { path: '/home',
    component: resolve => require(['@/views/home.vue'], resolve),
    children: [
      {
        path: '/index',
        name: '',
        component: resolve => require(['@/views/index.vue'], resolve)
      },
      {
        path: '/order',
        name: '',
        component: resolve => require(['@/views/order.vue'], resolve)
      },
      {
        path: '/cart',
        name: '',
        component: resolve => require(['@/views/cart.vue'], resolve)
      },
      {
        path: '/mine',
        name: '',
        component: resolve => require(['@/views/mine.vue'], resolve)
      }
    ]
  },

  // { path: '/index', component: resolve => require(['@/components/index.vue'], resolve) },
  // { path: '/order', component: resolve => require(['@/components/order.vue'], resolve) },
  // { path: '/cart', component: resolve => require(['@/components/cart.vue'], resolve) },
  // { path: '/mine', component: resolve => require(['@/components/mine.vue'], resolve) },

  { path: '/goods', component: resolve => require(['@/components/goods.vue'], resolve) },
  { path: '/detail', component: resolve => require(['@/components/detail.vue'], resolve) }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
