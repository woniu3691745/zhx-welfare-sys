/*
 * @Author: lidongliang
 * @Date: 2017-11-14 19:04:29
 * @Last Modified by: zhangyapeng
 * @Last Modified time: 2018-03-28 11:03:54
 * 额度
 */
<template>
  <div class="balance" style="position: absolute;">
    <div class="common-header pozitin-fixed">
      <mt-header title="企业额度">
      </mt-header>
    </div>
    <div class="balance-body padding-top">
      <div class="index-swipe">
        <mt-swipe :auto="2000">
          <mt-swipe-item><img src="../../assets/swipe/1.png" @click="swipeDetail('10013995878')">></img>
          </mt-swipe-item>
          <mt-swipe-item><img src="../../assets/swipe/2.png" @click="swipeDetail('1001964416')">></img>
          </mt-swipe-item>
          <mt-swipe-item><img src="../../assets/swipe/3.png" @click="swipeDetail('1001114942')">></img>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="wrapper" v-for="item in quotas" :key="item.typeId">
         <div class="show-name-all clear">
           <span class="title left">{{item.typeName}}</span>
           <router-link :to="{ path: '/cart', query: {typeId: item.typeId}}">
            <span class="right shop-car">
              <span>{{item.cartCount}}</span>
            </span>
           </router-link>
         </div>
        <div class="content">
          <router-link :to="{ path: '/', query: {itemTypeId: item.typeId}}">
            <div class="warn clear" v-if="item.limitFlag !== ''">
              <span class="prompt left">{{item.limitFlag}}</span>
              <span class="right detail" @click="balanceDetail(item.typeId, $event)">查看</span>
            </div>
            <div v-else :style="{ height: height + 'rem' }">
              <span class="right detail" @click="balanceDetail(item.typeId, $event)">查看</span>
            </div>
          </router-link>
          <div class="balance clear">
            <div class="balance-left left">
              <span>可用余额：</span>
            </div>
            <div class="balance-middle left">
              <span>￥{{item.balance}}</span>
            </div>
            </div>
          <div class="button">
            <mt-button type="danger" size="large" @click="use(item.typeId)">去使用</mt-button>
          </div>
          <div class="description">
            <span>可购品类：{{item.categorys}}</span>
          </div>
        </div>
      </div>
      <div class="advice">
        <p class="kindly-reminder" v-if="quotas">温馨提示：您每次只能选择一种品类进行支付和购物</p>
        <div class="importants">
          <span>重要提示：</span>
          <p class="margin-top">1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>
          <p>2、余额不可延期、不可赎回、不可提现，消费时请全额使用您的额度。</p>
          <p>3、每一订单收取基础物流服务费15元，单一订单满128元（不含优惠促销金额）减免15元基础物流服务费，
            具体物流服务费用会依据订单商品数量、尺寸、重量加收续重运费，最终物流费用以订单计算为准。
            运费的收取标准可能进行相应调整，具体以公示的运费为准。</p>
          <p>4、商品一经售出，因质量问题可以更换，不可以退货。</p>
         </div>
      </div>
    </div>
    <div class="balance-bottom">
    </div>
  </div>
</template>

<script>
import { startLoading, endLoading } from '../../utils/utils'
import eventBus from '../../utils/eventBus'
export default {
  name: 'balance-page',
  data () {
    return {
      items: 4,
      height: 0.3,
      quotas: []      // 额度信息
    }
  },
  created () {
    startLoading()
    this.quotas = this.$store.getters.quota
    setTimeout(() => {
      endLoading()
    }, 500)
  },
  mounted () {
    console.log('1')
    this.focus()
  },
  methods: {
    // 导航焦点
    focus () {
      let select = this.$route.query.selected || 'balance'
      eventBus.$emit('focus', select)
    },
    /*
    * typeId 额度种类
    * selected 导航
    * type 进入商城方式
    */
    use (typeId) {
      this.$router.push({
        path: '/mall',
        query: {
          typeId: typeId,
          selected: 'mall',
          type: 'direct',
          flag: '1'
        }
      })
    },
    // 额度详细
    balanceDetail (typeId, $event) {
      $event.preventDefault()
      this.$router.push({
        path: '/balanceDetail',
        query: {
          typeId: typeId
        }
      })
    },
    // 商品详情
    // hardcode
    detail (productSku) {
      let tyepeId
      if (productSku === '1001114942') {
        tyepeId = '1000001'
      } else {
        tyepeId = '1000002'
      }
      this.$router.push({
        path: '/detail',
        query: { typeId: tyepeId, sku: productSku }
      })
    },
    // 轮播图商品详情
    swipeDetail (productSku) {
      console.log('productSku---> ' + productSku)
      this.detail(productSku)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/util.css";
.balance {
  padding: 0 0;
  width: 100%;
  .balance-body {
    overflow: auto;
    .index-swipe {
      height: 2.04rem;
      width: 100%;
      img {
        text-align: center;
        width: 100%;
        height: 100%;
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
          background: url("../../assets/shop-car.png");
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
            background: #fb4e51;
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
            color: #fb4e51;
            background: url("../../assets/care-content.png");
            background-repeat: no-repeat;
            background-size: 0.28rem 0.28rem;
            background-position: 0.14rem center;
          }
          .detail {
            padding-right: 0.4rem;
            height: 0.58rem;
            line-height: 0.58rem;
            font-size: 0.26rem;
            color: #0084ff;
            background: url("../../assets/rihgt-row.png");
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
            box-sizing: border-box;
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
      .detail {
        padding-right: 0.4rem;
        height: 0.58rem;
        line-height: 0.58rem;
        font-size: 0.26rem;
        color: #0084ff;
        background: url("../../assets/rihgt-row.png");
        background-repeat: no-repeat;
        background-size: 0.16rem 0.26rem;
        background-position: 0.65rem center;
      }
    }
    .advice {
      font-size: 0.28rem;
      padding: 0 0.5rem;
      margin-top: 0.34rem;
      padding-bottom: 80px;
      .kindly-reminder {
        color: #ff8c00;
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
