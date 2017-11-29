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
    <div class="address-manage-body">
      <div>
        <div class="name-tel clear">
          <span class="left">李娜</span>
          <span class="right">12345678900</span>
        </div>
        <p class="address-words">北京市西城区金融街20号交通大厦B座10层资和信电子支付有限公司</p>
        <div class="delete-container border-top-1px">
          <mt-radio
            v-model="value"
            :options="['设为默认地址']">
          </mt-radio>
          <div class="clear editor-delete-container">
            <span class="editor left" @click="edit">编辑</span>
            <span class="address-delete-editor right" @click="del">删除</span>
          </div>
        </div>
        <div class="height-20">

        </div>
      </div>
    </div>
    <div class="bottom">
      <div>
        添加收货地址
      </div>
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
.addressManage {
  .common-header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .address-manage-body {
    padding-top: 0.88rem;
    margin-bottom: 1.08rem;
    .name-tel {
      padding: 0 0.2rem;
      span {
        height: 0.84rem;
        line-height: 0.84rem;
        font-size: 0.28rem;
        color: #323232;
      }
    }
    .address-words {
      font-size: 0.24rem;
      color: #323232;
      line-height: 0.4rem;
      padding: 0 0.2rem 0.2rem;
      box-shadow: inset 0 -1px 0 0 rgba(220,220,220,0.50);
      
    }
    .height-20 {
      height: 0.2rem;
      background: #f5f5f5;
    }
  }
  .bottom {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    div {
      height: 0.88rem;    
      background: #FD404A;
      font-size: 0.32rem;
      color: #FFFFFF;
      text-align: center;
      line-height: 0.88rem;
    }
    
  }
}
</style>
