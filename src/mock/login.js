/*
 * @Author: lidongliang
 * @Date: 2017-10-17 18:41:21
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-18 14:47:05
 * mock 数据
 */
import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    money: '999',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  developer: {
    role: ['develop'],
    token: 'develop',
    introduction: '我是开发',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '工程师小王'
  }
}

export default {
  // 登录
  loginByUserName: config => {
    const { userId } = JSON.parse(config.body)
    return userMap[userId]
  },
  // 获得用户信息
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return new Promise(function (resolve, reject) {
        reject(new Error('something bad happened'))
      })
    }
  },
  logout: () => 'success'
}
