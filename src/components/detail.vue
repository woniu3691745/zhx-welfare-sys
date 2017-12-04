/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 19:04:03 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-04 14:51:40
 * 商品详情
 */
<template>
  <div class="deatil">
    <div class="head-fix">
      <div class="common-header">
        <mt-header title="详情">
          <router-link :to="{ path: '/mall', query: {selected: 'mall', typeId: this.typeId, flag: 1}}" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
      </div>
    </div>
    <div class="detail-body">
      <div class="big-pic">
        <img v-bind:src="goodsForm.imgUrl">
      </div>
      <p class="goods-name">
        {{goodsForm.productName}}
      </p>
      <span class="good-money">
        ￥{{goodsForm.salePrice}}
      </span>
      <div class="height-20"></div>
      <div class="infor-good">
        <span>{{goodsForm.productDetail}}</span>
      </div>
      <div class="height-20"></div>
    </div>
    <div class="detail-bottom">
      <mt-tabbar fixed>
        <mt-button size="large" type="default" @click="cart">
            <span class="right shop-car">
              <span>{{goodsForm.count}}</span>
            </span>
        </mt-button>
        <mt-button type="primary" class="button-width" @click="addCart">加入购物车</mt-button>
      </mt-tabbar>
    </div>
  </div>  
</template>
<script>
import { startLoading, endLoading } from '../utils/utils'
import { MessageBox } from 'mint-ui'
export default {
  name: 'detail',
  data () {
    return {
      goodsForm: {
        productSku: this.$route.query.sku,      // 商品ID
        imgUrl: '',                             // 商品图片
        productName: '',                        // 商品描述
        salePrice: '',                          // 价格
        productDetail: '',                      // 商品描述
        count: this.$store.getters.cartCount    // 购物车数量
      },
      typeId: this.$route.query.typeId // 种类
    }
  },
  methods: {
    // 详情信息
    goodListByIdInfo (productSku) {
      startLoading()
      this.$store
        .dispatch('GoodListById', productSku)
        .then(req => {
          Object.assign(this.goodsForm, req.data)
          endLoading()
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 购物车路由
    cart () {
      this.$router.push({
        path: '/cart',
        query: {
          typeId: this.typeId
        }
      })
    },
     // 加入购物车
    addCart () {
      startLoading()
      let cartForm = {
        cartType: this.typeId,
        mallSku: this.goodsForm.productSku,
        skuCount: '1'
      }
      this.$store
        .dispatch('AddCart', cartForm)
        .then(res => {
          MessageBox({
            message: res.message,
            closeOnClickModal: true,
            showConfirmButton: true
          })
          this.cartCount(this.typeId)
          endLoading()
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 购物车数量
    cartCount (typeId) {
      this.$store
        .dispatch('Count', typeId)
        .then(res => {
          this.goodsForm.count = res.total
        })
        .catch(res => {
          console.log(res)
        })
    }
  },
  mounted () {
    this.goodListByIdInfo(this.goodsForm.productSku)
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
