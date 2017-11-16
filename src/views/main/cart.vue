/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-15 15:45:56
 * 购物车
 */
<template>
  <div>
    <div class="head-fix">
      <div class="common-header">
        <mt-header title="购物车">
          <router-link to="/goodsList" slot="left" fixed>
            <mt-button icon="back">返回</mt-button>
          </router-link>
          <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>
        <!-- <div class="common-header">
        <mt-header title="商品列表">
          <router-link to="/mall" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
      </div> -->
      </div>
    </div>
    <div class="quota">
      <div class="quota-container">
        <z-mt-checklist
          v-model="washValue"
          align="left"
          :options="washOptions" @change="washCheck" @refreMinus="minus" @refreIncrease="increase">
        </z-mt-checklist>
      </div>
    </div>
    <div class="compute">
      <div class="compute-bg clear">
        <mt-checklist class="left"
          v-model="allValue"
          :options="allOption" @change="checkAll">
        </mt-checklist>
        <mt-button class="right settle" type="danger" @click="confirmOrder">结算（{{quantity}}）</mt-button>
        <div class="sub right">
          <span class="all">合计：<span>￥{{amount}}</span></span>
          <span class="balances">余额：￥{{amount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InfiniteScroll, Indicator } from 'mint-ui'
import ZMtChecklist from '../../components/cartChecklist'
import Vue from 'vue'
Vue.use(InfiniteScroll)

export default {
  name: 'cart-page',
  data () {
    return {
      nums: 0,
      amount: 0, // 总价
      washAmount: 0,
      quantity: 0, // 商品数量
      allValue: [], // 结算，全选
      allOption: [
        {
          label: '全选',
          value: '0'
        }
      ],

      washAllValue: [], // 全选的值
      washAllOptions: [
        {
          // 全选的默认值
          label: '劳保洗护',
          value: '0'
        }
      ],
      washValue: [], // 列表选中的值
      washOptions: [
        {
          // 列表默认的值
          label: '<div>ddd</div>',
          value: 'A',
          goodNums: 2,
          price: 10
        },
        {
          label: '劳保B',
          value: 'B',
          goodNums: 3,
          price: 20
        },
        {
          label: '劳保C',
          value: 'C',
          goodNums: 3,
          price: 5
        },
        {
          label: '劳保D',
          value: 'D',
          goodNums: 3,
          price: 1
        },
        {
          label: '劳保E',
          value: 'E',
          goodNums: 3,
          price: 2
        },
        {
          label: '劳保F',
          value: 'F',
          goodNums: 3,
          price: 3
        }
      ],
      height: 500
    }
  },
  created () {
    this.get()
    // this.height = document.body.offsetHeight - 145
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
    // 商品 start
    washCheck (val) {
      if (this.washOptions.length === val.length) {
        this.washAllValue = ['0']
      } else {
        this.washAllValue = []
        this.allValue = []
      }
      this.washSum(val)
      this.amount = this.washAmount
      this.quantity = this.washValue.length
      this.clearAllCheckRadio()
    },
    washCheckAll () {
      if (this.washAllValue.length === 1) {
        this.washValue = []
        this.washValue.push('A', 'B', 'C', 'D', 'E', 'F')
        // console.log('washValue -> ' + this.washValue)
      } else {
        this.washValue = []
      }
      this.washSum(this.washValue)
      this.amount = this.washAmount
      this.quantity = this.washValue.length
      this.clearAllCheckRadio()
    },
    // 商品 end
    // 全选 start
    checkAll (val) {
      if (this.allOption.length === val.length) {
        this.washValue = []
        this.washValue.push('A', 'B', 'C', 'D', 'E', 'F')
        this.washAllValue = ['0']
      } else {
        this.washAllValue = []
        this.washValue = []
      }
      this.washSum(this.washValue)
      this.quantity = this.washValue.length
      this.amount = this.washAmount
    },
    clearAllCheckRadio () {
      // 处理全选单选按钮状态
      if (this.washAllValue.length === 1) {
        this.allValue = ['0']
      } else {
        this.allValue = []
      }
    },
    // 全选 end
    washSum (val) {
      let amountTemp = 0
      this.washOptions.map(function (x) {
        val.map(function (y) {
          if (x.value === y) {
            amountTemp += x.price
          }
        })
      })
      this.washAmount = amountTemp
    },
    // 减少
    minus (itemId) {
      this.nums = itemId
      console.log('减少 -> ' + itemId)
      this.washOptions = [
        {
          label: '<div>ddd</div>',
          value: 'A',
          goodNums: 11,
          price: 1
        },
        {
          label: '劳保C',
          value: 'C',
          goodNums: 3,
          price: 1
        }
      ]
    },
    // 增加
    increase (itemId) {
      this.nums = itemId
      console.log('增加 -> ' + itemId)
      this.washOptions = [
        {
          label: '<div>ddd</div>',
          value: 'A',
          goodNums: 11,
          price: 11
        },
        {
          label: '劳保B',
          value: 'B',
          goodNums: 2,
          price: 11
        },
        {
          label: '劳保C',
          value: 'C',
          goodNums: 3,
          price: 11
        },
        {
          label: '劳保D',
          value: 'D',
          goodNums: 4,
          price: 11
        },
        {
          label: '劳保E',
          value: 'E',
          goodNums: 5,
          price: 11
        }
      ]
    },
    // 食品饮料 end
    refreCart (val) {
      console.log('val -> ' + val)
    },
    // 确认订单
    confirmOrder () {
      this.$router.push({
        path: '/confirmOrder',
        query: { selected: 'balance' }
      })
    }
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
        color: #F9404A;
        line-height: 0.33rem;
      }
    }
    .balances {
      margin-top: 0.4rem;
    }
  }
  .settle {
    height: 46px;
    background: #FD404A;
    font-size: 0.28rem;
    color: #FFFFFF;
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
    background: #FFFFFF;
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
