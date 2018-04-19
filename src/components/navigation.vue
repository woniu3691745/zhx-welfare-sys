/*
 * @Author: lidongliang
 * @Date: 2017-11-14 19:03:36
 * @Last Modified by: zhangyapeng
 * @Last Modified time: 2018-04-19 15:39:38
 * 导航
 */
<template>
  <div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="balance">
        <img slot="icon" src="../assets/icon/limit.png"> 额度
      </mt-tab-item>
      <mt-tab-item id="mall">
        <img class="big-img" slot="icon" src="../assets/icon/home.png" @click="showMallTypeButton($event)"> 商城
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img slot="icon" src="../assets/icon/my.png"> 我的
      </mt-tab-item>
    </mt-tabbar>
    <div class="pozition-fixed" @click="hiddleMallTypeButton($event)" :style="{ display: displayFlag?'block':'none'}">
      <ul class="pozition-fixeds">
        <li @click="goFood(item.typeId, item.balance)" v-for="item in quotas" :key="item.typeId">
          {{item.typeName}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import eventBus from '../utils/eventBus'
export default {
  name: 'navigation-page',
  data () {
    return {
      selected: 'balance',
      display: 'none',
      quotas: [],
      displayFlag: false
    }
  },
  mounted () {
    // 通知导航按钮事件
    eventBus.$on('focus', param => {
      this.selected = param
      // this.$set(this.selected, param)
    })
  },
  methods: {
    // 点击商城按钮焦点内
    showMallTypeButton ($event) {
      this.displayFlag = !this.displayFlag
    },
    // 点击商城按钮焦点外
    hiddleMallTypeButton ($event) {
      this.displayFlag = false
    },
    // typeId 额度种类
    goLife (typeId, balance) {
      this.commonGo(typeId, balance)
    },
    goFood (typeId, balance) {
      this.commonGo(typeId, balance)
    },
    goClothing (typeId, balance) {
      this.commonGo(typeId, balance)
    },
    /*
    * typeId 额度种类
    * selected 导航
    * type 进入商城方式
    */
    commonGo (typeId, balance) {
      // console.log('typeId = ' + typeId, 'balance = ' + balance)
      this.display = 'none'
      this.$router.push({
        path: '/mall',
        query: {
          typeId: typeId,
          selected: 'mall',
          type: 'unDirect'
        }
      })
      // 通知商城信息事件
      eventBus.$emit('refurbishMallData', { typeId, balance })
    }
  },
  beforeDestory () {},
  created () {
    this.quotas = this.$store.getters.quota
  },
  watch: {
    selected: function (val, oldVal) {
      // console.log('this.$route.query.type = ' + this.$route.query.type)
      // 直接点击商城按钮
      if (this.$route.query.type === undefined) {
        if (val === 'mall') {
          if (this.$route.query.flag) {
            this.display = 'none'
          } else {
            this.display = 'block'
          }
        } else {
          this.display = 'none'
          this.$router.push({
            path: '/' + val,
            query: { selected: val, type: 'unDirect' }
          })
        }
      }
      // case 1 通过直接点击商城按钮进入商城后，在商城里点击商城按钮
      if (this.$route.query.type === 'unDirect') {
        if (val === 'mall') {
          this.display = 'block'
        } else {
          this.display = 'none'
          this.$router.push({
            path: '/' + val,
            query: { selected: val, type: 'unDirect' }
          })
        }
      }
      // case 2 通过去使用进入商城后，在商城里点击商城按钮
      if (this.$route.query.type === 'direct') {
        // console.log('this.$route.query.flag = ' + this.$route.query.flag)
        if (val === 'mall') {
          if (this.$route.query.flag) {
            this.display = 'none'
          } else {
            this.display = 'block'
          }
        } else {
          this.display = 'none'
          this.$router.push({
            path: '/' + val,
            query: { selected: val, type: 'direct' }
          })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mint-tabbar {
  z-index: 200;
  height: 0.98rem;
  .mint-tab-item {
    padding: 0.14rem 0 0.08rem 0;
    .mint-tab-item-icon {
      width: 0.43rem;
      height: 0.43rem;
      margin: auto;
      img {
        width: 0.39rem;
        height: 0.39rem;
        margin: 0 auto 0 auto;
      }
      // .big-img {
      //   width: 0.43rem;
      //   height: 0.43rem;
      //   margin: 0 auto 0 auto;
      // }
    }
  }
}

.pozition-fixed {
  // display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 100;
  overflow: hidden;
  .pozition-fixeds {
    position: fixed;
    width: 33.3%;
    left: 33.3%;
    bottom: 0.98rem;
    text-align: center;
    font-size: 0;
    background: #fff;
    li {
      padding: 20px;
      font-size: 12px;
      position: relative;
    }
    li:after {
       content: "  ";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #999;
      /* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
      -webkit-transform: scaleY(.5);
      transform:scaleY(.5);
    }
  }
}
</style>
