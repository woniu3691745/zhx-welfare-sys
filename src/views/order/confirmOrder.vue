/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-06 14:57:16
 * 确认订单
 */
<template>
  <div class="confirmOrder">
    <div class="common-header">
      <mt-header title="确认订单">
        <router-link :to="{ path: '/cart', query: { typeId: this.typeId}}" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body-confirm">
      <div class="address-container">
        <div class="address-con" v-if="addressInfo.userName">
          <div class="name-tel clear">
            <span class="name left">收货人：{{addressInfo.userName}}</span>
            <span class="right defaul">默认</span> 
            <span class="tel right">{{addressInfo.phoneNo}}</span> 
          </div>
          <div class="position-fix">
            <img class="address-icon" slot="icon" src="../../assets/aaa.jpg">
            <p>收货地址：{{addressInfo.addressDetails}}</p>
            <img class="next-icon" slot="icon" src="../../assets/aaa.jpg" @click="adderss">
          </div>
        </div>
        <div class="add-adderss" v-else>
          <router-link :to="{ path: '/addAddress' }"><mt-button type="primary" class="button-width">添加地址</mt-button></router-link>
        </div>
      </div>
      <div class="height-22"></div>
      <div class="clear nomeny-cue">
        <span class="left shop-kind">{{typeName}}</span>
        <span class="right shop-delait">可使用额度：￥{{balance}}</span>
      </div>
      <div class="all-thing">
        <div class="all-thing-pic">
          <!-- <router-link :to="{ path: '/detail', query: {sku: item.productSku}}"></router-link> -->
          <img slot="icon" v-bind:src="item.imgUrl" v-for="item in productImgs" :key="item.mallSku">
        </div>
        <div class="number-shops">
          共11件商品
        </div>
      </div>
      <div class="clear nomeny-all border-1px">
        <span class="left shop-kind">商品金额小计</span>
        <span class="right shop-delait">￥{{confirmOrderForm.productTotal}}</span>
      </div>
      <div class="clear nomeny-all">
        <span class="left shop-kind">运费 ¥{{confirmOrderForm.shipping}} </span>
        <span class="right shop-delait" v-if="confirmOrderForm.isShipping">已减免</span>
      </div>
      <div class="height-22"></div>
      <div class="clear nomeny-alls border-1px">
        <span class="right shop-kind">¥{{confirmOrderForm.productTotal}}</span>
        <span class="right shop-delait">共1件商品 使用额度支付小计：</span>
      </div>
      <div class="clear merge">
        <span class="left shop-kind">{{confirmOrderForm.shippingInfo}}</span>
        <span class="right shop-delait" @click="together">去凑单</span>
      </div>
    </div>
    <div class="bottom">
      <mt-tabbar fixed>
        <mt-button size="large" type="default" class="prompt-money clear">
          <p class="right">
            <span class="">合计金额：</span>
            <span class="">￥{{confirmOrderForm.cartTotal}}</span> 
          </p>
        </mt-button>
          <mt-button type="primary" class="button-width" @click="submit">提交订单</mt-button>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
