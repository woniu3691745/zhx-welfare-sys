/*
 * @Author: lidongliang
 * @Date: 2017-10-19 19:50:05
 * @Last Modified by: zhangyapeng
 * @Last Modified time: 2018-03-20 15:38:42
 * 订单列表
 */
<template>
  <div style="">
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper">
        <mt-loadmore :top-method="loadTop"
                    @top-status-change="handleTopChange"
                    :bottom-method="loadBottom"
                    @bottom-status-change="handleBottomChange"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="autoFill"
                    ref="loadmore">
          <ul class="page-loadmore-list">
            <li class="order-num" v-for="item in options" :key="item.id">
              <p class="clear order-num-contain">
                <span class="left num">订单号：{{item.orderId}}</span>
                <span class="right delete" @click="deleteOrder(item)" v-if="item.status === '05'"></span>
                <span class="right order-status">{{item.orderStatus}}</span>
              </p>
              <div class="all-thing">
                <router-link :to="{path: '/orderDetail', query: {orderId: item.orderId}}" slot="left" class="btn-skip">
                  <div class="all-thing-pic" v-for="img in item.imgDetails" :key="img.mallSku">
                    <!-- 禅道上说点击图片也是跳转到订单详情页 -->
                   <img v-bind:src="img.imgUrl">
                  </div>
                </router-link>
              </div>
              <div class="pay-money">
                <p class="reality-money">共{{item.productCount}}件商品   实付款 <span>￥{{item.orderAmt}}</span></p>
                <p class="freight" v-if="!item.orderAmt < 99">（含运费 {{item.expressAmt}}元）</p>
              </div>
              <div class="border-top-1px">
                <div class="statue-pay-cancel clear"  v-if="item.status === '01'">
                  <span class="pay right" @click="goBuy(item)">去支付</span>
                  <span class="cancel right" @click="cancelOrder(item)">取消订单</span>
                </div>
                <div class="statue-pay-cancel clear"  v-if="item.status === '02'">
                  <span class="pay right" @click="RestartgoBuy(item)">重新支付</span>
                </div>
              </div>
              <div data-v-d5ab74ae="" class="hheight-22"></div>
            </li>
          </ul>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">
              <mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner>
            </span>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
            <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner>
            </span>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <zyp-loading :z-flag="once"></zyp-loading>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { startLoading, endLoading } from '../utils/utils'
import { mapMutations } from 'vuex'
export default {
  name: 'orders-list-page',
  data () {
    return {
      once: false,
      orderList: [],
      allLoaded: false,
      autoFill: false,
      bottomStatus: '',
      topStatus: ''
    }
  },
  props: {
    options: {
      type: Array
    }
  },
  methods: {
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    handleTopChange (status) {
      this.moveTranslate = 1
      this.topStatus = status
    },
    loadBottom () {
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded()
      }, 1500)
    },
    loadTop () {
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
    goBuy (val) {
      this.SET_CONFIRM_ORDER_INFO(val.orderAmt)
      this.$router.push({
        path: '/payChoice',
        query: {
          typeId: val.productType,      // 额度ID
          orderNo: val.orderId          // 订单编号
        }
      })
    },
    // 重新支付
    RestartgoBuy (val) {
      if (this.once) return
      this.once = true
      this.$store.dispatch('Re_pay_ID', val.orderId).then(res => {
        if (res.result) {
          location.href = res.bizData.alipayUrl
        } else {
          this.once = false
          alert(res.message)
        }
      }).catch(err => {
        this.once = false
        console.warn(err)
      })
    },
    deleteOrder (val) {
      MessageBox.confirm('确定执行此操作?').then(action => {
        startLoading()
        let cartForm = {
          orderId: val.orderId
        }
        this.$store
          .dispatch('DeleteOrder', cartForm)
          .then(res => {
            if (res.result) {
              this.$router.push({
                path: '/mineOrder'
              })
            } else {
              MessageBox({
                message: res.message,
                closeOnClickModal: true,
                showConfirmButton: true
              })
            }
            endLoading()
          })
          .catch(res => {
            console.log(res)
          })
      }).catch(error => {
        console.log(error)
      })
    },
    // 取消订单
    cancelOrder (val) {
      if (this.once) return
      this.once = true
      let orderInfo = {
        orderId: val.orderId
      }
      this.$store
        .dispatch('CancelOrder', orderInfo)
        .then(res => {
          this.once = false
          if (res.result) {
            this.$router.go(0)
            return
          }
          MessageBox({
            title: '提示',
            message: res.message,
            showCancelButton: false
          })
        })
        .catch(res => {
          this.once = false
          console.log(res)
        })
    },
    ...mapMutations([
      'SET_CONFIRM_ORDER_INFO'
    ])
  }
}
</script>
<style lang="less" scoped>
@import "../../static/css/util.css";
.page-loadmore .mint-spinner {
  display: inline-block;
  vertical-align: middle;
}
.page-loadmore-wrapper {
  .page-loadmore-list {
     background-color: #fff;
    .order-num {
      .order-num-contain {
        padding: 0 0.3rem 0 0.2rem;
        box-sizing: border-box;
        .num {
          font-size: 0.26rem;
          line-height: 0.88rem;
          height: 0.88rem;
        }
        .delete {
          width: 0.34rem;
          height: 0.34rem;
          background: url('../assets/delete.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-top: 0.25rem;
        }
        .order-status {
          font-size: 0.28rem;
          color: #FD404A;
          line-height: 0.88rem;
          height: 0.88rem;
          margin-right: 0.16rem;
        }
      }
      .all-thing {
        width: 100%;
        background: #F5F5F5;
        position: relative;
        .btn-skip {
          width: 100%;
          background: #F5F5F5;
          position: relative;
          display: block;
          font-size: 0;
          .all-thing-pic {
            display: inline-block;
            font-size: 0;
            overflow-x: scroll;
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
      .hheight-22 {
        height: 0.22rem;
        background: #F5F5F5;
      }
    }
  }
}
.mint-loadmore-top {
  font-size: 0.3rem;
}
.mint-loadmore-top span {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}
.mint-loadmore-top span {
  display: inline-block;
  vertical-align: middle;
}
.mint-loadmore-top span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.mint-loadmore-bottom {
  font-size: 0.3rem;
}
.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
}
.mint-loadmore-bottom span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.mint-loadmore-top {
  text-align: -webkit-center !important;
}
.mint-loadmore-bottom {
  text-align: -webkit-center !important;
}
</style>
