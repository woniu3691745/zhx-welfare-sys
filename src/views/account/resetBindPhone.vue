/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 19:35:38
 * 更换手机号
 */
<template>
  <div class="resetBindPhone">
    <div class="common-header">
      <mt-header title="更换手机号">
        <router-link to="/accountManagement" slot="left" fixed>
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div class="common-form-filed">
        <mt-field label="手机号" placeholder="请输入手机号" v-model="resetForm.phoneNum">
          <span v-if="!sendMsgDisabled" class="identifyingCode1" @click="getIdCode">获取验证码</span>
          <span v-else class="identifyingCode2" @click="getIdCode">{{time}}秒后重发</span>
        </mt-field>
        <mt-field label="验证码" placeholder="请输入短信验证码" type="password" v-model="resetForm.identifyingCode">
        </mt-field>
        <mt-field label="新登录密码" placeholder="请输入新密码" v-model="resetForm.newLoginPassWord"></mt-field>
        <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="resetForm.confirmNewLoginPassWord"></mt-field>
        <div class="pwd-totip">温馨提示：验证码将发送到您注册时预留的手机中。</div>
      </div>
    </div>
    <div class="bottom">
      <router-link :to="{ path: '/login'}"><mt-button class="index-login" type="primary">确认</mt-button></router-link>
    </div>
      </div>
  </div>
</template>

<script>
 export default {
   name: 'resetBindPhone-page',
   data () {
     return {
       resetForm: {
         phoneNum: '',
         identifyingCode: '',
         newLoginPassWord: '',
         confirmNewLoginPassWord: ''
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
         if (me.time-- <= 1) {
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
@import "../../../static/css/util.css";
.body {
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
