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
                circular="true"
                style=" padding-top: 10px"
                indicator-active-color="#8A2BE2">
          <div v-for = "(item,index) in pointToMultiPoint.branchPoint" :key="index" >
            <swiper-item>
              <i-card :title="'分支节点'+(index+1)" style="width: 90%">
                <div slot="content">
                  <p>站点联系人：{{item.site_ContactName}}</p>
                  <p>站点联系人邮箱：{{item.site_ContactEmail}}</p>
                  <p>站点联系人电话：{{item.site_ContactPhone}}</p>
                  <p>站点地址：{{item.site_region.name + item.site_Street.name + item.site_DetailAddress}}</p>
                  <p>宽带：{{item.site_SerBand}}</p>
                  <p>VLAN ID：{{item.site_VlanId}}</p>
                </div>
              </i-card>
            </swiper-item>
          </div>
        </swiper>
      </div>
      <!--基础参数展示-->
      <div class="basicpara">
        <i-card title="基础参数">
        <view slot="content">
          <p>业务类型：云专线</p>
          <p>业务名称：点到多点</p>
          <p>订单ID：{{globalPara.orderNumber}}</p>
          <p>订单提交时间：{{globalPara.service_start_time}}</p>
        </view>
      </i-card>
      </div>
      <!--全局参数展示-->
      <div style="padding-top: 20px">
        <i-card title="全局参数" >
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
      <!--中心节点展示-->
      <div style="padding-top: 20px">
        <i-card title="中心节点" >
          <view slot="content">
            <p>站点联系人：{{pointToMultiPoint.centerPoint.site_ContactName}}</p>
            <p>站点联系人邮箱:{{pointToMultiPoint.centerPoint.site_ContactEmail}}</p>
            <p>站点联系人电话：{{pointToMultiPoint.centerPoint.site_ContactPhone}}</p>
            <p>站点地址：{{pointToMultiPoint.centerPoint.site_region.name + pointToMultiPoint.centerPoint.site_Street.name + pointToMultiPoint.centerPoint.site_DetailAddress}}</p>
            <p>服务固定带宽：{{pointToMultiPoint.centerPoint.site_SerBand}}</p>
            <p>VLAN ID：{{pointToMultiPoint.centerPoint.site_VlanId}}</p>
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
        pointToMultiPoint: 'exportPointToMultiPoint',
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
        painting: '',
        shareImage: '',
        fontsize_title: 18,
        fontsize_content: 14,
        branchnum: 0, // 分支节点个数，用来画图时的布局
        branchpainting: [] // 分支画图，用来拼接painting
      }
    },
    mounted () {
      if (typeof (this.pointToMultiPoint.branchPoint.length) === 'undefined') {
        util.progressTips('分支节点不存在，请确认')
      } else {
        this.branchnum = this.pointToMultiPoint.branchPoint.length

        for (let i = 0; i < this.pointToMultiPoint.branchPoint.length; i++) {
          this.branchpainting.push(
            {
              type: 'rect',
              background: '#f5f5f6',
              top: 180 + 148 * i,
              left: 0,
              width: 375,
              height: 140
            }
          )
          this.branchpainting.push(
            {
              type: 'text',
              content: '分支节点' + (i + 1),
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 180 + 148 * i,
              left: 150
            }
          )
          this.branchpainting.push(
            {
              type: 'text',
              content: '站点联系人:' + this.pointToMultiPoint.branchPoint[i].site_ContactName,
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 200 + 148 * i,
              left: 50
            }
          )
          this.branchpainting.push(
            {
              type: 'text',
              content: '站点联系人邮箱:' + this.pointToMultiPoint.branchPoint[i].site_ContactEmail,
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 220 + 148 * i,
              left: 50
            }
          )
          this.branchpainting.push(
            {
              type: 'text',
              content: '站点联系人电话:' + this.pointToMultiPoint.branchPoint[i].site_ContactPhone,
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 240 + 148 * i,
              left: 50
            }
          )
          this.branchpainting.push(
            {
              type: 'text',
              content: '站点地址:' + this.pointToMultiPoint.branchPoint[i].site_region.name + this.pointToMultiPoint.branchPoint[i].site_Street.name + this.pointToMultiPoint.branchPoint[i].site_DetailAddress,
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 260 + 148 * i,
              left: 50
            }
          )
          this.branchpainting.push(
            {
              type: 'text',
              content: '服务固定带宽:' + this.pointToMultiPoint.branchPoint[i].site_SerBand,
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 280 + 148 * i,
              left: 50
            }
          )
          this.branchpainting.push(
            {
              type: 'text',
              content: 'VLAN ID:' + this.pointToMultiPoint.branchPoint[i].site_VlanId,
              fontSize: this.fontsize_title,
              color: '#212121',
              textAlign: 'left',
              top: 300 + 148 * i,
              left: 50
            }
          )
        }
        console.log('分支节点待绘图数据', this.branchpainting)
      }
    },
    methods: {
      eventGetImage (e) {
        // console.log(e.mp.detail)
        wx.hideLoading()
        this.shareImage = e.mp.detail.tempFilePath
      },
      share () {
        wx.showLoading({
          title: '绘制分享图片中',
          mask: true
        })
        // 绘图分享时
        if (typeof (this.pointToMultiPoint.branchPoint.length) === 'undefined') {
          util.progressTips('分支节点不存在')
        } else {
          this.painting = {
            width: 375,
            height: 624 + 148 * this.branchnum,
            clear: true,
            views: [
              {
                type: 'image',
                url: '../images/backgroud.png',
                top: 0,
                left: 0,
                width: 375,
                height: 624 + 148 * this.branchnum
              },
              {
                type: 'image',
                url: '../images/picsharehead.png',
                top: 0,
                left: 0,
                width: 375,
                height: 172
              }].concat(this.branchpainting).concat([
              {
                type: 'rect',
                background: '#f5f5f6',
                top: 180 + 148 * this.branchnum,
                left: 0,
                width: 375,
                height: 100
              },

              {
                type: 'text',
                content: '基础参数',
                fontSize: this.fontsize_title,
                color: '#212121',
                textAlign: 'left',
                top: 180 + 148 * this.branchnum,
                left: 150
              },
              {
                type: 'text',
                content: '业务类型:云专线',
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 200 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '业务名称:点到多点',
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 220 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '订单ID:' + this.globalPara.orderNumber,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 240 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '订单提交时间:' + this.globalPara.service_start_time,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 260 + 148 * this.branchnum,
                left: 50
              },

              {
                type: 'rect',
                background: '#f5f5f6',
                top: 288 + 148 * this.branchnum,
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
                top: 288 + 148 * this.branchnum,
                left: 150
              },
              {
                type: 'text',
                content: '业务联系人姓名:' + this.globalPara.business_name,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 308 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '业务联系人电话:' + this.globalPara.business_phone,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 328 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '业务联系人邮箱:' + this.globalPara.business_email,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 348 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '客户经理ID:' + (this.globalPara.business_managerID ? this.globalPara.business_managerID : '—'),
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 368 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '业务预计开通周期:' + this.globalPara.business_OpenTime,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 388 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '是否自动续约:' + (this.globalPara.business_IsRenew ? '是' : '否'),
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 408 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '预计业务结束周期:' + this.globalPara.service_end_time,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 428 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '业务服务缴费周期:' + this.globalPara.business_PaidCycle,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 448 + 148 * this.branchnum,
                left: 50
              },

              {
                type: 'rect',
                background: '#f5f5f6',
                top: 476 + 148 * this.branchnum,
                left: 0,
                width: 375,
                height: 140
              },

              {
                type: 'text',
                content: '中心节点',
                fontSize: this.fontsize_title,
                color: '#212121',
                textAlign: 'left',
                top: 476 + 148 * this.branchnum,
                left: 150
              },
              {
                type: 'text',
                content: '站点联系人:' + this.pointToMultiPoint.centerPoint.site_ContactName,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 496 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '站点联系人邮箱:' + this.pointToMultiPoint.centerPoint.site_ContactEmail,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 516 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '站点联系人电话:' + this.pointToMultiPoint.centerPoint.site_ContactPhone,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 536 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '站点地址:' + this.pointToMultiPoint.centerPoint.site_region.name + this.pointToMultiPoint.centerPoint.site_Street.name + this.pointToMultiPoint.centerPoint.site_DetailAddress,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 556 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: '服务固定带宽:' + this.pointToMultiPoint.centerPoint.site_SerBand,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 576 + 148 * this.branchnum,
                left: 50
              },
              {
                type: 'text',
                content: 'VLAN ID:' + this.pointToMultiPoint.centerPoint.site_VlanId,
                fontSize: this.fontsize_content,
                color: '#383549',
                textAlign: 'left',
                top: 596 + 148 * this.branchnum,
                left: 50
              }
            ])

          }
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
  .basicpara{
    padding-top: 15px;
  }
</style>
