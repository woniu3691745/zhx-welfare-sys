/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-01 15:40:56
 * 额度明细
 */
<template>
  <div class="balanceDetail">
    <div class="common-header">
      <mt-header title="明细">
        <router-link to="/balance" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body" style="font-size: 10px;">
       <div v-for="i in balanceInfo" :key="i.balance">
         <span>金额</span>
         <div>
           <div><span>{{i.limitFlag}}￥{{i.balance}}</span></div>
           <div>有效期直：{{i.limitDate}}</div>
         </div>
       </div>
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
 export default {
   name: 'balanceDetail-page',
   data () {
     return {
       balanceInfo: '',
       typeId: this.$route.query.typeId                   // 路由跳转额度标识
     }
   },
   computed: {},
   components: {},
   watch: {},
   methods: {
     balanceList (productTypeId) {
       this.$store
        .dispatch('BalanceList', productTypeId)
        .then(data => {
          console.log('--->' + JSON.stringify(data))
          this.balanceInfo = data
        })
        .catch(res => {
          console.log(res)
        })
     }
   },
   mounted () {
     this.balanceList(this.typeId)
   }
 }
</script>

<style lang="less" scoped>

</style>
