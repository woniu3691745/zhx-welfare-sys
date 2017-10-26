/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-26 17:02:34
 * home
 */
<template>
  <div class="home">
    <div class="home-sel-page">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="index">
          <zhx-index></zhx-index>
        </mt-tab-container-item>
        <mt-tab-container-item id="order">
          <zhx-order></zhx-order>
        </mt-tab-container-item>
        <mt-tab-container-item id="cart">
          <zhx-cart></zhx-cart>
        </mt-tab-container-item>
        <mt-tab-container-item id="mine">
          <zhx-mine></zhx-mine>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="home-page">
      <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="index">
          <img slot="icon" src="../assets/icon/home.png">
          首页
        </mt-tab-item>
        <mt-tab-item id="order">
          <img slot="icon" src="../assets/icon/home.png">
          订单
        </mt-tab-item>
        <mt-tab-item id="cart">
          <img slot="icon" src="../assets/icon/home.png">
          购物车
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img slot="icon" src="../assets/icon/my.png">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>

import index from '../components/index'
import order from '../components/order'
import cart from '../components/cart'
import mine from '../components/mine'

export default {
  name: 'home-page',
  data () {
    return {
      selected: 'index'
    }
  },
  methods: {
  },
  components: {
    'zhx-index': index,
    'zhx-order': order,
    'zhx-cart': cart,
    'zhx-mine': mine
  },
  mounted () {
    this.selected = this.$route.query.selected
  }
}
</script>

<style lang="less" scoped>

.home-sel-page {
  // overflow: hidden;
}
.home-page {
  // display:block
}
</style>