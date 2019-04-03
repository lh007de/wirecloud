<template>
  <div>
    <div>
      <i-input  type="password"  title="旧密码" placeholder="请输入旧密码"   :maxlength="100" @blur="oldPwdChange" autofocus />
      <i-input  type="password"  title="新密码" placeholder="请输入新密码"   :maxlength="100" @blur="newPwdChange" autofocus />
      <i-input  type="password"  title="确认密码" placeholder="请再次输入密码" :maxlength="100" @blur="newPwdagainChange" autofocus />
      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">确认</i-button>
    </div>
    <div style="text-align: right;color: blueviolet;font-size: 10px;font-family:PingFang;padding-right: 20px" @click="forgetpwd">
      忘记旧密码?
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        pwd: '',
        pwdagain: ''
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })},
    methods: {
      pwdChange (e) {
        this.pwd = e.mp.detail.detail.value
        console.log(this.pwd)
      },
      pwdagainChange (e) {
        this.pwdagain = e.mp.detail.detail.value
        console.log(this.pwdagain)
      },
      forgetpwd (e) {
        const url = '../../pages/forgetpwd/main'
        mpvue.navigateTo({url})
      },
      formSubmit (e) {
        // // this.globalData.mydata = {'username': this.username}
        // this.$set(this.userCentral, 'userPhone', this.userphone) // vuex项目名称
        // mpvue.navigateBack()
        // 跳转到新手机号页面
        this.$set(this.userCentral, 'pcLoginPwd', this.pwdagain) // vuex项目名称
        wx.navigateBack({delta: 1})
      }
    }

  }
</script>

<style>
</style>
