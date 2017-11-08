/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-08 11:34:02
 * home
 */
<template>
  <div class="home">
    <z-navigation></z-navigation>
    <div class="mall-list" v-bind:class="{ idDisplay: isActive}"><span>日用品</span></div>
    <router-view></router-view>
  </div>
</template>

<script>
import navigation from '../components/navigation'
export default {
  name: 'home-page',
  data () {
    return {
      selected: 'balance',
      isActive: false
    }
  },
  components: { 'z-navigation': navigation }
}
</script>
<style lang="less" scoped>
.mall-list {
  // overflow: auto;
  float: left;
  height: 50px;
  width: 80px;
  margin-left: 150px;
  margin-top: 565px;
  // margin-bottom: 250px;
  // position: relative;
  // z-index: 999999999999999;
  border: 1px solid black;
  // opacity:0.5;
  z-index: 9999999;
}
</style>
