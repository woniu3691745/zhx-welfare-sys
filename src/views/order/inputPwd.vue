/*
 * @Author: lidongliang
 * @Date: 2017-12-04 14:27:42
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-11 15:38:42
 * 支付密码
 */

<template>
<div class="phonenum-show">
  <div class="common-header">
    <mt-header title="确认付款">
      <router-link :to="{ path: '/mineOrder', query: { typeId: this.typeId}}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
  <div class="confirm-container">
  <span class="confirm-container-money">
    ￥{{balnce}}
  </span>
  </div>
  <div class="write-phonenum">
    <input type="number" maxlength="" class="realInput" v-model="realInput"  @keyup="getNum()" @keydown="delNum()" id="focusid">
    <ul class="write-input clearfix">
        <li v-for="(disInput1,key) in disInputs" :key="key">
          <input type="password" maxlength="1" v-model="disInput1.value">
        </li>
    </ul>
  </div>
  <mt-button class="mint-but" @click="submit">确认支付</mt-button>
  <div>
  <router-link :to="{ path: '/resetPayPwd'}"><div class="forgetloginPassWord">忘记密码</div></router-link>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bymixin } from '../../utils/minxs'
import { startLoading, endLoading } from '../../utils/utils'
export default {
  name: 'packetMessage',
  data () {
    return {
      messagepacket: false,
      typeId: this.$route.query.typeId, // 额度ID
      orderNo: this.$route.query.orderNo, // 订单编号
      disInputs: [
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' }
      ],
      realInput: '',
      balnce: '',
      detail: [],
      types: null
    }
  },
  mixins: [bymixin],
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let obj = JSON.parse(sessionStorage.getItem(vm.orderNo))
      vm.balnce = typeof (obj.types) === 'number' ? obj.types : obj.price
      vm.types = obj.types
      vm.detail = obj.detail
    })
  },
  methods: {
    getbackMoney () {
      this.messagepacket = true
      var idObj = document.getElementById('focusid')
      idObj.focus()
    },
    getbackMoneyclock () {
      this.messagepacket = false
    },
    getNum () {
      for (var i = 0; i < this.realInput.length; i++) {
        if (this.realInput.length < 7) {
          this.disInputs[i].value = this.realInput.charAt(i)
        }
      }
    },
    delNum () {
      var oEvent = window.event
      if (oEvent.keyCode === 8) {
        if (this.realInput.length > 0) {
          this.disInputs[this.realInput.length - 1].value = ''
        }
      }
    },
    submit () {
      let tmp = 0
      this.disInputs.map(x => {
        if (x.value === '') {
          this.mtAlert('密码不能为空')
        } else {
          tmp++
        }
      })
      if (tmp === 6) { this.preSubmit(this.types) } else {
        this.mtAlert('请输入6位密码')
      }
    },
    preSubmit (types) {
      switch (types) {
        case 'ali':
          console.log('纯支付宝支付')
          break
        case 'edu':
          this.limitSubmit()
          break
        default:
          this.mixPay()
      }
    },
    // 混合支付
    async mixPay () {
      let pwd = ''
      this.disInputs.map(x => (pwd += x.value))
      let submitInfo = {
        orderNo: this.orderNo, // 订单号
        cartType: this.typeId, // 商品品类ID
        payPwd: pwd, // 支付密码
        payDetai: this.detail
      }
      const res = await this.$store.dispatch('MinxPay', submitInfo)
      if (res.result) {
        location.href = res.bizData
      } else {
        this.mtAlert(res.message)
      }
    },
    // 纯额度支付
    limitSubmit () {
      startLoading()
      let pwd = ''
      this.disInputs.map(x => (pwd += x.value))
      let submitInfo = {
        orderNo: this.orderNo, // 订单号
        cartType: this.typeId, // 商品品类ID
        payPwd: pwd // 支付密码
      }
      this.$store
        .dispatch('Pay', submitInfo)
        .then(res => {
          console.log(res)
          if (res.result) {
            this.$router.push({
              path: '/success',
              query: {
                typeId: this.typeId
              }
            })
          } else if (res.message === '支付密码错误') {
            this.mtAlert(res.message)
            this.disInputs.forEach(element => {
              element.value = ''
            })
            this.realInput = ''
          } else {
            this.$router.push({
              path: '/fail',
              query: {
                typeId: this.typeId
              }
            })
          }
          endLoading()
        })
        .catch(res => {
          console.log(res)
        })
    }
  },
  mounted () {
    this.balnce = this.orderInfo.cartTotal || this.orderInfo
  },
  computed: {
    // vuex
    ...mapGetters(['orderInfo'])
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/util.css";
.confirm-container {
  font-size: 0;
}
.confirm-container-word {
  display: block;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 1px 0 0 rgba(220, 220, 220, 0.5);
  height: 0.94rem;
  font-size: 0.36rem;
  line-height: 0.94rem;
  color: #000000;
}
.confirm-container-money {
  height: 1.5rem;
  line-height: 1.5rem;
  display: block;
  text-align: center;
  font-size: 0.6rem;
  color: #323232;
}
.phonenum-show {
  background: #fff;
  font-size: 0;
}
.getback-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #dddddd;
  position: relative;
  font-size: 14px;
  margin-bottom: 10px;
}
.getback-title span {
  position: absolute;
  right: 0;
  top: 3px;
  width: 15px;
  height: 15px;
  display: inline-block;
}
.write-phonenum {
  position: relative;
  width: 5.4rem;
  margin: 0px auto;
  font-size: 16px;
}
.write-phonenum p {
  text-align: center;
  font-size: 12px;
}
.write-phonenum p span {
  color: #3b90d1;
}
.write-input {
  border: 1px solid #888888;
  box-sizing: border-box;
  margin: 0px auto;
  display: flex;
  border-radius: 0.08rem;
  overflow: hidden;
}
.write-input li {
  height: 0.88rem;
  border-right: 1px solid #ddd;
  flex: 1;
  box-sizing: border-box;
}
.write-input li input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  resize: none;
  outline: none;
  border: 0;
  width: 0.86rem;
  line-height: 0.86rem;
  text-align: center;
  height: 0.86rem;
  font-size: 0.38rem;
}
.write-input li:last-child {
  border-right: none;
}
.mint-but {
  background: #f9404a;
  color: #fff;
  font-size: 0.36rem;
  width: 6.4rem;
  height: 0.88rem;
  line-height: 0.88rem;
  display: block;
  margin: 0.8rem auto;
  margin-bottom: 0.2rem;
}
.realInput {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  resize: none;
  outline: none;
  border: 0;
  z-index: 2;
  position: absolute;
  width: 5.28rem;
  /* height: 0.88rem; */
  line-height: 0.88rem;
  background: none;
  display: block;
  left: 0;
  top: 0;
  opacity: 0;
  font-size: 20px;
  caret-color: #fff;
  color: #fff;
  text-indent: -50rem;
}
/*影藏input标签*/
input[type="tel"]:disabled {
  background-color: #fff;
}
.forget {
  padding: 0.1rem 0.66rem;
  content: "";
  display: block;
  clear: both;
}
.forgetAccount {
  height: 0.37rem;
  line-height: 0.37rem;
  font-size: 0.26rem;
  color: #333333;
  float: left;
}
.forgetloginPassWord {
  height: 0.37rem;
  margin-right: 0.6rem;
  line-height: 0.37rem;
  font-size: 0.26rem;
  color: #333333;
  float: right;
}
</style>
