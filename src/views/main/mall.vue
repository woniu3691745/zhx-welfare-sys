/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-27 15:52:18
 * 首页组件
 */
<template>
  <div class="index-container">
    <div class="body-top clear">
      <div class="search left">
        {{typeName}} |
      </div>
      <div class="index-money left">
          <span>余额：</span>
          <span>￥{{balance}}</span>
      </div>
      <span class="right shop-car">
        <router-link :to="{ path: '/cart', query: {typeId: this.typeIdAll}}"> 
          <span>{{this.count}}</span>
        </router-link>
      </span>
    </div>
    <ul class="clear body-containers" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
      <li class="solid-top">
        <div class="index-swipe">
          <mt-swipe :auto="2000" v-if="this.typeIdAll === '1000002'">
            <mt-swipe-item><img src="../../assets/swipe/food/1.png" @click="swipeDetail('10013995878')"></img>
            </mt-swipe-item>
            <mt-swipe-item><img src="../../assets/swipe/food/2.png" @click="swipeDetail('10013998990')"></img>
            </mt-swipe-item>
            <mt-swipe-item><img src="../../assets/swipe/food/3.png" @click="swipeDetail('1001964416')"></img>
            </mt-swipe-item>
          </mt-swipe>
          <mt-swipe :auto="2000" v-else-if="this.typeIdAll === '1000001'">
            <mt-swipe-item><img src="../../assets/swipe/commodity/1.png" @click="swipeDetail('10014339757')"></img>
            </mt-swipe-item>
            <mt-swipe-item><img src="../../assets/swipe/commodity/2.png" @click="swipeDetail('1001114942')"></img>
            </mt-swipe-item>
            <mt-swipe-item><img src="../../assets/swipe/commodity/3.png" @click="swipeDetail('10011068549')"></img>
            </mt-swipe-item>
          </mt-swipe>
           <mt-swipe :auto="2000" v-else-if="this.typeIdAll === '1000003'">
            <mt-swipe-item><img src="../../assets/tu1.png" @click="swipeDetail('31')"></img>
            </mt-swipe-item>
            <mt-swipe-item><img src="../../assets/tu2.png" @click="swipeDetail('32')"></img>
            </mt-swipe-item>
            <mt-swipe-item><img src="../../assets/tu3.png" @click="swipeDetail('33')"></img>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="index-gift">
          <div class="index-gifts-title clear">
            <span class="title-content">超级大礼包</span> 
            <div class="index-gifts-title-link right">
              <router-link id="goodsList" :to="{ path: '/goodsList', query: {typeId: this.typeIdAll}}">
                <span>查看全部></span>
              </router-link>
            </div>
          </div>
          <div class="index-gifts-body">
            <div class="index-gifts-product-list">
              <ul>
                <li v-for="item in bonusPackages" :key="item.productId">
                  <img v-bind:src="item.imgUrl" @click="detail(item.productSku)">
                  <div class="des">
                    <p>{{item.productName}}</p>
                    <span>￥{{item.salePrice}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="three-title">
          <ul class="clear">
            <li v-for="i in categorys" :key="i.TYPEID" @click="searchTop(i.TYPEID)">{{i.TYPENAME}}</li>
          </ul>
        </div>
      </li>
      <li v-for="item in competitiveProducts" :key="item.productId" class="left lis">
        <img v-bind:src="item.imgUrl" @click="detail(item.productSku)">
        <div class="des">
          <p>{{item.productName}}</p>
          <span>￥{{item.salePrice}}</span>
        </div>
      </li>     
    </ul>  
    <p class="no-date" v-if="showBottom">没有数据啦！</p>
  </div>
</template>

<script>
import { startLoading, endLoading } from '../../utils/utils'
import eventBus from '../../utils/eventBus'
export default {
  name: 'mall-page',
  data () {
    return {
      typeName: '', // 种类名称
      // quota: this.$route.query.quota,               // 余额（通过路由获得）
      balance: '',
      bonusPackages: [], // 大礼包
      competitiveProducts: [], // 商品
      categorys: [], // 商品种类
      typeIdAll: this.$route.query.typeId, // 种类
      typeId: this.$route.query.typeId, // 种类
      count: '', // 购物车数量
      index: 0,
      limit: 10,
      showBottom: false,
      rusuletStatus: false // 商品返回状态
    }
  },
  created () {
    // 定义商城信息事件
    // quota 余额（通过事件参数获得）
    // typeId 额度类型
    eventBus.$on('refurbishMallData', param => {
      this.clear()
      this.init(param.typeId)
      this.typeId = param.typeId // 导航按钮
      this.typeIdAll = param.typeId // 导航按钮
      this.index = 0
      this.limit = 10
      // if (this.rusuletStatus) {
      this.competitiveProductsInfo(this.typeId)
        // this.rusuletStatus = false
      // }
    })
  },
  // 通过监听路由来给页面添加参数
  watch: {
    $route (to) {
      // let typeId = to.query.typeId || '1000001'
      // this.competitiveProductsInfo(typeId)
    }
  },
  destroyed () {
    eventBus.$off('refurbishMallData')
  },
  mounted () {
    this.rusuletStatus = true
    this.init(this.typeId)
    this.focus() // 导航栏焦点
  },
  methods: {
    // 下拉加载更多
    loadMore () {
      if (this.rusuletStatus) {
        this.competitiveProductsInfo(this.typeId)
        this.rusuletStatus = false
      }
    },
    // 初始化
    init (typeId) {
      this.index = 0
      this.bonusPackagesInfo(typeId) // 大礼包
      this.categoryInfo(typeId) // 类品过滤种类
      // this.competitiveProductsInfo(typeId)      // 品类信息
      this.quotaInfo(typeId) // 通过额度种类获得额度信息
      this.cartCount(typeId) // 购物车数量
    },
    quotaInfo (typeId) {
      let categoryInfo = {
        productTypeId: typeId
      }
      this.$store
        .dispatch('QuotaInfo', categoryInfo)
        .then(res => {
          this.balance = res.balance
          this.typeName = res.typeName
        })
        .catch(res => {
          console.log(res)
        })
    },
    bonusPackagesInfo (typeId) {
      let viewNums = {
        index: 0,
        limit: 5,
        sequenceType: 0,
        productTypeId: typeId
      }
      this.$store
        .dispatch('BonusPackagesInfo', viewNums)
        .then(res => {
          this.bonusPackages = res.data
        })
        .catch(res => {
          console.log(res)
        })
    },
    categoryInfo (typeId) {
      let viewNums = {
        itemType: typeId
      }
      this.$store
        .dispatch('CatalogueInfo', viewNums)
        .then(res => {
          this.categorys = res.data
        })
        .catch(res => {
          console.log(res)
        })
    },
    competitiveProductsInfo (typeId) {
      let viewNums = {
        index: this.index,
        limit: this.limit,
        sequenceType: 0,
        productTypeId: typeId
      }
      // startLoading()
      this.$store
        .dispatch('GoodList', viewNums)
        .then(res => {
          if (!res.data.length) {
            this.showBottom = true
            this.rusuletStatus = false
          } else {
            if (this.competitiveProducts.length === 0) {
              this.competitiveProducts = res.data
            } else {
              res.data.forEach(element => {
                this.competitiveProducts.push(element)
              })
            }
            // 分页
            this.index = this.index + 1
            this.showBottom = false
            this.rusuletStatus = true
          }
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
    // 商品详情
    detail (productSku) {
      this.$router.push({
        path: '/detail',
        query: { typeId: this.typeIdAll, sku: productSku }
      })
    },
    // 导航焦点
    focus () {
      let select = this.$route.query.selected || 'balance'
      // 进入商城方式
      // type
      //  1、direct-> 去使用
      //  2、undirect -> 导航按钮
      // let type = this.$route.query.type
      // 通知导航按钮事件
      eventBus.$emit('focus', select)
    },
    // 每次点击前清空数据
    clear () {
      this.bonusPackages = []
      this.competitiveProducts = []
      this.categorys = []
    },
    // 过滤精品
    searchTop (typeId) {
      this.competitiveProducts = []
      this.typeId = typeId
      this.index = 0
      this.limit = 10
      startLoading()
      this.competitiveProductsInfo(this.typeId)
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
.index-container {
  padding-bottom: 0.98rem;
  .body-top {
    padding: 0 0.16rem;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;
    background: #ffffff;
    z-index: 100;
    border: 1px solid #ebebeb;
    .search {
      font-size: 0.36rem;
      color: #323232;
      height: 0.88rem;
      line-height: 0.88rem;
    }
    .index-money {
      font-size: 0.32rem;
      color: #fb4e51;
      height: 0.88rem;
      line-height: 0.88rem;
      margin-left: 0.11rem;
    }
    .shop-car {
      position: relative;
      margin-top: 0.08rem;
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
  .body-containers {
    padding-top: 0.88rem;
    box-sizing: border-box;
    .solid-top {
      .index-swipe {
        height: 150px;
        padding: 0 2px;
        img {
          text-align: center;
          width: 100%;
          height: 100%;
          // border-radius: 5px;
        }
      }
      .index-gift {
        font-size: 0;
        .index-gifts-title {
          width: 100%;
          height: 0.88rem;
          text-align: center;
          position: relative;
          .title-content:before {
            content: "";
            display: block;
            width: 0.8rem;
            height: 1px;
            background: black;
            position: absolute;
            left: -0.9rem;
            top: 0.2rem;
          }
          .title-content:after {
            content: "";
            display: block;
            width: 0.8rem;
            height: 1px;
            background: black;
            position: absolute;
            right: -0.9rem;
            top: 0.2rem;
          }
          .title-content {
            font-size: 0.28rem;
            height: 0.88rem;
            line-height: 0.88rem;
            position: relative;
            color: #555555;
          }
          .index-gifts-title-link {
            height: 0.88rem;
            line-height: 0.88rem;
            font-size: 0.24rem;
            position: absolute;
            top: 0;
            right: 0.3rem;
            span {
              color: #9a9a9a;
            }
          }
        }
        .index-gifts-body {
          height: auto;
          padding-bottom: 0.25rem;
          .index-gifts-product-list {
            width: 100%;
            font-size: 12px;
            ul {
              width: 100%;
              overflow-x: scroll; // 滑动
              white-space: nowrap;
              li {
                padding-left: 0.14rem;
                width: 2.88rem;

                display: inline-block;
                text-align: center;
                vertical-align: text-top;
                img {
                  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                  //   0 6px 20px 0 rgba(0, 0, 0, 0.19);
                  width: 100%;
                  height: 1.64rem;
                  border: 1px solid #ebebeb;
                  border-radius: 6px;
                  box-sizing: border-box;
                }
                .des {
                  width: 2.64rem;
                  margin: 0 auto;
                  white-space: normal;
                  p {
                    font-size: 0.24rem;
                    color: #555555;
                    height: 0.66rem;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    line-height: 0.33rem;
                  }
                  span {
                    font-size: 0.3rem;
                    color: #fb4e51;
                    display: block;
                    text-align: center;
                    margin-top: 0.05rem;
                  }
                }
              }
              li:last-child {
                padding-right: 0.14rem;
              }
            }
          }
        }
      }
      .three-title {
        width: 100%;
        // height: 1.64rem;
        background: #ededed;
        ul {
          padding: 0.06rem 0 0.16rem 0.1rem;
          li {
            background: #ffffff;
            border-radius: 0.16rem;
            width: 1.36rem;
            height: 0.59rem;
            line-height: 0.59rem;
            text-align: center;
            font-size: 0.24rem;
            color: #ff0000;
            float: left;
            margin-left: 0.08rem;
            margin-top: 0.12rem;
          }
        }
      }
    }
    .lis {
      margin-left: 0.2rem;
      margin-top: 0.2rem;
      width: 3.45rem;
      padding-bottom: 0.1rem;
      img {
        display: block;
        width: 3.45rem;
        height: 3.45rem;
        border: 1px solid #ebebeb;
        box-sizing: border-box;
      }
      .des {
        width: 3.28rem;
        margin: 0 auto;
        white-space: normal;
        p {
          color: #555555;
          height: 0.66rem;
          font-size: 0.24rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin-top: 0.1rem;
          text-align: center;
          line-height: 0.33rem;
        }
        span {
          font-size: 0.3rem;
          color: #fb4e51;
          margin-top: 0.08rem;
          display: block;
          text-align: center;
        }
      }
    }
  }
  .no-date {
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.4rem;
  }
}
</style>