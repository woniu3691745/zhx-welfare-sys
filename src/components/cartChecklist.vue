/*
 * @Author: lidongliang 
 * @Date: 2017-10-30 15:56:09 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-15 15:00:11
 * 覆写 mint-ui checklist
 */
<template>
  <div @change="$emit('change', currentValue)" class="mint-checklist" :class="{ 'is-limit': max <= currentValue.length }">
    <label class="mint-checklist-title" v-text="title"></label>
    <x-cell v-for="option in options" :key="option.index">
      <label class="mint-checklist-label" slot="title">
        <span
          :class="{'is-right': align === 'right'}"
          class="mint-checkbox">
          <input
            class="mint-checkbox-input"
            type="checkbox"
            v-model="currentValue"
            :disabled="option.disabled"
            :value="option.value || option">
            <span class="mint-checkbox-core"></span>
        </span>
        <!-- <span class="mint-checkbox-label" v-text="option.label || option"></span> -->
        <div class="list-content">
          <img class="big-picture" src="../assets/aaa.jpg"></img>
          <div class="good-description">
            <div class="desc">农夫山泉 饮用天然矿泉水 400ml*24瓶 122整箱</div>
            <div class="clear good-description-absolute">
              <span class="left good-money">￥58.90</span>
              <div class="right good-delete">
                <img src="../assets/delete.png" alt="">
              </div>
              <div class="cart right">
                <div class="compute" @click="minus(option.value, $event)">-</div>
                <span class="goodNums" v-text="option.goodNums"></span>
                <div class="computes" @click="increase(option.value, $event)">+</div>
              </div>
              
            </div>
          </div>
        </div>
      </label>
    </x-cell>
  </div>
</template>

<script>
import XCell from 'mint-ui/packages/cell/index.js'
if (process.env.NODE_ENV === 'component') {
  require('mint-ui/packages/cell/style.css')
}

/**
 * mt-checklist
 * @module components/checklist
 * @desc 复选框列表，依赖 cell 组件
 *
 * @param {(string[]|object[])} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
 * @param {string[]} value - 选中值的数组
 * @param {string} title - 标题
 * @param {number} [max] - 最多可选的个数
 * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
 *
 *
 * @example
 * <mt-checklist :v-model="value" :options="['a', 'b', 'c']"></mt-checklist>
 */
export default {
  name: 'z-mt-checklist',
  props: {
    max: Number,
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: Array
  },
  components: { XCell },
  data () {
    return {
      goodNums: 1,
      currentValue: this.value
    }
  },
  computed: {
    limit () {
      return this.max < this.currentValue.length
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },

    currentValue (val) {
      if (this.limit) val.pop()
      this.$emit('input', val)
    }
  },
  methods: {
    minus (val, $event) {
      $event.preventDefault() // 不要执行与事件关联的默认动作
      this.goodNums--
      console.log('minus 1 -> ' + this.goodNums)
      this.$emit('refreMinus', this.goodNums) // 点击 + - 后使父页面重新获得数据
    },
    increase (val, $event) {
      $event.preventDefault()
      this.goodNums++
      console.log('increase 1 -> ' + this.goodNums)
      this.$emit('refreIncrease', this.goodNums) // 点击 + - 后使父页面重新获得数据
    }
  }
}
</script>

<style lang="css" scoped>
/* @import "../../../src/style/var.css"; */

@component-namespace mint {
  @component checklist {
    .mint-cell {
      padding: 0;
    }
    @descendent label {
      display: block;
      padding: 0 10px;
    }
    @descendent title {
      color: $checklist-title-color;
      display: block;
      font-size: 12px;
      margin: 8px;
    }
    @when limit {
      .mint-checkbox-core:not(:checked) {
        background-color: $color-grey;
        border-color: $color-grey;
      }
    }
  }
  @component checkbox {
    @when right {
      float: right;
    }
    @descendent label {
      vertical-align: middle;
      margin-left: 6px;
    }
    @descendent input {
      display: none;
      &:checked {
        + .mint-checkbox-core {
          background-color: $color-blue;
          border-color: $color-blue;
          &::after {
            border-color: $color-white;
            transform: rotate(45deg) scale(1);
          }
        }
      }
      &[disabled] + .mint-checkbox-core {
        background-color: $color-grey;
        border-color: #ccc;
      }
    }
    @descendent core {
      display: inline-block;
      background-color: $color-white;
      border-radius: 100%;
      border: 1px solid #ccc;
      position: relative;
      size: 20px;
      vertical-align: middle;
      &::after {
        border: 2px solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        position: absolute 3px * * 6px;
        size: 4px 8px;
        transform: rotate(45deg) scale(0);
        transition: transform 0.2s;
      }
    }
  }
}

.mint-checklist-label {
  display: flex;
}
.list-content {
  /* background-color: #fff; */
  padding-left: 20px;
  padding: 5px 0;
  display: flex;
  flex: 2;
  font-size: 12px;
  /* width: 100% */
}
.good-descriptio {
  padding: 0 0;
}
.good-description {
  position: relative;
  padding-right: 0.26rem;
  background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: bottom;
}
.good-description-absolute {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0.08rem;
  box-sizing: border-box;
  padding-right: 0.26rem;
}
.good-delete {
  width: 0.4rem;
  height: 0.4rem;
  background: #F5F5F5;

}
.good-delete img {
  width: 100%;
  height: 100%;;
  

}
.cart {
  margin-right: 0.3rem;
}
.good-money {
  font-size: 0.28rem;
  color: #FD404A;
  line-height: 0.4rem;
}

.compute {
  float: left;
  text-align: -webkit-center;
  height: 0.4rem;
  width: 0.4rem;
  z-index: 99999;
  background: #F5F5F5;
  line-height: 0.4rem;
  font-size: 0.28rem;
}
.computes {
  float: left;
  text-align: -webkit-center;
  height: 0.4rem;
  width: 0.4rem;
  z-index: 99999;
  background: #F5F5F5;
  line-height: 0.4rem;
  font-size: 0.3rem;
}
.goodNums {
  text-align: -webkit-center;
  float: left;
  height: 0.4rem;
  width: 0.76rem;
  line-height: 0.4rem;
  font-size: 0.26rem;
}
a:hover {
  background-color: #fff;
}



  





</style>
