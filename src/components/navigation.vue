<template>
  <div>
     <mt-tabbar v-model="selected">
        <mt-tab-item id="index">
          <img slot="icon" src="../assets/icon/home.png">
          首页
        </mt-tab-item>
        <mt-tab-item id="order">
          <img slot="icon" src="../assets/icon/home.png">
          订单
        </mt-tab-item>
        <mt-tab-item id="cart">
          <img slot="icon" src="../assets/icon/home.png">
          购物车
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img slot="icon" src="../assets/icon/my.png">
          我的
        </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      selected: 'index'
    }
  },
  mounted () {
    if (this.$route.query.selected) { this.$router.push({ path: '/' + this.selected }) }
    console.log('this.selected = ' + this.$route.query.selected)
  },
  watch: {
    selected: function (val, oldVal) {
      this.$router.push({ path: '/' + this.selected })
    }
  }
}
</script>
<style lang="less" scoped>
.mint-tabbar.is-fixed {
  height: 50px;
}
.mint-tab-item {
  padding: 3px 0;
}
</style>