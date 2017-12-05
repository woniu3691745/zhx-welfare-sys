/*
 * @Author: lidongliang
 * @Date: 2017-12-05 14:00:35
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-05 14:01:40
 * 地址
 */

 // 默认地址
export function findOne (token, addressId) {
  const data = {
    bizData: {
      addressId
    },
    token
  }
  return fetch({
    url: '/useraddress/findOne.cp',
    method: 'post',
    data
  })
}
