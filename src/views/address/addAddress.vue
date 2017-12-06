/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 16:00:34
 * 添加收货地址
 */
<template>
  <div class="addAddress">
    <div class="common-header">
      <mt-header title="添加收货地址">
      <mt-button icon="back" slot="left" @click="runRouter"></mt-button>
       <!-- ********** -->
        <mt-button icon="" slot="right" @click="saveAddress">保存</mt-button>
      </mt-header>
    </div>
    <div class="addAddress-body">
      <mt-field class="border-1px" label="收货人" placeholder="收货人姓名" v-model="consignee"></mt-field>
      <mt-field class="border-1px" label="联系电话" placeholder="请输入手机号" v-model="phoneNum"></mt-field>
      <mt-cell class="border-1px height-88" @click.native="handclickshow" title="所在地区" is-link v-model="values">
      </mt-cell>
      <mt-field placeholder="请填写详细地址，不少于5个字" type="textarea" rows="4" v-model="detailedAddress"></mt-field>
      <div data-v-d5ab74ae="" class="hheight-22"></div>
      <mt-cell title="设为默认" class="pretermit">
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
    </div>
    <div class="bottoms" @click="handclickhide" v-show='isShow'>
      <div class="bottom">
        <mt-picker :slots="slots" @change="onValuesChange" :visibleItemCount='visibleItemCount' value-key='v'></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
 let time
 // 姓名正则
 const userNameReg = /^[a-zA-Z\u4e00-\u9fa5]{1,16}$/u
 const phoneNoPattern = /^1[34578]\d{9}$/
 export default {
   // 组件名字
   name: 'addAddress-page',
   // 组合其它组件
   extends: {},
   // 组件属性、变量
   props: {},
   // 变量
   data () {
     return {
       consignee: '',
       phoneNum: '',
       detailedAddress: '',
       value: false,
       visibleItemCount: 5,
       isShow: false,
       addList: {},
       values: '请选择',
       flags: true,
       defaultArr: ['underfined', 'underfined', 'underfined'],
       slots: [
         {
           flex: 1,
           values: [],
           className: 'slot1',
           textAlign: 'center'
         }, {
           divider: true,
           content: '-',
           className: 'slot2'
         }, {
           flex: 1,
           values: [],
           className: 'slot3',
           textAlign: 'center'
         }, {
           divider: true,
           content: '-',
           className: 'slot2'
         }, {
           flex: 1,
           values: [],
           className: 'slot3',
           textAlign: 'center'
         }
       ]
     }
   },
   // 使用其它组件
   components: {},
   watch: {
   },
   // 方法
   methods: {
     handclickshow () {
       this.isShow = true
       if (this.flags) {
         this.getAddressDate(0).then((res) => {
           this.slots[0].values = res.data.bizData.Address
           this.flags = false
         })
       }
     },
     handclickhide () {
       this.isShow = false
     },
     getAsyncData () {
       return async(picker, values) => {
         const OldDataArr = this.defaultArr
         for (let i = 0; i < values.length; i++) {
           let val = values[i]
           if (val != null && val.k !== OldDataArr[i]) {
             OldDataArr[i] = val.k
             if (!((`${val.k}`) in this.addList)) {
               try {
                 const res = await this.getAddressDate(val.k, i)
                 let arr = res.data.bizData.Address
                 this.addList[val.k] = arr
                 if (arr.length === 0) {
                   picker.setSlotValues(i + 1, arr)
                   OldDataArr[i + 1] = ''
                   return
                 } else {
                   picker.setSlotValues(i + 1, arr)
                 }
               } catch (err) {}
             } else {
               let arr = this.addList[`${val.k}`]
               if (arr.length === 0) {
                 picker.setSlotValues(i + 1, arr)
                 OldDataArr[i + 1] = ''
                 return
               } else {
                 picker.setSlotValues(i + 1, arr)
               }
             }
           }
         }
       }
     },
     onValuesChange (picker, values) {
       this.getAsyncData()(picker, values)
       if (!this.flags) {
         this.values = values.map((val) => {
           if (val != null) {
             return val.v
           } else {
             return val
           }
         }).join('-')
       }
     },
     // 获得联动数据
     getAddressDate (k, ind) {
       let data = {
         'bizData': {
           'addrCode': k
         }
       }
       return this.$store.dispatch('ZHXGET_ADDRESS_LIST', data)
     },
     runRouter () {
       this.$router.go(-1)
     },
     saveAddress () {
       this.debounce(this.unifiedAddress)
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
     // 姓名正则
     usernameReg () {
       if (!this.consignee) {
         alert('用户名不能为空')
         return false
       } else if (!userNameReg.test(this.consignee)) {
         alert('请输入正确的用户名')
         return false
       }
       return true
     },
      // 手机号正则
     PhoneReg () {
       if (!this.phoneNum) {
         alert('手机号不能为空')
         return false
       } else if (!phoneNoPattern.test(this.phoneNum)) {
         alert('请输入正确的手机号')
         return false
       }
       return true
     },
     // 详细地址
     Detailedaddress () {
       if (this.detailedAddress.length < 5) {
         alert('详细地址不能少于5个字')
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
     },
     submitData () {
       let {phoneNum, consignee, detailedAddress, value} = this
       let defaultFlag = (value ? '01' : '00')
       let defaultArr = this.defaultArr
       const data = {
         'bizData': {
           'phoneNo': phoneNum,
           'userName': consignee,
           'address': detailedAddress,
           'provinceCode': defaultArr[0],
           'cityCode': defaultArr[1],
           'countryCode': defaultArr[2],
           'townCode': '',
           'defaultFlag': defaultFlag
         }
       }
       this.$store.dispatch('ZHX_ADD_ADDRESS', data).then((res) => {
         if (res.data.result) {
           this.$router.go(-1)
         } else {
           alert(res.data.message)
         }
         console.log(res)
       }).catch((err) => {
         console.log(err)
       })
     }
   }
 }
</script>

<style lang="less" scoped>
.bottoms{
  position: absolute;
  left:0;
  top:0;
  bottom:0;
  right:0;
  background:rgba(60,60,60,0.6);
}
.AlignLeft{
  overflow: hidden;
}
.AlignLeft>div{
  float: right;
}
.bottom{
  background: #fff;
  position: absolute;
  bottom:0;
  right:0;
  left:0;
}
.addAddress-body {
  .hheight-22 {
    height: 0.22rem;
    background: #F5F5F5;
  } 
  .mint-cell{
    padding: 0 0.28rem;
    
    .mint-cell-wrapper {
      .mint-cell-title {
        font-size: 0.28rem;
      }
    }
    
  }
  
}
</style>
