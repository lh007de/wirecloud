<template>

<div>
  <div class="userinfo">
    <img src="/static/images/wirelogin.png" style="height: 100%; width: 100%;vertical-align: middle;" background-size="cover" />
  </div>
  <div class="spantitle">
    <h2>重庆云专线系统平台</h2>
  </div>
  <div class="line">
    <span></span>
  </div>

  <div class="reminder">
    <span>授权后开发者将获取以下权限</span>
    <ul>
      <li type="circle">获得你的公开信息(昵称，头像等)</li>
    </ul>
  </div>
  <div class="divide"></div>
  <div >
    <i-button open-type="getUserInfo" type="primary"  shape="circle" lang="zh_CN" @getuserinfo="onGotUserInfo">去授权</i-button>
  </div>

  <!--弹出注册框样式-->
  <!--<div>-->
    <!--<modal id="modal" :hidden="hiddenmodalput" title="请注册" confirm-text="提交" cancel-text="取消"  @cancel="cancel" @confirm="confirm">-->
      <!--<label>手机号</label>-->
      <!--<input type='text' placeholder="手机号：" @input="input" auto-focus />-->
      <!--<label>验证码</label>-->
      <!--<input type='number' placeholder="验证码：" auto-focus/>-->
    <!--</modal>-->
  <!--</div>-->

</div>
</template>

<script>
  const app = getApp()
  export default {
    name: 'index',
    data () {
      return {
        canIUse: mpvue.canIUse('button.open-type.getUserInfo')
      }
    },
    mounted () {
      mpvue.showShareMenu({
        withShareTicket: true
      })
      // mpvue.getUserInfo({
      //   success: res => {
      //     console.log('获取用户信息.....', res)
      //     app.globalData.userInfo = res.userInfo
      //   },
      //   fail: res => {
      //     console.log('没有获取用户信息')
      //     if (app.canIUse) {
      //       console.log('没有用户信息')
      //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //       // 所以此处加入 callback 以防止这种情况
      //       app.userInfoReadyCallback = res => {
      //         console.log('回调里得到用户信息', res.userInfo)
      //         app.globalData.userInfo = res.userInfo
      //         mpvue.switchTab({
      //           url: 'pages/index/main'
      //         })
      //       }
      //     } else {
      //       console.log('低版本微信')
      //       // 在没有 open-type=getUserInfo 版本的兼容处理
      //       mpvue.getUserInfo({
      //         success: res => {
      //           console.log('得到用户信息', res.userInfo)
      //           app.globalData.userinfo = res.userInfo
      //           const url = '../../pages/register/main'
      //           mpvue.navigateTo({url})
      //         }
      //       })
      //     }
      //   }
      // })
    },
    methods: {
      onGotUserInfo: function (e) {
        console.log('用户授权中得到用户信息', e.mp.detail.userInfo)
        app.globalData.userinfo = e.mp.detail.userInfo
        const url = '../../pages/register/main'
        mpvue.navigateTo({url})
      }
    }
  }
</script>

<style>

  .userinfo{
    width: 200rpx;
    height: 160rpx;
    margin-left: auto;
    margin-right: auto;
    padding-top: 70rpx;
  }
  .spantitle{
    font-family: PingFang-SC-Medium;
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    padding-top: 50rpx;
    padding-bottom: 70rpx;
    color: "#333333";
  }
  .line{
    width: 90%;
    margin: auto;
    padding: 0px;
    height: 1px;
    border-top: 1px solid #ddd;
  }
  .line span{
    position: relative;
    top: -20px;
    background: #fff;
  }
  .reminder{
    padding-top: 20rpx;
    width: 90%;
    margin: auto;
    font-family: PingFang-SC-Medium;
  }
  .reminder span{
    font-size: 28rpx;
    color: "#333333"
  }
  .reminder li{
    font-size: 22rpx;
    font-weight: lighter;
  }
  .i-button{
    font-size: 50rpx;
  }
  .divide{
    width: 100%;
    height: 50rpx;
  }
</style>
