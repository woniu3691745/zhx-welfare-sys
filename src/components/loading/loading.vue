<template>
  <div @touchmove.prevent.self="handscroll" v-show="zFlag" class="loading">
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
  props: ['z-Flag'],
  watch: {
    zFlag (val) {
      val
        ? Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        : Indicator.close()
    }
  },
  mounted () {

  },
  methods: {
    handscroll () {
    }
  }
}
</script>

<style>
.loading {
  background: rgba(100, 100, 100, 0.6);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 11;
}
.mint-indicator-wrapper {
  z-index: 12;
}
</style>

