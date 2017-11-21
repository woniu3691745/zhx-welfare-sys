/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 09:43:45
 * 订单详情
 */
<template>
  <div class="orderDetail">
    <div class="common-header">
      <mt-header title="订单详情">
        <router-link to="/mineOrder" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="order-detail-body">

      <div class="order-status-head clear">
        <span class="left">等待付款</span>
        <span class="right">需支付：￥14.9</span>
      </div>
      <div class="unpack-container">
        <p>该订单已拆成2个订单，并用2个包裹发出，点击“查看物流”可查看详情。</p>
      </div>
      <div class="orders-adderss">
        <div class="address-con">
          <div class="name-tel clear">
            <span class="name left">收货人：李娜</span>
            
            <span class="tel right">11111111111</span> 
          </div>
          <div class="position-fix">
            <img class="address-icon" slot="icon" src="../../assets/aaa.jpg">
            <p>收货地址收货地址收货地址收货地址</p>
            
          </div>
        </div>
      </div>
      <div class="height-22"></div>
      <div class="order-detail-content">
        <p class="clear order-num-contain border-1px">
          <span class="left num">订单号：1475874589658745</span>
        </p>
        <p class="clear order-num-contain">
          <span class="left num">子订单号：1475874589658745</span>
        </p>
        <div class="all-thing">
          <router-link to="/orderDetail">
            <div class="all-thing-pic">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
            </div>
          </router-link>
        </div>
        <div class="border-1px">
          <div class="statue-pay-cancel clear">
            <span class="pay right">
              去支付
            </span>
            <span class="cancel right">
              取消订单
            </span>
          </div>
        </div>

        <p class="clear order-num-contain">
          <span class="left num">子订单号：1475874589658745</span>
          
        </p>
        <div class="all-thing">
          <router-link to="/orderDetail">
            <div class="all-thing-pic">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
              <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
            </div>
          </router-link>
        </div>
        <div class="border-1px">
          <div class="statue-pay-cancel clear">
            <span class="pay right">
              去支付
            </span>
            <span class="cancel right">
              取消订单
            </span>
          </div>
        </div>






        <div class="pay-money">
          <p class="reality-money">共1件商品   实付款 <span>￥14.90</span></p>
          <p class="freight">（含运费 20元）</p>
        </div>
        <p class="clear order-time-logistics">
          <span class="left num">下单时间：2017-11-8，10：12：12</span>
        </p>
        <p class="clear order-time-logistics">
          <span class="left num">支付方式：额度支付</span>
        </p>
        <p class="clear order-time-logistics">
          <span class="left num">配送日期：2017-11-8，10：12：12</span>
        </p>
        
      </div>
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'order-detail-page',
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
.order-detail-body {
  .order-status-head {
    padding: 0 0.3rem 0 0.48rem;
    font-size: 0.32rem;
    color: #FFFFFF;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    box-sizing: border-box;
    background-image: linear-gradient(-199deg, #FF7474 0%, #FE4E65 73%, #FD404A 100%);
  }
  .unpack-container {
    padding: 0.44rem 0.46rem 0.22rem 0.36rem;
    background: #FFFFFF;
    box-shadow: inset 0 -1px 0 0 #D8D8D8;
    p {
      font-size: 0.26rem;
      color: #428E37;
    }
  }
  .orders-adderss {
    .address-con {
      padding-bottom: 0.49rem;
      padding-top: 0.26rem;
      // display: none;
      .name-tel {
        font-size: 0.26rem;
        color: #323232;
        padding: 0 0.37rem 0 0.84rem;
        
        .name {
          height: 0.3rem;
          line-height: 0.3rem;
        }
        .tel {
          margin-right: 0.2rem;
          line-height: 0.3rem;
        }
      }
      .position-fix {
        margin-top: 0.35rem;
        font-size: 0.26rem;
        display: flex;
        align-items: center;
        min-height: 0.74rem;
        p {
          width: 100%;
          line-height: 0.38rem;
          color: #323232;
          padding-right: 1.06rem;
          color: #888888;
        }
        .address-icon {
          width: 0.34rem;
          height: 0.44rem;
          padding: 0 0.3rem 0 0.2rem;
        }
        
      }
    }
  }
  .height-22 {
    height: 0.22rem;
    background: #F5F5F5;
  }
  .order-detail-content {
    .order-num-contain {
      padding: 0 0.3rem 0 0.2rem;
      box-sizing: border-box;
      .num {
        font-size: 0.26rem;
        line-height: 0.88rem;
        height: 0.88rem;
      }
      
    }
    .all-thing {
      width: 100%;
      background: #F5F5F5;
      position: relative;
      .all-thing-pic {
        overflow-x: scroll;
        width: 100%;
        box-sizing: border-box;
        height: 1.4rem;
        white-space: nowrap;
        padding: 0.14rem 0 0.14rem 0.14rem;
        font-size: 0;
        img {
          width: 1.14rem;
          height: 1.12rem;
          margin-right: 0.2rem;
        }
      }
    }
    .pay-money {
      width: 100%;
      height: 1.4rem;
      font-size: 0;
      padding-top: 0.18rem;
      .reality-money {
        font-size: 0.26rem;
        color: #323232;
        
        height: 0.56rem;
        text-align:  right;
        padding-right: 0.3rem;
        box-sizing: border-box;
        span {
          font-size: 0.4rem;
          color: #141414;
        }
      }
      .freight {
        font-size: 0.26rem;
        color: #323232;
        text-align: right;
        padding-right: 0.3rem;
        box-sizing: border-box;
        height: 0.37rem;
        line-height: 0.37rem;
        margin-top: 0.06rem;
      }
      
    }
    .statue-pay-cancel {
      padding: 0.18rem 0.36rem 0.14rem 0;
      font-size: 0.24rem;
      .pay {
        height: 0.48rem;
        line-height: 0.46rem;
        padding: 0 0.3rem;
        border: 1px solid #FD404A;
        box-sizing: border-box;
        color: #FD404A;
        border-radius: 0.02rem;
      }
      .cancel {
        height: 0.48rem;
        line-height: 0.46rem;
        padding: 0 0.3rem;
        border: 1px solid #B7B7B7;
        box-sizing: border-box;
        color: #323232;
        border-radius: 0.02rem;
        margin-right: 0.18rem;
      }
    }
    .order-time-logistics {
      box-shadow: inset 0 1px 0 0 rgba(225,225,225,0.50), inset 0 -1px 0 0 rgba(220,220,220,0.50);
      font-size: 0.26rem;
      color: #888888;
      width: 100%;
      height: 0.94rem;
      line-height: 0.94rem;
      padding-left: 0.2rem;
    }
  
  
  }
}
</style>
