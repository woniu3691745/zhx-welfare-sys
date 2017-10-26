<template>
  <div class="deatil">
    <div class="detail-top">
      <mt-header title="商品">
        <router-link to="" slot="left">
          <mt-button icon="back"  @click="back()">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="detail-body" :style="{ height: height + 'px' }">
      <mt-cell>
        <img src="../assets/swipe/4.jpg" alt="">
      </mt-cell>
      <mt-cell class="detail-goods-top">
        <div class="content">
          <span class="name">使用“xxx配送“区分货源及包邮条件使用“xxx配送11“区分货源及包邮条件</span>
          <div class="money">￥58.9</div>
          <div class="salesNum">20人已买</div>
        </div>
      </mt-cell>
      <!-- <mt-cell title="已选" to="" is-link value="">
        <span>卓蓝雅 生姜防脱发洗发水，1件</span>
      </mt-cell> -->
      <mt-cell title="重量" value="4.9kg" > 
      </mt-cell>
      <mt-cell title="运费">
        <span>单笔订单满108元，包邮</span>
      </mt-cell>
      <mt-cell class="detail-goods-bottom">
        <div class="content">
          <span class="name">- 商品详情 -</span>
          <div class="detail">
            <img src="../assets/swipe/3.jpg" alt="">
            <span>asdasd</span>
          </div>
        </div>
      </mt-cell>
    </div>
    <div class="detail-bottom">
      <mt-tabbar fixed>
        <mt-button size="large" type="default">
            <img src="../assets/cart.png" height="20" width="20" slot="icon">
        </mt-button>
        <mt-button type="primary" class="button-width">加入购物车</mt-button>
        <mt-button type="danger" class="button-width">立即购买</mt-button>
      </mt-tabbar>
    </div>
  </div>  
</template>
<script>
  export default {
    name: 'detail',
    data () {
      return {
        id: '',
        height: 0,
        goodsForm: {
          brandName: ''
        }
      }
    },
    methods: {
      back () {
        this.$router.go('-1')
      },
      goodListByIdInfo (id) {
        this.$store
        .dispatch('GoodListById', id)
        .then(res => {
          // this.goodList = res.data
          console.log('-> ' + JSON.stringify(res.data))
        })
        .catch(res => {
          console.log(res)
        })
      }
    },
    created () {
      this.height = document.body.offsetHeight - 80
    },
    mounted () {
      this.goodListByIdInfo(this.$route.query.id)
    }
  }
</script>
<style lang="less" scoped>
@import "../../static/css/util.css";

.detail-goods-top {
  :nth-child(2) {   // mint-cell-wrapper
    display: grid;
    :nth-child(1) {   // mint-cell-title
      display: flex;
      flex-direction: column;
      flex: 0;
    }
    .content {
      display: inline;
       padding-bottom: 5px;
      .name {
        color: black;
        padding: 15px 0;
      }
      .money {
        float: left;
      }
      .salesNum {
        font-size: 12px;
        float: right;
      }
    }
  }
}

.detail-goods-bottom {
  :nth-child(2) {   // mint-cell-wrapper
    display: grid;
    :nth-child(1) {   // mint-cell-title
      display: flex;
      flex-direction: column;
      flex: 0;
    }
    .content {
      // display: inline;
      text-align: -webkit-center;
      padding: 5px;
      .name {
        color: black;
        padding: 5px;
      }
      .money {
        float: left;
      }
      .salesNum {
        font-size: 12px;
        float: right;
      }
    }
  }
}

.deatil {
  .detail-top {
    // width: 100%;
    height: auto;
  }
  .detail-body {
    overflow: auto;
    height: 580px;
    img {
      padding: 5px 0px;
      width: 99.9%;
    }
  }
  .detail-bottom {
    .button-width {
      width: 200px;
      // background: none;
    }
  }
}
.mint-button::after {
  background-color: unset;
}
</style>
