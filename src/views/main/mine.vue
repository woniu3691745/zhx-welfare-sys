/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-08 14:33:15
 * 我的
 */
<template>
  <div class="mine">
    <div class="common-header">
      <mt-header title="我的">
      </mt-header>
    </div>
    <div class="mine-body">
      <div>
        <div class="header-pic-container clear">
          <img class="left" src="../../assets/group.png" alt="">
          <div class="left user-name-container">
            <p>ID：{{phoneNo}}</p>
            <p>{{enterpriseName}}</p>
          </div>
        </div>
        <div class="all-limit">
          <span v-for="(val,key) in marqueeNUM" :key="key">我的额度：{{quotas}}</span>
        </div>
        <mt-cell title="我的订单" is-link to="/mineOrder"></mt-cell>
      </div>
      <div class="mine-order-contain"> 
        <div @click="handRouterClick(1)">
          <div>
            <img class="left" src="../../assets/needPay.png" alt="">
             <p v-show="waitPayCount">{{waitPayCount}}</p>
          </div>
          <p>待付款</p>
        </div>

        <div @click="handRouterClick(2)">
          <div>
            <img class="left" src="../../assets/pendingShipment.png" alt="">
            <p v-show="waitTakeCount">{{waitTakeCount}}</p>
          </div>
          <p>待收货</p>
        </div>


        <div @click="handRouterClick(3)">
          <div>
            <img class="left" src="../../assets/allOrder.png" alt="">
            <p v-show="totalCount">{{totalCount}}</p>
          </div>
          <p>全部订单</p>
        </div>

      </div>
      <div class="hheight-22"></div>
      <mt-cell class="mine-no-bg" title="地址管理" is-link to="/addressMs"></mt-cell>
      <mt-cell title="账户安全" is-link to="/accountManagement"></mt-cell>
      <mt-cell title="联系客服" is-link to="/contactService"></mt-cell>
    </div>
    <div class="mine-header">
      <mt-button type="danger" size="large" @click="LogOut">退出</mt-button>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import eventBus from '../../utils/eventBus'
export default {
  name: 'mine-page',
  data () {
    return {
      marqueeNUM: ['', ''], // 展示跑马灯数量
      selected: 'index',
      items: 4,
      quotas: '',
      enterpriseName: '',
      phoneNo: '',
      userName: '',
      totalCount: 0,
      waitPayCount: 0,
      waitTakeCount: 0
    }
  },
  methods: {
    // 退出
    LogOut () {
      this.$store
        .dispatch('LogOut')
        .then(req => {
          this.$router.push({ path: '/index' })
        })
        .catch(req => {
          console.log(req)
        })
    },
    handRouterClick (e) {
      const me = this
      switch (e) {
        case 1:
          me.$router.push({ path: '/mineOrder', query: { selected: '01' } })
          break
        case 2:
          me.$router.push({ path: '/mineOrder', query: { selected: '04' } })
          break
        case 3:
          me.$router.push({ path: '/mineOrder', query: { selected: '' } })
          break
      }
    },
    alerts (data) {
      MessageBox({
        message: data,
        closeOnClickModal: true,
        showConfirmButton: true
      })
    },
    // 导航焦点
    focus () {
      let select = this.$route.query.selected || 'mine'
      // 进入商城方式
      // type
      //  1、direct-> 去使用
      //  2、undirect -> 导航按钮
      // let type = this.$route.query.type
      // 通知导航按钮事件
      eventBus.$emit('focus', select)
    }
  },
  mounted () {
    this.focus()
  },
  created () {
    let quotasTmp = ''
    let qo = this.$store.getters.quota
    if (qo) {
      qo.map(x => (quotasTmp += x.typeName + ': ￥' + x.balance + '/'))
    }
    this.quotas = quotasTmp.substring(0, quotasTmp.length - 1)
    this.$store
      .dispatch('ZHX_GET_USERINFO')
      .then(res => {
        const data = res.data
        if (data.result) {
          let { enterpriseName, userName, totalCount, waitPayCount, waitTakeCount, phoneNo } = data.bizData.UserInfo
          this.enterpriseName = enterpriseName
          this.userName = userName
          this.phoneNo = phoneNo
          this.totalCount = parseInt(totalCount)
          this.waitPayCount = parseInt(waitPayCount)
          this.waitTakeCount = parseInt(waitTakeCount)
        } else {
          this.alerts(data.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
@import "../../../static/css/util.css";
.mine-body {
  .header-pic-container {
    height: 1.8rem;
    background: #fb4e51;
    img {
      width: 1.16rem;
      height: 1.16rem;
      font-size: 0;
      margin-left: 0.44rem;
      margin-top: 0.34rem;
    }
    .user-name-container {
      font-size: 0.28rem;
      color: #ffffff;
      margin-top: 0.5rem;
      margin-left: 0.4rem;
      line-height: 0.45rem;
    }
  }
  .mine-order-contain {
    display: flex;
    height: 1.8rem;
    div {
      flex: 1;
      div {
        margin: 0 auto;
        width: 0.8rem;
        height: 0.8rem;
        position: relative;
        margin-top: 0.18rem;
        img {
          width: 100%;
          height: 100%;
          font-size: 0;
        }
        p {
          position: absolute;
          right: -0.13rem;
          top: 0;
          background: #ffffff;
          border: 1px solid #fb4e51;
          color: #fb4e51;
          border-radius: 50%;
          width: 0.34rem;
          height: 0.34rem;
          line-height: 0.34rem;
          text-align: center;
          font-size: 0.22rem;
          box-sizing: border-box;
          margin-top: 0;
        }
      }
      p {
        font-size: 0.24rem;
        color: #323232;
        text-align: center;
        margin-top: 0.2rem;
      }
    }
  }
  .hheight-22 {
    height: 0.22rem;
    background: #f5f5f5;
  }
  .all-limit {
    font-size: 0.24rem;
    color: #4a4a4a;
    height: 0.7rem;
    line-height: 0.7rem;
    background: #f5f5f5;
    padding-left: 0.2rem;
  }
}
.mine-header {
  margin-top: 0.4rem;
  button {
    font-size: 0.32rem;
    width: 6.8rem;
    margin: 0 auto;
    height: 0.88rem;
  }
}
.all-limit {
  overflow: hidden;
  white-space: nowrap;
}
//跑马灯
.all-limit span {
  display: inline-block;
  min-width: 9rem;
  animation: userID 5s linear infinite;
}
@keyframes userID {
  0% {
    transform: translate3d(0rem, 0, 0);
  }
  100% {
    transform: translate3d(-9rem, 0, 0);
  }
}
</style>
