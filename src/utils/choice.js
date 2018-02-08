export const mixin = {
  methods: {
    // 策略模式
    strategies (level) {
      let strategies = {
        '1': 'edu',
        '2': 'ali',
        '1_2': 'all',
        '2_1': 'all'
      }
      return strategies[level]
    },
    // 职责链设计模式
    after () {
      /* eslint-disable */
      Function.prototype.after = function (fn) {
        var self = this;
        return function () {
          var ref = self.apply(this, arguments)
          if (ref == 'next') {
            return fn.apply(this, arguments);
          }
          return ref
        }
      }
      /* eslint-enable */
    },
    // e支付
    epayFn (orderType, choiceType) {
      if (orderType && choiceType === 'edu') {
        console.log('e度支付')
        this.payDetai = [{
          type: 'edu',
          amount: this.orderInfos
        }]
        this.flag = true
        this.types = choiceType
      } else {
        return 'next'
      }
    },
    // all 支付
    allpayFn (orderType, choiceType) {
      if (!orderType && choiceType === 'all') {
        const num = (this.orderInfos - this.balance).toFixed(2)
        let str = `应付支付宝${num}元`
        this.option = [{
          label: str,
          value: 'Apay'
        }]
        this.payDetai = [{
          type: '00',
          amount: this.orderInfos
        }, {
          type: '01',
          amount: num
        }]
        this.flag = true
        this.alimutch = num
        this.types = parseFloat(this.balance)
      } else {
        return 'next'
      }
    },
    // Alip 支付
    alipayFn (orderType, choiceType) {
      if (choiceType === 'ali') {
        let str = `应付支付宝${this.orderInfos}元`
        this.option = [{
          label: str,
          value: 'Apay'
        }]
        this.payDetai = [{
          type: '00',
          amount: this.orderInfos
        }]
        this.flag = true
        this.alimutch = this.orderInfos
        this.types = choiceType
      } else {
        return 'next'
      }
      console.log('支付宝')
    },
    nopayFn (orderType, choiceType) {
      this.flag = false
      return 'done'
    }
  }
}
