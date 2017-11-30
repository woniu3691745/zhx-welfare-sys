/*
 * @Author: lidongliang
 * @Date: 2017-10-12 17:58:36
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-30 10:45:26
 * 路由
 */

import Vue from 'vue'
import Router from 'vue-router'
import confirmOrder from '../views/order/confirmOrder.vue'

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
  { path: '/resetLoginPassWord', name: '登录密码', component: resolve => require(['@/views/login/resetLoginPassWord.vue'], resolve) },
  /**
   * 订单
   */
  { path: '/confirmOrder', name: '确认订单', component: confirmOrder },
  { path: '/selectAddress', name: '选择地址', component: resolve => require(['@/views/order/selectAddress.vue'], resolve) },
  { path: '/inputPwd', name: '支付密码', component: resolve => require(['@/views/order/inputPwd.vue'], resolve) },
  { path: '/success', name: '支付成功', component: resolve => require(['@/views/order/success.vue'], resolve) },
  { path: '/fail', name: '支付失败', component: resolve => require(['@/views/order/fail.vue'], resolve) },
  { path: '/orderDetail', name: '订单详情', component: resolve => require(['@/views/order/orderDetail.vue'], resolve) },
  { path: '/logisticsDetail', name: '物流详情', component: resolve => require(['@/views/order/logisticsDetail.vue'], resolve) },

  /**
   * 我的-地址
   */
  { path: '/mineOrder', name: '我的订单', component: resolve => require(['@/views/mine/mineOrder.vue'], resolve) },
  { path: '/addressMs', name: '管理收货地址', component: resolve => require(['@/views/address/addressManage.vue'], resolve) },
  { path: '/addAddress', name: '添加地址', component: resolve => require(['@/views/address/addAddress.vue'], resolve) },
  { path: '/addressEdit', name: '编辑收货人', component: resolve => require(['@/views/address/addressEdit.vue'], resolve) },

  /**
   *  我的-账户
   */
  { path: '/accountManagement', name: '账户管理', component: resolve => require(['@/views/account/accountManagement.vue'], resolve) },
  { path: '/resetLoginPwd', name: '重置登录密码', component: resolve => require(['@/views/account/resetLoginPwd.vue'], resolve) },
  { path: '/resetPayPwd', name: '重置支付密码', component: resolve => require(['@/views/account/payPwd/resetPayPwd.vue'], resolve) },
  { path: '/resetBindPhone', name: '更换绑定手机号', component: resolve => require(['@/views/account/resetBindPhone.vue'], resolve) }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap,
  // 回到顶点
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
