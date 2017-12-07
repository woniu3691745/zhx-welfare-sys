/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 20:12:43
 * 账户管理
 */
<template>
  <div class="accountManagement">
    <div class="common-header">
      <mt-header title="账户管理">
        <router-link to="/mine" slot="left" fixed>
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="account-management-body">
      <mt-cell title="重置登录密码" to="/resetLoginPwd"></mt-cell>
      <mt-cell title="重置支付密码" to="/resetPayPwd"></mt-cell>
      <mt-cell title="更换手机号" to="/resetBindPhone"></mt-cell>
    </div>
    <div class="bottom">
      <mt-button class="index-login" type="primary" @click.native="onSubmit">退出</mt-button>
    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'accountManagement-page',
   // 组合其它组件
   extends: {},
   // 组件属性、变量
   props: {},
   // 变量
   data () {
     return {}
   },
   computed: {},
   // 使用其它组件使用其它组件
   components: {},
   watch: {},
   // 方法
   methods: {
     onSubmit () {
       this.$store
        .dispatch('LogOut')
        .then(req => {
          this.$router.push({ path: '/index' })
        })
        .catch(req => {
          console.log(req)
        })
     }
   },
   // 生命周期函数
  //  beforeCreate: {},
   mounted () {}
 }
</script>

<style lang="less" scoped>
.body {
  .mint-cell {
    .mint-cell-text {
      font-size: 0.3rem;
    }
  }
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
