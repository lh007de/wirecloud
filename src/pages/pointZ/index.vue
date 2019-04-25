<template>
  <div class="containner">
    <div class="title">
      <label  class="text" >业务类型：云专线</label>
      <label  class="text" >业务名称：点到点</label>
    </div>

    <div class="section">
      <label class="label">站点地区</label>
      <picker
        mode="selector"
        @change="bindRegionChange"
        :value="regionIndex"
        :range="regionArray"
        class="picker"
      >
        <div>{{regionArray[regionIndex]}}</div>
      </picker>
      <div class="divide"></div>
      <label class="label">站点街道</label>
      <picker
        mode="selector"
        @change="bindStreetChange"
        :value="streetIndex"
        :range="streetArray"
        class="picker"
      >
        <div>{{streetArray[streetIndex]}}</div>

      </picker>
      <div class="divide"></div>
      <i-input  type="text" :value="pointToPoint.pointZ.site_DetailAddress" :maxlength="100"right title="站点详细地址" placeholder="请输入详细地址" @change="siteaddressChange" autofocus />
    </div>


    <div class="contact">
      <i-input type="text" :value="pointToPoint.pointZ.site_ContactName" :maxlength="10"right title="站点联系人姓名" placeholder="请输入姓名" @change="sitenameChange" autofocus />
      <div class="divide"></div>
      <i-input type="email" :value="pointToPoint.pointZ.site_ContactEmail" :maxlength="50" right title="站点联系人邮箱" placeholder="请输入邮箱" @change="siteemailChange" autofocus/>
      <div class="divide"></div>
      <i-input type="phone" :value="pointToPoint.pointZ.site_ContactPhone" :maxlength="50"right title="站点联系人电话" placeholder="请输入电话" @change="sitephoneChange"  autofocus/>
    </div>
    <div class="line-divide"></div>
    <i-button @click="formSubmitA" type="primary" shape="circle">下一步</i-button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import util from '../../utils/index'
  export default {
    mounted () {
      // 这里要请求重庆地区和街道
      let that = this
      wx.request({ // 获取订单列表
        url: 'http://10.220.98.168:8080/districts/500100/children/',
        header: {
          'content-type': 'application/json', // 默认值
          'user_id': '1'
        },
        method: 'GET',
        success (res) {
          if (res.data.code === 200) {
            that.regin = res.data.data
            that.$set(that.pointToPoint.pointZ, 'site_region', that.regin[0])
            that.regin.forEach(function (item) {
              that.regionArray.push(item.name)
            })
          } else {
            util.progressTips('获取重庆区域失败，请稍后重试')
          }
        },
        fail (res) {
          console.log(res.data)
        }
      })
      wx.request({ // 初始万州区街道
        url: 'http://10.220.98.168:8080/districts/500101/children/',
        header: {
          'content-type': 'application/json', // 默认值
          'user_id': '1'
        },
        method: 'GET',
        success (res) {
          if (res.data.code === 200) {
            that.street = res.data.data
            that.$set(that.pointToPoint.pointZ, 'site_Street', that.street[0])
            that.street.forEach(function (item) {
              that.streetArray.push(item.name)
            })
          } else {
            util.progressTips('获取重庆区域失败，请稍后重试')
          }
        },
        fail (res) {
          console.log(res.data)
        }
      })
    },
    computed: {
      ...mapGetters({
        pointToPoint: 'exportPointToPoint'
      })},
    data () {
      return {
        regionIndex: 0,
        regin: [],
        regionArray: [],
        streetIndex: 0,
        street: [],
        streetArray: []
      }
    },
    methods: {
      formSubmitA (e) {
        console.log(this.pointToPoint)
        const url = '../../pages/orderdetail/main'
        mpvue.navigateTo({url})
      },
      bindRegionChange (e) {
        this.regionIndex = e.mp.detail.value
        this.$set(this.pointToPoint.pointZ, 'site_region', this.regin[this.regionIndex])
        // 区域改变，重新请求街道
        let that = this
        wx.request({ // 初始万州区街道
          url: 'http://10.220.98.168:8080/districts/' + that.regin[that.regionIndex].code + '/children/',
          header: {
            'content-type': 'application/json', // 默认值
            'user_id': '1'
          },
          method: 'GET',
          success (res) {
            if (res.data.code === 200) {
              that.street = []
              that.streetArray = []
              that.street = res.data.data
              that.street.forEach(function (item) {
                that.streetArray.push(item.name)
              })
            } else {
              util.progressTips('获取街道失败，请稍后重试')
            }
          },
          fail (res) {
            util.progressTips('获取街道失败，请稍后重试')
          }
        })
      },
      bindStreetChange (e) {
        this.streetIndex = e.mp.detail.value
        this.$set(this.pointToPoint.pointZ, 'site_Street', this.street[this.streetIndex])
      },
      siteaddressChange (e) {
        this.siteaddress = e.mp.detail.detail.value
        this.$set(this.pointToPoint.pointZ, 'site_DetailAddress', this.siteaddress)
      },
      sitenameChange (e) {
        this.sitename = e.mp.detail.detail.value
        this.$set(this.pointToPoint.pointZ, 'site_ContactName', this.sitename)
      },
      siteemailChange (e) {
        this.siteemail = e.mp.detail.detail.value
        this.$set(this.pointToPoint.pointZ, 'site_ContactEmail', this.siteemail)
      },
      sitephoneChange (e) {
        this.sitephone = e.mp.detail.detail.value
        this.$set(this.pointToPoint.pointZ, 'site_ContactPhone', this.sitephone)
      }
    }

  }
</script>

<style>
  .containner{
    background-color: #f8f8f9 ;
    color: #464c5b;
    font-family: PingFang;
    font-size: 28rpx;
    width: 750rpx;
    height: 1334rpx;
  }
  .title{
    height: 80rpx;
    background-color: white;
    display: flex;
    align-items: center;
  }
  .text{
    padding-left: 15px;
    float: left;
  }
  .section{
    background-color:  #f8f8f9;
    margin-top: 30rpx;
    background-color: white;
    line-height: 80rpx;
  }
  .label{
    float:left;
    padding-left: 30rpx;
  }
  .picker{
    float:right;
    padding-right: 30rpx;
  }
  .contact{
    margin-top: 30rpx;
  }
  .divide{
    clear: both;
    width: 690rpx;
    height: 1rpx;
    border-bottom: 1rpx solid #e9eaec;
    margin-left: 30rpx;
  }
  .line-divide{
    height: 80rpx;
    background-color: #f8f8f9;
  }
</style>
