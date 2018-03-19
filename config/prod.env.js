'use strict'
const isonline = process.env.BUILD_ENV
module.exports = {
  NODE_ENV: '"production"',
  // SIT
  BASE_API: isonline ? '"https://mall.zihexin.cn/WelfareMall-interface"' : '"https://mall-uat.zihexin.cn:8087/WelfareMall-interface"'

  // PRO
  //BASE_API:
}
