/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 19:04:03 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-15 15:22:10
 * 详情
 */
<template>
  <div class="deatil">
    <div class="head-fix">
      <div class="common-header">
        <mt-header title="详情">
          <router-link to="/mall" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
      </div>
    </div>

    <div class="detail-body">
      
      <div class="big-pic">
        <img src="../assets/aaa.jpg" alt="">
      </div>
      <p class="goods-name">
        卓蓝雅 生姜防脱生发无硅油洗发脱生发无硅油洗发水，礼品包装
      </p>
      <span class="good-money">
        ￥58.9
      </span>
      <div class="height-20"></div>
      <div class="infor-good"></div>
      <div class="height-20"></div>

    </div>






    <div class="detail-bottom">
      <mt-tabbar fixed>
        <mt-button size="large" type="default">
            <span class="right shop-car">
              <span>99</span>
            </span>
        </mt-button>
        <mt-button type="primary" class="button-width">加入购物车</mt-button>
        
      </mt-tabbar>
    </div>
  </div>  
</template>
<script>
export default {
  name: 'detail',
  data () {
    return {
      id: '',
      height: 0,
      goodsForm: {
        brandName: ''
      }
    }
  },
  methods: {
    goodListByIdInfo (id) {
      this.$store
        .dispatch('GoodListById', id)
        .then(res => {
          // this.goodList = res.data
          // console.log('-> ' + JSON.stringify(res.data))
        })
        .catch(res => {
          console.log(res)
        })
    }
  },
  created () {
    this.height = document.body.offsetHeight - 80
  },
  mounted () {
    this.goodListByIdInfo(this.$route.query.id)
  }
}
</script>
<style lang="less" scoped>
@import "../../static/css/util.css";


.head-fix {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail-body {
  padding: 0.88rem 0;
  .big-pic {
    width: 7.5rem;
    img {
      width: 100%;
    }
  }
  .goods-name {
    font-size: 0.3rem;
    color: #323232;
    line-height: 0.44rem;
    margin-top: 0.24rem;
    padding: 0 0.36rem 0 0.24rem;
  }
  .good-money {
    display: block;
    padding-left: 0.24rem;
    margin-top: 0.24rem;
    line-height: 0.88rem;
    height: 0.88rem;
    font-size: 0.4rem;
    color: #FE414B;
  }
  .height-20 {
    height: 0.2rem;
    width: 100%;
    background: #F5F5F5;
  }
  .infor-good {
    width: 100%;
    height: 1.78rem;
  }
}











.detail-bottom {
  .mint-tabbar {
    .mint-button--large {
      background: #FFFFFF;
      box-shadow: inset 0 1px 0 0 #DCDCDC;
      height: 0.88rem;
      width: 3.2rem;
      padding: 0;
      text-align: center;
      .shop-car {
        position: relative;
        margin-top: 0.08rem;
        width: 0.8rem;
        height: 0.8rem;
        background: url('../assets/shop-car.png');
        background-repeat: no-repeat;
        background-size: 0.51rem 0.42rem;
        background-position: 0 0.27rem;
        margin-right: 1.2rem;
        span {
          color: #ffffff;
          text-align: center;
          font-size: 0.22rem;
          line-height: 0.4rem;
          width: 0.4rem;
          height: 0.4rem;
          background: #FB4E51;
          border-radius: 50%;
          position: absolute;
          right: 0;
          top: 0;
        }
        
      }
    }
    .mint-button--normal {
      background: #FD9040;
      width: 4.3rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.28rem;;
      color: #FFFFFF;
      border-radius: 0;
      padding: 0;
    }
  }
  

}

  

</style>
