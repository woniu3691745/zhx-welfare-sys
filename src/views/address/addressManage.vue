/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 16:11:18
 * 管理收货地址
 */
<template>
  <div class="addressManage">
    <div class="common-header">
        <mt-header title="管理收货地址">
          <router-link to="/mine" slot="left" fixed>
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
      </div>
    <div class="body">
      <div style="font-size:14px;">
        <span>李娜</span>
        <mt-radio
          v-model="value"
          :options="['设为默认地址']">
        </mt-radio>
        <span @click="edit">编辑</span>
        <span @click="del">删除</span>
      </div>
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'addressManage-page',
   // 组合其它组件
   extends: {},
   // 组件属性、变量
   props: {},
   // 变量
   data () {
     return {
       value: ''
     }
   },
   computed: {},
   // 使用其它组件
   components: {},
   watch: {},
   // 方法
   methods: {
     edit () {
       this.$router.push('/addressEdit')
     },
     del () {
       console.log('删除联系人')
     }
   },
   // 生命周期函数
  //  beforeCreate: {},
   mounted () {}
 }
</script>

<style lang="less" scoped>

</style>
