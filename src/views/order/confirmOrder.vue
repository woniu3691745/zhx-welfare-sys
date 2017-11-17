/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-16 19:59:13
 * 确认订单
 */
<template>
  <div class="confirmOrder">
    <div class="common-header">
      <mt-header title="确认订单">
        <router-link to="/cart" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div style="height:50px; font-size:12px;">
       <span>收货人</span>
       <span>134XXXXXX</span> 
      </div>
      <mt-cell title="标题文字" is-link to="/selectAddress">
        <span>收货地址收货地址收货地址收货地址</span>
        <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
      </mt-cell>
      
      <div style="height:50px; font-size:12px; background-color:red;">
          <router-link :to="{ path: '/addAddress' }"> <mt-button type="primary" class="button-width">添加地址</mt-button></router-link>
      </div>


      <mt-cell title="日用品" value="可用额度: 10000"></mt-cell>
      <div style="height:50px; font-size:12px;">
       <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
      </div>
      <mt-cell title="商品金额小计" value="150"></mt-cell>
      <mt-cell title="运费 20" value="+ 20"></mt-cell>
      <mt-cell value="共一件XXXXX"></mt-cell>
      <div style="height:50px; font-size:12px; background-color:red;">
        <span>收货人</span>
        <span>134XXXXXX</span> 
      </div>
    </div>
    <div class="bottom">
      <mt-tabbar fixed>
        <mt-button size="large" type="default">
              <span>99</span>
        </mt-button>
         <router-link :to="{ path: '/inputPwd' }"> <mt-button type="primary" class="button-width">提交订单</mt-button></router-link>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'confirmOrder-page',
   // 组合其它组件
   extends: {},
   // 组件属性、变量
   props: {},
   // 变量
   data () {
     return {
       a1: 'asdasd'
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

</style>
