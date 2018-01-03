/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-12-07 14:58:03
 * 管理收货地址
 */
<template>
  <div class="addressManage">
    <div class="common-header">
      <mt-header title="管理收货地址" v-if="this.flag">
        <router-link :to="{ path: '/confirmOrder', query: { typeId: this.typeId}}" slot="left" fixed>
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <mt-header title="管理收货地址" v-else>
        <router-link to="/mine" slot="left" fixed>
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="noAddress" v-if="addListarr.length===0">
      <router-link to="/addAddress">
        <mt-button type="default" class="noAddressBtn">添加地址</mt-button>
      </router-link>
    </div>
    <div v-else>
      <div class="address-manage-body">
        <div v-for="(val,key) in addListarr" :key="key">
          <div class="name-tel clear">
            <span class="left">{{val.userName}}</span>
            <span class="right">{{val.phoneNo}}</span>
          </div>
          <p class="address-words">{{val.addressDetails}}</p>
          <div class="delete-container border-top-1px">
            <!-- *********** -->
            <div class="mint-checklist" @click='updateDefault(val.addressId,$event)'>
              <label class="mint-checklist-title"></label>
              <a class="mint-cell">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title">
                    <label class="mint-checklist-label">
                      <span class="mint-checkbox">
                        <input type="checkbox" class="mint-checkbox-input" :value="key">
                        <span :class="showClass | ADDRESS_SHOW_CALSS(key,defaultKey)"></span>
                      </span>
                      <span class="mint-checkbox-label">设为默认选项</span>
                    </label>
                  </div>
                  <div class="mint-cell-value">
                    <span></span>
                  </div>
                  <!---->
                </div>
                <div class="mint-cell-right"></div>
              </a>
            </div>
            <!-- ********** -->
            <div class="clear editor-delete-container">
              <span class="editor left" @click="edit(val)">编辑</span>
              <span class="address-delete-editor right" @click="del(val.addressId,key, $event)">删除</span>
            </div>
          </div>
          <div class="height-20">
          </div>
        </div>
      </div>
      <router-link to="/addAddress">
        <div class="bottom">
          <div>
            添加收货地址
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  // 组件名字
  name: 'addressManage-page',
  // 组合其它组件
  extends: {},
  // 组件属性、变量
  props: {},
  // 变量
  data () {
    return {
      value: '',
      addListarr: [],
      showClass: {
        'mint-checked': false,
        'mint-checkbox-cores': true,
        'mint-checkbox-corsafter': false
      },
      defaultKey: 0,
      flag: this.$route.query.flag, // 是否从确认订单跳转标识
      typeId: this.$route.query.typeId // 额度标识
    }
  },
  computed: {},
  // 使用其它组件
  components: {},
  watch: {},
  // 方法
  methods: {
    alerts (data) {
      MessageBox.alert(data)
    },
    edit (data) {
      this.$store.dispatch('ZHXONEUSERAddressSave', data)
      this.$router.push({
        name: 'addressEdit',
        query: { userdata: data.addressId }
      })
    },
    del (data, delkey) {
      if (delkey === this.defaultKey) {
        this.alerts('默认地址不能删除')
        return
      }
      MessageBox.confirm('确认要删除此收获地址?')
        .then(action => {
          const mes = {
            bizData: {
              addressId: data
            }
          }
          this.$store
            .dispatch('ZHX_DELETE_ADDRESS', mes)
            .then(res => {
              if (res.data.result) {
                this.addListarr = this.addListarr.filter(
                  (val, key) => key !== delkey
                )
                if (delkey === this.defaultKey) {
                  this.defaultKey = 0
                }
              } else {
                this.alerts(res.data.message)
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => console.log(err))
    },
    computedKey (key) {
      if (this.defaultkey === key) {
        return {
          'mint-checked': false,
          'mint-checkbox-cores': true,
          'mint-checkbox-corsafter': false
        }
      } else {
        return {
          'mint-checked': true,
          'mint-checkbox-cores': true,
          'mint-checkbox-corsafter': true
        }
      }
    },
    updateDefault (date, e) {
      let target = e.target
      if (target.tagName === 'INPUT') {
        const mes = {
          bizData: {
            addressId: date,
            defaultFlag: '01'
          }
        }
        this.$store
          .dispatch('ZHX_UPDATE_ADDRESS', mes)
          .then(res => {
            if (res.data.result) {
              this.defaultKey = Number(target.value)
            } else {
              this.alerts(res.data.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  // 生命周期函数
  //  beforeCreate: {},
  created () {
    this.$store
      .dispatch('ZHXUSERAddressLIST')
      .then(res => {
        const data = res.data
        if (data.result) {
          const arr = res.data.bizData.Address || []
          arr.forEach((element, key) => {
            if (element.defaultFlag === '01') {
              this.defaultKey = key
            }
          })
          this.addListarr = arr
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
.mint-checklists {
  width: 100%;
  height: 0.96rem;
}
.mint-checkbox-cores {
  display: inline-block;
  background-color: #fff;
  border-radius: 100%;
  border: 1px solid #ccc;
  position: relative;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.mint-checkbox-cores:after {
  border: 2px solid transparent;
  border-left: 0;
  border-top: 0;
  content: "";
  top: 3px;
  left: 6px;
  position: absolute;
  width: 4px;
  height: 8px;
  -webkit-transform: rotate(45deg) scale(0);
  transform: rotate(45deg) scale(0);
  -webkit-transition: -webkit-transform 0.2s;
  transition: -webkit-transform 0.2s;
  transition: transform 0.2s;
  transition: transform 0.2s, -webkit-transform 0.2s;
}
.mint-checkbox-corsafter::after {
  border-color: #fff;
  -webkit-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
}
.mint-checked {
  background-color: #26a2ff;
  border-color: #26a2ff;
}
.noAddressBtn {
  width: 1.96rem;
  height: 0.88rem;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  margin-top: 0.44rem;
  border: 1px solid #c8c8c8;
  border-radius: 4px;
  font-family: PingFangSC-Regular;
  color: #323200;
}
.addressManage {
  .common-header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .address-manage-body {
    padding-top: 0.88rem;
    margin-bottom: 1.08rem;
    .name-tel {
      padding: 0 0.2rem;
      span {
        height: 0.84rem;
        line-height: 0.84rem;
        font-size: 0.28rem;
        color: #323232;
      }
    }
    .address-words {
      font-size: 0.24rem;
      color: #323232;
      line-height: 0.4rem;
      padding: 0 0.2rem 0.2rem;
      box-shadow: inset 0 -1px 0 0 rgba(220, 220, 220, 0.5);
    }
    .height-20 {
      height: 0.2rem;
      background: #f5f5f5;
    }
    .mint-button-text {
      font-size: 12px;
    }
  }
  .bottom {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    div {
      height: 0.88rem;
      background: #fd404a;
      font-size: 0.32rem;
      color: #ffffff;
      text-align: center;
      line-height: 0.88rem;
    }
  }
}
</style>
