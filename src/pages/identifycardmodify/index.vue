<template>
  <div>
      <i-input  type="text"  placeholder="请输入身份证信息" :value="userCentral.idCard"  :maxlength="100" @blur="idCardChange" autofocus />
      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">确认</i-button>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        idCard: ''
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })},
    methods: {
      idCardChange (e) {
        this.idCard = e.mp.detail.detail.value
      },
      formSubmit (e) {
        // // this.globalData.mydata = {'username': this.username}
        // this.$set(this.userCentral, 'userPhone', this.userphone) // vuex项目名称
        // mpvue.navigateBack()
        // 跳转到新手机号页面
        this.$set(this.userCentral, 'idCard', this.idCard) // vuex项目名称
        wx.navigateBack({delta: 1})
      }
    }

  }
</script>

<style>
</style>
