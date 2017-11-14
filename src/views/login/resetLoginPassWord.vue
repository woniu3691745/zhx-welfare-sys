/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-14 14:28:27
 * 重置登录密码
 */
<template>
  <div class="resetLoginPassWord">
    <div class="common-header">
      <mt-header title="重置登录密码">
        <router-link to="/login" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div class="common-form-filed">
        <mt-field label="手机号" placeholder="请输入手机号" v-model="resetForm.phoneNum"></mt-field>
        <mt-field label="验证码" placeholder="请输入短信验证码" type="password" v-model="resetForm.identifyingCode"></mt-field>
        <mt-field label="新登录密码" placeholder="请输入新密码" v-model="resetForm.newLoginPassWord"></mt-field>
        <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="resetForm.confirmNewLoginPassWord"></mt-field>
        <div class="pwd-totip">温馨提示：验证码将发送到您注册时预留的手机中。</div>
      </div>
    </div>
    <div class="bottom">
      <router-link :to="{ path: '/login'}"><mt-button class="index-login" type="primary">确认</mt-button></router-link>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'resetLoginPassWord-page',
   data () {
     return {
       resetForm: {
         phoneNum: '',
         identifyingCode: '',
         newLoginPassWord: '',
         confirmNewLoginPassWord: ''
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
</style>
