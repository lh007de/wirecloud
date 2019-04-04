<template>
  <div>
    <div class="mybox">
      <div class="loginpic">
        <img src="../../../static/images/sharepic.png" style="width: 100%;height: 100%"/>
      </div>

      <div>
      <div style="text-align: center">重庆云专线系统平台</div>
        <div class="showcopy">
          <div class="siteaddress">
            {{siteURL}}
          </div>
          <div class="copysiteaddress" @click="copyURL">
            <img src="../../../static/images/copyurl.png" style="width: 100%;height: 100%"/>
          </div>
        </div>
      <div style="font-family: PingFang-SC-Light;font-size: 20rpx;color:#A9A9A9;text-align: center;background-color:#f5f5f6 ">账号信息可用于电脑登录</div>
      <div style="font-family: PingFang-SC-Light;font-size: 20rpx;color:#A9A9A9;text-align: center;background-color:#f5f5f6 ">在该平台内执行订单维护和后续维护</div>
    </div>
      <i-button @click="share" type="primary" shape="circle">分享</i-button>
      <div class="backindex" @click="backindex">返回主页</div>
      <div>
        <swiper :indicator-dots="indicatorDots"
                :interval="interval"
                :duration="duration"
                next-margin="40px"
                circular="true"
                style=" padding-top: 10px"
                indicator-active-color="#8A2BE2">
          <swiper-item><i-card title="A端" style="width: 80%">
            <view slot="content">
              <p>站点地址：{{site_address_A}}</p>
              <p>站点联系人：{{site_name_A}}</p>
              <p>站点联系人邮箱：{{site_email_A}}</p>
              <p>站点联系人电话：{{site_phone_A}}</p>
            </view>
            <view slot="footer"></view>
          </i-card></swiper-item>
          <swiper-item><i-card title="Z端" style="width: 80%">
            <view slot="content">
              <p>站点地址：{{site_address_Z}}</p>
              <p>站点联系人：{{site_name_Z}}</p>
              <p>站点联系人邮箱：{{site_email_Z}}</p>
              <p>站点联系人电话：{{site_phone_Z}}</p>
            </view>
          </i-card></swiper-item>
        </swiper>
      </div>
      <!--基础参数展示-->
      <div><i-card title="基础参数">
        <view slot="content">
          <p>业务类型：云专线</p>
          <p>业务名称：点到点</p>
          <p>业务ID：{{service_id}}</p>
          <p>服务宽带(M)：{{service_band}}</p>
          <p>携带划分VLAN：{{divide_vlan}}</p>
          <p>订单提交时间：{{order_time}}</p>
        </view>
      </i-card></div>
      <!--全局参数展示-->
      <div style="padding-top: 20px"><i-card title="全局参数" >
        <view slot="content">
          <p>业务联系人姓名：{{service_person}}</p>
          <p>业务联系人电话:{{service_phone}}</p>
          <p>业务联系人邮箱：{{service_email}}</p>
          <p>客户经理ID：{{client_managerID}}</p>
          <p>业务预计开通周期：{{service_time}}</p>
          <p>是否自动续约：{{isRenew}}</p>
          <p>预计业务结束时间：{{service_end_time}}</p>
          <p>业务服务缴费周期：{{service_payment_cycle}}</p>
        </view>
      </i-card>
      </div>
    </div>
    <div class="mybox">
      <canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"></canvasdrawer>
    </div>
  </div>
