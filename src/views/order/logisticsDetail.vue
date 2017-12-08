/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-08 18:29:20
 * 查看物流
 */
<template>
  <div class="orderDetail">
    <div class="common-header">
      <mt-header title="物流详情">
         <router-link :to="{ path: '/orderDetail', query: { orderId: this.orderId}}" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="logistics-state-body">
      <p class="logistics-name">申通快递</p>
      <div class="logistics-infor-container clear">
        <div class="left logistics-goods-pic">
          <img src="../../assets/aaa.jpg" alt="">
          <!-- <p>两件商品</p> -->
        </div>
        <div class="left logistics-number">
          <p>订单号：{{logistics.orderId}}</p>
          <p>快递单号：{{logistics.orderId}}</p>
        </div>
      </div>
      <div class="height-20"></div>
      <div class="logistics-now-container">
        <ul class="logistics-now">
          <li v-for="item in logistics.orderTrack" :key="item.msgTime">
            <div>
              <p>{{item.content}}</p>
              <p>{{itme.msgTime}}</p>
            </div>
          </li>
          <!-- <li>
            <div>
              <p>到北京市【北京转运中心】</p>
              <p>2017-11-3 22:14:50</p>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
import { startLoading, endLoading } from '../../utils/utils'
import { MessageBox } from 'mint-ui'
export default {
   // 组件名字
  name: 'order-detail-page',
   // 组合其它组件
  extends: {},
   // 组件属性、变量
  props: {},
   // 变量
  data () {
    return {
      logistics: '',
      orderId: this.$route.query.orderId // 额度ID
    }
  },
  computed: {},
   // 使用其它组件
  components: {},
  watch: {},
   // 方法
  methods: {
    logisticsInfo () {
      startLoading()
      let orderInfo = {
        orderId: this.orderId
      }
      this.$store
        .dispatch('FindLogistics', orderInfo)
        .then(res => {
          if (res.result) {
            this.logistics = res.LogisticsInfo
          } else {
            MessageBox({
              title: '提示',
              message: res.message,
              showCancelButton: false
            })
          }
          endLoading()
        })
        .catch(res => {
          console.log(res)
        })
    }
  },
   // 生命周期函数
  //  beforeCreate: {},
  created () {
    this.logisticsInfo()
  }
}
</script>

<style lang="less" scoped>
.orderDetail {
  .common-header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .logistics-state-body {
    padding-top: 0.88rem;
    .logistics-name {
      font-size: 0.26rem;
      color: #323232;
      height: 0.88rem;
      line-height: 0.88rem;
      padding-left: 0.22rem;
      box-shadow: inset 0 -1px 0 0 rgba(220,220,220,0.50);
    }
    .logistics-infor-container {
      padding: 0.2rem 0 0.26rem 0;
      .logistics-goods-pic {
        width: 1rem;
        height: 1rem;
        margin-left: 0.22rem;
        position: relative;
        font-size: 0;
        img {
          width: 100%;
          height: 100%;
         
        }
        // p {
        //   font-size: 12px;
        //   position: absolute;
        //   height: 0.3rem;
        //   line-height: 0.3rem;
        //   width: 100%;
        //   left: 0;
        //   bottom: 0;
        //   overflow: hidden;
        //   text-overflow:ellipsis;
        //   white-space: nowrap;
        //   text-align: center;
        //   background: rgba(0,0,0,0.50);
        //   color: #ffffff;
        // }
        
      }
      .logistics-number {
        margin-left: 0.2rem;
        padding-top: 0.15rem;
        p {
          
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.24rem;
          color: #323232;

        }
      }
    }
    .height-20 {
      height: 0.2rem;
      background: #f5f5f5;
    }
    .logistics-now-container {
      padding-left: 0.35rem;
      padding-top: 0.5rem;
      li {
        // border-left: 1px solid #d8d8d8;
        position: relative;
        div {
          margin-left: 0.35rem;
          background: #FFFFFF;
          box-shadow: inset 0 -1px 0 0 rgba(220,220,220,0.50);
          padding: 0.2rem 0;
          p {
            font-size: 0.26rem;
            color: #888888;
            line-height: 0.5rem;
            padding-right: 0.3rem;
          }
        }
        
      }
      li:last-child div {
          box-shadow: none;
        }
      
      li:before {
        content: '';
        background-color: #d8d8d8;
        display: inline-block;
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 5px;
        position: absolute;
        top: 0.35rem;
        left: -0.08rem;
      }
      li:first-child {
        div {
          p {
            color: #FE4F65;
          }
        }
      }
      li:first-child:before {
        content: '';
        background-color: #FE4F65;;
        display: inline-block;
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 5px;
        position: absolute;
        top: 0.35rem;
        left: -0.08rem;
      }
    }
  }
}





</style>
