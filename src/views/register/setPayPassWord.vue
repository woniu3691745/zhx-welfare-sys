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
        <mt-field label="支付密码" type="password" placeholder="请输入6位密码" v-model="setPayPassWordForm.payPassWord"></mt-field>
        <mt-field label="确认密码" type="password" placeholder="请再次输入您的支付密码" v-model="setPayPassWordForm.confirmPayPassWord"></mt-field>
        <div class="pwd-totip">温馨提示：支付密码必须与登录密码不同，支付时需要使用支付密码；为确保您的账号，身份证号码是您找回密码的唯一凭证。</div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom">
        <mt-button class="index-login" type="primary" @click="handleSubmit">完成</mt-button>
        <!--<router-link :to="{ path: '/login'}">-->
          <!--<mt-button class="index-login" type="primary">完成1</mt-button>-->
        <!--</router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'
  import checkIdcard from '@/utils/validIdCard'
  import {setPayPwd} from '@/api/register'
  import {mapGetters} from 'vuex'
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
      handleSubmit () {
        const customerNamePatten = /\W{2,6}/
        const payPwdPatten = /\d{6}/

        if (!customerNamePatten.test(this.setPayPassWordForm.username)) {
          MessageBox({
            message: '请输入正确的姓名',
            closeOnClickModal: true,
            showConfirmButton: false
          })
        } else if (checkIdcard(this.setPayPassWordForm.identityCard) !== '验证通过!') {
          MessageBox({
            message: '请输入正确的身份证号码',
            closeOnClickModal: true,
            showConfirmButton: false
          })
        } else if (!payPwdPatten.test(this.setPayPassWordForm.payPassWord)) {
          MessageBox({
            message: '密码应为6位数字',
            closeOnClickModal: true,
            showConfirmButton: false
          })
        } else if (this.setPayPassWordForm.payPassWord !== this.setPayPassWordForm.confirmPayPassWord) {
          MessageBox({
            message: '两次输入的密码不一致',
            closeOnClickModal: true,
            showConfirmButton: false
          })
        } else if (this.setPayPassWordForm.payPassWord === this.getSigninPwd) {
          MessageBox({
            message: '支付密码不能与登录密码相同',
            closeOnClickModal: true,
            showConfirmButton: false
          })
        } else {
          const reqData = {
            bizData: {
              WelfareCard: {CardNo: this.getCardNo},
              User: {
                SigninPWD: this.getSigninPwd,
                Name: this.setPayPassWordForm.username,
                PhoneNo: this.getPhoneNo,
                IDCard: this.setPayPassWordForm.identityCard,
                PayPWD: this.setPayPassWordForm.payPassWord
              }
            }
          }
          setPayPwd(reqData).then(res => {
            const data = res.data
            if (data.result) {
              this.$router.push({path: '/login'})
            } else {
              MessageBox({
                message: data.message || '提交注册信息失败',
                closeOnClickModal: true,
                showConfirmButton: false
              })
            }
          }).catch(() => {
            MessageBox({
              message: '提交注册信息失败',
              closeOnClickModal: true,
              showConfirmButton: false
            })
          })
        }
      }
    },
    computed: {
      ...mapGetters(['getCardNo', 'getSigninPwd', 'getPhoneNo', 'getCaptchaId'])
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
