/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-16 20:06:45
 * 支付密码
 */
<template>
  <div class="inputPwd">
    <div class="common-header">
      <mt-header title="支付密码">
        <router-link to="/confirmOrder" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <span style="font-size: 14px;">请输入6位支付密码</span>
      <div style="height: 20px; border: 1px solid red;">

      </div>
    </div>
    <div class="bottom">
      <mt-button class="index-login" type="primary" @click.native="onSubmit">确认支付</mt-button>
      <div class="forget">
        <router-link :to="{ path: '/resetLoginPassWord'}"><div class="forgetloginPassWord">忘记密码?</div></router-link>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'inputPwd-page',
   // 组合其它组件
   extends: {},
   // 组件属性、变量
   props: {},
   // 变量
   data () {
     return {}
   },
   computed: {},
   // 使用其它组件
   components: {},
   watch: {},
   // 方法
   methods: {
     onSubmit () {
       this.$router.push({
         path: '/success'
       })
     }
   },
   // 生命周期函数
  //  beforeCreate: {},
   mounted () {}
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
