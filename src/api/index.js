/*
 * @Author: lidongliang
 * @Date: 2017-10-23 10:40:22
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-23 15:01:15
 * 首页API
 */

import fetch from '@/utils/fetch'

// 超级大礼包
export function bonusPackagesInfo (token, viewNums) {
  const data = {
    data: {
      index: viewNums.index,
      limit: viewNums.limit,
      sequenceType: viewNums.sequenceType
    },
    token
  }
  return fetch({
    url: '/api/item/queryGiftItem.cp',
    method: 'post',
    data
  })
}

// 精品推荐
export function competitiveProductsInfo (token, viewNums) {
  const data = {
    data: {
      index: viewNums.index,
      limit: viewNums.limit,
      sequenceType: viewNums.sequenceType
    },
    token
  }
  return fetch({
    url: '/api/item/queryTopItem.cp',
    method: 'post',
    data
  })
}
