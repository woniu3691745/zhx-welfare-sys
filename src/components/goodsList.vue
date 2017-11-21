/*
 * @Author: lidongliang 
 * @Date: 2017-10-19 19:50:05 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 14:18:45
 * 商品列表
 *
 * @translate-change="translateChange"
 */
<template>
  <div>
    <div class="common-header header-car clear">
      <mt-header title="商品列表">
        <router-link to="/mall" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        
      </mt-header>
      <span class="right shop-car">
          
            <span >99</span>
          
        </span>
    </div>
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :top-method="loadTop" 
                    @top-status-change="handleTopChange"
                    :bottom-method="loadBottom" 
                    @bottom-status-change="handleBottomChange" 
                    :bottom-all-loaded="allLoaded" 
                    :auto-fill="autoFill"
                    ref="loadmore">
          <ul class="page-loadmore-list">
            <li v-for="item in goodList" v-bind="goodList" :key="item.productId" class="page-loadmore-listitem">
              <router-link :to="{ path: '/detail', query: {id: item.productId}}"><img v-bind:src="item.imgUrl"></router-link>
              <div class="good-description border-1px">
                <div class="desc">{{item.productName}}</div>
                <span class="span-block clear">
                  <span class="sale-price left">￥{{ item.salePrice }}</span>
                  <span class="car-shopping right"><img class="cart" src="../assets/red-car.png" @click="cart()" /></span>
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
  name: 'goods-list-page',
  data () {
    return {
      goodList: [],
      allLoaded: false,
      autoFill: false,
      bottomStatus: '',
      topStatus: '',
      wrapperHeight: 0,
      sequenceType: 1,
      productTypeId: this.$route.query.typeId     // 种类
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
        // let lastValue = this.goodList.length
        // if (lastValue < 10) {
        //   // for (let i = 1; i <= 8; i++) {
        //   //   this.list.push(lastValue + i)
        //   // }
        //   console.log('asd')
        // } else {
        //   this.allLoaded = true
        // }
        // this.goodListInfo()
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
        this.goodListInfo()
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
    goodListInfo (val) {
      // console.log('selected is ' + val)
      let viewNums = {
        index: 0,
        limit: 8,
        productTypeId: this.productTypeId,
        sequenceType: val || this.sequenceType
      }
      this.$store
        .dispatch('GoodList', viewNums)
        .then(res => {
          this.goodList = res.data
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
    this.goodListInfo()
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
  }
}
</script>
<style lang="less" scoped>
.header-car {
  position: relative;
  .shop-car {
      position: absolute;
      right: 0.16rem;
      top: 0;
      margin-top: 0.08rem;
      width: 0.8rem;
      height: 0.8rem;
      background: url("../assets/shop-car.png");
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
.page-loadmore .mint-spinner {
  display: inline-block;
  vertical-align: middle;
}

.page-loadmore-wrapper {
  // display: flex;
  overflow: scroll;
  .page-loadmore-list {
    background-color: #fff;
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
      
      .good-description {
        flex: 2;
        font-size: 12px;
        padding: 0.18rem 0.38rem 0.16rem 0.2rem;
        box-sizing: border-box;
        height: 2.4rem;
        .desc {
          font-size: 0.32rem;
          color: #323232;
          line-height: 0.4rem;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          
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
