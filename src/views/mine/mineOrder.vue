/*
 * @Author: lidongliang 
 * @Date: 2017-10-19 19:49:42 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-06 15:18:32
 * 我的订单
 */
<template>
  <div class="myOrder">
    <div class="common-header">
      <mt-header title="我的订单" fixed class="border-1px">
        <router-link :to="{path: '/home', query: {selected: 'balance'}}" slot="left" >
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="myOrder-body">
      <mt-navbar v-model="selected" class="border-1px">
        <div class="router-padding">
          <mt-tab-item id="1">全部</mt-tab-item>
        </div>
        <div class="router-padding">
          <mt-tab-item id="2">代付款</mt-tab-item>
        </div>
        <div class="router-padding">
          <mt-tab-item id="3">待收货</mt-tab-item>
        </div>
        <div class="router-padding">
          <mt-tab-item id="4">已完成</mt-tab-item>
        </div>
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
    }
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
    padding-top: 1.8rem;
  }
  .mint-navbar {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0.88rem;
    z-index: 2;
    .router-padding {
      display: block;
      padding: 0 0.2rem;
      font-size: 0;
      -ms-flex: 1;
      flex: 1;
      .mint-tab-item {
        padding: 0.3rem 0;
        margin-bottom: 0;
      }
    }
  }
}







.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 0.06rem solid #FB4049;
  box-sizing: border-box;
  color: #323232;

}
</style>