<template>
  <div>
      <i-input  type="text" placeholder="请输入常用的联系邮箱" :maxlength="100" @blur="contactEmailChange" autofocus />
      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">确认</i-button>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        contactEmail: ''
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })},
    methods: {
      contactEmailChange (e) {
        this.contactEmail = e.mp.detail.detail.value
      },
      formSubmit (e) {
        this.$set(this.userCentral, 'contactEmail', this.contactEmail) // vuex项目名称
        mpvue.navigateBack()
      }
    }

  }
</script>

<style>
</style>
