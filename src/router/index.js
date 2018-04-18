/*
 * @Author: lidongliang
 * @Date: 2017-10-12 17:58:36
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-07 17:59:18
 * 路由
 */

import Vue from 'vue'
import Router from 'vue-router'
import confirmOrder from '../views/order/confirmOrder.vue'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/', redirect: '/index' },
  { path: '/index', name: '首页', component: resolve => require(['@/views/index.vue'], resolve), meta: {'title': '首页'} },
  // { path: '/login', name: '登录', component: resolve => require(['@/views/login.vue'], resolve) },
  {
    path: '/home',
    redirect: '/balance',
    component: resolve => require(['@/views/main/home.vue'], resolve),
    children: [
      {
        path: '/balance',
        name: '额度',
        component: resolve => require(['@/views/main/balance.vue'], resolve),
        meta: {'title': '额度'}
      },
      {
        path: '/mall',
        name: '商城',
        component: resolve => require(['@/views/main/mall.vue'], resolve),
        meta: {'title': '商城'}
      },
      { path: '/cart', name: '购物车', component: resolve => require(['@/views/main/cart.vue'], resolve), meta: {'title': '购物车'} },
      {
        path: '/mine',
        name: '我的',
        component: resolve => require(['@/views/main/mine.vue'], resolve),
        meta: {'title': '我的'}
      }
    ]
  },

  { path: '/order', name: '订单', component: resolve => require(['@/views/main/order.vue'], resolve), meta: {'title': '订单'} },
  { path: '/balanceDetail', name: '商品额度', component: resolve => require(['@/components/balanceDetail.vue'], resolve), meta: {'title': '商品额度'} },
  { path: '/goods', name: '商品', component: resolve => require(['@/components/goods.vue'], resolve), meta: {'title': '商品'} },
  { path: '/goodsList', name: '商品列表', component: resolve => require(['@/components/goodsList.vue'], resolve), meta: {'title': '商品列表'} },
  { path: '/detail', name: '商品详情', component: resolve => require(['@/components/detail.vue'], resolve), meta: {'title': '商品详情'} },
  /**
   * 注册
   */
  { path: '/register', name: '注册', component: resolve => require(['@/views/register/register.vue'], resolve), meta: {'title': '注册'} },
  { path: '/bindPhoneNum', name: '绑定手机号', component: resolve => require(['@/views/register/bindPhoneNum.vue'], resolve), meta: {'title': '绑定手机号'} },
  { path: '/setPassWord', name: '设置登录密码', component: resolve => require(['@/views/register/setPassWord.vue'], resolve), meta: {'title': '设置登录密码'} },
  { path: '/setPayPassWord', name: '设置支付密码', component: resolve => require(['@/views/register/setPayPassWord.vue'], resolve), meta: {'title': '设置支付密码'} },
  /**
   * 登录
   */
  { path: '/login', name: '登录', component: resolve => require(['@/views/login/login.vue'], resolve), meta: {'title': '登录'} },
  { path: '/resetLoginPassWord', name: '登录密码', component: resolve => require(['@/views/login/resetLoginPassWord.vue'], resolve), meta: {'title': '登录密码'} },
  /**
   * 订单
   */
  { path: '/confirmOrder', name: '确认订单', component: confirmOrder, meta: {'title': '确认订单'} },
  { path: '/selectAddress', name: '选择地址', component: resolve => require(['@/views/order/selectAddress.vue'], resolve), meta: {'title': '选择地址'} },
  { path: '/payChoice', name: '支付选择', component: resolve => require(['@/views/order/payChoice.vue'], resolve), meta: {'title': '支付选择'} },
  { path: '/inputPwd', name: '支付密码', component: resolve => require(['@/views/order/inputPwd.vue'], resolve), meta: {'title': '支付密码'} },
  { path: '/isSuccess', name: '是否支付成功', component: resolve => require(['@/views/order/isSuccess.vue'], resolve), meta: {'title': '支付是否成功'} },
  { path: '/success', name: '支付成功', component: resolve => require(['@/views/order/success.vue'], resolve), meta: {'title': '支付成功'} },
  { path: '/fail', name: '支付失败', component: resolve => require(['@/views/order/fail.vue'], resolve), meta: {'title': '支付失败'} },
  { path: '/orderDetail', name: '订单详情', component: resolve => require(['@/views/order/orderDetail.vue'], resolve), meta: {'title': '订单详情'} },
  { path: '/logisticsDetail', name: '物流详情', component: resolve => require(['@/views/order/logisticsDetail.vue'], resolve), meta: {'title': '物流详情'} },

  /**
   * 我的-地址
   */
  { path: '/mineOrder', name: '我的订单', component: resolve => require(['@/views/mine/mineOrder.vue'], resolve), meta: {'title': '我的订单'} },
  { path: '/addressMs', name: '管理收货地址', component: resolve => require(['@/views/address/addressManage.vue'], resolve), meta: {'title': '管理收货地址'} },
  { path: '/addAddress', name: '添加地址', component: resolve => require(['@/views/address/addAddress.vue'], resolve), meta: {'title': '添加地址'} },
  { path: '/addressEdit', name: 'addressEdit', component: resolve => require(['@/views/address/addressEdit.vue'], resolve), meta: {'title': 'addressEdit'} },
  /**
   *  我的-账户
   */
  { path: '/accountManagement', name: '账户管理', component: resolve => require(['@/views/account/accountManagement.vue'], resolve), meta: {'title': '账户管理'} },
  { path: '/resetLoginPwd', name: '重置登录密码', component: resolve => require(['@/views/account/resetLoginPwd.vue'], resolve), meta: {'title': '重置登录密码'} },
  { path: '/resetPayPwd', name: '重置支付密码', component: resolve => require(['@/views/account/payPwd/resetPayPwd.vue'], resolve), meta: {'title': '重置支付密码'} },
  {path: '/resetPayPwds', name: 'resetPayPwds', component: resolve => require(['@/views/account/payPwd/resetPayPwds.vue'], resolve), meta: {'title': '重置支付密码'}},
  { path: '/resetBindPhone', name: '更换绑定手机号', component: resolve => require(['@/views/account/resetBindPhone.vue'], resolve), meta: {'title': '更换绑定手机号'} },
  { path: '/contactService', name: '联系客服', component: resolve => require(['@/views/account/contactService.vue'], resolve), meta: {'title': '联系客服'} }
]

export default new Router({
  // mode: 'history',
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
