/*
 * @Author: lidongliang
 * @Date: 2017-10-23 10:40:22
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-14 19:06:36
 * 商品列表API
 */
import fetch from '@/utils/fetch'

// 商品列表
export function goodList (token, viewNums) {
  const data = {
    data: {
      index: viewNums.index,
      limit: viewNums.limit,
      sequenceType: viewNums.sequenceType
    },
    token
  }
  return fetch({
    url: '/api/item/queryItem.cp',
    method: 'post',
    data
  })
}
// 获得商品信息
export function goodListById (token, id) {
  const data = {
    data: {
      id: id
    },
    token
  }
  return fetch({
    url: '/api/item/queryItemDetail.cp',
    method: 'post',
    data
  })
}
