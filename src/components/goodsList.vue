/*
 * @Author: lidongliang 
 * @Date: 2017-10-19 19:50:05 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-11 15:26:22
 * 商品列表
 */
<template>
  <div class="goodsLists">
    <div class="header-fixeds">
      <div class="common-header header-car clear">
        <mt-header title="商品列表">
          <router-link :to="{ path: '/mall', query: {selected: 'mall', typeId: this.typeId, flag: 1}}" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <span class="right shop-car">
            <span @click="cart">{{count}}</span>
          </span>
      </div>
    </div>
    <!-- <div style="width: 100%; height: 0.88rem"></div>  -->
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="'height:' + wrapperHeight + 'px'">
        <mt-loadmore :top-method="loadTop" 
                    @top-status-change="handleTopChange"
                    :bottom-method="loadBottom" 
                    @bottom-status-change="handleBottomChange" 
                    :bottom-all-loaded="allLoaded" 
                    :auto-fill="autoFill"
                    ref="loadmore">
          <ul class="page-loadmore-list">
            <li v-for="item in goodList" v-bind="goodList" :key="item.productId" class="page-loadmore-listitem">
              <router-link :to="{ path: '/detail', query: {sku: item.productSku, typeId: item.typeId}}"><img v-bind:src="item.imgUrl"></router-link>
              <!-- <img v-bind:src="item.imgUrl" @click="detail(item.productSku)"> -->
              <div class="good-description border-1px">
                <div class="desc">{{item.productName}}</div>
                <span class="span-block clear">
                  <span class="sale-price left">￥{{ item.salePrice }}</span>
                  <span class="car-shopping right">
                    <img class="cart" src="../assets/red-car.png" @click="addCart(item.productSku)"/>
                  </span>
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
            <span class="loadmore-bottoms" v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
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
import { MessageBox } from 'mint-ui'
import { startLoading, endLoading } from '../utils/utils'

export default {
  name: 'goods-list-page',
  data () {
    return {
      goodList: [],                               // 商品列表
      limit: 20,                                  // 每页数量
      allLoaded: false,
      autoFill: false,
      bottomStatus: '',
      topStatus: '',
      // count: this.$store.getters.cartCount,       // 购物车数量
      count: '',
      typeId: this.$route.query.typeId,           // 种类
      togetherId: this.$route.query.togetherId,    // 凑单
      wrapperHeight: ''
    }
  },
  methods: {
    // 跳转购物车
    cart () {
      this.$router.push({
        path: '/cart',
        query: {
          typeId: this.typeId
        }
      })
    },
    // 加入购物车
    addCart (productSku) {
      startLoading()
      let cartForm = {
        cartType: this.typeId,
        mallSku: productSku,
        skuCount: '1'
      }
      this.$store
        .dispatch('AddCart', cartForm)
        .then(res => {
          MessageBox({
            message: res.message,
            closeOnClickModal: true,
            showConfirmButton: true
          })
          this.cartCount(this.typeId)
          endLoading()
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 购物车数量
    cartCount (typeId) {
      this.$store
        .dispatch('Count', typeId)
        .then(res => {
          this.count = res.total
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 下拉更多
    loadBottom () {
      setTimeout(() => {
        let viewNums = {
          index: 0,
          limit: this.limit,
          sequenceType: 0,
          productTypeId: this.togetherId || this.typeId
        }
        this.$store
        .dispatch('BonusPackagesInfo', viewNums)
        .then(res => {
          this.goodList = res.data
          this.limit += 10
        })
        .catch(res => {
          console.log(res)
        })
        this.$refs.loadmore.onBottomLoaded()
      }, 1500)
    },
    // 上拉刷新
    loadTop () {
      setTimeout(() => {
        this.goodListInfo()
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
    goodListInfo () {
      startLoading()
      let param
      param = this.togetherId || this.typeId
      let viewNums = {
        index: 0,
        limit: 10,
        sequenceType: 0,
        productTypeId: param
      }
      this.$store
        .dispatch('BonusPackagesInfo', viewNums)
        .then(res => {
          this.goodList = res.data
          endLoading()
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 商品详情
    detail (productSku) {
      this.$router.push({
        path: '/detail',
        query: { typeId: this.typeId, sku: productSku }
      })
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    handleTopChange (status) {
      this.moveTranslate = 1
      this.topStatus = status
    }
  },
  created () {
    this.goodListInfo()
  },
  mounted () {
    this.cartCount(this.typeId)
    this.wrapperHeight = document.documentElement.clientHeight - document.documentElement.clientWidth / 7.5 * 0.88
  }
}
</script>

<style lang="less" scoped>
.goodsLists {
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
            min-height: 0.8rem;
          }
          .span-block {
            display: block;
            .sale-price {
              font-size: 0.4rem;
              color: #fe414b;
              height: 0.6rem;
              line-height: 0.6rem;
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
.mint-loadmore-bottom .loadmore-bottoms {
  font-size: 0.3rem;
}
</style>
