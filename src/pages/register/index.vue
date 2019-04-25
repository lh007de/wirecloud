<template>
  <div class="containner">
    <div class="section">
        <div class="section-item">
          <div class="section-tips">
            <label>手机号</label>
          </div>
          <div class="section-input1">
            <input placeholder="请输入手机号" @input="usernameInput"></input>
          </div>
          <button class="section-code" :disabled="codeDisabled"  @click="gainAuthCodeAction">
            <text>{{codeMsg}}</text>
          </button>
        </div>
        <div class="section-item">
          <div class="section-tips">
            <label>验证码</label>
          </div>
          <div class="section-input">
            <input placeholder="请输入短信验证码" @input="usernameInput"></input>
          </div>
        </div>
    </div>
    <div class="divide"></div>
    <i-button  @click="register" type="primary"  shape="circle">注册</i-button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import util from '../../utils/index'
  export default {
    data () {
      return {
        username: '',
        password: '',
        authcode: '',
        codeDisabled: false,
        // 倒计时秒数
        countdown: 10,
        // 按钮上的文字
        codeMsg: '获取验证码',
        // 定时器
        timer: null
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })
    },
    methods: {
      register (e) {
        mpvue.switchTab({
          url: '../../pages/index/main'
        })
      },
      usernameInput: function (event) {
        this.username = event.mp.detail.value
      },
      authcodeInput: function (event) {
        this.authcode = event.mp.detail.value
      },
      gainAuthCodeAction: function () {
        let that = this
        /* 第一步：验证手机号码 */
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/// 判断手机号码的正则
        if (that.username.length === 0) {
          util.progressTips('手机号码不能为空')
          return
        }

        if (that.username.length < 11) {
          util.progressTips('手机号码长度有误！')
          return
        }

        if (!myreg.test(that.username)) {
          util.progressTips('错误的手机号码！')
        }

        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.countdown > 0 && this.countdown <= 10) {
              this.countdown--
              if (this.countdown !== 0) {
                this.codeMsg = '重新发送(' + this.countdown + ')'
              } else {
                clearInterval(this.timer)
                this.codeMsg = '获取验证码'
                this.countdown = 10
                this.timer = null
                this.codeDisabled = false
              }
            }
          }, 1000)
        }
      }
    }
  }
</script>

<style>
  .containner{
    border:1px solid transparent;
    width: 375px;
    height: 1334rpx;
    background-color: #f8f8f9;
  }
  .section {
    margin-top: 20px;
    background-color: #ffffff;
  }
  .section-item {
    overflow: hidden;
    border-bottom: 1rpx solid #e9eaec;
  }

  .section-tips {
    float: left;
    margin: 0rpx 20rpx;
    width: 210rpx;
    height: 120rpx;
    line-height:120rpx;
    font-size: 14px;
  }

  .section-input {
    float: left;
    width: 500rpx;
    height: 120rpx;
  }

  .section-input input {
    width: 100%;
    height: 100%;
    line-height:100%;
    font-size: 13px;
  }

  .section-input1 {
    float: left;
    width: 300rpx;
    height: 120rpx;
  }

  .section-input1 input {
    width: 100%;
    height: 100%;
    line-height:100%;
    font-size: 13px;
  }

  .section-code {
    float: left;
    width: 200rpx;
    height: 120rpx;
    background-color: white;
    text-align: left;
  }

  .section-code:after{
    border: none;
  }

  .section-code text{
    font-size: 12px;
    line-height:  120rpx;
    color: #2979ff;
  }
  .divide{
    height: 70rpx;
  }
</style>
