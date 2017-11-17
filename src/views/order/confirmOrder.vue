/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-16 19:59:13
 * 确认订单
 */
<template>
  <div class="confirmOrder">
    <div class="common-header">
      <mt-header title="确认订单">
        <router-link to="/cart" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body-confirm">
      
      <div class="address-container">
        <div class="address-con">
          <div class="name-tel clear">
            <span class="name left">收货人：李娜</span>
            <span class="right defaul">默认</span> 
            <span class="tel right">11111111111</span> 
          </div>
          <div class="position-fix">
            <img class="address-icon" slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
            <p>收货地址收货地址收货地址收货地址</p>
            <img class="next-icon" slot="icon" src="../../assets/aaa.jpg">
          </div>
        </div>
          
        
        <div class="add-adderss">
          <router-link :to="{ path: '/addAddress' }"> <mt-button type="primary" class="button-width">添加地址</mt-button></router-link>
        </div>
        
          
        
      </div>

      <div class="hheight-22"></div>
      <div class="clear nomeny-cue">
        <span class="left shop-kind">日用品</span>
        <span class="right shop-delait">可使用额度：￥300.00</span>
      </div>
      <div class="all-thing">
        <div class="all-thing-pic">
          <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
          <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
          <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
          <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
          <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
          <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
          <img slot="icon" src="../../assets/aaa.jpg" width="24" height="24">
        </div>
        <div class="number-shops">
          共11件商品
        </div>
      </div>
      <div class="clear nomeny-all border-1px">
        <span class="left shop-kind">商品金额小计</span>
        <span class="right shop-delait">￥300.00</span>
      </div>
      <div class="clear nomeny-all">
        <span class="left shop-kind">运费 ¥20.00 </span>
        <span class="right shop-delait">已减免</span>
      </div>
      <div class="hheight-22"></div>
      <div class="clear nomeny-alls border-1px">
        <span class="right shop-kind">¥20.00 </span>
        <span class="right shop-delait">共1件商品 使用额度支付小计：</span>
      </div>
      <div class="clear merge">
        <span class="left shop-kind">满200 包邮，再买50元 包邮 </span>
        <span class="right shop-delait">去凑单</span>
      </div>



    </div>
    <div class="bottom">
      <mt-tabbar fixed>
        <mt-button size="large" type="default" class="prompt-money clear">
              <p class="right">
                <span class="">合计金额：</span>
                <span class="">￥170.00</span> 
              </p>
        </mt-button>
         <router-link :to="{ path: '/inputPwd' }" class="submit-container">
          <mt-button type="primary" class="button-width">提交订单</mt-button>
        </router-link>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
 export default {
   // 组件名字
   name: 'confirmOrder-page',
   // 组合其它组件
   extends: {},
   // 组件属性、变量
   props: {},
   // 变量
   data () {
     return {
       a1: 'asdasd',
       asd: 'ffff'
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
@import "../../../static/css/util.css";
.confirmOrder {
  .body-confirm {
    .address-container {
      box-shadow: inset 0 -6px 0 0 #FD404A;
      .address-con {
        padding-bottom: 0.49rem;
        padding-top: 0.26rem;
        display: none;
        .name-tel {
          font-size: 0.26rem;
          color: #323232;
          padding: 0 1.06rem 0 0.84rem;
          
          .name {
            height: 0.3rem;
            line-height: 0.3rem;
          }
          .defaul {
            border: 1px solid #FD404A;
            border-radius: 0.04rem;
            font-size: 0.2rem;
            color: #FD404A;
            width: 0.52rem;
            height: 0.3rem;
            line-height: 0.3rem;
            text-align: center;
            box-sizing: border-box;
          };
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
          }
          .address-icon {
            width: 0.34rem;
            height: 0.44rem;
            padding: 0 0.3rem 0 0.2rem;
          }
          .next-icon {
            width: 0.16rem;
            height: 0.26rem;
            padding: 0 0.2rem 0 0.7rem;
          }
        }
      }
      .add-adderss {
        padding: 0.58rem 0 0.7rem 0;
        .button-width {
          border: 2px solid #C8C8C8;
          box-sizing: border-box;
          border-radius: 8px;
          width: 1.96rem;
          height: 0.88rem;
          font-size: 0.32rem;
          color: #323200;
          background: none;
          display: block;
          margin: 0 auto
        }
      }      
    }
    .hheight-22 {
      height: 0.22rem;
      background: #F5F5F5;
    }
    .nomeny-cue {
      padding: 0 0.28rem 0 0.24rem;
      font-size: 0.26rem;
      height: 0.88rem;
      line-height: 0.88rem;
      .shop-kind {
        color: #323232;
      }
      .shop-delait {
        color: #969696;
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
        padding: 0.14rem 1.64rem 0.14rem 0.14rem;
        font-size: 0;
        img {
          width: 1.14rem;
          height: 1.12rem;
          margin-right: 0.2rem;
        }
      }
      .number-shops {
        position: absolute;
        right: 0;
        top: 0;
        width: 1.64rem;
        height: 1.4rem;
        background: #F5F5F5;
        text-align: center;
        font-size: 0.26rem;
        color: #323232;
        z-index: 2;
        line-height: 1.4rem;
      }

    } 
  
    .nomeny-all {
      padding: 0 0.28rem 0 0.24rem;
      font-size: 0.3rem;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #323232;
      .shop-delait {
        font-size: 0.36rem;
      }
    }
  
    .nomeny-alls {
      padding: 0 0.28rem 0 0.24rem;
      font-size: 0.36rem;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #FD404A;
      .shop-delait {
        font-size: 0.26rem;
        margin-right: 0.18rem;
        color: #323232;
      }
    }
  
    .merge {
      // display: none;
      background: #FFECD3;
      padding: 0 0.28rem 0 0.24rem;
      font-size: 0.24rem;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #323232;
      .shop-delait {
        height: 0.5rem;
        line-height: 0.5rem;
        margin-top: 0.19rem;
        border-bottom: 1px solid #323232;
        box-sizing: border-box;
      }
    }
  }


  // 底部
 .bottom {
   .mint-tabbar  {
    .prompt-money {
      height: 0.94rem;
      box-shadow: inset 0 1px 0 0 rgba(220,220,220,0.50);
      p {
        
        :nth-child(1) {
          font-size: 0.26rem;
          color: #323232;
        }
        :nth-child(2) {
          font-size: 0.26rem;
          color: #323232;
          font-size: 0.36rem;
          color: #FD404A;
          line-height: 0.37rem;
        }  
        
      }
    }
    .submit-container {
      font-size: 0;
      .mint-button  {
        border-radius: 0;
        line-height: 0.94rem;
        height: 0.94rem;
        background: #FD404A;
        width: 2rem;
        padding: 0;
        font-size: 0.28rem;
        color: #FFFFFF;
      }
      
    }
   }
 }
}
.border-1px {
  background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: bottom;
}
</style>
