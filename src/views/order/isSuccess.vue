<template>
 <div class="success">
    <div class="common-header">
      <mt-header title="支付成功">
        <router-link to="/confirmOrder" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="body">
      <div class="spinner">
        <mt-spinner :size="60"></mt-spinner>
      </div>
      <mt-button type="primary" @click.native="payisCom">已完成支付</mt-button>
      <mt-button type="danger" @click.native="payisCom">支付遇到问题</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      'orderNo': this.$route.query.orderId || ''
    }
  },
  methods: {
    // 查看是否支付完成
    payisCom () {
      this.getData()
    },
    async getData () {
      try {
        const res = await this.$store.dispatch('ifpayCom', {
          'orderNo': this.orderNo
        })
        if (res.result) {
          if (res.bizData.status === '03' || res.bizData.status === '04') {
            this.$router.push('/success')
          } else {
            this.$router.push('/fail')
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
.body{
  padding: 10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap
}
.spinner{
  width: 6.4rem;
  height:30px;
  padding:3rem;
}
</style>
