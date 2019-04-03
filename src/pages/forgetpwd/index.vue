<template>
  <div>
      <i-input  type="text" title="手机号" placeholder="请输入绑定手机号" :value="userCentral.userPhone"  :maxlength="100" @blur="userPhoneCheckChange" autofocus />
      <i-input  type="text" title="验证码" placeholder="请输入短信验证码"  :maxlength="100" @blur="verificationCheck" autofocus />
      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">下一步</i-button>

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
        // mpvue.navigateBack(mpvue.navigateBack)
        // // 跳转到新手机号页面
        const url = '../../pages/fogetpwdset/main'
        mpvue.navigateTo({url})
      }
    }

  }
</script>

<style>
</style>
