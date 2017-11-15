/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:58:19 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-15 12:26:41
 * 绑定手机号
 */
<template>
  <div class="bindPhoneNum">
    <div class="common-header">
      <mt-header title="绑定手机号">
        <router-link to="/register" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div class="common-form-filed">
        <mt-field label="手机号" placeholder="请填写手机号" v-model="bindForm.phoneNum">
        </mt-field>
        <mt-field label="验证码" placeholder="请输入短信验证码" v-model="bindForm.identifyingCode">
          <span v-if="!sendMsgDisabled" class="identifyingCode1" @click="getIdCode">获取验证码</span>
          <span v-else class="identifyingCode2" @click="getIdCode">{{time}}秒后重发</span>
        </mt-field>
      </div>
    </div>
    <div class="bottom">
      <router-link :to="{ path: '/setPassWord'}"><mt-button class="index-login" type="primary">下一步</mt-button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bindPhoneNum-page',
  data () {
    return {
      bindForm: {
        phoneNum: '',
        identifyingCode: ''
      },
      time: 60,
      sendMsgDisabled: false
    }
  },
  methods: {
    getIdCode () {
      this.setTime()
      this.$store
        .dispatch('GetIdCode', this.loginForm)
        .then(res => {
          // console.log('res -> ' + JSON.stringify(res))
        })
        .catch(res => {
          console.log(res)
        })
    },
    setTime () {
      let me = this
      me.sendMsgDisabled = true
      let interval = window.setInterval(function () {
        if ((me.time--) <= 1) {
          me.time = 60
          me.sendMsgDisabled = false
          window.clearInterval(interval)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.identifyingCode1 {
  border: 0.02rem solid #f9404a;
  height: 0.18rem;
  line-height: 0.18rem;
  padding: 0.05rem 0.2rem;
  border-radius: 0.1rem;
  margin-left: 0.1rem;
  font-size: 0.01rem;
  color: #f9404a;
}
.identifyingCode2 {
  border: 0.02rem solid #26a2ff;
  height: 0.18rem;
  line-height: 0.18rem;
  padding: 0.05rem 0.2rem;
  border-radius: 0.1rem;
  margin-left: 0.1rem;
  font-size: 0.01rem;
  color: #26a2ff;
}
.bottom {
  margin-top: 2.45rem;
  .index-login {
    width: 6.4rem;
    display: block;
    margin: 0 auto;
    height: 0.78rem;
    line-height: 0.78rem;
    text-align: center;
    background: #f9404a;
    color: #ffffff;
    font-size: 0.36rem;
    border-radius: 0.1rem;
  }
}
</style>
