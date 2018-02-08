export default {
  // 获取验证码
  isPayCom: config => {
    return {
      'result': false,
      'message': '支付完成'
    }
  },
  // 第三方支付
  AliPay (config) {
    return {
      'result': true,
      'message': '业务成功',
      'bizData': 'https://openapi.alipaydev.com/gateway.do?alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2016091200494504&biz_content=%7B%22out_trade_no%22%3A%2220442320029931108%22%2C%22subject%22%3A%22%E5%A4%A7%E4%B9%90%E9%80%8F%22%2C%22total_amount%22%3A%2255.18%22%2C%22seller_id%22%3A%222088102175304036%22%2C%22product_code%22%3A%22QUICK_WAP_WAY%22%7D&charset=UTF-8&format=json&method=alipay.trade.wap.pay&notify_url=http%3A%2F%2Fmall.zihexin.cn%3A8081%2FzhxpayApi%2FnotifyUrl.html&return_url=https%3A%2F%2Fmall.zihexin.cn%2F&sign=bRkIi4o73CkHyHNzo55V5mWrVQPxM8b7NrN7H6TTtCRYTAkaAwI%2BeYhoDMvwgjJ0o1x%2BkehY6vwbU8L%2FDVS7cyB09N1phoJgm1Mq3fyob5p83ItqTu2K3HwkQW13uY7t6Emndb%2BnnuIwcZmLTUSPCXS46Zf38FXhCaiCQ1exbc4gwTTvBCC%2B%2BEgvnEhV1bKvLvVjsZhxC8clti9hJHEIuHyqiHFKeXEddOd4Z4J40K%2BexuV9AXw%2Bt3KjhK9YD86NS9VEj%2BQhabDS3Gq9NKMjjirAGKXT5Nq1mf0XfT1ytqHaOdBV5nrHGMPn5KkPrU7A9GpvtFpSPsk8zufOBVQB6A%3D%3D&sign_type=RSA2&timestamp=2018-02-05+19%3A01%3A22&version=1.0'
    }
  },
  // mixPay
  MixPay (config) {
    return {
      'result': true,
      'message': '业务成功',
      'bizData': 'https://openapi.alipaydev.com/gateway.do?alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2016091200494504&biz_content=%7B%22out_trade_no%22%3A%2220442320029931108%22%2C%22subject%22%3A%22%E5%A4%A7%E4%B9%90%E9%80%8F%22%2C%22total_amount%22%3A%2255.18%22%2C%22seller_id%22%3A%222088102175304036%22%2C%22product_code%22%3A%22QUICK_WAP_WAY%22%7D&charset=UTF-8&format=json&method=alipay.trade.wap.pay&notify_url=http%3A%2F%2Fmall.zihexin.cn%3A8081%2FzhxpayApi%2FnotifyUrl.html&return_url=https%3A%2F%2Fmall.zihexin.cn%2F&sign=bRkIi4o73CkHyHNzo55V5mWrVQPxM8b7NrN7H6TTtCRYTAkaAwI%2BeYhoDMvwgjJ0o1x%2BkehY6vwbU8L%2FDVS7cyB09N1phoJgm1Mq3fyob5p83ItqTu2K3HwkQW13uY7t6Emndb%2BnnuIwcZmLTUSPCXS46Zf38FXhCaiCQ1exbc4gwTTvBCC%2B%2BEgvnEhV1bKvLvVjsZhxC8clti9hJHEIuHyqiHFKeXEddOd4Z4J40K%2BexuV9AXw%2Bt3KjhK9YD86NS9VEj%2BQhabDS3Gq9NKMjjirAGKXT5Nq1mf0XfT1ytqHaOdBV5nrHGMPn5KkPrU7A9GpvtFpSPsk8zufOBVQB6A%3D%3D&sign_type=RSA2&timestamp=2018-02-05+19%3A01%3A22&version=1.0'
    }
  }
}