import { startLoading, endLoading } from '../../utils/utils'
import { MessageBox } from 'mint-ui'
import { mapGetters } from 'vuex'
export default {
  name: 'confirmOrder-page',
  data () {
    return {
      confirmOrderForm: {
        cartTotal: '',                    // 购物车金额汇总
        orderNo: '',                      // 订单号
        productTotal: '',                 // 商品金额汇总
        shipping: '',                     // 运费
        shippingInfo: '',                 // 包邮说明
        productTypeId: '',                // 去凑单品类ID
        isShipping: false                 // 运费减免
      },
      typeName: '',                       // 种类名称
      balance: '',                        // 额度
      addressInfo: {
        userName: '',                     // 收货人
        phoneNo: '',                      // 收货人手机号
        addressId: '',                    // 地址编号
        addressDetails: ''                // 收货人详细收货地址
      },
      productImgs: '',                    // 商品图片
      mallSkus: '',                       // 商品SKU
      typeId: this.$route.query.typeId    // 额度ID
    }
  },
  components: {},
  watch: {},
  methods: {
    // 去凑单
    together () {
      this.$router.push({
        path: '/goodsList',
        query: {
          typeId: this.typeId,
          togetherId: this.confirmOrderForm.productTypeId
        }
      })
    },
    // 额度信息
    quotaInfo () {
      let categoryInfo = {
        productTypeId: this.typeId
      }
      this.$store
        .dispatch('QuotaInfo', categoryInfo)
        .then(res => {
          this.balance = res.balance
          this.typeName = res.typeName
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 添加地址
    adderss () {
      this.$router.push({
        path: '/addAddress'
      })
    },
    // 提交
    preSubmit () {
      startLoading()
      let submitInfo = {
        orderNo: this.confirmOrderForm.orderNo,     // 订单号
        cartType: this.typeId,                      // 商品品类ID
        mallSkus: this.mallSkus,                    // 商品SKU
        addressId: this.addressInfo.addressId       // 地址ID
      }
      this.$store
        .dispatch('Submit', submitInfo)
        .then(res => {
          if (res.result) {
            this.$router.push({
              path: '/inputPwd',
              query: {
                typeId: this.typeId,
                orderNo: res.bizData.orderId
              }
            })
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
    },
    // 默认地址
    address () {
      this.$store
        .dispatch('FindDefaultOne')
        .then(res => {
          Object.assign(this.addressInfo, res)
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 提交订单
    submit () {
      if (this.addressInfo.addressId === '') {
        MessageBox({
          title: '提示',
          message: '地址不能为空！',
          showCancelButton: false
        })
      } else {
        this.preSubmit()
      }
    }
  },
  created () {
    startLoading()
    this.address()
    this.quotaInfo()
    Object.assign(this.confirmOrderForm, this.orderInfo)
    this.productImgs = this.productImg
    let tmp = []
    this.productImg.map(
      x => tmp.push(x.mallSku)
    )
    this.mallSkus = tmp
    setTimeout(() => {
      endLoading()
    }, 500)
    // 订单满200，包邮
    if (parseInt(this.confirmOrderForm.productTotal) > parseInt(199)) {
      this.confirmOrderForm.isShipping = true
    }
  },
  computed: {
    // vuex
    ...mapGetters(['orderInfo', 'productImg'])
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/util.css";
.confirmOrder {
  .body-confirm {
    .address-container {
      box-shadow: inset 0 -6px 0 0 #fd404a;
      .address-con {
        padding-bottom: 0.49rem;
        padding-top: 0.26rem;
        // display: none;
        .name-tel {
          font-size: 0.26rem;
          color: #323232;
          padding: 0 1.06rem 0 0.84rem;
          .name {
            height: 0.3rem;
            line-height: 0.3rem;
          }
          .defaul {
            border: 1px solid #fd404a;
            border-radius: 0.04rem;
            font-size: 0.2rem;
            color: #fd404a;
            width: 0.52rem;
            height: 0.3rem;
            line-height: 0.3rem;
            text-align: center;
            box-sizing: border-box;
          }
          .tel {
            margin-right: 0.2rem;
            line-height: 0.3rem;
          }
        }
        .position-fix {
          margin-top: 0.35rem;
          font-size: 0.26rem;
          display: flex;
          align-items: center;
          min-height: 0.74rem;
          p {
            width: 100%;
            line-height: 0.38rem;
            color: #323232;
          }
          .address-icon {
            width: 0.34rem;
            height: 0.44rem;
            padding: 0 0.3rem 0 0.2rem;
          }
          .next-icon {
            width: 0.16rem;
            height: 0.26rem;
            padding: 0 0.2rem 0 0.7rem;
          }
        }
      }
      .add-adderss {
        padding: 0.58rem 0 0.7rem 0;
        .button-width {
          border: 1px solid #c8c8c8;
          box-sizing: border-box;
          border-radius: 8px;
          width: 1.96rem;
          height: 0.88rem;
          font-size: 0.32rem;
          color: #323200;
          background: none;
          display: block;
          margin: 0 auto;
        }
      }
    }
    .height-22 {
      height: 0.22rem;
      background: #f5f5f5;
    }
    .nomeny-cue {
      padding: 0 0.28rem 0 0.24rem;
      font-size: 0.26rem;
      height: 0.88rem;
      line-height: 0.88rem;
      .shop-kind {
        color: #323232;
      }
      .shop-delait {
        color: #969696;
      }
    }
    .all-thing {
      width: 100%;
      background: #f5f5f5;
      position: relative;
      .all-thing-pic {
        overflow-x: scroll;
        width: 100%;
        box-sizing: border-box;
        height: 1.4rem;
        white-space: nowrap;
        padding: 0.14rem 1.64rem 0.14rem 0.14rem;
        font-size: 0;
        img {
          width: 1.14rem;
          height: 1.12rem;
          margin-right: 0.2rem;
        }
      }
      .number-shops {
        position: absolute;
        right: 0;
        top: 0;
        width: 1.64rem;
        height: 1.4rem;
        background: #f5f5f5;
        text-align: center;
        font-size: 0.26rem;
        color: #323232;
        z-index: 2;
        line-height: 1.4rem;
      }
    }
    .nomeny-all {
      padding: 0 0.28rem 0 0.24rem;
      font-size: 0.3rem;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #323232;
      .shop-delait {
        font-size: 0.36rem;
      }
    }
    .nomeny-alls {
      padding: 0 0.28rem 0 0.24rem;
      font-size: 0.36rem;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #fd404a;
      .shop-delait {
        font-size: 0.26rem;
        margin-right: 0.18rem;
        color: #323232;
      }
    }
    .merge {
      // display: none;
      background: #ffecd3;
      padding: 0 0.28rem 0 0.24rem;
      font-size: 0.24rem;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #323232;
      .shop-delait {
        height: 0.5rem;
        line-height: 0.5rem;
        margin-top: 0.19rem;
        border-bottom: 1px solid #323232;
        box-sizing: border-box;
      }
    }
  }
  // 底部
  .bottom {
    .mint-tabbar {
      .prompt-money {
        height: 0.94rem;
        box-shadow: inset 0 1px 0 0 rgba(220, 220, 220, 0.5);
        p {
          :nth-child(1) {
            font-size: 0.26rem;
            color: #323232;
          }
          :nth-child(2) {
            font-size: 0.26rem;
            color: #323232;
            font-size: 0.36rem;
            color: #fd404a;
            line-height: 0.37rem;
          }
        }
      }
      .submit-container {
        font-size: 0;
        .mint-button {
          border-radius: 0;
          line-height: 0.94rem;
          height: 0.94rem;
          background: #fd404a;
          width: 2rem;
          padding: 0;
          font-size: 0.28rem;
          color: #ffffff;
        }
      }
    }
  }
}
.border-1px {
  background-image: -webkit-linear-gradient(
    bottom,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 50%
  );
  background-image: linear-gradient(
    0deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 50%
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: bottom;
}
</style>
