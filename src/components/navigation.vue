/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 19:03:36 
 * @Last Modified by:   lidongliang 
 * @Last Modified time: 2017-11-14 19:03:36 
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
          <img class="big-img" slot="icon" src="../assets/icon/home.png">
          商城
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img slot="icon" src="../assets/icon/my.png">
          我的{{msg}}
        </mt-tab-item>
    </mt-tabbar>
    <div class="pozition-fixed">
      <div class="pozition-fixeds">
        <img src="../assets/life.png" alt="">
        <img src="../assets/food.png" alt="">
        <img src="../assets/clothing.png" alt="">
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
      isActive: false,
      msg: ''
    }
  },
  mounted () {
    this.isActive = false
    // if (this.$route.query.selected) {
    //   this.$router.push({ path: '/' + this.selected })
    // }
    eventBus.$on('focus', param => {
      this.selected = param
      // this.$set(this.selected, param)
    })
  },
  methods: {},
  created () {},
  watch: {
    selected: function (val, oldVal) {
      // 商城品类列表
      this.$emit('listenSelected', this.selected)
      if (this.selected !== 'mall') {
        // this.selected = 'mine'
        this.$router.push({ path: '/' + this.selected })
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
        margin: 0.03rem auto 0 auto;
      }
      .big-img {
        width: 0.43rem;
        height: 0.43rem;
        margin: 0 auto 0 auto;
      }
    }
    .mint-tab-item-label {
      font-size: 0.2rem;
    }
  }
}

.pozition-fixed {
  display: none;
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