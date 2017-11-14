/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:58:19 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-14 14:08:55
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
        <mt-field label="手机号" placeholder="请填写手机号" v-model="bindForm.phoneNum"></mt-field>
        <mt-field label="验证码" placeholder="请输入短信密码" v-model="bindForm.identifyingCode"></mt-field>
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
       }
     }
   },
   methods: {

   }
 }
</script>

<style lang="less" scoped>
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
