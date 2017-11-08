/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-07 21:20:49
 * 我的组件
 */

<template>
  <div>
    <mt-button type="danger" size="large" @click="LogOut">退出</mt-button>
  </div>
</template>

<script>
export default {
  name: 'mine-page',
  data () {
    return {
    }
  },
  methods: {
    LogOut () {
      this.$store.dispatch('LogOut').then(req => {
        this.$router.push({ path: '/login' })
      }).catch((req) => {
        console.log(req)
      })
    }
  }
}
</script>
