/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-14 16:55:24
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
          <span>￥458.00</span>
      </div>
      
      <span class="right shop-car">
        <span>99</span>
      </span>
    </div>
    
    <!-- <div class="body-container padding-top" :style="{ height: height + 'px' }"> -->
    <div class="body-container padding-top">
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
      <!-- <div class="index-subject">
        <ul>
          <li v-for="i in category" v-bind="i" :key="i.name">
            <span>{{i.name}}</span>
          </li>
        </ul>
      </div> -->
      <!-- <div class="index-space"></div> -->
      <div class="index-gifts">
        <div class="index-gifts-title clear">
          <span class="title-content">超级大礼包</span> 
          <div class="index-gifts-title-link right    ">
            <router-link id="goods" :to="{ path: '/goods'}"><span>查看全部></span></router-link>
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
      <div class="index-space"></div>
      <div class="index-gifts">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <mt-loadmore :top-method="loadTop" 
                      @top-status-change="handleTopChange"
                      :bottom-method="loadBottom" 
                      @bottom-status-change="handleBottomChange" 
                      :bottom-all-loaded="allLoaded" 
                      :auto-fill="autoFill"
                      ref="loadmore">
            <ul class="page-loadmore-list">
              <li v-for="item in goodList" v-bind="goodList" :key="item.id" class="page-loadmore-listitem">
                <router-link :to="{ path: '/detail', query: {id: item.id}}"><img v-bind:src="item.image"></router-link>
                <div class="good-description">
                  <div class="desc">{{item.name}}</div>
                  <span>
                    ￥{{ item.salePrice }}&nbsp;&nbsp;{{item.saleCount}}人已买
                    <span><img class="cart" src="../assets/cart.png" @click="cart()" /></span>
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
      <div class="index-space"></div>
    </div>
  </div>
</template>

<script>
import eventBus from '../assets/eventBus'
import { InfiniteScroll, Indicator } from 'mint-ui'
import Vue from 'vue'
Vue.use(InfiniteScroll)

export default {
  name: 'index-page',
  data () {
    return {
      searchValue: '',
      quotas: '',
      height: 0,
      category: [{ name: '洗涤用品' }, { name: '清洁用品' }, { name: '日用品' }],
      bonusPackages: [],
      competitiveProducts: [],

      goodList: [],
      allLoaded: false,
      autoFill: false,
      bottomStatus: '',
      topStatus: '',
      wrapperHeight: 0,
      sequenceType: 1
    }
  },
  created () {
    this.get()
    this.quotas = this.$store.getters.quota
    this.init()
    this.goodListInfo()
  },
  mounted () {
    // 页面完成获得焦点
    this.focus()
  },
  methods: {
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
        limit: 4,
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
    init () {
      this.bonusPackagesInfo()
      this.competitiveProductsInfo()
    },
    bonusPackagesInfo () {
      let viewNums = {
        index: 0,
        limit: 6,
        sequenceType: 0
      }
      this.$store
        .dispatch('BonusPackagesInfo', viewNums)
        .then(res => {
          // console.log('bonusPackagesInfo -> ' + JSON.stringify(res.data))
          this.bonusPackages = res.data
        })
        .catch(res => {
          console.log(res)
        })
    },
    competitiveProductsInfo () {
      let viewNums = {
        index: 0,
        limit: 9,
        sequenceType: 0
      }
      this.$store
        .dispatch('CompetitiveProductsInfo', viewNums)
        .then(res => {
          // console.log('competitiveProductsInfo -> ' + JSON.stringify(res.data))
          this.competitiveProducts = res.data
        })
        .catch(res => {
          console.log(res)
        })
    },
    focus () {
      let select = this.$route.query.selected || 'balance'
      // 通知bottom按钮
      eventBus.$emit('focus', select)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../static/css/util.css";

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
          background: url('../assets/shop-car.png');
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
  .body-container {
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
    .index-subject {
      font-size: 13px;
      text-align: center;
      ul {
        padding: 10px 0;
        margin-top: 5px;
        li {
          padding: 0 30px;
          height: inherit;
          display: inline-block;
          span {
            display: block;
          }
        }
      }
    }
    .index-gifts {
      font-size: 14px;
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
                  color: #FB4E51
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
  }
}




.page-loadmore-listitem:first-child {
  border-top: 1px solid #eee;
}

.mint-loadmore-top {
  margin-top: -48px;
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