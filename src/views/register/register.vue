/*
 * @Author: lidongliang
 * @Date: 2017-11-14 09:58:33
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-14 14:06:03
 * 注册
 */
<template>
  <div class="register">
    <div class="common-header">
      <mt-header title="注册">
        <router-link to="/index" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div class="common-form-filed">
        <mt-field label="福利账号" placeholder="请填写福利卡号/福利账号" v-model="registerForm.cardNum"></mt-field>
        <mt-field label="卡背密码" placeholder="请填写卡背密码/账号密码" type="password" v-model="registerForm.cardPassWord"></mt-field>
      </div>
    </div>
    <div class="bottom">
      <mt-button class="index-login" type="primary" @click="handleSubmit">下一步</mt-button>
      <!--<router-link :to="{ path: '/bindPhoneNum'}"><mt-button class="index-login" type="primary">下一步1</mt-button></router-link>-->
    </div>
  </div>
</template>

<script>
 import { MessageBox } from 'mint-ui'
 import {verfiyCardAndPwd} from '@/api/register'
 import {mapGetters} from 'vuex'
 export default {
   name: 'register-page',
   data () {
     return {
       registerForm: {
         cardNum: '',
         cardPassWord: ''
       }
     }
   },
   methods: {
     handleSubmit () {
       let cardNo = this.registerForm.cardNum.trim()
       let password = this.registerForm.cardPassWord.trim()
       let cardNoPattern = /\d{5,7}/ // 数字 16 -19
       let pswdLengthPattern = /\d{6}/ // 数字 16 -19

       if (!cardNoPattern.test(cardNo)) {
         MessageBox({
           message: '卡号格式不正确',
           closeOnClickModal: true,
           showConfirmButton: true
         })
       } else if (!password) {
         MessageBox({
           message: '请填写卡背密码',
           closeOnClickModal: true,
           showConfirmButton: true
         })
       } else if (!pswdLengthPattern.test(password)) {
         MessageBox({
           message: '密码格式不正确',
           closeOnClickModal: true,
           showConfirmButton: true
         })
       } else {
         let reqData = {
//           token: this.token,
           bizData: {
             WelfareCard: {
               CardNo: cardNo,
               Password: password
             }
           }
         }
         verfiyCardAndPwd(reqData).then(res => {
           let data = res.data
           let bizData = data.bizData
           if (data.result) {
             this.$store.dispatch('VX_SET_CARD_NO', cardNo)
             this.$router.push({path: '/bindPhoneNum'})
           } else {
             MessageBox({
               message: bizData.message || '验证失败',
               closeOnClickModal: true,
               showConfirmButton: true
             })
           }
         }).catch(() => {
           MessageBox({
             message: '验证失败',
             closeOnClickModal: true,
             showConfirmButton: true
           })
         })
       }
     }
   },
   computed: {
     ...mapGetters(['token'])
   }
 }
</script>

<style lang="less" scope>
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
