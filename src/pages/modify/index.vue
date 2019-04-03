<template>
  <div>
    <div>
      <!--logon-->
      <label>欢迎你：{{phoneNum}}</label>
    </div>
    <div>
      <!--个人信息模块-->
      <!--生成图片并分享-->

    </div>
    <div>
      <!--公司信息-->
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        user: 'lh',
        phoneNum: ''
      }
    },
    mounted () {
      this.phoneNum = getApp().globalData.phoneNum
    }
  }
</script>

<style>
</style>
