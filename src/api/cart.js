/*
 * @Author: lidongliang
 * @Date: 2017-10-23 10:40:22
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-01 17:03:59
 * 购物车API
 */
import fetch from '@/utils/fetch'

// 加入购物车
export function addCart (token, cartForm) {
  const data = {
    bizData: {
      mallSku: cartForm.mallSku,
      cartType: cartForm.cartType,
      skuCount: cartForm.skuCount
    },
    token
  }
  return fetch({
    url: '/cart/add.cp',
    method: 'post',
    data
  })
}

// 购物车加
export function addCartPlus (token, cartForm) {
  const data = {
    bizData: {
      cartDetailId: cartForm.cartDetailId,
      cartType: cartForm.cartType,
      mallSku: cartForm.mallSku,
      skuCount: cartForm.skuCount
    },
    token
  }
  return fetch({
    url: '/cart/plus.cp',
    method: 'post',
    data
  })
}

// 购物车减
export function addCartMinus (token, cartForm) {
  const data = {
    bizData: {
      cartDetailId: cartForm.cartDetailId,
      cartType: cartForm.cartType,
      mallSku: cartForm.mallSku,
      skuCount: cartForm.skuCount
    },
    token
  }
  return fetch({
    url: '/cart/minus.cp',
    method: 'post',
    data
  })
}

// 从购物车移除
export function delCart (token, cartForm) {
  const data = {
    bizData: {
      cartDetailId: cartForm.cartDetailId
    },
    token
  }
  return fetch({
    url: '/cart/del.cp',
    method: 'post',
    data
  })
}

// 清空购物车
export function cleanupCart (token, cartForm) {
  const data = {
    bizData: {
      cartType: cartForm.cartType
    },
    token
  }
  return fetch({
    url: '/cart/cleanup.cp',
    method: 'post',
    data
  })
}

// 查询购物车列表
export function listCart (token, cartForm) {
  const data = {
    bizData: {
      index: cartForm.index,
      limit: cartForm.limit,
      cartType: cartForm.cartType
    },
    token
  }
  return fetch({
    url: '/cart/list.cp',
    method: 'post',
    data
  })
}

// 获取购物车数量
export function countCart (token, cartForm) {
  const data = {
    bizData: {
      cartType: cartForm.cartType
    },
    token
  }
  return fetch({
    url: '/cart/count.cp',
    method: 'post',
    data
  })
}

// 获取购物车图片列表
export function cartImgs (token, cartForm) {
  const data = {
    bizData: {
      index: cartForm.index,
      limit: cartForm.limit,
      cartType: cartForm.cartType,
      mallSkus: cartForm.mallSkus
    },
    token
  }
  return fetch({
    url: '/cart/imgs.cp',
    method: 'post',
    data
  })
}

// 结算
export function settleCart (token, cartForm) {
  const data = {
    bizData: {
      cartType: cartForm.cartType,
      mallSkus: cartForm.mallSkus
    },
    token
  }
  return fetch({
    url: '/cart/settle.cp',
    method: 'post',
    data
  })
}
// 重新支付
export const Repay = (token, res) => {
  const data = {
    bizData: {
      'orderNo': res
    },
    token
  }
  return fetch({
    url: '/pay/third-party-pay-again.cp',
    method: 'post',
    data
  })
}
