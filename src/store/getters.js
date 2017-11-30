/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:02
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-29 20:35:17
 * getter
 */
const getters = {
  name: state => state.user.name,
  roles: state => state.user.roles,
  token: state => state.user.token,
  quota: state => state.user.quota,
  orderInfo: state => state.cart.orderInfo,
  getCardNo: state => state.register.cardNo,
  getSigninPwd: state => state.register.signinPwd,
  getPhoneNo: state => state.register.phoneNo,
  getCaptchaId: state => state.register.captchaId
}
export default getters