</template>
<script>
  import { formatTime } from '@/utils/index'
  import util from '../../utils/index'
  export default {
    data () {
      return {
        storageA: {},
        storageZ: {},
        service_id: '1001',
        service_band: '100',
        divide_vlan: '是',
        order_time: formatTime(new Date()),
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        site_address_A: 'A站点地址',
        site_name_A: 'A端联系人',
        site_email_A: 'A端联系人邮箱',
        site_phone_A: 'A端联系人电话',
        site_address_Z: 'Z站点地址',
        site_name_Z: 'Z端联系人',
        site_email_Z: 'Z端联系人邮箱',
        site_phone_Z: 'Z端联系人电话',
        service_person: '张三',
        service_phone: '15888888888',
        service_email: '123@dimpt.com',
        client_managerID: '10011',
        service_time: '1年',
        isRenew: '是',
        service_end_time: formatTime(new Date()),
        service_payment_cycle: '按年',
        dataURL: '',
        siteURL: 'http://www.cqyzxpt.cn',
        pixelRatio: 0,
        windowWidth: 500,
        windowHeight: 500,
        painting: '',
        shareImage: '',
        fontsize_title: 18,
        fontsize_content: 14,
        divide: 4

      }
    },
    mounted () {
    },
    methods: {
      eventGetImage (e) {
        console.log(e.mp.detail)
        wx.hideLoading()
        this.shareImage = e.mp.detail.tempFilePath
      },
      share () {
        // 这里需要用到微信提供的canvas进行绘图，mpvue 没有dom概念，比较坑，不能用现成工具
        wx.showLoading({
          title: '绘制分享图片中',
          mask: true
        })
        this.painting = {
          width: 375,
          height: 555,
          clear: true,
          views: [
            {
              type: 'image',
              url: '../images/backgroud.png',
              top: 0,
              left: 0,
              width: 375,
              height: 555
            },
            {
              type: 'image',
              url: '../images/picsharehead.png',
              top: 0,
              left: 0,
              width: 375,
              height: 172
            },

            {
              type: 'rect',
              background: '#f5f5f6',
              top: 180,
              left: 0,
              width: 375,
              height: 100
            },

            {
              type: 'text',
              content: 'A端',
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 180,
              left: 150
            },
            {
              type: 'text',
              content: '站点地址:' + this.site_address_A,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 200,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人:' + this.site_name_A,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 220,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人邮箱:' + this.site_email_A,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 240,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人电话:' + this.site_phone_A,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 260,
              left: 50
            },

            {
              type: 'rect',
              background: '#f5f5f6',
              top: 288,
              left: 0,
              width: 375,
              height: 100
            },

            {
              type: 'text',
              content: 'Z端',
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 288,
              left: 150
            },
            {
              type: 'text',
              content: '站点地址:' + this.site_address_Z,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 308,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人:' + this.site_name_Z,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 328,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人邮箱:' + this.site_email_Z,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 348,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人电话:' + this.site_phone_Z,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 368,
              left: 50
            }
          ]
        }
        wx.hideLoading()
        wx.saveImageToPhotosAlbum({
          filePath: this.shareImage,
          success (res) {
            wx.showToast({
              title: '保存图片成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      copyURL () {
        let that = this
        wx.setClipboardData({
          data: that.siteURL,
          success (res) {
            wx.getClipboardData({
              success (res) {
                console.log(res.data) // data
                util.progressTips('复制网址成功')
              }
            })
          }
        })
      },
      backindex () {
        mpvue.switchTab({
          url: '../../pages/index/main'
        })
      }
    }

  }
</script>

<style>
  .mybox{
    background-color: #f5f5f6;
  }
  .loginpic{
    margin: auto;
    padding-top: 20rpx;
    width: 162rpx;
    height: 120rpx;
    margin: auto;
    padding-bottom: 10rpx;
  }
  .siteaddress{
    width: 70%;
    text-align: right;
    font-family: PingFang-SC-Medium;
    font-size: 28rpx;
    color: #2979ff
  }
  .copysiteaddress{
    display: inline-block;
    width: 30rpx;
    height: 36rpx;
    padding-left: 10rpx;
  }
  .showcopy{
    display: flex;
  }
  .backindex{
    text-align: center;
    font-family: NotoSansHans-Regular;
    font-size: 30rpx;
    color: #2979ff;
  }
</style>
