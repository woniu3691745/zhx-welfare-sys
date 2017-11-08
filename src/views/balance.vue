<template>
  <div class="balance">
    <div class="balance-header">
      <div class="name">企业额度</div>
    </div>
    <div class="balance-body" :style="{ height: height + 'px' }">
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
      <div class="wrapper" v-for="item in items" :key="item">
         <span class="title">日用品</span>
         <div class="content">
           <div class="warn"><span>您有300元将在3天后过期，请尽快使用</span></div>
           <div class="balance">
             <div class="balance-left"><span>可以用余额：</span></div>
             <div class="balance-middle"><span>￥458.00</span></div>
             <div class="balance-right"><span>明细</span></div>
           </div>
           <div class="button"><mt-button type="danger" size="large">使用</mt-button></div>
           <div class="description"><span>可够品类：清洁用品、洗涤用品</span></div>
         </div>
      </div>
      <div class="advice">
        <span>重要提示：</span>
        <br>
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>   
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>      
      </div>
    </div>
    <div class="balance-bottom">
    </div>
  </div>
</template>
<script>
export default {
  name: 'balance-page',
  data () {
    return {
      selected: 'index',
      items: 4,
      height: 0
    }
  },
  created () {
    this.height = document.body.offsetHeight - 88
    // this.height = document.body.offsetHeight - 140
  }
}
</script>
<style lang="less" scoped>
@import "../../static/css/util.css";
.balance {
  padding: 0 0;
  .balance-header {
    // overflow: auto;
    .name {
      text-align: center;
      padding: 5px 0;
      font-size: 19px;
    }
  }
  .balance-body {
    overflow: auto;
    .index-swipe {
      height: 150px;
      padding: 0 2px;
      img {
        text-align: center;
        width: 100%;
        // border-radius: 5px;
      }
    }
    .wrapper {
      margin-top: 5px;
      padding: 5px 0;
      height: 200px;
      // border: 1px solid red;
      .title {
        padding-left: 20px;
      }
      .content {
        margin: 10px 20px;
        height: 150px;
        border: 1px solid red;
        border-radius: 10px;
        .warn {
          padding: 2px;
          text-align: center;
          font-size: 14px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          background-color: #fce59e;
        }
        .balance {
          display: -webkit-box;
          padding: 0 10px;
          margin-top: 10px;
          text-align: center;
          .balance-left {
            flex: 1;
            font-size: 14px;
          }
          .balance-middle {
            flex: 2;
            font-size: 24px;
            padding: 5px;
            color: #ef4f4f;
          }
          .balance-right {
            flex: 1;
            font-size: 12px;
            font-weight: 900;
            padding-left: 40px;
          }
        }
        .button {
          padding: 5px 10px;
        }
        .description {
          text-align: center;
          font-size: 12px;
          padding: 0 10px;
        }
      }
    }
    .advice {
      font-size: 14px;
      padding: 0 20px;
      z-index: -1;
      // border: 1px solid red;
      p {
        font-size: 12px;
      }
    }
  }
  .mint-button {
    border-radius: 6px;
  }
  // .balance-bottom {
  //   position: absolute;
  //   padding-bottom: 50px;
  //   // margin-bottom: 100px;
  //   width: 99%;
  //   height: 50px;
  //   border: 2px solid #fce59e;
  //   opacity:1;
  // }
}
</style>
