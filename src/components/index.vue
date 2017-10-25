/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-25 13:31:14
 * 首页组件
 */

<template>
  <div class="index-container">
    <div class="search">
      <mt-search v-model="searchValue"></mt-search>
    </div>
    <div class="index-money">
      <ul>
        <li>
          <span>我的额度</span>
        </li>
        <li v-for="item in quotas" v-bind="item" :key="item.itemTypeId">
          <span>{{item.itemTypeName}}<br>￥{{item.quota}}</span>
        </li>
      </ul>
    </div>
    <div class="index-swipe">
      <mt-swipe :auto="3000">
        <mt-swipe-item><img src="../assets/swipe/1.jpg"></img>
        </mt-swipe-item>
        <mt-swipe-item><img src="../assets/swipe/2.jpg"></img>
        </mt-swipe-item>
        <mt-swipe-item><img src="../assets/swipe/3.jpg"></img>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="index-subject">
      <ul>
        <li v-for="i in category" v-bind="i" :key="i.name">
          <span>{{i.name}}</span>
        </li>
      </ul>
    </div>
    <div class="index-space"></div>
    <div class="index-gifts">
      <div class="index-gifts-title">
        <span>--超级大礼包--</span> 
        <div class="index-gifts-title-link">
          <router-link id="goods" :to="{ path: '/goods'}"><span>全部></span></router-link>
        </div>
      </div>
      <div class="index-gifts-body">
        <div class="index-gifts-product-list">
          <ul>
            <li v-for="item in bonusPackages" v-bind="item" :key="item.id">
              <router-link :to="{ path: '/detail'}"><img v-bind:src="item.image"></router-link>
              <div class="des">{{item.name}}<br>￥{{item.salePrice}}</div>
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
              <router-link :to="{ path: '/detail'}"><img v-bind:src="item.image"></router-link>
              <div class="des">{{item.name}}<br>￥{{item.salePrice}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="index-space"></div>
    <div class="index-bottom"></div>
  </div>
</template>

<script>
import { InfiniteScroll, Indicator } from 'mint-ui'
import Vue from 'vue'
Vue.use(InfiniteScroll)

export default {
  name: 'index-page',
  data () {
    return {
      searchValue: '',
      quotas: '',
      category: [{ name: '洗涤用品' }, { name: '清洁用品' }, { name: '日用品' }],
      bonusPackages: [],
      competitiveProducts: []
    }
  },
  created () {
    this.get()
    this.quotas = this.$store.getters.quota
    this.init()
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
        limit: 5,
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
        limit: 7,
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
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../static/css/util.css";

.index-container {
  overflow-x: visible;
  .search {
    position: fixed;
    z-index: 1000;
    width: 100%;
  }
}

.mint-search {
  height: auto;
}

.index-money {
  width: 100%;
  font-size: 13px;
  ul {
    background-color: #fff;
    padding: 5px 2px;
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    li {
      padding: 0 5px;
      width: auto;
      height: inherit;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
    }
  }
}

.index-swipe {
  height: 200px;
  img {
    height: inherit;
    width: 100%;
    border-radius: 5px;
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
    // text-align: -webkit-center;
    padding-top: 5px;
    padding-bottom: 10px;
    padding-right: 2px;
    padding-left: 8px;
    .span {
      display: block;
    }
  }
  .index-gifts-title-link {
    float: right;
    font-size: 6px;
    padding-right: 8px;
    padding-bottom: 4px;
  }
  .index-gifts-body {
    height: auto;
    .index-gifts-product-list {
      width: 100%;
      font-size: 12px;
      ul {
        width: 100%;
        overflow-x: scroll; // 滑动
        white-space: nowrap;
        li {
          padding: 0 2px;
          width: 120px;
          display: inline-block;
          text-align: center;
          vertical-align: text-top;
          img {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            height: 105px;
            border-radius: 6px;
          }
          .des {
            white-space: normal;
          }
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
        // padding: 0 15px;
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
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
          .des {
            white-space: normal;
          }
        }
      }
    }
  }
}
.ow-height {
  height: auto;
}
.index-bottom {
  height: 50px;
}

a:link,
a:visited {
  color: #444;
}

</style>