/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-07 18:01:38
 * 联系客服
 */
<template>
  <div class="customService">
    <div class="common-header">
      <mt-header title="联系客服">
        <router-link to= '/mine' slot="left">
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
   name: 'fail-page'
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
