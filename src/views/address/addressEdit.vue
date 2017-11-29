/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 16:13:32
 * 编辑收货人
 */
<template>
  <div class="addressEdit">
    <div class="common-header">
      <mt-header title="编辑收货人">
        <router-link to="/mine" slot="left" fixed>
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="addAddress-body">
      <mt-field class="border-1px" label="收货人" placeholder="收货人姓名" v-model="consignee"></mt-field>
      <mt-field class="border-1px" label="联系电话" placeholder="请输入手机号" v-model="phoneNum"></mt-field>
      <mt-cell class="border-1px height-88" title="所在地区" is-link to="" value="">
      </mt-cell>
      <mt-field placeholder="请填写详细地址，不少于5个字" type="textarea" rows="4" v-model="detailedAddress"></mt-field>
    </div>
    <div class="bottom">
        保存
    </div>
    
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'addressEdit-page',
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
   methods: {},
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
.bottom {
  background: #FD404A;
  width: 100%;
  height: 0.88rem;
  position: fixed;
  left: 0;
  bottom: 0;
  color: #ffffff;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.88rem;
}
</style>
