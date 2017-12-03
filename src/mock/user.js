export default {
    // 获取验证码
  GetIdCode: config => {
    return {'bizData': {'Captacha': {'ID': '57EC4C57E538FF16BC1F3BDDDD36FC4C', 'Type': '04', 'Code': '232621'},
      'User': {'IDCard': '511100199608102011'}
    },
      'token': '52EA3923FA55DD56B529061BFEF26494'}
  },
  resPassword: config => {
    return {
      'result': true,
      'message': '业务成功'
    }
  }
}
