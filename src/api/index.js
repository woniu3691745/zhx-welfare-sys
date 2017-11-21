/*
 * @Author: lidongliang
 * @Date: 2017-10-23 10:40:22
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-20 09:46:56
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

// 获得种类额度
export function quotaInfo (token, category) {
  const data = {
    data: {
      productTypeId: category
    },
    token
  }
  return fetch({
    url: '/api/wcc/balance/list.cp',
    method: 'post',
    data
  })
}
