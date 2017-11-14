/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-14 14:17:26
 * 设置支付密码
 */
<template>
  <div class="setPayPassWord">
    <div class="common-header">
      <mt-header title="设置支付密码">
        <router-link to="/setPassWord" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div class="common-form-filed">
        <mt-field label="姓名" placeholder="请输入姓名" v-model="setPayPassWordForm.username"></mt-field>
        <mt-field label="身份证号" placeholder="请填写您本人的身份证号" v-model="setPayPassWordForm.identityCard"></mt-field>
        <mt-field label="支付密码" placeholder="请输入6位密码" v-model="setPayPassWordForm.payPassWord"></mt-field>
        <mt-field label="确认密码" placeholder="请再次输入您的支付密码" v-model="setPayPassWordForm.confirmPayPassWord"></mt-field>
        <div class="pwd-totip">温馨提示：支付密码必须与登录密码不同，支付时需要使用支付密码；为确保您的账号，身份证号码是您找回密码的唯一凭证。</div>
      </div>
    </div>
    <div class="bottom">
       <div class="bottom">
          <router-link :to="{ path: '/login'}"><mt-button class="index-login" type="primary">完成</mt-button></router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setPayPassWord-page',
  data () {
    return {
      setPayPassWordForm: {
        username: '',
        identityCard: '',
        payPassWord: '',
        confirmPayPassWord: ''
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.body {
  .pwd-totip {
    font-size: 0.28rem;
    color: #4a90e2;
    margin-top: 0.38rem;
  }
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
