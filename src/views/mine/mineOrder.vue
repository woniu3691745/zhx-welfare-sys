/*
 * @Author: lidongliang 
 * @Date: 2017-10-19 19:49:42 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-06 17:47:34
 * 我的订单
 */
<template>
  <div class="myOrder">
    <div class="common-header">
      <mt-header title="我的订单" class="border-1px position-fixed">
        <router-link :to="{path: '/home', query: {selected: 'balance'}}" slot="left" >
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="myOrder-body">
      <mt-navbar v-model="selected" class="border-1px">
        <div class="router-padding">
          <mt-tab-item id="">全部</mt-tab-item>
        </div>
        <div class="router-padding">
          <mt-tab-item id="01">代付款</mt-tab-item>
        </div>
        <div class="router-padding">
          <mt-tab-item id="04">待收货</mt-tab-item>
        </div>
        <div class="router-padding">
          <mt-tab-item id="05">已完成</mt-tab-item>
        </div>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="">
          <zhx-order-list ref="orderList" :options="list" ></zhx-order-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="01" >
          <zhx-order-list ref="orderList" :options="list" ></zhx-order-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="04">
          <zhx-order-list ref="orderList" :options="list" ></zhx-order-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="05">
          <zhx-order-list ref="orderList" :options="list" ></zhx-order-list>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import orderList from '../../components/orderList'
import { startLoading, endLoading } from '../../utils/utils'
export default {
  name: 'myOrder-page',
  data () {
    return {
      selected: '',
      orderList: '',
      list: []
    }
  },
  methods: {
    // 订单信息
    orderListInfo (val) {
      startLoading()
      let viewNums = {
        // index: 0,
        // limit: 8,
        status: val
      }
      this.$store
        .dispatch('FindOrders', viewNums)
        .then(res => {
          this.list = res.OrderInfo
          endLoading()
        })
        .catch(res => {
          console.log(res)
        })
    }
  },
  components: {
    'zhx-order-list': orderList
  },
  created () {
    this.orderListInfo('')
  },
  watch: {
    selected: function (val, oldVal) {
      this.orderListInfo(val)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/util.css";
.myOrder {
  .position-fixed {
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 10;
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