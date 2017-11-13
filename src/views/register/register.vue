<template>
  <div class="register">
    
    
    <div class="header">
      <mt-header title="注册">
        <router-link to="/index" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>




    <div class="body">
        <div class="register-pas">
          <mt-field label="福利账号" placeholder="请填写福利卡号/福利账号" v-model="username"></mt-field>
          <mt-field label="卡背密码" placeholder="请填写卡背密码/账号密码" type="email" v-model="email"></mt-field>
        </div>
    </div>
    <div class="bottom">
      <mt-button class="index-login" type="primary">下一步</mt-button>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'register-page',
   data () {
     return {
       username: '',
       email: ''
     }
   }
 }
</script>

<style lang="less" scope>
  .register {
    .header {
      border-bottom: 1px solid #bebebe;
      .mint-header{
        background-color: #ffffff; 
        color: #030303;
        line-height: 0.88rem;
        height: 0.88rem;
        font-size: 0.34rem;
        .mint-header-button {
          color: #231916;
          font-size: 0.34rem
        }
       .mint-header-title {
          margin: 0;
                 
        }
        
      }
      
    }
    .body {
      .register-pas {
        
        width: 6.4rem;
        margin: 0 auto;
        margin-top: 1.2rem;
        .mint-cell {
          .mint-cell-wrapper {
            background-position: bottom left;
            .mint-cell-value {
              input {
                color: #969696
              }
            }
          }
        }
        .mint-cell:last-child {
          background-image: none;
          
        } 
      }
    }
  }
  .mintui-back {
    color: #231916;
    font-size: 0.34rem
  }
  .bottom  {
    margin-top: 2.45rem;
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
        border-radius: 0.05rem;
      }
  }
</style>
