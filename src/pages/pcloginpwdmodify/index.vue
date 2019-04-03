<template>
  <div>
      <i-input  type="password"  title="新密码" placeholder="请输入密码"   :maxlength="100" @blur="pwdChange" autofocus />
      <i-input  type="password"  title="确认密码" placeholder="请再次输入密码" :maxlength="100" @blur="pwdagainChange" autofocus />
      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">确认</i-button>

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
      formSubmit (e) {
        // // this.globalData.mydata = {'username': this.username}
        // this.$set(this.userCentral, 'userPhone', this.userphone) // vuex项目名称
        // mpvue.navigateBack()
        // 跳转到新手机号页面
        this.$set(this.userCentral, 'pcLoginPwd', this.pwdagain) // vuex项目名称
        this.$set(this.userCentral, 'newUser', false) // vuex项目名称
        wx.navigateBack({delta: 1})
      }
    }

  }
</script>

<style>
</style>
