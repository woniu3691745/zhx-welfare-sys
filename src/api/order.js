/*
 * @Author: lidongliang
 * @Date: 2017-12-04 16:20:40
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-04 17:09:52
 * 订单
 */
import fetch from '@/utils/fetch'

// 订单提交
export function submit (token, submitInfo) {
  const data = {
    bizData: {
      ...submitInfo
    },
    token
  }
  return fetch({
    url: '/order/submit.cp',
    method: 'post',
    data
  })
}

// 订单支付
export function pay (token, payInfo) {
  const data = {
    bizData: {
      ...payInfo
    },
    token
  }
  return fetch({
    url: '/pay/e-card.cp',
    method: 'post',
    data
  })
}
