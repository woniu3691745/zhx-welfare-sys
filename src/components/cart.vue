/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-30 20:38:06
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
        v-model="value"
        :options="['全选']">
      </mt-checklist>
      <div class="sub">
        <span>合计：￥97.90</span>
        <mt-button type="danger">结算（2）</mt-button>
      </div>
    </div>

  </div>
</template>

<script>

import { InfiniteScroll, Indicator } from 'mint-ui'
import ZMtChecklist from './cartChecklist'
import Vue from 'vue'
Vue.use(InfiniteScroll)

export default {
  name: 'cart-page',
  data () {
    return {
      nums: 0,
      value: ['全选'],  // 结算，全选

      washAllValue: [],     // 全选的值
      washAllOptions: [{    // 全选的默认值
        label: '劳保洗护',
        value: '0'
      }],
      washValue: [],        // 列表选中的值
      washOptions: [{       // 列表默认的值
        label: '<div>ddd</div>',
        value: 'A',
        goodNums: 2
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
      },
      {
        label: '劳保D',
        value: 'D',
        goodNums: 3
      },
      {
        label: '劳保E',
        value: 'E',
        goodNums: 3
      },
      {
        label: '劳保F',
        value: 'F',
        goodNums: 3
      }],

      foodAllValue: [],     // 全选的值
      foodAllOptions: [{    // 全选的默认值
        label: '食品饮料',
        value: '0'
      }],
      foodValue: [],      // 列表选中的值
      foodOptions: [{     // 列表默认的值
        label: '食物A',
        value: 'A'
      },
      {
        label: '食物B',
        value: 'B'
      },
      {
        label: '食物C',
        value: 'C'
      },
      {
        label: '食物B',
        value: 'D'
      },
      {
        label: '食物C',
        value: 'E'
      },
      {
        label: '食物D',
        value: 'F'
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
      }
    },
    washCheckAll () {
      if (this.washAllValue.length === 1) {
        this.washValue.push('A', 'B', 'C', 'D', 'E', 'F')
      } else {
        this.washValue = []
      }
    },
    // 劳保洗护 end
    // 食品饮料 start
    foodCheck (val) {
      if (this.foodOptions.length === val.length) {
        this.foodAllValue = ['0']
      } else {
        this.foodAllValue = []
      }
    },
    foodCheckAll () {
      if (this.foodAllValue.length === 1) {
        this.foodValue.push('A', 'B', 'C', 'D', 'E', 'F')
      } else {
        this.foodValue = []
      }
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
