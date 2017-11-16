/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-16 14:39:48
 * 首页组件
 */
<template>
  <div class="index-container">
    <div class="body-top clear">
      <div class="search left">
        日用品 |
      </div>
      <div class="index-money left">
          <span>余额：</span>
          <span>￥{{quota}}</span>
      </div>
      <span class="right shop-car">
        <span>99</span>
      </span>
    </div>
    <ul class="clear body-containers" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <li class="solid-top">
        <div class="index-swipe">
          <mt-swipe :auto="2000">
            <mt-swipe-item><img src="../../assets/swipe/1.jpg"></img>
            </mt-swipe-item>
            <mt-swipe-item><img src="../../assets/swipe/2.jpg"></img>
            </mt-swipe-item>
            <mt-swipe-item><img src="../../assets/swipe/3.jpg"></img>
            </mt-swipe-item>
            <mt-swipe-item><img src="../../assets/swipe/4.jpg"></img>
            </mt-swipe-item>
            <mt-swipe-item><img src="../../assets/swipe/5.jpg"></img>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="index-gift">
          <div class="index-gifts-title clear">
            <span class="title-content">超级大礼包</span> 
            <div class="index-gifts-title-link right    ">
              <router-link id="goodsList" :to="{ path: '/goodsList'}"><span>查看全部></span></router-link>
            </div>
          </div>
          <div class="index-gifts-body">
            <div class="index-gifts-product-list">
              <ul>
                <li v-for="item in bonusPackages" v-bind="item" :key="item.id">
                  <router-link :to="{ path: '/detail', query: {id: item.id}}"><img v-bind:src="item.image"></router-link>
                  <div class="des">
                    <p>{{item.name}}</p>
                    <span>￥{{item.salePrice}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="three-title">
          <ul class="clear">
            <li v-for="item in 10" :key="item">三级目录</li>
          </ul>
        </div>
      </li>
      <li v-for="item in competitiveProducts" v-bind="item" :key="item.id" class="left lis">
        <router-link :to="{ path: '/detail', query: {id: item.id}}"><img v-bind:src="item.image"></router-link>
        <div class="des">
          <p>{{item.name}}</p>
          <span>￥{{item.salePrice}}</span>
        </div>
      </li>
    </ul>  
  </div>
</template>

<script>
import eventBus from '../../assets/eventBus'
import { InfiniteScroll, Indicator } from 'mint-ui'
import Vue from 'vue'
Vue.use(InfiniteScroll)
export default {
  name: 'mall-page',
  data () {
    return {
      quota: this.$route.query.quota, // 余额
      bonusPackages: [],      // 大礼包
      competitiveProducts: [],    // 商品
      categorys: [],     // 商品种类
      index: 0,
      limit: 6
    }
  },
  created () {
    this.get()
    this.init()
  },
  mounted () {
    this.focus()
  },
  methods: {
    // 加载圈
    get () {
      setTimeout(function () {
        Indicator.open({
          spinnerType: 'fading-circle'
        })
      }, 300)
      setTimeout(function () {
        Indicator.close()
      }, 3000)
    },
    // 下拉更多
    loadMore () {
      // this.loading = true
      // console.log('loadMore start ')
      setTimeout(() => {
        this.competitiveProductsInfo()
      }, 1000)
      // console.log('loadMore end ')
      // this.loading = false
    },
    init () {
      this.bonusPackagesInfo()
      // this.competitiveProductsInfo()
    },
    // 大礼包接口
    bonusPackagesInfo () {
      let viewNums = {
        index: 0,
        limit: 5,
        sequenceType: 0
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
    // 类品过滤种类
    categoryInfo () {},
    // 品类信息
    competitiveProductsInfo () {
      let viewNums = {
        index: this.index,
        limit: this.limit,
        sequenceType: 0
      }
      console.log(1)
      this.$store
        .dispatch('CompetitiveProductsInfo', viewNums)
        .then(res => {
          if (this.competitiveProducts.length === 0) {
            this.competitiveProducts = res.data
          } else {
            res.data.forEach(element => {
              this.competitiveProducts.push(element)
            })
            this.index = this.index + 5
            this.limit = this.limit + 5
          }
        })
        .catch(res => {
          console.log(res)
        })
    },
    focus () {
      let select = this.$route.query.selected || 'balance'
      // 进入商城方式
      // type
      //  1、direct-> 去使用
      //  2、undirect -> 导航按钮
      let type = this.$route.query.type
      // 通知导航按钮
      eventBus.$emit('focus', select, type)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/util.css";
.index-container {
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
      color: #FB4E51;
      height: 0.88rem;
      line-height: 0.88rem;
      margin-left: 0.11rem;
    }
    .shop-car {
          position: relative;
          margin-top: 0.08rem;
          width: 0.8rem;
          height: 0.8rem;
          background: url('../../assets/shop-car.png');
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
            content: '';
            display: block;
            width: 0.8rem;
            height: 1px;
            background: black;
            position: absolute;
            left: -0.9rem;
            top: 0.2rem;
          }
          .title-content:after {
            content: '';
            display: block;
            width: 0.8rem;
            height: 1px;
            background: black;
            position: absolute;
            right: -0.9rem;
            top: 0.2rem
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
              color: #9A9A9A;
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
                  box-sizing: border-box
                }
                .des {
                  width: 2.64rem;
                  margin: 0 auto;
                  white-space: normal;
                  p {
                    font-size: ;
                    color: #555555;
                    height: 0.66rem;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                  }
                  span {
                    font-size: 0.3rem;
                    color: #FB4E51;
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
        height: 1.64rem;
        background: #EDEDED;
        ul {
          padding: 0.06rem 0 0 0.1rem;
          li {
            background: #FFFFFF;
            border-radius: 0.16rem;
            width: 1.36rem;
            height: 0.59rem;
            line-height: 0.59rem;
            text-align: center;
            font-size: 0.24rem;
            color: #FF0000;
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
        }
        span {
          font-size: 0.3rem;
          color: #FB4E51;
          margin-top: 0.08rem;
          display: block;
          text-align: center;
        }
      }
    }
  }
}
</style>