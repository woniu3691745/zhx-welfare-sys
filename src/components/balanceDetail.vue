/*
 * @Author: lidongliang
 * @Date: 2017-11-14 09:59:01
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-07 15:46:48
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
    <div class="balance-detail-body">
       <div v-for="i in balanceInfo" :key="i.balance" class="clear balance-padding">
         <span class="left title-money">金额</span>
         <div class="right">
           <div class="overdue-money clear">
             <span class="right money">￥{{i.balance}}</span>
             <span class="overdue right" v-if="i.limitFlag">3天内过期</span>
          </div>
           <div class="overdue-date">有效期至：{{i.limitDate}}</div>
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
.balance-detail-body {
  .balance-padding {
    padding: 0 0.29rem 0.2rem 0.48rem;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.13);
    .title-money {
      font-size: 0.36rem;
      color: #323232;
      line-height: 0.5rem;
      height: 0.5rem;
      padding-top: 0.16rem;
    }
    .overdue-money {
      padding-top: 0.16rem;
      .overdue {
        background: #F8E71C;
        border-radius: 0.2rem;
        font-size: 0.28rem;
        color: #FB4E51;
        width: 1.82rem;
        height: 0.5rem;
        text-align: center;
        line-height: 0.5rem;
      }
      .money {
        font-size: 0.36rem;
        color: #FB4E51;
        line-height: 0.5rem;
        height: 0.5rem;
        margin-left: 0.3rem;
      }
    }
    .overdue-date {
      font-size: 0.28rem;
      color: #747474;
      margin-top: 0.24rem;
      height: 0.4rem;
      line-height: 0.4rem;

    }
  }

}
</style>
