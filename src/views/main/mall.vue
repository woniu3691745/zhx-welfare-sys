/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-14 19:33:17
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
    
    <div class="body-container padding-top" :style="{ height: height + 'px' }">
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
      <div class="index-gifts ow-height">
        <div class="index-gifts-title">
          <span>--精品推荐--</span>
          <div class="index-gifts-title-link">
            <router-link id="goods" :to="{ path: '/goods'}"><span>全部></span></router-link>
          </div>
        </div>
        <div class="index-gifts-body-ow">
          <div class="index-gifts-product-list">
            <ul>
              <li v-for="item in competitiveProducts" v-bind="item" :key="item.id">
                <router-link :to="{ path: '/detail', query: {id: item.id}}"><img v-bind:src="item.image"></router-link>
                <div class="des">{{item.name}}<br>￥{{item.salePrice}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="index-space"></div>
    </div>
  </div>
</template>

<script>
import eventBus from '../../assets/eventBus'
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
      competitiveProducts: []
    }
  },
  created () {
    this.get()
    this.quotas = this.$store.getters.quota
    // console.log('document.body.offsetHeight = ' + document.body.offsetHeight)
    this.height = document.body.offsetHeight - 135
    this.init()
  },
  mounted () {
    // 页面完成获得焦点
    this.focus()
  },
  methods: {
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
      .index-gifts-body-ow {
        height: auto;
        .index-gifts-product-list {
          width: 100%;
          height: inherit - 20px;
          font-size: 12px;
          ul {
            text-align: center;
            width: 100%;
            overflow-x: scroll; // 滑动
            li {
              padding: 0 2px;
              display: inline-block;
              text-align: center;
              vertical-align: text-top;
              width: 170px;
              img {
                height: 150px;
                border-radius: 8px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                  0 6px 20px 0 rgba(0, 0, 0, 0.19);
              }
              .des {
                white-space: normal;
              }
            }
          }
        }
      }
    }
  }
}
</style>