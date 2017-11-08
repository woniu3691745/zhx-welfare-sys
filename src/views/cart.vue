/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-08 11:17:04
 * 购物车组件
 */
<template>
  <div>
    <div class="cart-top">
      <mt-header title="购物车">
        <router-link to="" slot="left" fixed>
          <mt-button icon="back" @click="back()">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="quota" :style="{ height: height + 'px' }">

      <div class="quota1">
        <mt-checklist
          v-model="washAllValue"   
          align="left"  
          :options="washAllOptions" @change="washCheckAll">
        </mt-checklist>

        <z-mt-checklist
          v-model="washValue"
          align="left"
          :options="washOptions" @change="washCheck" @refreMinus="minus">
        </z-mt-checklist>
      </div>

      <div class="quota2">
        <mt-checklist  
          v-model="foodAllValue"   
          align="left"  
          :options="foodAllOptions" @change="foodCheckAll">  
        </mt-checklist> 
        <z-mt-checklist   
          v-model="foodValue"   
          align="left"  
          :options="foodOptions" @change="foodCheck">  
        </z-mt-checklist> 
      </div>

    </div>
    <div class="compute">
      <mt-checklist
        v-model="allValue"
        :options="allOption" @change="checkAll">
      </mt-checklist>
      <div class="sub">
        <span>合计：￥{{amount}}</span>
        <mt-button type="danger">结算（{{quantity}}）</mt-button>
      </div>
    </div>

  </div>
</template>

<script>

import { InfiniteScroll, Indicator } from 'mint-ui'
import ZMtChecklist from '../components/cartChecklist'
import Vue from 'vue'
Vue.use(InfiniteScroll)

export default {
  name: 'cart-page',
  data () {
    return {
      nums: 0,
      amount: 0,       // 总价
      foodAmount: 0,
      washAmount: 0,
      quantity: 0,     // 商品数量
      allValue: [],     // 结算，全选
      allOption: [{
        label: '全选',
        value: '0'
      }],

      washAllValue: [],     // 全选的值
      washAllOptions: [{    // 全选的默认值
        label: '劳保洗护',
        value: '0'
      }],
      washValue: [],        // 列表选中的值
      washOptions: [{       // 列表默认的值
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
      }],

      foodAllValue: [],     // 全选的值
      foodAllOptions: [{    // 全选的默认值
        label: '食品饮料',
        value: '0'
      }],
      foodValue: [],      // 列表选中的值
      foodOptions: [{     // 列表默认的值
        label: '食物A',
        value: 'A1',
        goodNums: 3,
        price: 3
      },
      {
        label: '食物B',
        value: 'B1',
        goodNums: 3,
        price: 3
      },
      {
        label: '食物C',
        value: 'C1',
        goodNums: 3,
        price: 3
      },
      {
        label: '食物B',
        value: 'D1',
        goodNums: 3,
        price: 3
      },
      {
        label: '食物C',
        value: 'E1',
        goodNums: 3,
        price: 3
      },
      {
        label: '食物D',
        value: 'F1',
        goodNums: 3,
        price: 3
      }],
      height: 0
    }
  },
  created () {
    this.get()
    this.height = document.body.offsetHeight - 145
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
    // 劳保洗护 start
    washCheck (val) {
      if (this.washOptions.length === val.length) {
        this.washAllValue = ['0']
      } else {
        this.washAllValue = []
        this.allValue = []
        // console.log('washValue -> ' + this.washValue)
      }
      this.washSum(val)
      this.amount = this.washAmount + this.foodAmount
      this.quantity = this.washValue.length + this.foodValue.length
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
      this.amount = this.washAmount + this.foodAmount
      this.quantity = this.washValue.length + this.foodValue.length
      this.clearAllCheckRadio()
    },
    // 劳保洗护 end
    // 食品饮料 start
    foodCheck (val) {
      if (this.foodOptions.length === val.length) {
        this.foodAllValue = ['0']
      } else {
        this.foodAllValue = []
        this.allValue = []
        // console.log('foodValue -> ' + this.foodValue)
      }
      this.foodSum(val)
      this.amount = this.washAmount + this.foodAmount
      this.quantity = this.washValue.length + this.foodValue.length
      this.clearAllCheckRadio()
    },
    foodCheckAll () {
      if (this.foodAllValue.length === 1) {
        this.foodValue = []
        this.foodValue.push('A1', 'B1', 'C1', 'D1', 'E1', 'F1')
        // console.log('foodValue -> ' + this.foodValue)
      } else {
        this.foodValue = []
      }
      this.foodSum(this.foodValue)
      this.amount = this.washAmount + this.foodAmount
      this.quantity = this.washValue.length + this.foodValue.length
      this.clearAllCheckRadio()
    },
    // 全选 start
    checkAll (val) {
      if (this.allOption.length === val.length) {
        this.washValue = []
        this.washValue.push('A', 'B', 'C', 'D', 'E', 'F')
        this.foodValue = []
        this.foodValue.push('A1', 'B1', 'C1', 'D1', 'E1', 'F1')
        // console.log('washValue -> ' + this.washValue + '----foodValue -> ' + this.foodValue)
        this.washAllValue = ['0']
        this.foodAllValue = ['0']
      } else {
        this.washAllValue = []
        this.foodAllValue = []
        this.washValue = []
        this.foodValue = []
      }
      this.washSum(this.washValue)
      this.foodSum(this.foodValue)
      this.quantity = this.washValue.length + this.foodValue.length
      this.amount = this.washAmount + this.foodAmount
    },
    clearAllCheckRadio () { // 处理全选单选按钮状态
      if (this.washAllValue.length === 1 && this.foodAllValue.length === 1) {
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
    foodSum (val) {
      let amountTemp = 0
      this.foodOptions.map(function (x) {
        val.map(function (y) {
          if (x.value === y) {
            amountTemp += x.price
          }
        })
      })
      this.foodAmount = amountTemp
    },
    minus (itemId) {
      this.nums = itemId
      console.log('minus -> ' + itemId)
      this.washOptions = [{
        label: '<div>ddd</div>',
        value: 'A',
        goodNums: 11
      },
      {
        label: '劳保B',
        value: 'B',
        goodNums: 3
      },
      {
        label: '劳保C',
        value: 'C',
        goodNums: 3
      }]
    },
    // 食品饮料 end
    refreCart (val) {
      console.log('val -> ' + val)
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../static/css/util.css";

  .cart-top {
  }
  .quota {
    overflow: auto;
  }

  .compute {
    display: flex;
    .mint-checklist {
      flex: 2;
    }
    .mint-checklist:nth-child(2) {
      margin: 0px;
    }
    .sub {
      margin-top: 8px;
      border: 1px solid #d9d9d9;
      background-color: #fff;
      border-left: none;
      border-right: none;
      .mint-button {
        height: 46px;
      }
    }
  }

</style>
