/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 20:21:43
 * 重置支付密码
 */
<template>
  <div class="resetPayPwd">
    <div class="common-header">
      <mt-header title="重置支付密码">
        <router-link to="/accountManagement" slot="left" fixed>
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div class="common-form-filed">
        </mt-field>
        <mt-field label="验证码" placeholder="请输入短信验证码" v-model="bindForm.identifyingCode">
          <span v-if="!sendMsgDisabled" class="identifyingCode1" @click="getIdCode">获取验证码</span>
          <span v-else class="identifyingCode2" @click="getIdCode">{{time}}秒后重发</span>
        </mt-field>
        <mt-field label="身份证号" placeholder="请填写您本人的身份证号" v-model="bindForm.identityCard"></mt-field>
        <div class="pwd-totip">温馨提示：验证码将发送到您注册时预留的手机中。</div>
      </div>
    </div>
    <div class="bottom">
      <mt-button class="index-login" type="primary" @click.native="onSubmit">下一步</mt-button>
    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'resetPayPwd-page',
   // 组合其它组件
   extends: {},
   // 组件属性、变量
   props: {},
   // 变量
   data () {
     return {
       bindForm: {
         identifyingCode: '',
         identityCard: ''
       },
       time: 60,
       sendMsgDisabled: false
     }
   },
   computed: {},
   // 使用其它组件使用其它组件
   components: {},
   watch: {},
   // 方法
   methods: {
     onSubmit () {},
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
   },
   // 生命周期函数
  //  beforeCreate: {},
   mounted () {}
 }
</script>

<style lang="less" scoped>
@import "../../../static/css/util.css";
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
