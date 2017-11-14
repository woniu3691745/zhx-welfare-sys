/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-14 15:04:45
 * 登录
 */
<template>
  <div class="login">
    <div class="common-header">
      <mt-header title="登录">
        <router-link to="/index" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div class="common-form-filed">
        <mt-field label="账号" placeholder="手机号/福利卡号/福利账号" v-model="loginForm.account"></mt-field>
        <mt-field label="登录密码" placeholder="请填写登录密码" type="password" v-model="loginForm.loginPassWord"></mt-field>
      </div>
    </div>
    <div class="bottom">
      <mt-button class="index-login" type="primary" @click.native="onSubmit">登录</mt-button>
      <div class="forget">
        <router-link :to="{ path: '/register'}"><div class="forgetAccount">注册账号</div></router-link>
        <router-link :to="{ path: '/resetLoginPassWord'}"><div class="forgetloginPassWord">忘记密码</div></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  name: 'login-page',
  data () {
    return {
      loginForm: {
        account: '',
        loginPassWord: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      if (this.loginForm.account === '') {
        MessageBox({
          message: '请填写账户',
          closeOnClickModal: true,
          showConfirmButton: false
        })
      } else if (this.loginForm.loginPassWord === '') {
        MessageBox({
          message: '请填写密码',
          closeOnClickModal: true,
          showConfirmButton: false
        })
      }
      // 登录
      if (
        this.loginForm.account !== '' &&
        this.loginForm.loginPassWord !== ''
      ) {
        this.$store
          .dispatch('LoginByUserName', this.loginForm)
          .then(res => {
            console.log('res -> ' + JSON.stringify(res))
            this.$router.push({
              path: '/home',
              query: { selected: 'balance' }
            })
          })
          .catch(res => {
            console.log(res)
          })
      } else {
        console.log('error submit!!')
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bottom {
  margin-top: 2.45rem;
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
    line-height: 0.37rem;
    font-size: 0.26rem;
    color: #333333;
    float: right;
  }
  .index-login {
    width: 6.2rem;
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
