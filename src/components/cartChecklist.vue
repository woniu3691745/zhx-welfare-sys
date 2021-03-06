/*
 * @Author: lidongliang 
 * @Date: 2017-10-30 15:56:09 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2018-01-03 14:05:39
 * 覆写 mint-ui checklist
 */
<template>
  <div @change="$emit('change', currentValue)" class="mint-checklist" :class="{ 'is-limit': max <= currentValue.length }">
    <label class="mint-checklist-title" v-text="title"></label>
    <x-cell v-for="option in options" :key="option.index">
      <label class="mint-checklist-label" slot="title">
        <span :class="{'is-right': align === 'right'}" class="mint-checkbox">
          <input class="mint-checkbox-input" type="checkbox" v-model="currentValue" :disabled="option.disabled" :value="option.value || option">
          <span class="mint-checkbox-core"></span>
        </span>
        <div class="list-content">
          <img class="big-picture" v-bind:src="option.imgUrl">
          <div class="good-description">
            <div class="desc">{{option.productName}}</div>
            <div class="clear good-description-absolute">
              <span class="left good-money">￥{{option.mallUnitPrice}}</span>
              <div class="right good-delete">
                <img src="../assets/delete.png" @click="delAll(option, $event)">
              </div>
              <div class="cart right">
                <div class="compute" @click="minus(option, $event)">-</div>
                <span class="goodNums" v-text="option.skuCount"></span>
                <div class="computes" @click="increase(option, $event)">+</div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </x-cell>
  </div>
</template>

<script>
import eventBus from '../utils/eventBus'
import XCell from 'mint-ui/packages/cell/index.js'
if (process.env.NODE_ENV === 'component') {
  require('mint-ui/packages/cell/style.css')
}
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
      currentValue: this.value,
      status: true
    }
  },
  computed: {
    limit () {
      return this.max < this.currentValue.length
    }
  },
  created () {
    eventBus.$on('status', param => {
      this.status = param
    })
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
    minus (option, $event) {
      $event.preventDefault()
      this.$emit('refreMinus', option)
      if (option.skuCount !== 1) { // 数量是1的时候
        if (this.status) {
          option.skuCount -= 1
        }
      }
    },
    increase (option, $event) {
      $event.preventDefault()
      this.$emit('refreIncrease', option)
      if (this.status) {
        option.skuCount += 1
      }
    },
    delAll (option, $event) {
      $event.preventDefault()
      this.$emit('refreDelAll', option)
    }
  }
}
</script>

<style lang="css" scoped>
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
  padding-left: 20px;
  padding: 5px 0;
  display: flex;
  flex: 2;
  font-size: 12px;
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
  width: 100%;
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
