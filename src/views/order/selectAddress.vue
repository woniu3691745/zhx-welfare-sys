/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-16 19:57:48
 * 选择地址
 */
<template>
  <div class="selectAddress">
    <div class="header">
      <mt-header title="选择收货地址">
        <router-link to="/confirmOrder" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button icon="" slot="right">管理</mt-button>
      </mt-header>
    </div>
    <div class="body">
      <div style="height: 80px; border:1px solid red;" v-for="i in 5" :key="i">

      </div>
      <router-link :to="{ path: '/addAddress' }"> <mt-button type="primary" class="button-width">添加地址</mt-button></router-link>
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'selectAddress-page',
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
   methods: {},
   // 生命周期函数
  //  beforeCreate: {},
   mounted () {}
 }
</script>

<style lang="less" scoped>

</style>
