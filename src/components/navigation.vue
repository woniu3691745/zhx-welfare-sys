/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 19:03:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-21 15:03:49
 * 导航
 */
<template>
  <div>
     <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="balance">
          <img slot="icon" src="../assets/icon/limit.png">
          额度
        </mt-tab-item>
        <mt-tab-item id="mall">
          <img class="big-img" slot="icon" src="../assets/icon/home.png" @click="showMallTypeButton($event)" >
          商城
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img slot="icon" src="../assets/icon/my.png">
          我的
        </mt-tab-item>
    </mt-tabbar>
    <div class="pozition-fixed" @click="hiddleMallTypeButton($event)" :style="{ display: display}">
      <div class="pozition-fixeds">
        <img v-bind:src="'api'+ item.icon" @click="goFood(item.typeId, item.balance)" v-for="item in quotas" :key="item.typeId">
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '../assets/eventBus'
export default {
  name: 'navigation-page',
  data () {
    return {
      selected: 'balance',
      display: 'none',
      quotas: []
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
      this.display = 'block'
    },
    // 点击商城按钮焦点外
    hiddleMallTypeButton ($event) {
      this.display = 'none'
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
      eventBus.$emit('refurbishMallData', {typeId, balance})
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
    width: 100%;
    left: 0;
    bottom: 1.5rem;
    text-align: center;
    font-size: 0;
    img {
      width: 1.28rem;
      margin: 0 0.15rem;
      display: inline-block;
    }
  }
}
</style>