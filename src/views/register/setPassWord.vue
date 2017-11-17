/*
 * @Author: lidongliang
 * @Date: 2017-11-14 09:58:49
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-17 14:53:42
 * 设置登录密码
 */
<template>
  <div class="setPassWord">
    <div class="common-header">
      <mt-header title="设置登录密码">
        <router-link to="/bindPhoneNum" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div class="common-form-filed">
        <mt-field label="登录密码" placeholder="请输入密码" v-model="setPassWordForm.loginPassword"></mt-field>
        <mt-field label="确认密码" placeholder="再次输入密码" v-model="setPassWordForm.loginConfirmPassword"></mt-field>
        <div class="pwd-totip">密码由6-20位英文字母、数字组成，区分大小写</div>
      </div>
    </div>
    <div class="bottom">
      <mt-button class="index-login" type="primary" @click="handleSubmit">下一步</mt-button>
      <router-link :to="{ path: '/setPayPassWord'}"><mt-button class="index-login" type="primary">下一步1</mt-button></router-link>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'
  export default {
    name: 'setPassWord-page',
    data () {
      return {
        setPassWordForm: {
          loginPassword: '',
          loginConfirmPassword: ''
        }
      }
    },
    methods: {
      handleSubmit () {
        const signinPwdPatten = /\w{6,20}/
        if (!signinPwdPatten.test(this.setPassWordForm.loginPassword)) {
          MessageBox({
            message: '密码由6-20位英文字母、数字组成',
            closeOnClickModal: true,
            showConfirmButton: false
          })
        } else if (this.setPassWordForm.loginPassword !== this.setPassWordForm.loginConfirmPassword) {
          MessageBox({
            message: '两次输入的密码不一致',
            closeOnClickModal: true,
            showConfirmButton: false
          })
        } else {
          this.$store.dispatch('VX_SET_SIGNIN_PWD', this.setPassWordForm.loginPassword)
          this.$router.push({path: '/setPayPassWord'})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .body {
    .pwd-totip {
      font-size: 0.28rem;
      color: #4A90E2;
      margin-top: 0.38rem;
    }
  }
  .bottom  {
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
