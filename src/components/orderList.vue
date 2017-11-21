/*
 * @Author: lidongliang 
 * @Date: 2017-10-19 19:50:05 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-16 20:21:46
 * 订单列表
 *
 * @translate-change="translateChange"
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
            <li class="order-num">
              <p class="clear order-num-contain">
                <span class="left num">订单号：1475874589658745</span>
                <span class="right delete"></span>
                <span class="right order-status">待收货</span>
              </p>
              <div class="all-thing">
                <div class="all-thing-pic">
                  <img slot="icon" src="../assets/aaa.jpg" width="24" height="24">
                  <img slot="icon" src="../assets/aaa.jpg" width="24" height="24">
                  <img slot="icon" src="../assets/aaa.jpg" width="24" height="24">
                  <img slot="icon" src="../assets/aaa.jpg" width="24" height="24">
                  <img slot="icon" src="../assets/aaa.jpg" width="24" height="24">
                  <img slot="icon" src="../assets/aaa.jpg" width="24" height="24">
                  <img slot="icon" src="../assets/aaa.jpg" width="24" height="24">
                </div>
               
              </div>
              <div class="pay-money">
                <p class="reality-money">共1件商品   实付款 <span>￥14.90</span></p>
                <p class="freight">（含运费 20元）</p>
              </div>
              <div class="border-top-1px">
                <div class="statue-pay-cancel clear">
                  <span class="pay right">
                    去支付
                  </span>
                  <span class="cancel right">
                    取消订单
                  </span>
                </div>
              </div>
              <div data-v-d5ab74ae="" class="hheight-22"></div>
            
            
            
            
            </li>












            <li v-for="item in orderList" v-bind="orderList" :key="item.id" class="page-loadmore-listitem">
              <router-link :to="{ path: '/detail', query: {id: item.id}}"><img v-bind:src="item.image"></router-link>
              <div class="order-description">
                <!-- 此次修改 -->
                <div class="desc">{{item.name}}</div>
                <span class="span-block clear">
                  <span class="sale-price left">￥{{ item.salePrice }}</span>
                  <span class="car-shopping right"><img class="cart" src="../assets/cart.png" @click="cart()" /></span>
                </span>
                
              </div>
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
  </div>
</template>

<script>
import { InfiniteScroll, Indicator } from 'mint-ui'
import Vue from 'vue'
Vue.use(InfiniteScroll)

export default {
  name: 'orders-list-page',
  data () {
    return {
      orderList: [],
      allLoaded: false,
      autoFill: false,
      bottomStatus: '',
      topStatus: '',
      wrapperHeight: 0,
      // translate: 0,
      sequenceType: 1
    }
  },
  methods: {
    cart () {
      this.$router.push({ path: '/cart' })
    },
    get () {
      setTimeout(function () {
        Indicator.open({
          spinnerType: 'fading-circle'
        })
      }, 300)
      setTimeout(function () {
        Indicator.close()
      }, 1000)
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    handleTopChange (status) {
      this.moveTranslate = 1
      this.topStatus = status
    },
    // translateChange (translate) {
    //   const translateNum = +translate
    //   this.translate = translateNum.toFixed(2)
    //   this.moveTranslate = (1 + translateNum / 70).toFixed(2)
    // },
    loadBottom () {
      setTimeout(() => {
        // let lastValue = this.orderList.length
        // if (lastValue < 10) {
        //   // for (let i = 1; i <= 8; i++) {
        //   //   this.list.push(lastValue + i)
        //   // }
        //   console.log('asd')
        // } else {
        //   this.allLoaded = true
        // }
        // this.orderListInfo()
        this.$refs.loadmore.onBottomLoaded()
      }, 1500)
    },
    loadTop () {
      // setTimeout(() => {
      //   let firstValue = this.list[0]
      //   for (let i = 1; i <= 2; i++) {
      //     this.list.unshift(firstValue - i)
      //   }
      //   this.$refs.loadmore.onTopLoaded()
      // }, 1500)
      setTimeout(() => {
        this.orderListInfo()
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
    orderListInfo (val) {
      // console.log('selected is ' + val)
      let viewNums = {
        index: 0,
        limit: 8,
        sequenceType: val || this.sequenceType
      }
      this.$store
        .dispatch('GoodList', viewNums)
        .then(res => {
          this.orderList = res.data
        })
        .catch(res => {
          console.log(res)
        })
    },
    childrenFun () {
      console.log('123123123123')
    }
  },
  created () {
    this.get()
    this.orderListInfo()
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
  }
}
</script>
<style lang="less" scoped>
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
      .hheight-22 {
        height: 0.22rem;
        background: #F5F5F5;
      } 
    }


















   
    .page-loadmore-listitem {
      display: flex;
      height: 2.4rem;
      border: none;

      a {
        width: 2.4rem;
        height: 2.4rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      
      .order-description {
        flex: 2;
        font-size: 12px;
        padding: 0.18rem 0.38rem 0.16rem 0.2rem;
        box-sizing: border-box;
        height: 2.4rem;
        border-bottom: 1px solid #eeddee;
        .desc {
          font-size: 0.32rem;
          color: #323232;
          line-height: 0.36rem;
          margin-bottom: 0.75rem
        }
        .span-block {
          display: block;
          .sale-price {
            font-size: 0.4rem;
            color: #FE414B;
            height: 0.6rem;
            line-height: 0.6rem
          }
        }
        .car-shopping {
          width: 0.6rem;
          height: 0.6rem;
         
          .cart {
            float: right;
            height: 100%;
            width: 100%;
          }
        }
        
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
.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
}

.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
  border-bottom: 1px solid #eee;
  list-style: none outside none;
  line-height: initial;
  text-align: initial;
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
