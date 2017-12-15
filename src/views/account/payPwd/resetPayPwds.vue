/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 20:24:05
 * 重置支付密码
 */
<template>
  <div class="resetPayPwd">
    <div class="common-header">
      <mt-header title="重置支付密码">
        <router-link to="/resetPayPwd" slot="left" fixed>
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="reset-pay-pwd-body">
      <div class="common-form-filed">
        </mt-field>
        <mt-field label="支付密码" type="password" placeholder="请设置6位支付密码" v-model="bindForm.ResetPassWord">
        </mt-field>
        <mt-field label="确认密码" type="password"  placeholder="请再次输入密码" v-model="bindForm.ResetPassWordOK"></mt-field>
      </div>
    </div>
    <div class="bottom">
      <mt-button class="index-login" type="primary" @click.native="onSubmit">完成</mt-button>
    </div>
  </div>
</template>

<script>
import {MessageBox} from 'mint-ui'
const payPasswordReg = /^\d{6}$/
export default {
   // 组件名字
  name: 'resetPayPwd-page',
   // 组合其它组件
  extends: {},
   // 组件属性、变量
  props: {},
   // 变量
  data () {
    return {
      bindForm: {
        ResetPassWord: '',
        ResetPassWordOK: ''
      }
    }
  },
  methods: {
    alerts (data) {
      MessageBox.alert(data)
    },
    onSubmit () {
      let me = this
      if (!this.bindForm.ResetPassWord) {
        this.alerts('请输入支付密码')
      } else if (!payPasswordReg.test(this.bindForm.ResetPassWord)) {
        this.alerts('密码应为6位数字')
      } else if (!this.bindForm.ResetPassWordOK) {
        this.alerts('请输入确认密码')
      } else if (this.bindForm.ResetPassWord !== this.bindForm.ResetPassWordOK) {
        this.alerts('确认密码不正确')
      } else {
        const data = {
          'bizData': {
            'User': {
              'PayPWD': this.bindForm.ResetPassWordOK
            }
          }
        }
        this.$store.dispatch('ZHX_PASSWORD_CHANGE', data).then((res) => {
          if (res.data.result) {
            this.$router.push({path: '/accountManagement'})
          } else {
            me.alerts(res.data.message)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  },
   // 生命周期函数
  //  beforeCreate: {},
  mounted () {}
}
</script>

<style lang="less" scoped>
@import "../../../../static/css/util.css";
.identifyingCode1 {
    border: 0.02rem solid #f9404a;
    height: 0.2rem;
    line-height: 0.2rem;
    padding: 0.05rem 0.2rem;
    border-radius: 0.1rem;
    margin-left: 0.1rem;
    font-size: 0.2rem;
    color: #f9404a;
  }
  .identifyingCode2 {
    border: 0.02rem solid #26a2ff;
    height: 0.18rem;
    line-height: 0.18rem;
    padding: 0.05rem 0.2rem;
    border-radius: 0.1rem;
    margin-left: 0.1rem;
    font-size: 0.01rem;
    color: #26a2ff;
  }
  .pwd-totip {
    font-size: 0.28rem;
    color: #4a90e2;
    margin-top: 0.38rem;
  }
.bottom {
  margin-top: 2.45rem;
  .forget {
    padding: 0.1rem 0.66rem;
    content: "";
    display: block;
    clear: both;
  }
  .forgetAccount {
    height: 0.37rem;
    line-height: 0.37rem;
    font-size: 0.26rem;
    color: #333333;
    float: left;
  }
  .forgetloginPassWord {
    height: 0.37rem;
    line-height: 0.37rem;
    font-size: 0.26rem;
    color: #333333;
    float: right;
  }
  .index-login {
    width: 6.2rem;
    display: block;
    margin: 0 auto;
    height: 0.78rem;
    line-height: 0.78rem;
    text-align: center;
    background: #f9404a;
    color: #ffffff;
    font-size: 0.36rem;
    border-radius: 0.1rem;
  }
}
</style>
