<template>
  <div>
      <i-input  type="text" placeholder="以营业执照准确企业名称为准"  :maxlength="100" @blur="companyNameChange" autofocus />
      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">确认</i-button>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        companyName: ''
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })},
    methods: {
      companyNameChange (e) {
        this.companyName = e.mp.detail.detail.value
      },
      formSubmit (e) {
        this.$set(this.userCentral, 'companyName', this.companyName) // vuex项目名称
        mpvue.navigateBack()
      }
    }

  }
</script>

<style>
</style>
