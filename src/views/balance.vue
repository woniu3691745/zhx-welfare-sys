<template>
  <div class="balance" style="position: absolute;">
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
      <div class="wrapper" v-for="item in quotas" :key="item.itemTypeName">
         <span class="title">{{item.itemTypeName}}</span>
         <div class="content">
           <div class="warn" v-if="item.expireWarn !== ''"><span>{{item.expireWarn}}</span></div>
           <div class="balance">
             <div class="balance-left"><span>可以用余额：</span></div>
             <div class="balance-middle"><span>￥{{item.quota}}</span></div>
             <div class="balance-right"><span>明细></span></div>
           </div>
           <div class="button"><mt-button type="danger" size="large" @click="use(item.itemTypeId)">使用</mt-button></div>
           <div class="description"><span>可用品类：{{item.desc}}</span></div>
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
import eventBus from '../assets/eventBus'
export default {
  name: 'balance-page',
  data () {
    return {
      items: 4,
      height: 0,
      quotas: []
    }
  },
  created () {
    this.quotas = this.$store.getters.quota
    this.height = document.body.offsetHeight - 88
  },
  mounted () {
    // 页面完成获得焦点
    debugger
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
          // height: 20px;
          text-align: center;
          font-size: 14px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          background-color: #fce59e;
        }
        .balance {
          display: -webkit-box;
          padding: 0 10px;
          margin-top: 15px;
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
}
</style>
