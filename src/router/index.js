/*
 * @Author: lidongliang
 * @Date: 2017-10-12 17:58:36
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 20:59:30
 * 路由
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/', redirect: '/home' },
  { path: '/index', name: '首页', component: resolve => require(['@/views/index.vue'], resolve) },
  // { path: '/login', name: '登录', component: resolve => require(['@/views/login.vue'], resolve) },
  {
    path: '/home',
    redirect: '/balance',
    component: resolve => require(['@/views/main/home.vue'], resolve),
    children: [
      {
        path: '/balance',
        name: '额度',
        component: resolve => require(['@/views/main/balance.vue'], resolve)
      },
      {
        path: '/mall',
        name: '商城',
        component: resolve => require(['@/views/main/mall.vue'], resolve)
      },
      { path: '/cart', name: '购物车', component: resolve => require(['@/views/main/cart.vue'], resolve) },
      {
        path: '/mine',
        name: '我的',
        component: resolve => require(['@/views/main/mine.vue'], resolve)
      }
    ]
  },

  { path: '/order', name: '订单', component: resolve => require(['@/views/main/order.vue'], resolve) },

  { path: '/goods', name: '商品', component: resolve => require(['@/components/goods.vue'], resolve) },
  { path: '/goodsList', name: '商品列表', component: resolve => require(['@/components/goodsList.vue'], resolve) },
  { path: '/detail', name: '商品详情', component: resolve => require(['@/components/detail.vue'], resolve) },
  /**
   * 注册
   */
  { path: '/register', name: '注册', component: resolve => require(['@/views/register/register.vue'], resolve) },
  { path: '/bindPhoneNum', name: '绑定手机号', component: resolve => require(['@/views/register/bindPhoneNum.vue'], resolve) },
  { path: '/setPassWord', name: '设置登录密码', component: resolve => require(['@/views/register/setPassWord.vue'], resolve) },
  { path: '/setPayPassWord', name: '设置支付密码', component: resolve => require(['@/views/register/setPayPassWord.vue'], resolve) },
  /**
   * 登录
   */
  { path: '/login', name: '登录', component: resolve => require(['@/views/login/login.vue'], resolve) },
  { path: '/resetLoginPassWord', name: '重置登录密码', component: resolve => require(['@/views/login/resetLoginPassWord.vue'], resolve) },
  /**
   * 订单
   */
  { path: '/confirmOrder', name: '确认订单', component: resolve => require(['@/views/order/confirmOrder.vue'], resolve) },
  { path: '/addAddress', name: '添加地址', component: resolve => require(['@/views/order/addAddress.vue'], resolve) },
  { path: '/selectAddress', name: '选择地址', component: resolve => require(['@/views/order/selectAddress.vue'], resolve) },
  { path: '/inputPwd', name: '支付密码', component: resolve => require(['@/views/order/inputPwd.vue'], resolve) },
  { path: '/success', name: '支付成功', component: resolve => require(['@/views/order/success.vue'], resolve) },
  { path: '/fail', name: '支付失败', component: resolve => require(['@/views/order/fail.vue'], resolve) },
  { path: '/orderDetail', name: '订单详情', component: resolve => require(['@/views/order/orderDetail.vue'], resolve) },
  { path: '/logisticsDetail', name: '物流详情', component: resolve => require(['@/views/order/logisticsDetail.vue'], resolve) },

  /**
   * 我的
   */
  { path: '/mineOrder', name: '我的订单', component: resolve => require(['@/views/mine/mineOrder.vue'], resolve) }

]

export default new Router({
  mode: 'history',
  routes: constantRouterMap,
  // 回到定点
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
