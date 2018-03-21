<template>
 <div class="success">
    <div class="common-header">
      <mt-header title="支付成功">
        <router-link to="/mineOrder?selected=01" slot="left">
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
    <zyp-loading :z-flag="once"></zyp-loading>
  </div>
</template>
<script>
import { bymixin } from '../../utils/minxs'
export default {
  data () {
    return {
      'orderNo': this.$route.query.orderId || '',
      'once': false
    }
  },
  mixins: [bymixin],
  methods: {
    // 查看是否支付完成
    payisCom () {
      this.getData()
    },
    async getData () {
      if (this.once) return
      this.once = true
      try {
        const res = await this.$store.dispatch('ifpayCom', {
          'orderNo': this.orderNo
        })
        this.once = false
        if (res.result) {
          if (res.bizData.status === '03' || res.bizData.status === '04') {
            this.$router.replace('/mineOrder')
          } else {
            this.$router.push('/fail')
          }
        } else {
          this.mtAlert(res.message).then(() => {
            this.$router.push('/mine?selected=mine&type=unDirect')
          })
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
