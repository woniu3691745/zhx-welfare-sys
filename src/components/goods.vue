/*
 * @Author: lidongliang 
 * @Date: 2017-10-19 19:49:42 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-07 17:47:18
 * 商品列表父组件
 */
<template>
  <div class="goods">
    <div class="goods-header">
      <mt-header title="精品推荐" fixed>
        <router-link :to="{path: '/home', query: {selected: 'index'}}" slot="left" >
          <mt-button icon="back">返回</mt-button>
        </router-link>
          <img slot="right" class="cart" src="../assets/cart.png" @click="cart()" />
          <mt-badge size="small" slot="right" type="error" class="cartNum">10</mt-badge>
      </mt-header>
    </div>
    <div class="goods-body">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">综合</mt-tab-item>
        <mt-tab-item id="2">销量</mt-tab-item>
        <mt-tab-item id="3">价格</mt-tab-item>
        <mt-tab-item id="4">筛选</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <zhx-good-list ref="goodList"></zhx-good-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <zhx-good-list ref="goodList"></zhx-good-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <zhx-good-list ref="goodList"></zhx-good-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <zhx-good-list ref="goodList"></zhx-good-list>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import goodList from '../components/goodsList'
export default {
  name: 'goods-page',
  data () {
    return {
      selected: '1'
    }
  },
  components: {
    'zhx-good-list': goodList
  },
  methods: {
    cart () {
      this.$router.push({ path: '/home', query: { selected: 'cart' } })
    },
    childrenFun () { console.log('123') }
  },
  created () {
    this.selected = '1'
  },
  watch: {
    selected: function (val, oldVal) {
      this.$refs.goodList.goodListInfo(val) // 调用子组件方法
      this.$refs.goodList.get() // 调用子组件方法
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../static/css/util.css";
.goods {
  .cart {
    height: 18px;
    width: 18px;
    background-color: white;
    margin-top: 10px;
  }
  .cartNum {
    position: relative;
    vertical-align: top;
  }
  .goods-body {
    margin-top: 40px;
  }
  .mint-badge.is-size-small {
    padding: 2px 4px;
  }
}
</style>