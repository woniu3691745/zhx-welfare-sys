/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 16:00:34
 * 添加收货地址
 */
<template>
  <div class="addAddress">
    <div class="common-header">
      <mt-header title="添加收货地址">
        <router-link to="/confirmOrder" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button icon="" slot="right" @click="saveAddress">保存</mt-button>
      </mt-header>
    </div>
    <div class="addAddress-body">
      <mt-field class="border-1px" label="收货人" placeholder="收货人姓名" v-model="consignee"></mt-field>
      <mt-field class="border-1px" label="联系电话" placeholder="请输入手机号" v-model="phoneNum"></mt-field>
      <mt-cell class="border-1px height-88" title="所在地区" is-link to="" value="请选择">
      </mt-cell>
      <mt-field placeholder="请填写详细地址，不少于5个字" type="textarea" rows="4" v-model="detailedAddress"></mt-field>
      <div data-v-d5ab74ae="" class="hheight-22"></div>
      <mt-cell title="设为默认" class="pretermit">
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'addAddress-page',
   // 组合其它组件
   extends: {},
   // 组件属性、变量
   props: {},
   // 变量
   data () {
     return {
       consignee: '',
       phoneNum: '',
       detailedAddress: '',
       value: ''
     }
   },
   computed: {},
   // 使用其它组件
   components: {},
   watch: {},
   // 方法
   methods: {
     saveAddress () {
       this.$router.push({
         path: '/confirmOrder'
        //  query: { selected: 'balance' }
       })
     }
   },
   // 生命周期函数
  //  beforeCreate: {},
   mounted () {}
 }
</script>

<style lang="less" scoped>
.addAddress-body {
  .hheight-22 {
    height: 0.22rem;
    background: #F5F5F5;
  } 
  .mint-cell{
    padding: 0 0.28rem;
    
    .mint-cell-wrapper {
      .mint-cell-title {
        font-size: 0.28rem;
      }
    }
    
  }
  
}
</style>
