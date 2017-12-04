/*
 * @Author: lidongliang 
 * @Date: 2017-11-14 09:59:01 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-22 20:15:04
 * 重置登录密码
 */
<template>
  <div class="resetLoginPwd">
    <div class="common-header">
      <mt-header title="重置登录密码">
        <router-link to="/accountManagement" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="reset-login-pwd-body">
      <div class="common-form-filed">
        <mt-field label="手机号" placeholder="请输入手机号" v-model="resetForm.phoneNum">
          <span v-if="!sendMsgDisabled" class="identifyingCode1" @click="getIdCode">获取验证码</span>
          <span v-else class="identifyingCode2" @click="getIdCode">{{time}}秒后重发</span>
        </mt-field>
        <mt-field label="验证码" placeholder="请输入短信验证码"  v-model="resetForm.identifyingCode">
          
        </mt-field>
        <mt-field label="新登录密码" placeholder="请输入新密码" type="password" v-model="resetForm.newLoginPassWord"></mt-field>
        <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="resetForm.confirmNewLoginPassWord"></mt-field>
        <div class="pwd-totip">温馨提示：验证码将发送到您注册时预留的手机中。</div>
      </div>
    </div>
    <div class="bottom">
      <mt-button class="index-login" type="primary" @click="handclick">完成</mt-button>
    </div>
  </div>
</template>

<script>
import {MessageBox} from 'mint-ui'
import { mapGetters } from 'vuex'
const phoneNoPattern = /^1[34578]\d{9}$/
const VerificationCode = /^\d{6}$/
const signinPwdPatten = /^[a-z0-9]{6,20}$/i
export default {
  name: 'resetLoginPwd-page',
  data () {
    return {
      resetForm: {
        phoneNum: '',
        identifyingCode: '',
        newLoginPassWord: '',
        confirmNewLoginPassWord: ''
      },
      time: 60,
      sendMsgDisabled: false
    }
  },
  computed: {
    ...mapGetters(['updatedpaypassword'])
  },
  methods: {
    alerts (data) {
      MessageBox({
        message: data,
        closeOnClickModal: true,
        showConfirmButton: false
      })
    },
    handclick () {
      let me = this
      if (!this.phoneReg() || !this.VerificationCode() || !this.passWordReg()) {
        return false
      } else {
        let LOGINID = this.updatedpaypassword.LOGINID
        if (LOGINID == null) {
          me.alerts('请获取验证码')
          return false
        }
        let {phoneNum, identifyingCode, confirmNewLoginPassWord} = this.resetForm
        const data = {
          'bizData': {
            'Captacha': {
              'ID': LOGINID,
              'Type': '03',
              'Code': identifyingCode
            },
            'Login': {
              'PhoneNo': phoneNum,
              'SigninPwd': confirmNewLoginPassWord
            }
          }
        }
        this.$store
        .dispatch('ZHX_LOGINPASSWORD_CHANGE', data)
        .then(res => {
          const data = res.data
          if (!data.result) {
            me.alerts(data.message)
          } else {
            this.$router.push({path: '/accountManagement'})
          }
        })
        .catch(res => {
          console.log(res)
        })
      }
    },
    getIdCode () {
      let me = this
      if (this.sendMsgDisabled) {
        return
      }
      if (!this.phoneReg()) {
        return false
      }
      this.setTime()
      const loginData = {
        bizData: {
          Captacha: {
            Type: '03',
            'PhoneNo': this.resetForm.phoneNum
          }
        }
      }
      this.$store
        .dispatch('ResetGetIdCode', loginData)
        .then(res => {
          const data = res.data
          if (!data.result) {
            me.alerts(data.message)
          }
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 手机号
    phoneReg () {
      let phoneNum = this.resetForm.phoneNum
      if (!phoneNum) {
        this.alerts('请输入手机号')
        return false
      } else if (!phoneNoPattern.test(phoneNum)) {
        this.alerts('手机号格式不争取')
        return false
      }
      return true
    },
    // 验证码
    VerificationCode () {
      let identifyingCode = this.resetForm.identifyingCode
      let flag = VerificationCode.test(identifyingCode)
      if (!identifyingCode) {
        this.alerts('请输入验证码')
        return false
      } else if (!flag) {
        this.alerts('验证码格式不正确')
        return false
      }
      return true
    },
    // 密码
    passWordReg () {
      let {newLoginPassWord, confirmNewLoginPassWord} = this.resetForm
      let flag = signinPwdPatten.test(newLoginPassWord)
      if (!newLoginPassWord) {
        this.alerts('请输入密码')
        return false
      } else if (!flag) {
        this.alerts('密码格式不争取')
        return false
      } else if (newLoginPassWord !== confirmNewLoginPassWord) {
        this.alerts('确认密码不争取')
        return false
      }
      return true
    },
    setTime () {
      let me = this
      me.sendMsgDisabled = true
      let interval = window.setInterval(function () {
        if (me.time-- <= 1) {
          me.time = 60
          me.sendMsgDisabled = false
          window.clearInterval(interval)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.reset-login-pwd-body {
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
    height: 0.2rem;
    line-height: 0.2rem;
    padding: 0.05rem 0.2rem;
    border-radius: 0.1rem;
    margin-left: 0.1rem;
    font-size: 0.2rem;
    color: #26a2ff;
  }
  .pwd-totip {
    font-size: 0.28rem;
    color: #4a90e2;
    margin-top: 0.38rem;
  }
}
.bottom {
  margin-top: 2.45rem;
  .index-login {
    width: 6.4rem;
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
