<template>
  <div style="height: 100%;width: 100%; background-color: #f5f5f6">
    <div style="width: 100%;height: 200rpx; background-color:#2d8cf0;display: flex">
    <!--个人信息和login展示-->
      <div style="width: 150rpx;height: 150rpx;padding-bottom: 10rpx;display: inline-block;padding-left: 20rpx">
        <image v-if="userinfo" :src="userCentral.userinfo.avatarUrl" style="width: 100%;height: 100%"></image>
      </div>
      <div style="width: 500rpx;height: 150rpx;padding-bottom: 10rpx;display: inline-block;padding-left: 20rpx;font-family: PingFang;color: #464c5b;font-size: 14px">
        <div style="height: 50rpx;width: 500rpx">
          {{userCentral.userinfo.nickName}}
        </div>

          <div style="height: 100rpx;width: 500rpx;font-size: 14px;padding-top: -10rpx">
            <span>重庆云专线系统平台</span>
            <span>http://www.cqyzxpt.cn</span>
          </div>
      </div>
    </div>

    <div style="padding-top: 20rpx">
      <i-cell-group>
        <i-cell title="用户名" is-link :value="userCentral.userName" url="/pages/usernamemodify/main"></i-cell>
        <i-cell title="手机号" is-link url="/pages/phonemodify/main" :value="userCentral.userPhone"></i-cell>
        <i-cell title="身份证信息" is-link url="/pages/identifycardmodify/main" :value="userCentral.idCard"></i-cell>
      </i-cell-group>
    </div>

    <div style="padding-top: 20rpx">
      <i-cell title="账号角色" value="企业用户"></i-cell>
      <i-cell title="设置电脑端登录密码" value="请录入" is-link :url="urlPwdModify"></i-cell>
      <i-cell title="联系邮箱" :value="userCentral.contactEmail" is-link url="/pages/contactemailmodify/main"></i-cell>
    </div>

    <div style="padding-top: 20rpx">
      <i-cell title="公司全称" :value="userCentral.companyName" is-link url="/pages/comnamemodify/main"></i-cell>
      <i-cell title="行业分类" :value="userCentral.companyCategory" is-link url="/pages/categorymodify/main"></i-cell>
      <i-cell title="公司联系电话(座机)" :value="userCentral.companyPhone" is-link url="/pages/comcontactphonemodify/main"></i-cell>
      <i-cell title="公司资质" :value="userCentral.companyQualification" is-link url="/pages/comqualificationmodify/main"></i-cell>
    </div>

    <div style="font-family: PingFang-SC-Light;font-size: 20rpx;color:#A9A9A9;text-align: center;background-color:#f5f5f6 ">账号信息可用于电脑登录</div>
    <div style="font-family: PingFang-SC-Light;font-size: 20rpx;color:#A9A9A9;text-align: center;background-color:#f5f5f6 ">在该平台内执行订单维护和后续维护</div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        userinfo: {},
        url: ''
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      }),
      urlPwdModify () {
        if (this.userCentral.newUser) {
          this.url = '/pages/pcloginpwdmodify/main'
        } else {
          this.url = '/pages/pcloginpwdmodifycommon/main'
        }
        return this.url
      }
    },
    mounted () {
      this.userinfo = getApp().globalData.userInfo
    },
    methods: {
    }

  }
</script>

<style>
</style>
