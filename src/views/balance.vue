<template>
  <div class="balance" style="position: absolute;">
    <div class="common-header pozitin-fixed">
      <mt-header title="企业额度">      
      </mt-header>
    </div>
    <div class="balance-body padding-top">
      <div class="index-swipe">
        <mt-swipe :auto="2000">
          <mt-swipe-item><img src="../assets/swipe/1.jpg"></img>
          </mt-swipe-item>
          <mt-swipe-item><img src="../assets/swipe/2.jpg"></img>
          </mt-swipe-item>
          <mt-swipe-item><img src="../assets/swipe/3.jpg"></img>
          </mt-swipe-item>
          <mt-swipe-item><img src="../assets/swipe/4.jpg"></img>
          </mt-swipe-item>
          <mt-swipe-item><img src="../assets/swipe/5.jpg"></img>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="wrapper" v-for="item in quotas" :key="item.itemTypeName">
         <div class="show-name-all clear">
           <span class="title left">{{item.itemTypeName}}</span>
           <span class="right shop-car">
             <span>99</span>
           </span>
         </div>
         <div class="content">
          <div class="warn-container">
             <!-- <div class="warn clear">
              <span class="prompt left">您有300元将在3天后过期，请您尽快使用</span>
              <span class="right detail">明细</span>
            </div> -->
          </div>
           <!-- <div class="warn" v-if="item.expireWarn !== ''"><span>{{item.expireWarn}}</span></div> -->
           <div class="balance clear">
             <div class="balance-left left"><span>可以用余额：</span></div>
             <div class="balance-middle left"><span>￥{{item.quota}}</span></div>
             <!-- <div class="balance-right"><span>明细></span></div> -->
           </div>
           <div class="button"><mt-button type="danger" size="large" @click="use(item.itemTypeId)">去使用</mt-button></div>
           <div class="description"><span>可用品类：{{item.desc}}</span></div>
         </div>
      </div>
      <div class="advice">
        <p class="kindly-reminder">温馨提示：您每次只能选择一种品类进行支付和购物</p>
        <div class="importants">
          <span>重要提示：</span>
         
          <p class="margin-top">1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>
          <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>   
          <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>      
      </div>
        </div>
    </div>
    <div class="balance-bottom">
    </div>
  </div>
</template>
<script>
import eventBus from '../assets/eventBus'
export default {
  name: 'balance-page',
  data () {
    return {
      items: 4,
      // height: 0,
      quotas: []
    }
  },
  created () {
    this.quotas = this.$store.getters.quota
    // this.height = document.body.offsetHeight - 88
  },
  mounted () {
    // 页面完成获得焦点
    this.focus()
  },
  methods: {
    focus () {
      let select = this.$route.query.selected || 'balance'
      eventBus.$emit('focus', select)
    },
    use (categoryId) {
      // this.$router.push({path: '/mall', params: {categoryId: categoryId}})
      this.$router.push({path: '/mall', query: {categoryId: categoryId, selected: 'mall'}})
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../static/css/util.css";
.balance {
  padding: 0 0;
  width: 100%;
  
  // .balance-header {
    // overflow: auto;
  //   .name {
  //     text-align: center;
  //     padding: 5px 0;
  //     font-size: 19px;
  //   }
  // }
  .balance-body {
    
    overflow: auto;
    .index-swipe {
      height: 2.04rem;
      width: 100%;
      img {
        text-align: center;
        width: 100%;
        height: 100%;
        // border-radius: 5px;
      }
    }
    .wrapper {
      .show-name-all {
        padding: 0 0.56rem;
        font-size: 0.3rem;
        height: 1rem;
        line-height: 1rem;
        box-sizing: border-box;
       
        .shop-car {
          position: relative;
          margin-top: 0.1rem;
          width: 0.8rem;
          height: 0.8rem;
          background: url('../assets/shop-car.png');
          background-repeat: no-repeat;
          background-size: 0.51rem 0.42rem;
          background-position: 0 0.27rem;
          span {
            color: #ffffff;
            text-align: center;
            font-size: 0.22rem;
            line-height: 0.4rem;
            width: 0.4rem;
            height: 0.4rem;
            background: #FB4E51;
            border-radius: 50%;
            position: absolute;
            right: 0;
            top: 0;
          }
          
        }
      }
   
      
      .content {
        width: 6.4rem;
        margin: 0 auto;
        height: 3.46rem;
        border: 1px solid red;
        border-radius: 10px;
        .warn-container {
          width: 100%;
          height: 0.58rem;
          
        }
        .warn {
          width: 100%;
          height: 0.58rem;
          text-align: center;
          font-size: 14px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          background-color: #faf296;
          .prompt {
            padding-left: 0.5rem;
            height: 0.58rem;
            line-height: 0.58rem;
            font-size: 0.26rem;
            color: #FB4E51;
            background: url('../assets/care-content.png');
            background-repeat: no-repeat;
            background-size: 0.28rem 0.28rem;
            background-position: 0.14rem center;
          }
          .detail {
            padding-right: 0.4rem;
            height: 0.58rem;
            line-height: 0.58rem;
            font-size: 0.26rem;
            color: #0084FF;
            background: url('../assets/rihgt-row.png');
            background-repeat: no-repeat;
            background-size: 0.16rem 0.26rem;
            background-position: 0.65rem center;
          }
        }
        .balance {
          height: 1.38rem;
          padding-left: 0.34rem;
          box-sizing: border-box;
          .balance-left {
            font-size: 0.26rem;
            height: 1.38rem;
            padding-top: 0.4rem;
            box-sizing: border-box
          }
          .balance-middle {
            height: 1.38rem;
            line-height: 1.38rem;
            font-size: 0.5rem;    
            color: #ef4f4f;
            margin-left: 0.2rem;
          }
          
        }
        .button {
          width: 5.72rem;
          margin: 0 auto;
          font-size: 0.32rem;
          height: 0.88rem;
          .mint-button {
            height: 0.88rem;
            font-size: 0.28rem;
          }
        }
        .description {    
          font-size: 0.24rem;
          padding-left: 0.34rem;
          line-height: 0.56rem;
          height: 0.56rem;
        }
      }
    }
    .advice {
      font-size: 0.28rem;
      padding: 0 0.5rem;
      margin-top: 0.34rem;
      padding-bottom: 80px;
      .kindly-reminder {
        color: #FF8C00
      }
      .importants {
        margin-top: 0.34rem;
        font-size: 0.26rem;
        line-height: 0.4rem;
        color: #555555;
        span {
          font-size: 0.28rem;
        }
        .margin-top {
          margin-top: 0.1rem;
        } 
      }
    }
  }
  .mint-button {
    border-radius: 6px;
  
  }
}
</style>
