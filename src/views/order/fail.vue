/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-07 18:03:23
 * 支付失败
 */
<template>
  <div class="fail">
    <div class="common-header">
      <mt-header title="支付失败">
        <router-link :to="{ path: '/mineOrder' }" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="fail-body">
      <div class="fail-body-container">
        <img src="../../assets/fail.png" alt="">
        <p>很遗憾，订单支付失败！</p>
        <span>由于您的网络不给力，支付失败！</span>
      </div>
    </div>
    <div class="bottom">
    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'fail-page',
   // 组合其它组件
   extends: {},
   // 组件属性、变量
   props: {},
   // 变量
   data () {
     return {
      //  typeId: this.$route.query.typeId     // 额度ID
     }
   },
   computed: {},
   // 使用其它组件
   components: {},
   watch: {},
   // 方法
   methods: {},
   // 生命周期函数
  //  beforeCreate: {},
   mounted () {}
 }
</script>

<style lang="less" scoped>
.fail-body {
  .fail-body-container {
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
      color: #C92727;
      font-size: 0.36rem;
    }
    span {
      font-size: 0.32rem;
      color: #323232;
      display: block;
      margin-top: 0.36rem;
      text-align: center;
      width: 6rem;
      margin: 0.36rem auto;
    }
  }
}
</style>
