<template>
  <div>
    <div class="common-header">
      <mt-header title="支付选择" fixed>
        <router-link to="/mineOrder" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="main">
      <mt-checklist v-model="value" :options="[{
        label:'额度支付',
        value:1,
      }]">
      </mt-checklist>
      <div v-show="Apay" class="Apay">
        <mt-radio v-model="values" :options="options">
        </mt-radio>
      </div>
      <mt-checklist v-model="value" :options="alioptions">
      </mt-checklist>
      <div v-show="Alipay" class="Apay">
        <mt-radio v-model="valu" :options="option">
        </mt-radio>
      </div>
      <div class="button">
        <mt-button size="large" type="danger" @click.native="handClick">下一步</mt-button>
      </div>
    </div>
    <zyp-loading :z-flag="once"></zyp-loading>
  </div>
</template>
<script>
import { mixin } from '../../utils/choice'
import { bymixin } from '../../utils/minxs'
import { setItem, getItem, removeItem } from '../../utils/store'
import { mapGetters } from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
export default {
  data () {
    return {
      flag: false,
      once: false,
      value: [],
      values: '',
      valu: 'Apay',
      options: [{
        label: '222',
        disabled: true
      }],
      alioptions: [{
        label: '支付宝支付',
        value: 2
      }],
      option: [],
      orderInfos: '',
      typeId: this.$route.query.typeId,
      orderNo: this.$route.query.orderNo,
      payDetai: [],
      balance: 0,
      // 职责链返回变量
      order: '',
      types: null,
      alimutch: null

    }
  },
  mixins: [mixin, bymixin],
  computed: {
    ...mapGetters(['orderInfo', 'quota']),
    Apay () {
      return this.value.includes(1)
    },
    Alipay () {
      return this.value.includes(2)
    }
  },
  watch: {
    value (news, pro) {
      this.Choices(news, pro)
    }
  },
  created () {
    const {typeId, orderNo} = this
    this.orderInfos = this.orderInfo.cartTotal || this.orderInfo
    this.getData(typeId, orderNo)
    this.choice(typeId)
    this.after()
  },
  mounted () {
    this.order = this.epayFn.after(this.alipayFn).after(this.allpayFn).after(this.nopayFn)
  },
  methods: {
    Choices (news, pro) {
      let orderType = this.balance > this.orderInfos
      let str = this.value.join('_')
      let choiceType = this.strategies(str)
      if (orderType && choiceType === 'all') {
        news.splice(news.indexOf(pro[0]), 1)
      }
      this.order(orderType, choiceType)
    },
    handClick () {
      if (this.flag) {
        let key = this.orderNo.toString()
        let value = {
          detail: this.payDetai,
          price: this.orderInfos,
          types: this.types
        }
        getItem(key) ? (removeItem(key) || setItem(key, value)) : setItem(key, value)
        this.choiceRoute(this.types)
      } else {
        Toast({
          message: '请选择支付方式',
          position: 'top',
          duration: 2000
        })
      }
    },
    // 路由选择
    choiceRoute (types) {
      let { fullPath } = this.$route
      switch (types) {
        case 'ali':
          this.aliPays()
          break
        default:
          this.$router.push(fullPath.replace('/payChoice', '/inputPwd'))
      }
    },
    // 纯支付宝支付
    async aliPays () {
      if (this.once) return
      this.once = true
      const data = {
        'orderNo': this.orderNo,
        'cartType': this.typeId,
        'payDetail': [
          {
            'type': '01',
            'amount': this.alimutch
          }
        ]
      }
      try {
        const res = await this.$store.dispatch('AliPays', data)
        if (res.result) {
          location.href = res.bizData.alipayUrl
        } else {
          this.mtAlert(res.message).then(() => {
            this.once = false
            this.$router.replace('/mineOrder?selected=01')
          })
        }
      } catch (e) {
        this.once = false
      }
    },
    choice (typeId) {
      this.options = this.quota.map((v, k) => {
        const a = {}
        const str = `${v.typeName}:${v.balance}`
        a.label = str
        a.value = str
        a.disabled = true
        if (v.typeId === typeId) {
          a.disabled = false
          this.values = str
          this.balance = v.balance
        }
        return a
      })
    },
    getData (typeId, orderNo) {
      if (this.orderInfo) return
      let orderInfo = {
        orderId: orderNo
      }
      this.$store
        .dispatch('FindOne', orderInfo)
        .then(res => {
          if (res.OrderInfo) {
            this.orderInfos = res.OrderInfo.orderAmt
            this.choice(typeId)
          } else {
            MessageBox({
              title: '提示',
              message: res.message,
              showCancelButton: false
            })
          }
        })
        .catch(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 0.88rem;
  padding: 0 10px;
}
.main > .Apay {
  padding: 0 10px;
  font-size: 12px;
  color: coral;
}
.main > .pay {
  font-size: 14px;
  padding: 0 10px;
}
.button {
  position: absolute;
  bottom: 0.8rem;
  left: 10px;
  right: 10px;
}
</style>

