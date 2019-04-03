<template>
  <div>
      <i-input  type="text" :value="userCentral.userName"  :maxlength="100" @blur="usernameChange" autofocus />
      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">确认</i-button>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        username: ''
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })},
    methods: {
      usernameChange (e) {
        this.username = e.mp.detail.detail.value
      },
      formSubmit (e) {
        // this.globalData.mydata = {'username': this.username}
        this.$set(this.userCentral, 'userName', this.username) // vuex项目名称
        mpvue.navigateBack()
        // console.log(this.$root.$mp)
        // const pages = wx.getCurrentPages()
        // console.log(pages)
        // // getCurrentPages()
        //
        // console.log(options)
        // prevPage.setData(username, this.username)
      }
    }

  }
</script>

<style>
</style>
