/*
 * @Author: lidongliang
 * @Date: 2017-10-23 10:40:22
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 15:26:53
 * 首页API
 */
import fetch from '@/utils/fetch'

// 超级大礼包
export function bonusPackagesInfo (token, viewNums) {
  const data = {
    data: {
      index: viewNums.index,
      limit: viewNums.limit,
      sequenceType: viewNums.sequenceType,
      productTypeId: viewNums.productTypeId
    },
    token
  }
  return fetch({
    url: '/api/product/gift.cp',
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
      sequenceType: viewNums.sequenceType,
      productTypeId: viewNums.productTypeId
    },
    token
  }
  return fetch({
    url: '/api/product/top.cp',
    method: 'post',
    data
  })
}

// 获得种类额度
export function quotaInfo (token, productTypeId) {
  const data = {
    data: {
      productTypeId: productTypeId
    },
    token
  }
  return fetch({
    url: '/api/wcc/balance/type.cp',
    method: 'post',
    data
  })
}
