/*
 * @Author: lidongliang 
 * @Date: 2017-10-13 14:57:44 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-07 18:26:37
 * 登录
 */

<template>
    <div class="login">
        <div class="header">
            <div class="logo">
                <img slot="icon" src="../assets/zihexin-log.png">
            </div>
        </div>
        <div class="body">
            <div class="input-form">
                <mt-field label="用户名" placeholder="手机/邮箱/用户名" v-model="loginForm.userId"></mt-field>
                <mt-field label="密码" placeholder="密码" type="password" v-model="loginForm.userPassword"></mt-field>
            </div>
            <div class="input-button">
                <mt-button type="primary" size="large" @click.native="onSubmit">登录</mt-button>
            </div>
        </div>
        <div class="fotter">
            <span>Copy Right 资和信电子支付有限公司</span>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      loginForm: {
        userId: '',
        userPassword: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      if (this.loginForm.userId === '') {
        MessageBox({
          message: '请填写账户',
          closeOnClickModal: true,
          showConfirmButton: false
        })
      } else if (this.loginForm.userPassword === '') {
        MessageBox({
          message: '请填写密码',
          closeOnClickModal: true,
          showConfirmButton: false
        })
      }
      // 登录
      if (this.loginForm.userId !== '' && this.loginForm.userPassword !== '') {
        this.$store.dispatch('LoginByUserName', this.loginForm).then(res => {
          this.$router.push({path: '/home', query: {selected: 'balance'}})
        }).catch((res) => {
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
  .login {
    width: 100%;
    height: 100%;
    .header {
        padding-top: 80px;
        .logo {
            text-align: center;
        }
    }
    .body {
        padding: 45px 15px;
        .input-button {
            margin-top: 30px;
        }
    }
    .fotter {
      span {
            margin-top: 100px;
            font-size: 12px;
            text-align: center;
            display: block;
        }
    }
  }
  
</style>