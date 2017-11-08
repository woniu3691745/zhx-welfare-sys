/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-08 14:44:38
 * home
 */
<template>
  <div class="home">
    <z-navigation @listenSelected="select"></z-navigation>
    <div class="mall-list" v-bind:class="{ idDisplay: isActive}" :style="{ marginTop: height + 'px' }" ref="mallList">
      <ul>
        <li><span>日用品</span></li>
        <li><span>日用品</span></li>
        <li><span>日用品</span></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import navigation from '../components/navigation'
export default {
  name: 'home-page',
  data () {
    return {
      height: 0,
      selected: 'balance',
      isActive: true
    }
  },
  mounted () {
    this.height = document.body.offsetHeight - 125
  },
  methods: {
    select (data) {
      console.log(' -> ' + JSON.stringify(this.$refs.mallList))
      if (data === 'mall') {
        this.isActive = false
      } else {
        this.isActive = true
      }
    }
  },
  components: { 'z-navigation': navigation }
}
</script>
<style lang="less" scoped>
@import "../../static/css/util.css";
.mall-list {
  float: left;
  height: 70px;
  width: 80px;
  margin-left: 150px;
  margin-top: 0;
  border: 1px solid black;
  // z-index: 9999999;
  background-color: #eaeaea;
  text-align: center;
  ul {
    // padding: 5px 5px;
    li {
      text-decoration: underline;
      list-style: none;
      
    }
  }
}
.idDisplay{
  display: none;
}
</style>
