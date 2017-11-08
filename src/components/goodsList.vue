/*
 * @Author: lidongliang 
 * @Date: 2017-10-19 19:50:05 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-07 21:55:34
 * 商品列表
 *
 * @translate-change="translateChange"
 */
<template>
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
.page-loadmore .mint-spinner {
  display: inline-block;
  vertical-align: middle;
}

.page-loadmore-wrapper {
  // display: flex;
  overflow: scroll;
  .page-loadmore-list {
    background-color: #fff;
  }
}

.page-loadmore-listitem {
  display: flex;
  height: 115px;
  a {
    padding: 5px 5px;
  }
  img {
    width: 100px;
  }
  .good-description {
    flex: 2;
    font-size: 12px;
    padding: 10px 6px;
    .desc {
      height: 40px;
      margin-bottom: 35px;
    }
    .cart {
      float: right;
      height: 20px;
      width: 20px;
      padding-right: 15px;
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
