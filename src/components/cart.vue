/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-10-24 14:33:17
 * 购物车组件
 */
<template>
  <div>
    <div class="InputAddOn">
      <span class="InputAddOn-item">...</span>
      <input class="InputAddOn-field">
      <button class="InputAddOn-item">submit</button>
    </div>
  </div>
</template>

<script>

import { InfiniteScroll, Indicator } from 'mint-ui'
import Vue from 'vue'
Vue.use(InfiniteScroll)

export default {
  name: 'cart-page',
  data () {
    return {
    }
  },
  created () {
    this.get()
  },
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
      }, 2000)
    }
  }
}
</script>
<style scoped>
.InputAddOn {
  height: 300px;
  display: flex;
  justify-content: middle;
  align-items: center;
}

.InputAddOn-field {
  flex: 1;
  flex: 0 0 50%;
}

.InputAddOn-item {
  order: -1;
  flex: 0 0 10%;
}
</style>
