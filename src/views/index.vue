<template>
  <div class="index">
    <div class="header">
      <div class="header-contain">企业关爱</div>
    </div>
    <div class="body">
      <div class="index-images">
        <img src="../assets/index.png" alt="">
      </div>
      <div class="index-btn-con">
        <router-link :to="{ path: '/login'}"><mt-button class="index-login" type="default">登录</mt-button></router-link>
        <router-link :to="{ path: '/register'}"><mt-button class="index-register" type="primary">注册</mt-button></router-link>
      </div>    
    </div>
    <div class="bottom">
      <div>
        <img src="../assets/index-logo.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inde-page',
  data () {
    return {}
  }
}
</script>

<style lang="less" scope>
@import "../../static/css/util.css";
.index {
  .header {
    .header-contain {
      font-size: 0.34rem;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #323232;
      text-align: center;
    }
  }
  .body {
    .index-images {
      width: 100%;
      height: 5.86rem;
      img {
        width: 100%;
        display: block;
      }
    }
    .index-btn-con {
      margin-top: 1.34rem;
      .index-login {
        width: 6.2rem;
        display: block;
        margin: 0 auto;
        height: 0.78rem;
        line-height: 0.78rem;
        text-align: center;
        background: #f9404a;
        color: #ffffff;
        font-size: 0.36rem;
        border-radius: 0.1rem;
      }
      .index-register {
        width: 6.2rem;
        display: block;
        margin: 0 auto;
        height: 0.78rem;
        line-height: 0.78rem;
        text-align: center;
        background: #ffffff;
        color: #f9404a;
        font-size: 0.36rem;
        border: 1px solid #f9404a;
        box-sizing: border-box;
        margin-top: 0.32rem;
        border-radius: 0.1rem;
      }
    }
  }
  .bottom {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0.8rem;
    div {
      img {
        display: block;
        width: 2rem;
        margin: 0 auto;
      }
    }
  }
}
</style>