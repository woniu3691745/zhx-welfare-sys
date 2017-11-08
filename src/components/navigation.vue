<template>
  <div>
     <mt-tabbar v-model="selected" fixed >
        <mt-tab-item id="balance">
          <img slot="icon" src="../assets/icon/home.png">
          额度
        </mt-tab-item>
        <!-- <div class="mall-list" v-bind:class="{ idDisplay: isActive}"><span>日用品</span></div> -->
        <mt-tab-item id="mall" :click="onclick()">
          <img slot="icon" src="../assets/icon/home.png">
          商城
        </mt-tab-item>
        <!-- <mt-tab-item id="cart">
          <img slot="icon" src="../assets/icon/home.png">
          购物车
        </mt-tab-item> -->
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
      if (this.selected === 'mall') {
        // this.isActive = false
      } else {
        this.$router.push({ path: '/' + this.selected })
      }
    }
  },
  methods: {
    onclick () {
      if (this.selected === 'mall') {
        this.isActive = false
      } else {
        this.isActive = true
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
// .mall-list {
//   // overflow: auto;
//   position: absolute;
//   height: 50px;
//   width: 80px;
//   margin-left: 150px;
//   margin-bottom: 250px;
//   // position: relative;
//   // z-index: 999999999999999;
//   border: 1px solid black;
//   opacity:0.5;
// }
// .idDisplay{
//   display: none;
// }

.mint-tabbar {
  // z-index: -1;
}
</style>