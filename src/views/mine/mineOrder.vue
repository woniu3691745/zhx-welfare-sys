/*
 * @Author: lidongliang 
 * @Date: 2017-10-19 19:49:42 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-16 20:23:53
 * 我的订单
 */
<template>
  <div class="myOrder">
    <div class="common-header">
      <mt-header title="我的订单" fixed>
        <router-link :to="{path: '/home', query: {selected: 'balance'}}" slot="left" >
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="myOrder-body">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">全部</mt-tab-item>
        <mt-tab-item id="2">代付款</mt-tab-item>
        <mt-tab-item id="3">待收货</mt-tab-item>
        <mt-tab-item id="4">已完成</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <zhx-order-list ref="orderList"></zhx-order-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <zhx-order-list ref="orderList"></zhx-order-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <zhx-order-list ref="orderList"></zhx-order-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <zhx-order-list ref="orderList"></zhx-order-list>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import orderList from '../../components/orderList'
export default {
  name: 'myOrder-page',
  data () {
    return {
      selected: '1'
    }
  },
  components: {
    'zhx-order-list': orderList
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
      this.$refs.orderList.orderListInfo(val)
      this.$refs.orderList.get()
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/util.css";
.myOrder {
  .cart {
    height: 18px;
    width: 18px;
    background-color: white;
    margin-top: 10px;
  }
  .myOrder-body {
    margin-top: 40px;
  }
}
</style>