/*
 * @Author: lidongliang
 * @Date: 2017-11-14 09:59:01
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 16:13:32
 * 编辑收货人
 */
<template>
  <div class="addressEdit">
    <div class="common-header">
      <mt-header title="编辑收货人">
        <mt-button icon="back" slot="left" @click="runRouter"></mt-button>
      </mt-header>
    </div>
    <div class="addAddress-body">
      <mt-field class="border-1px" label="收货人" placeholder="收货人姓名" v-model="consignee"></mt-field>
      <mt-field class="border-1px" label="联系电话" placeholder="请输入手机号" type='number' v-model="phoneNum"></mt-field>
      <mt-cell class="border-1px height-88" @click.native="handclickshow" title="所在地区" is-link v-model="values">
      </mt-cell>
      <mt-field placeholder="请填写详细地址，不少于5个字" type="textarea" rows="4" v-model="detailedAddress"></mt-field>
    </div>
    <div class="bottoms" @click="handclickhide" v-show='isShow'>
      <div class="bottom">
        <div class="bottomCOM">
          <mt-button size="large" @click="handclickhide">确定</mt-button>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange" @slotValueChange="onSlotValueChange" :visibleItemCount='visibleItemCount' valueKey='v'></mt-picker>
      </div>
    </div>
    <div class="savebottom" @click='saveAddress'>
      保存
    </div>
  </div>
</template>

<script>
// mixin引用
import { addMixin } from '../../mixin/address'
import {MessageBox} from 'mint-ui'
// vuex引入
import {mapGetters} from 'vuex'
// 姓名正则
const userNameReg = /^[a-zA-Z\u4e00-\u9fa5/*]{1,5}$/u
const phoneNoPattern = /^1[34578]\d{9}$/
let time
export default {
   // 组件名字
  name: 'addressEdit-page',
   // 组合其它组件
  extends: {},
   // 组件属性、变量
  props: {},
   // 变量
  mixins: [addMixin],
  data () {
    return {
      time: null,
      consignee: '',
      phoneNum: '',
      detailedAddress: '',
      value: false,
      visibleItemCount: 5,
      isShow: false,
      flags: true,
      addList: JSON.parse(sessionStorage.getItem('addList')) || {},
      values: '请选择',
      onece: false,
      defaultArr: [],
      'provinceCode': '',
      'cityCode': '',
      'countryCode': '',
      'townCode': '',
      ind: 0,
      objs: {},
      slots: [
        {
          flex: 1,
          values: [],
          className: 's0',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 's1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 's2',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 's3',
          textAlign: 'center'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['updatedpaypassword'])
  },
   // 使用其它组件
  components: {},
  watch: {
    defaultArr () {
      if (this.onece) return
      this.onece = true
      this.townCode = ''
      this.provinceCode = ''
      this.cityCode = ''
      this.countryCode = ''
    }
  },
   // 方法
  methods: {
    alerts (data) {
      MessageBox.alert(data)
    },
    handclickhide () {
      this.isShow = false
    },
    runRouter () {
      this.$router.go(-1)
    },
    saveAddress () {
      this.debounce(this.unifiedAddress)
    },
      // 赋值
    assignment (data) {
      let {userName, phoneNo, address, addressId, provinceName, cityName, countryName, provinceCode, cityCode, countryCode, townName, townCode} = data
      this.consignee = userName
      this.phoneNum = phoneNo
      this.detailedAddress = address
      this.addressId = addressId
      this.values = `${provinceName.length > 3 ? `${provinceName.substring(0, 3)}...` : provinceName}-${cityName.length > 3 ? `${cityName.substring(0, 3)}...` : cityName}-${countryName.length > 3 ? `${countryName.substring(0, 3)}...` : countryName}-${townName.legth > 3 ? `${townName.substring(0, 3)}...` : townName}`
      this.provinceCode = provinceCode
      this.townCode = townCode
      this.cityCode = cityCode
      this.countryCode = countryCode
    },
     // 保存地址统一
    unifiedAddress () {
      if (!this.usernameReg()) {
        return false
      }
      if (!this.PhoneReg()) {
        return false
      }
      if (!this.Detailedaddress()) {
        return false
      }
      this.submitData()
    },
    submitData () {
      let {phoneNum, consignee, detailedAddress, addressId, provinceCode, cityCode, countryCode, townCode} = this
      let defaultArr = this.defaultArr
      const data = {
        'bizData': {
          'addressId': addressId,
          'phoneNo': phoneNum,
          'userName': consignee,
          'address': detailedAddress,
          'provinceCode': defaultArr[0] || provinceCode,
          'cityCode': defaultArr[1] || cityCode,
          'countryCode': defaultArr[2] || countryCode,
          'townCode': defaultArr[3] || townCode
        }
      }
      this.$store.dispatch('ZHX_UPDATE_ADDRESS', data).then((res) => {
        if (res.data.result) {
          this.$router.go(-1)
        } else {
          this.alerts(res.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
     // 姓名正则
    usernameReg () {
      if (!this.consignee) {
        this.alerts('收货人姓名不能为空')
        return false
      } else if (!userNameReg.test(this.consignee)) {
        this.alerts('请输入正确的收货人姓名')
        return false
      }
      return true
    },
      // 手机号正则
    PhoneReg () {
      if (!this.phoneNum) {
        this.alerts('手机号不能为空')
        return false
      } else if (!phoneNoPattern.test(this.phoneNum)) {
        this.alerts('请输入正确的手机号')
        return false
      }
      return true
    },
     // 详细地址
    Detailedaddress () {
      if (this.detailedAddress.trim().length === 0) {
        this.alerts('请输入详细地址')
        return false
      } else if (this.detailedAddress.trim().length < 5) {
        this.alerts('详细地址不能少于5个字')
        return false
      } else if (this.detailedAddress.trim().length > 30) {
        this.alerts('详细地址不能多于30个字')
        return false
      } else {
        return true
      }
    },
    debounce (fn) {
      time && clearTimeout(time)
      time = setTimeout(function () {
        fn()
      }, 500)
    }
  },
   // 生命周期函数
  //  beforeCreate: {},
  created () {
    let data = this.updatedpaypassword.AddressSave
    let query = this.$route.query.userdata
    if (data) {
      this.assignment(data)
    } else if (query) {
      let mesData = {
        'bizData': {
          'addressId': query
        }
      }
      this.$store.dispatch('ZHXONEUSERAddress', mesData).then((res) => {
        const data = res.data
        if (data.result) {
          this.assignment(data)
        } else {
          this.alerts(data.message)
        }
      }).catch((err) => { console.log(err) })
    } else {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.addressEdit {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.addAddress-body {
  .hheight-22 {
    height: 0.22rem;
    background: #f5f5f5;
  }
  .mint-cell {
    padding: 0 0.28rem;

    .mint-cell-wrapper {
      .mint-cell-title {
        font-size: 0.28rem;
      }
    }
  }
}
.bottoms {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(60, 60, 60, 0.6);
}
.bottomCOM {
  width: 100%;
  height: 40px;
  overflow: hidden;
  line-height: 0px;
  text-align: right;
  border-bottom: 1px solid #eee;
  button {
    color: #26a2ff;
  }
}
.bottom {
  background: #fff;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
}
.savebottom {
  background: #fd404a;
  width: 100%;
  height: 0.88rem;
  position: absolute;
  left: 0;
  bottom: 0;
  color: #ffffff;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.88rem;
}
</style>
