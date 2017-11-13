/*
 * @Author: lidongliang
 * @Date: 2017-10-12 17:58:36
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-13 15:02:33
 * 路由
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/', redirect: '/home' },
  { path: '/index', name: '首页', component: resolve => require(['@/views/index.vue'], resolve) },
  { path: '/login', name: '登录', component: resolve => require(['@/views/login.vue'], resolve) },
  {
    path: '/home',
    redirect: '/balance',
    name: '首页',
    component: resolve => require(['@/views/home.vue'], resolve),
    children: [
      {
        path: '/balance',
        name: '额度',
        component: resolve => require(['@/views/balance.vue'], resolve)
      },
      {
        path: '/mall',
        name: '商城',
        component: resolve => require(['@/views/mall.vue'], resolve)
      },
      {
        path: '/mine',
        name: '我的',
        component: resolve => require(['@/views/mine.vue'], resolve)
      },
      { path: '/cart',
        name: '购物车',
        component: resolve => require(['@/views/cart.vue'], resolve)
      }
    ]
  },

  { path: '/order', name: '订单', component: resolve => require(['@/views/order.vue'], resolve) },
  { path: '/cart', name: '购物车', component: resolve => require(['@/views/cart.vue'], resolve) },

  { path: '/goods', name: '商品', component: resolve => require(['@/components/goods.vue'], resolve) },
  { path: '/detail', name: '商品详情', component: resolve => require(['@/components/detail.vue'], resolve) },

  { path: '/register', name: '绑定手机号', component: resolve => require(['@/views/register/register.vue'], resolve) }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
