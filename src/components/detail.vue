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
        <!-- <img src="../assets/aaa.png" alt=""> -->
      </div>




    </div>






    <div class="detail-bottom">
      <mt-tabbar fixed>
        <mt-button size="large" type="default">
            <img src="../assets/cart.png" height="20" width="20" slot="icon">
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
  padding-top: 0.88rem;
  .big-pic {
    width: 7.5rem;
    img {
      width: 100%;
    }
  }
}











.detail-goods-bottom {
  :nth-child(2) {
    // mint-cell-wrapper
    display: grid;
    :nth-child(1) {
      // mint-cell-title
      display: flex;
      flex-direction: column;
      flex: 0;
    }
    .content {
      // display: inline;
      text-align: -webkit-center;
      padding: 5px;
      .name {
        color: black;
        padding: 5px;
      }
      .money {
        float: left;
      }
      .salesNum {
        font-size: 12px;
        float: right;
      }
    }
  }
}

.deatil {
  .detail-top {
    // width: 100%;
    height: auto;
  }
  
  .detail-body {
    .mint-cell-wrapper {
      width: 100%;
      padding: 0;
    }
    img {
      
      width: 100%;
    }
  }
  .detail-bottom {
    .button-width {
      width: 200px;
      // background: none;
    }
  }
}
// .mint-button::after {
//   background-color: unset;
// }
</style>
