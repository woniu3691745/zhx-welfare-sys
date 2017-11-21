/*
 * @Author: lidongliang
 * @Date: 2017-10-17 18:37:07
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 10:05:30
 * token
 */

import Cookies from 'js-cookie'

const TokenKey = 'zhx-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
