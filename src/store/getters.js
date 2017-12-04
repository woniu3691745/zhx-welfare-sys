/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:02
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-01 17:22:59
 * getter
 */
const getters = {
  name: state => state.user.name,
  roles: state => state.user.roles,
  token: state => state.user.token,
  updatedpaypassword: state => state.user.updatedpaypassword,
  quota: state => state.user.quota,
  orderInfo: state => state.cart.orderInfo,
  productImg: state => state.cart.productImg,
  cartCount: state => state.index.cartCount,
  getCardNo: state => state.register.cardNo,
  getSigninPwd: state => state.register.signinPwd,
  getPhoneNo: state => state.register.phoneNo,
  getCaptchaId: state => state.register.captchaId
}
export default getters
