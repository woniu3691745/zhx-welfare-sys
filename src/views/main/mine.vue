/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 16:15:05
 * 我的
 */
<template>
  <div class="mine">
    <div class="common-header">
      <mt-header title="我的">
        <!-- <router-link to="/balance" slot="left"> -->
          <!-- <mt-button icon="back"></mt-button> -->
        <!-- </router-link> -->
      </mt-header>
    </div>
    <div class="mine-body">
      <div>
        <div class="header-pic-container clear">
          <img class="left" src="../../assets/group.png" alt="">
          <div class="left user-name-container">
            <p>ID：用户名</p>
            <p>用户的企业名称</p>
          </div>
        </div>
        <div class="all-limit">
          我的额度：日用品：¥1000.00/食品：¥1000.00/服装：¥1000.00
        </div>
        <mt-cell title="我的订单" is-link></mt-cell>
      </div>
      <div class="mine-order-contain">
        <div>
          <div>
            <img class="left" src="../../assets/needPay.png" alt="">
            <p>99</p>
          </div>
          <p>待付款</p>
        </div>
        <div>
          <div>
            <img class="left" src="../../assets/pendingShipment.png" alt="">
            <p>99</p>
          </div>
          <p>待付款</p>
        </div>
        <div>
          <div>
            <img class="left" src="../../assets/allOrder.png" alt="">
            <p>99</p>
          </div>
          <p>待付款</p>
        </div>
      </div>
      <div class="hheight-22"></div>
      <mt-cell class="mine-no-bg" title="地址管理" is-link to="/addressMs"></mt-cell>
      <mt-cell title="账户安全" is-link to="/accountManagement"></mt-cell>
      <mt-cell title="联系客服" is-link></mt-cell>
    </div>
    <div class="mine-header">
      <mt-button type="danger" size="large" @click="LogOut">退出</mt-button>
    </div>
      <!-- <div class="advice">
        <span>重要提示：</span>
        <br>
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>   
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>      
      </div> -->
  </div>
</template>
<script>
export default {
  name: 'mine-page',
  data () {
    return {
      selected: 'index',
      items: 4
    }
  },
  methods: {
    LogOut () {
      this.$store
        .dispatch('LogOut')
        .then(req => {
          this.$router.push({ path: '/login' })
        })
        .catch(req => {
          console.log(req)
        })
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
@import "../../../static/css/util.css";
.mine-body {
  .header-pic-container {
    height: 1.8rem;
    background: #FB4E51;
    img {
      width: 1.16rem;
      height: 1.16rem;
      font-size: 0;
      margin-left: 0.44rem;
      margin-top: 0.34rem;
    }
    .user-name-container {
      font-size: 0.28rem;
      color: #FFFFFF;
      margin-top: 0.5rem;
      margin-left: 0.4rem;
      line-height: 0.45rem;
    }
  }
  .mine-order-contain {
    display: flex;
    height: 1.8rem;
    div {
      flex: 1;
      div {
        margin: 0 auto;
        width: 0.8rem;
        height: 0.8rem;
        position: relative;
        margin-top: 0.18rem;
        img {
          width: 100%;
          height: 100%;
          font-size: 0;
        }
        p {
          position: absolute;
          right: -0.13rem;
          top: 0;
          background: #FFFFFF;
          border: 1px solid #FB4E51;
          color: #FB4E51;
          border-radius: 50%;
          width: 0.34rem;
          height: 0.34rem;
          line-height: 0.34rem;
          text-align: center;
          font-size: 0.22rem;
          box-sizing: border-box;
          margin-top: 0;
        }
      }
      p {
        font-size: 0.24rem;
        color: #323232;
        text-align: center;
        margin-top: 0.2rem;
      }
    }
  }
  .hheight-22 {
    height: 0.22rem;
    background: #F5F5F5;
  } 
  .all-limit {
    font-size: 0.24rem;
    color: #4A4A4A;
    height: 0.7rem;
    line-height: 0.7rem;
    background: #f5f5f5;
    padding-left: 0.2rem;
  }
}
.mine-header {
  margin-top: 0.4rem;
  button {
    font-size: 0.32rem;
    width: 6.8rem;
    margin: 0 auto;
    height: 0.88rem;
  }
}
</style>
