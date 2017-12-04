/*
 * @Author: lidongliang 
 * @Date: 2017-12-04 14:27:42 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-04 14:44:16
 * 支付密码
 */

<template>
<div class="phonenum-show">
  <div class="common-header">
    <mt-header title="确认付款">
      <router-link :to="{ path: '/confirmOrder', query: { typeId: this.typeId}}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
  <div class="confirm-container">
  <!-- <span class="confirm-container-word">
    确认付款
  </span> -->
  <span class="confirm-container-money">
    ￥{{balnce}}
  </span>
  </div>
  <div class="write-phonenum">
    <input type="password" maxlength="" class="realInput" v-model="realInput"  @keyup="getNum()" @keydown="delNum()" id="focusid">
    <ul class="write-input clearfix">
        <li v-for="disInput1 in disInputs" :key="disInput1.value">
          <input type="password" maxlength="1" v-model="disInput1.value">
        </li>
    </ul>
  </div>
  <mt-button class="mint-but" @click="submit">确认支付</mt-button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'packetMessage',
  data () {
    return {
      messagepacket: false,
      typeId: this.$route.query.typeId, // 额度ID
      disInputs: [
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' }
      ],
      realInput: '',
      balnce: ''
    }
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
        this.disInputs[i].value = this.realInput.charAt(i)
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
      let pwd = ''
      this.disInputs.map(x => (pwd += x.value))
      console.log('--->' + pwd)
      this.$router.push({
        path: '/success',
        query: { typeId: this.cartType }
      })
    }
  },
  mounted () {
    this.balnce = this.orderInfo.cartTotal
  },
  computed: {
    // vuex
    ...mapGetters([
      'orderInfo'
    ])
  },
  components: {}
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
  text-indent: -5em;
}
/*影藏input标签*/
input[type="tel"]:disabled {
  background-color: #fff;
}
</style>