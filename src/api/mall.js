/*
 * @Author: lidongliang
 * @Date: 2017-11-16 16:38:25
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-28 14:43:39
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
    url: '/product/type3.cp',
    method: 'post',
    data
  })
}
