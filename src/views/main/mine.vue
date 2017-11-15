/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-15 15:56:29
 * 我的
 */
<template>
  <div class="mine">
    <div class="common-header">
      <mt-header title="我的">
        <router-link to="/balance" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div>
        <div style="height: 100px; background-color: #f9404a;">

        </div>
        <mt-cell title="我的订单" is-link></mt-cell>
        <mt-cell title="标题文字" style="height: 100px;"></mt-cell>
      </div>
      <mt-cell title="地址管理" is-link></mt-cell>
      <mt-cell title="账户安全" is-link></mt-cell>
      <mt-cell title="联系客服" is-link></mt-cell>
    </div>
    <div class="mine-header">
      <mt-button type="danger" size="large" @click="LogOut">退出</mt-button>
    </div>
      <!-- <div class="advice">
        <span>重要提示：</span>
        <br>
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>   
        <p>1、请在有效期内使用您的额度，过期后额度将清零作废，额度有效期由您所在的企业规定。</p>      
      </div> -->
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
@import "../../../static/css/util.css";
// .mine {
//   padding: 0 0;
//   .advice {
//     font-size: 14px;
//     padding: 0 20px;
//     z-index: -1;
//     // border: 1px solid red;
//     p {
//       font-size: 12px;
//     }
//   }
//   .mint-button {
//     border-radius: 0px;
//   }
// }
</style>
