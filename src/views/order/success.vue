/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-16 20:15:17
 * 支付成功
 */
<template>
  <div class="success">
    <div class="common-header">
      <mt-header title="支付成功">
        <router-link to="/confirmOrder" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="success-body">
      <div class="success-body-container">
        <img src="../../assets/success.png" alt="">
        <p>订单支付成功！</p>
        <mt-button class="index-login" type="primary" @click.native="onSubmit">查看详情</mt-button>
      </div>
      
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'success-page',
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
         path: '/mineOrder',
         query: { selected: 'balance' }
       })
     }
   },
   // 生命周期函数
  //  beforeCreate: {},
   mounted () {}
 }
</script>

<style lang="less" scoped>
.success-body {
  .success-body-container {
    img {
      width: 1.86rem;
      height: 1.86rem;
      display: block;
      font-size: 0;
      margin: 0 auto;
      margin-top: 1.18rem;
    }
    p {
      text-align: center;
      margin-top: 0.54rem;
      color: #323232;
      font-size: 0.36rem;
    }
    button {
      background: #FFFFFF;
      border: 1px solid #C8C8C8;
      border-radius: 0.08rem;
      display: block;
      margin: 0 auto;
      width: 3.46rem;
      height: 0.88rem;
      font-size: 0.32rem;
      color: #323232;
      margin-top: 0.54rem;
    }
  }
}
</style>
