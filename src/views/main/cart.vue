/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-01 17:23:39
 * 购物车
 */
<template>
  <div>
    <div class="head-fix">
      <div class="common-header">
        <mt-header title="购物车">
          <router-link :to="{ path: '/goodsList', query: { typeId: this.typeId}}" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
      </div>
    </div>
    <div class="quota">
      <div class="quota-container">
        <z-mt-checklist
          align="left"
          v-model="washValue"
          :options="washOptions" 
          @change="washCheck"
          @refreMinus="minus" 
          @refreIncrease="increase" 
          @refreDelAll="delAll">
        </z-mt-checklist>
      </div>
    </div>
    <div class="compute">
      <div class="compute-bg clear">
        <mt-checklist class="left"
          v-model="allValue" 
          :options="allOption" 
          @change="checkAll">
        </mt-checklist>
        <mt-button class="right settle" type="danger" @click="confirmOrder">结算（{{quantity}}）</mt-button>
        <div class="sub right">
          <span class="all">合计：<span>￥{{amount}}</span></span>
          <span class="balances">余额：￥{{balance}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InfiniteScroll, Indicator, MessageBox } from 'mint-ui'
import ZMtChecklist from '../../components/cartChecklist'
import Vue from 'vue'
import eventBus from '../../utils/eventBus'
Vue.use(InfiniteScroll)

