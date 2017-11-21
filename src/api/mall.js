/*
 * @Author: lidongliang
 * @Date: 2017-11-16 16:38:25
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 11:09:10
 * 商城信息API
 */
import fetch from '@/utils/fetch'

// 商城目录
export function catalogueInfo (token, catalogueForm) {
  const data = {
    data: {
      productTypeId: catalogueForm.itemType,
      levelId: '03'
    },
    token
  }
  return fetch({
    url: '/api/product/type3.cp',
    method: 'post',
    data
  })
}
