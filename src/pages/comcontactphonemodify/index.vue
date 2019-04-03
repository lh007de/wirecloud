<template>
  <div>
      <i-input  type="text" placeholder="请输入公司联系电话(座机)"  :maxlength="100" @blur="companyPhoneChange" autofocus />
      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">确认</i-button>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        companyPhone: ''
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })},
    methods: {
      companyPhoneChange (e) {
        this.companyPhone = e.mp.detail.detail.value
      },
      formSubmit (e) {
        this.$set(this.userCentral, 'companyPhone', this.companyPhone) // vuex项目名称
        mpvue.navigateBack()
      }
    }

  }
</script>

<style>
</style>
