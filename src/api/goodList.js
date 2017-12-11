/*
 * @Author: lidongliang
 * @Date: 2017-10-23 10:40:22
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-11 16:34:19
 * 商品列表API
 */
import fetch from '@/utils/fetch'

// 商品列表
export function goodList (token, orderListForm) {
  const data = {
    data: {
      index: orderListForm.index,
      limit: orderListForm.limit,
      sequenceType: orderListForm.sequenceType,
      productTypeId: orderListForm.productTypeId
    },
    token
  }
  return fetch({
    url: '/product/all.cp',
    method: 'post',
    data
  })
}
// 获得商品详细信息
export function goodListById (token, productSku) {
  const data = {
    data: {
      productSku: productSku
    },
    token
  }
  return fetch({
    url: '/product/detail.cp',
    method: 'post',
    data
  })
}
