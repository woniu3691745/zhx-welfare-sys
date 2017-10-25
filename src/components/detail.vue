<template>
  <div class="deatil">
    <mt-header title="详情">
      <router-link to="" slot="left">
        <mt-button icon="back"  @click="back()">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>  
</template>
<script>
  export default {
    name: 'detail',
    data () {
      return {
  
      }
    },
    methods: {
      back () {
        this.$router.go('-1')
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
