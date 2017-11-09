/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-09 16:08:42
 * home
 */
<template>
  <div class="home">
    <z-navigation @listenSelected="select"></z-navigation>
    <!-- <div class="mall-list" v-bind:class="{ idDisplay: isActive}" :style="{ marginTop: height + 'px' }">
      <ul>
        <li v-for="index in item" :key="index.key"><span @click="link(index.key)">{{index.categoryName}}</span></li>
      </ul>
    </div> -->
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
      isActive: true,
      item: [
        { key: 'commodity', categoryName: '日用品' },
        { key: 'food', categoryName: '食品' },
        { key: 'fashion', categoryName: '服装' }
      ]
    }
  },
  mounted () {
    this.height = document.body.offsetHeight - 108
  },
  methods: {
    select (data) {
      if (data === 'mall') {
        this.isActive = false
      } else {
        this.isActive = true
      }
    },
    /**
     * selected: bottom 按钮
     * categoryId：商品大类
     */
    link (category) {
      // 不同种类进入不同的商城
      this.isActive = true
      this.$router.push({path: '/mall', query: {categoryId: category, selected: 'mall'}})
    }
  },
  components: { 'z-navigation': navigation }
}
</script>
<style lang="less" scoped>
@import "../../static/css/util.css";
.mall-list {
  position: fixed;
  width: 80px;
  margin: 0 40%;
  font-size: 12px;
  border: 1px solid gray;
  border-radius: 5px;
  z-index: 999;
  background-color: #fafafa;
  text-align: center;
  ul {
    padding: 2px;
    li {
      list-style: none;
      padding: 1px;
      span {
        // text-decoration: underline;
      }
    }
  }
}
.idDisplay {
  display: none; // 不保留盒子模型
  // visibility: hidden;
}
</style>
