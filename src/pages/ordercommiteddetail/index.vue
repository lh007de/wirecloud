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
              <p>站点地址：{{pointToPoint.pointA.site_region.name + pointToPoint.pointA.site_Street.name +pointToPoint.pointA.site_DetailAddress}}</p>
              <p>站点联系人：{{pointToPoint.pointA.site_ContactName}}</p>
              <p>站点联系人邮箱：{{pointToPoint.pointA.site_ContactEmail}}</p>
              <p>站点联系人电话：{{pointToPoint.pointA.site_ContactPhone}}</p>
            </view>
            <view slot="footer"></view>
          </i-card></swiper-item>
          <swiper-item><i-card title="Z端" style="width: 80%">
            <view slot="content">
              <p>站点地址：{{pointToPoint.pointZ.site_region.name + pointToPoint.pointZ.site_Street.name + pointToPoint.pointZ.site_DetailAddress}}</p>
              <p>站点联系人：{{pointToPoint.pointZ.site_ContactName}}</p>
              <p>站点联系人邮箱：{{pointToPoint.pointZ.site_ContactEmail}}</p>
              <p>站点联系人电话：{{pointToPoint.pointZ.site_ContactPhone}}</p>
            </view>
          </i-card></swiper-item>
        </swiper>
      </div>
      <!--基础参数展示-->
      <div><i-card title="基础参数">
        <view slot="content">
          <p>业务类型：云专线</p>
          <p>业务名称：点到点</p>
          <p>订单ID：{{globalPara.orderNumber}}</p>
          <p>服务宽带(M)：{{globalPara.business_band}}</p>
          <p>携带划分VLAN：{{globalPara.business_IsVlan ? '是':'否'}}</p>
          <p>订单提交时间：{{globalPara.service_start_time}}</p>
        </view>
      </i-card></div>
      <!--全局参数展示-->
      <div style="padding-top: 20px"><i-card title="全局参数" >
        <view slot="content">
          <p>业务联系人姓名：{{globalPara.business_name}}</p>
          <p>业务联系人电话:{{globalPara.business_phone}}</p>
          <p>业务联系人邮箱：{{globalPara.business_email}}</p>
          <p>客户经理ID：{{globalPara.business_managerID ? globalPara.business_managerID :'—' }}</p>
          <p>业务预计开通周期：{{globalPara.business_OpenTime}}</p>
          <p>是否自动续约：{{globalPara.business_IsRenew ? '是':'否'}}</p>
          <p>预计业务结束时间：{{globalPara.service_end_time}}</p>
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
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        pointToPoint: 'exportPointToPoint',
        globalPara: 'exportGlobalPara'
      })},
    data () {
      return {
        order_time: formatTime(new Date()),
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        service_end_time: formatTime(new Date()),
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
          height: 724,
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
              content: '站点地址:' + this.pointToPoint.pointA.site_region.name + this.pointToPoint.pointA.site_Street.name + this.pointToPoint.pointA.site_DetailAddress,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 200,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人:' + this.pointToPoint.pointA.site_ContactName,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 220,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人邮箱:' + this.pointToPoint.pointA.site_ContactEmail,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 240,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人电话:' + this.pointToPoint.pointA.site_ContactPhone,
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
              content: '站点地址:' + this.pointToPoint.pointZ.site_region.name + this.pointToPoint.pointZ.site_Street.name + this.pointToPoint.pointZ.site_DetailAddress,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 308,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人:' + this.pointToPoint.pointZ.site_ContactName,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 328,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人邮箱:' + this.pointToPoint.pointZ.site_ContactEmail,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 348,
              left: 50
            },
            {
              type: 'text',
              content: '站点联系人电话:' + this.pointToPoint.pointZ.site_ContactPhone,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 368,
              left: 50
            },

            {
              type: 'rect',
              background: '#f5f5f6',
              top: 396,
              left: 0,
              width: 375,
              height: 140
            },

            {
              type: 'text',
              content: '基础参数',
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 396,
              left: 150
            },
            {
              type: 'text',
              content: '业务类型:云专线',
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 416,
              left: 50
            },
            {
              type: 'text',
              content: '业务名称:点到点',
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 436,
              left: 50
            },
            {
              type: 'text',
              content: '业务ID:' + this.globalPara.orderNumber,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 456,
              left: 50
            },
            {
              type: 'text',
              content: '服务宽带(M):' + this.globalPara.business_band,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 476,
              left: 50
            },
            {
              type: 'text',
              content: '携带划分VLAN:' + (this.globalPara.business_IsVlan ? '是' : '否'),
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 496,
              left: 50
            },
            {
              type: 'text',
              content: '订单提交时间:' + this.globalPara.service_start_time,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 516,
              left: 50
            },

            {
              type: 'rect',
              background: '#f5f5f6',
              top: 544,
              left: 0,
              width: 375,
              height: 180
            },

            {
              type: 'text',
              content: '全局参数',
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 544,
              left: 150
            },
            {
              type: 'text',
              content: '业务联系人姓名:' + this.globalPara.business_name,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 564,
              left: 50
            },
            {
              type: 'text',
              content: '业务联系人电话:' + this.globalPara.business_phone,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 584,
              left: 50
            },
            {
              type: 'text',
              content: '业务联系人邮箱:' + this.globalPara.business_email,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 604,
              left: 50
            },
            {
              type: 'text',
              content: '客户经理ID:' + (this.globalPara.business_managerID ? this.globalPara.business_managerID : '—'),
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 624,
              left: 50
            },
            {
              type: 'text',
              content: '业务预计开通周期:' + this.globalPara.business_OpenTime,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 644,
              left: 50
            },
            {
              type: 'text',
              content: '是否自动续约:' + (this.globalPara.business_IsRenew ? '是' : '否'),
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 664,
              left: 50
            },
            {
              type: 'text',
              content: '预计业务结束周期:' + this.globalPara.service_end_time,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 684,
              left: 50
            },
            {
              type: 'text',
              content: '业务服务缴费周期:' + this.globalPara.business_PaidCycle,
              fontSize: this.fontsize_content,
              color: '#383549',
              textAlign: 'left',
              top: 704,
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
