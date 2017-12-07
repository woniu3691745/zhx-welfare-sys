/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-06 20:01:56
 * 支付失败
 */
<template>
  <div class="customService">
    <div class="common-header">
      <mt-header title="联系客服">
        <router-link :to="{ path: '/mineOrder', query: { typeId: this.typeId}}" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="custom-service-body">
      <img src="../../assets/service.png" alt="">
      <p>联系客服请发邮件到: <span>95159@zihexin.com</span></p>
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
       typeId: this.$route.query.typeId     // 额度ID
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
.custom-service-body {
  img {
    width: 1.66rem;
    height: 1.6rem;
    display: block;
    font-size: 0;
    margin: 0 auto;
    margin-top: 2.3rem;
  }
  p {
    font-size: 0.26rem;
    color: #323232;
    margin-top: 1rem;
    text-align:  center;
    span {
      font-size: 0.26rem;
      color: #32c5fc;
    }
  }
}
</style>
