export default {
    // 获取验证码
  GetIdCode: config => {
    return {
      'result': true,
      'message': '业务成功',
      'bizData': {
        'Captacha': {
          'ID': 'FC8554340F8618B426F19578C4DF78AF'
        }
      }
    }
  },
  resPassword: config => {
    return {
      'result': true,
      'message': '业务成功'
    }
  }
}
