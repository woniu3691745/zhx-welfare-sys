<template>
  <div>
     <mt-tabbar v-model="selected" fixed >
        <mt-tab-item id="balance">
          <img slot="icon" src="../assets/icon/home.png">
          额度
        </mt-tab-item>
        <mt-tab-item id="mall">
          <img slot="icon" src="../assets/icon/home.png">
          商城
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img slot="icon" src="../assets/icon/my.png">
          我的
        </mt-tab-item>
    </mt-tabbar>
  </div>
  </div>
</template>

<script>
export default {
  name: 'navigation-page',
  data () {
    return {
      selected: 'balance',
      isActive: false
    }
  },
  mounted () {
    this.isActive = false
    if (this.$route.query.selected) { this.$router.push({ path: '/' + this.selected }) }
  },
  watch: {
    selected: function (val, oldVal) {
      this.$emit('listenSelected', this.selected)
      if (this.selected === 'mall') {
        // this.isActive = false
      } else {
        this.$router.push({ path: '/' + this.selected })
      }
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