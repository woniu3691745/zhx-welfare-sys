/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-08 11:44:25
 * 我的组件
 */

<template>
  <div class="mine" style="position: absolute;">
    <div class="mine-header">
      <mt-button type="danger" size="large" @click="LogOut">退出</mt-button>
    </div>
      <div class="advice">
        <span>重要提示：</span>
        <br>
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>   
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>      
      </div>
  </div>
</template>
<script>
export default {
  name: 'mine-page',
  data () {
    return {
      selected: 'index',
      items: 4,
      height: 0
    }
  },
  methods: {
    LogOut () {
      this.$store
        .dispatch('LogOut')
        .then(req => {
          this.$router.push({ path: '/login' })
        })
        .catch(req => {
          console.log(req)
        })
    }
  },
  created () {
    this.height = document.body.offsetHeight - 88
    // this.height = document.body.offsetHeight - 140
  }
}
</script>
<style lang="less" scoped>
@import "../../static/css/util.css";
.mine {
  padding: 0 0;
  .advice {
    font-size: 14px;
    padding: 0 20px;
    z-index: -1;
    // border: 1px solid red;
    p {
      font-size: 12px;
    }
  }
  .mint-button {
    border-radius: 0px;
  }
}
</style>
