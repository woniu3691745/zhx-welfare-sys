<template>
  <!-- <keep-alive> -->
    <router-view></router-view>
  <!-- </keep-alive> -->
</template>

<script>
export default {
  name: 'app-page'
}
</script>

<style lang="less">
// 修改Mint的css默认样式
@import "../static/css/common.less";
@import "../static/css/mint.css";
</style>