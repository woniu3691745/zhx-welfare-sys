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
        disabled:false
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      value: [],
      values: '',
      valu: '5',
      options: [{
        label: '222',
        disabled: true
      }],
      alioptions: [{
        label: '支付宝支付',
        value: 2,
        disabled: false
      }],
      option: [],
      orderInfos: this.orderInfo,
      typeId: this.$route.query.typeId,
      orderNo: this.$route.query.orderNo
    }
  },
  computed: {
    ...mapGetters(['orderInfo', 'quota']),
    Apay () {
      return this.value.includes(1)
    },
    Alipay () {
      return this.value.includes(2)
    }
  },
  created () {
    const {typeId, orderNo} = this
    this.orderInfos = this.orderInfo
    this.getData(typeId, orderNo)
    this.choice(typeId)
  },
  methods: {
    handClick () {
      const flag = this.value.length > 0
      if (flag) this.$router.push('/')
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
          if (v.balance > this.orderInfos) {
            this.alioptions = [Object.assign(...this.alioptions, {disabled: true})]
          } else {
            const num = this.orderInfos - v.balance
            this.option = [`应付：${num}`]
          }
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
.main>.Apay{
  padding:0 10px;
  font-size: 12px;
  color:coral
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

