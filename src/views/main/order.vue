/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-08 11:16:18
 * 订单组件
 */

<template>
  <div>
    <div class="order-top" style="position: absolute;">
      <!-- <mt-header title="确认订单">
        <router-link to="" slot="left" fixed>
          <mt-button icon="back" @click="back()">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header> -->
      
      <mt-cell-swipe  
        v-for="n in 1"  
        :right="rightButtons"  
        title="swipe me"
        :key="n">  
      </mt-cell-swipe> 

    </div>
  </div>
</template>
<script>
// import { CellSwipe } from 'mint-ui'
// import Vue from 'vue'
// Vue.component(CellSwipe.name, CellSwipe)

export default {
  name: 'order-page',
  data () {
    return {
    }
  },
  created () {
    this.rightButtons = [
      {
        content: 'Mark as Unread',
        style: { background: 'lightgray', color: '#fff' }
      },
      {
        content: 'Delete',
        style: { background: 'red', color: '#fff' },
        handler: () => this.$messagebox('delete')
      }
    ]
  },
  methods: {
    back () {
      this.$router.push({ path: '/home' })
    },
    leftButtonHandler (evt) {
      console.log(123)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
