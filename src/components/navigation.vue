<template>
  <div>
     <mt-tabbar v-model="selected" fixed>
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
          我的{{msg}}
        </mt-tab-item>
    </mt-tabbar>
  </div>
  </div>
</template>

<script>
import eventBus from '../assets/eventBus'
export default {
  name: 'navigation-page',
  data () {
    return {
      selected: 'balance',
      isActive: false,
      msg: ''
    }
  },
  mounted () {
    this.isActive = false
    // if (this.$route.query.selected) {
    //   this.$router.push({ path: '/' + this.selected })
    // }
    eventBus.$on('focus',
      param => {
        this.selected = param
        // this.$set(this.selected, param)
      })
  },
  methods: {
  },
  created () {},
  watch: {
    selected: function (val, oldVal) {
      // 商城品类列表
      this.$emit('listenSelected', this.selected)
      if (this.selected !== 'mall') {
        // this.selected = 'mine'
        this.$router.push({ path: '/' + this.selected })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mint-tabbar.is-fixed {
  height: 0.98rem;
}
.mint-tab-item {
 
}
</style>