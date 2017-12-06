import fetch from '@/utils/fetch'
// 查询用户绑定的地址集合
export function ZHXUSERAddressLIST (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  return fetch({
    url: '/useraddress/find.cp',
    method: 'post',
    data
  })
}
// 查询用户绑定的地址集合
export function ZHXONEUSERAddress (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  return fetch({
    url: '/useraddress/findOne.cp',
    method: 'post',
    data
  })
}
// 添加用户地址
export function ZHX_ADD_ADDRESS (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  return fetch({
    url: '/useraddress/add.cp',
    method: 'post',
    data
  })
}
// 更改用户地址
export function ZHX_UPDATE_ADDRESS (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  return fetch({
    url: '/useraddress/update.cp',
    method: 'post',
    data
  })
}
// 删除用户地址
export function ZHX_DELETE_ADDRESS (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  return fetch({
    url: '/useraddress/delete.cp',
    method: 'post',
    data
  })
}
// 获取省、市、县、镇地址列表
export function ZHX_GET_ADDRESS_LIST (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  return fetch({
    url: '/useraddress/addr.cp',
    method: 'post',
    data
  })
}
// 获取用户基本信息
export function ZHX_GET_USERINFO (token, bindIdCodeInfo) {
  const data = {...bindIdCodeInfo, token}
  return fetch({
    url: '/user/findInfo.cp',
    method: 'post',
    data
  })
}
