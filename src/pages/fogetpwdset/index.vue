<template>
  <div>
      <i-input  type="password" title="新密码" placeholder="请输入新的密码"  :maxlength="100" @blur="userPhoneChange" autofocus />
      <i-input  type="password" title="确认密码" placeholder="请再次输入新的密码"  :maxlength="100" @blur="verificationCheck" autofocus />
      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">确认</i-button>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        userphone: ''
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })},
    methods: {
      userPhoneChange (e) {
        this.userphone = e.mp.detail.detail.value
      },
      formSubmit (e) {
        // // this.globalData.mydata = {'username': this.username}
        // this.$set(this.userCentral, 'userPhone', this.userphone) // vuex项目名称
        wx.navigateBack({delta: 3})
      }
    }

  }
</script>

<style>
</style>