export default {
  name: 'cart-page',
  data () {
    return {
      index: '0',
      limit: '10',
      typeId: this.$route.query.typeId,                   // 路由跳转额度标识
      cartType: this.$route.query.typeId,                 // 种类
      balance: '',                                        // 余额
      // nums: 0,
      amount: 0,                                          // 总价
      mallUnitPrice: 0,                                   // 商品价钱
      quantity: 0,                                        // 商品数量
      allValue: [],                                       // 结算，全选
      allOption: [{ label: '全选', value: '0' }],         // 全选默认值
      washAllValue: [],                                   // 全部选中的值
      washValue: [],                                      // 选中的绑定值
      washOptions: []                                     // 购物车列表选择项
    }
  },
  created () {
    this.get()
  },
  components: { 'z-mt-checklist': ZMtChecklist },
  methods: {
    get () {
      setTimeout(function () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
      }, 300)
      setTimeout(function () {
        Indicator.close()
      }, 1000)
    },
    back () {
      this.$router.back()
    },
    // 单选
    washCheck (val) {
      if (this.washOptions.length === val.length) {
        this.washAllValue = [val[0].mallSku]  // 选中->全选
      } else {
        this.washAllValue = []
        this.allValue = []
      }
      this.washSum(val)
      this.amount = this.mallUnitPrice.toFixed(2)
      this.quantity = this.washValue.length
      this.clearAllCheckRadio()
    },
    // 全选
    checkAll (val) {
      let temp = []
      if (this.allOption.length === val.length) {
        this.washValue = []
        this.washOptions.map(function (x) {
          temp.push(x)
        })
        this.washValue = temp
        this.washAllValue = ['0']
      } else {
        this.washAllValue = []
        this.washValue = []
      }
      this.washSum(this.washValue)
      this.quantity = this.washValue.length
      this.amount = this.mallUnitPrice.toFixed(2)
    },
    // 处理全选单选按钮状态
    clearAllCheckRadio () {
      if (this.washAllValue.length === 1) {
        this.allValue = ['0']
      } else {
        this.allValue = []
      }
    },
    // 求和
    washSum (val) {
      let amountTemp = 0
      this.washOptions.map(function (x) {
        val.map(function (y) {
          if (x.mallSku === y.mallSku) {
            // amountTemp += x.mallUnitPrice           // 商品单价
            // amountTemp *= x.skuCount                // 商品数量
            amountTemp += (x.mallUnitPrice * x.skuCount)
          }
        })
      })
      this.mallUnitPrice = amountTemp
    },
    // 额度
    quotaInfo () {
      let categoryInfo = {
        productTypeId: this.cartType
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
    // 减少
    minus (option) {
      let cartForm = {
        cartDetailId: option.cartDetailId,
        cartType: this.cartType,
        mallSku: option.mallSku,
        skuCount: '1'
      }
      if (option.skuCount === 1) {
        // eventBus.$emit('status', false)
        MessageBox.confirm('确定执行此操作?').then(action => {
          this.$store
          .dispatch('AddCartMinus', cartForm)
          .then(res => {
            if (res.result) {
              eventBus.$emit('status', true)
              this.cartInfoList(false)
            } else {
              eventBus.$emit('status', false)
              alert(res.message)
            }
          })
          .catch(res => {
            console.log(res)
          })
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.$store
          .dispatch('AddCartMinus', cartForm)
          .then(res => {
            if (res.result) {
              this.cartInfoList(true)
            } else {
              eventBus.$emit('status', false)
              alert(res.message)
            }
          })
          .catch(res => {
            eventBus.$emit('status', false)
            console.log(res)
          })
      }
    },
    // 增加
    increase (option) {
      if (option.skuCount < 99) {
        let cartForm = {
          cartDetailId: option.cartDetailId,
          cartType: this.cartType,
          mallSku: option.mallSku,
          skuCount: '1'
        }
        this.$store
        .dispatch('AddCartPlus', cartForm)
        .then(res => {
          if (res.result) {
            eventBus.$emit('status', true)
            this.cartInfoList(true)
          } else {
            eventBus.$emit('status', false)
            alert(res.message)
          }
        })
        .catch(res => {
          console.log(res)
        })
      } else {
        MessageBox({
          title: '提示',
          message: '最大数量为99',
          showCancelButton: true
        })
        eventBus.$emit('status', false)
      }
    },
    // 购物车移除
    delAll (option) {
      MessageBox.confirm('确定执行此操作?').then(action => {
        let cartForm = {
          cartDetailId: option.cartDetailId
        }
        this.$store
          .dispatch('DelCart', cartForm)
          .then(res => {
            if (res.result) {
              this.cartInfoList()
            } else {
              alert(res.message)
            }
          })
          .catch(res => {
            console.log(res)
          })
      }).catch(error => {
        console.log(error)
      })
    },
    // 确认订单
    confirmOrder () {
      if (this.washValue.length) {
        if (parseInt(this.amount) > parseInt(this.balance)) {
          MessageBox({
            title: '提示',
            message: '额度不足！',
            showCancelButton: false
          })
        } else {
          let mallSkus = []
          this.washValue.map(x => mallSkus.push(x.mallSku))
          const cartForm = {
            cartType: this.cartType,
            mallSkus: mallSkus
          }
          this.$store.dispatch('SettleCart', cartForm).then(res => {
            if (res.result) {
              // eventBus.$emit('confirmOrderInfo', res.bizData)
              this.cartImg(mallSkus)
              this.$router.push({
                path: '/confirmOrder',
                query: { typeId: this.cartType }
              })
            } else {
              MessageBox({
                title: '提示',
                message: '结算失败！',
                showCancelButton: false
              })
            }
          })
          .catch(res => {
            console.log(res)
          })
        }
      } else {
        MessageBox({
          title: '提示',
          message: '请选择商品！',
          showCancelButton: false
        })
      }
    },
    // 购物车列表
    cartInfoList (operation) {
      let cartForm = {
        index: this.index,
        limit: this.limit,
        cartType: this.cartType
      }
      this.$store
        .dispatch('ListCart', cartForm)
        .then(res => {
          if (!operation) {
            this.washOptions = res.bizData.data
          } else {
            if (this.washValue.length) {
              let amountTemp = 0
              res.bizData.data.map(
                x => {
                  this.washValue.map(
                    y => {
                      if (y.mallSku === x.mallSku) {
                        amountTemp += x.totalPrice
                      }
                    }
                  )
                }
              )
              this.amount = amountTemp
            }
          }
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 购物车图片列表
    cartImg (mallSkus) {
      let cartForm = {
        index: 0,
        limit: 100,
        cartType: this.typeId,
        mallSkus: mallSkus
      }
      this.$store
        .dispatch('CartImgs', cartForm)
        .then(res => {
          console.log('--->' + JSON.stringify(res))
        })
    }
  },
  mounted () {
    this.cartInfoList(false)
    this.quotaInfo()
  }
}
</script>
<style lang="less" scoped>
@import "../../../static/css/util.css";
.head-fix {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
}
.quota {
  overflow: auto;
}
.quota {
  padding-top: 1.04rem;
  .quota-container {
    padding-bottom: 1.96rem;
    .mint-checklist-label {
      .mint-checkbox {
        padding-bottom: 0.2rem;
      }
    }
  }
}
.mint-checklist:nth-child(2) {
  margin: 0px;
}
.sub {
  height: 0.88rem;
  font-size: 0.24rem;
  color: #323232;
  margin-right: 0.2rem;
  .all {
    display: block;
    margin-top: 0.1rem;
    span {
      font-size: 0.3rem;
      color: #f9404a;
      line-height: 0.33rem;
    }
  }
  .balances {
    margin-top: 0.4rem;
  }
}
.settle {
  height: 46px;
  background: #fd404a;
  font-size: 0.28rem;
  color: #ffffff;
  width: 2rem;
  height: 0.88rem;
  line-height: 0.88rem;
  padding: 0;
  text-align: center;
  border-radius: 0;
}
.compute {
  position: fixed;
  bottom: 0.98rem;
  width: 100%;
  .compute-bg {
    background: #ffffff;
  }
  .mint-checklist {
    .mint-checklist-title {
      margin: 0;
      .mint-cell {
        font-size: 0.26rem;
        color: #323232;
      }
    }
  }
}
</style>
