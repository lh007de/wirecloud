<template>
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
          <p>站点地址：{{ site_A ? (site_A.address.area.name + site_A.address.street.name + site_A.address.address) : ''}}</p>
          <p>站点联系人：{{site_A ? site_A.contact.name : ''}}</p>
          <p>站点联系人邮箱：{{site_A ? site_A.contact.email : ''}}</p>
          <p>站点联系人电话：{{site_A? site_A.contact.mobile: ''}}</p>
        </view>
        <view slot="footer"></view>
      </i-card></swiper-item>
      <swiper-item><i-card title="Z端" style="width: 80%">
        <view slot="content">
          <p>站点地址：{{site_Z? (site_Z.address.area.name + site_Z.address.street.name + site_Z.address.address) : ''}}</p>
          <p>站点联系人：{{site_Z ? site_Z.contact.name : ''}}</p>
          <p>站点联系人邮箱：{{site_Z ? site_Z.contact.email : ''}}</p>
          <p>站点联系人电话：{{site_Z ? site_Z.contact.phone: ''}}</p>
        </view>
      </i-card></swiper-item>
    </swiper>

    <!--基础参数展示-->
    <div><i-card title="基础参数">
      <view slot="content">
        <p>业务类型：云专线</p>
        <p>业务名称：点到点</p>
        <p>订单ID：{{dataToEdit.data.basic.orderNumber}}</p>
        <p>服务宽带(M)：{{dataToEdit.data.basic.bandwidth}}</p>
        <p>携带划分VLAN：{{site_Z.vlanId ==='null'? '否':'是'}}</p>
        <p>订单提交时间：{{order_time}}</p>
      </view>
    </i-card></div>


    <!--全局参数展示-->
    <div style="padding-top: 20px"><i-card title="全局参数" >
      <view slot="content">
        <p>业务联系人姓名：{{dataToEdit.data.basic.contact.name}}</p>
        <p>业务联系人电话:{{dataToEdit.data.basic.contact.mobile}}</p>
        <p>业务联系人邮箱：{{dataToEdit.data.basic.contact.email}}</p>
        <p>客户经理ID：{{dataToEdit.data.basic.managerId}}</p>
        <p>业务预计开通周期：{{(dataToEdit.data.basic.period === 'one year') ? '1年':'2年'}}</p>
        <p>是否自动续约：{{dataToEdit.data.basic.renew ? '是': '否'}}</p>
        <p>预计业务结束时间：{{service_end_time}}</p>
        <p>业务服务缴费周期：{{(dataToEdit.data.basic.payMethod === 'year') ? '按年':'按月'}}</p>
      </view>
    </i-card></div>

    <i-button @click="formSubmitA" type="primary" shape="circle">提交</i-button>
    <i-button @click="edit" type="dashed" shape="circle">编辑</i-button>
  </div>
</template>
<script>
  import { formatTime } from '@/utils/index'
  import {mapGetters} from 'vuex'
  import util from '../../utils/index'
  export default {
    computed: {
      ...mapGetters({
        dataToEdit: 'exportDataToEdit',
        globalPara: 'exportGlobalPara',
        pointToPoint: 'exportPointToPoint'
      })
    },
    data () {
      return {
        order_time: formatTime(new Date()),
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        site_A: {
          address: {address: '', area: {}, street: {}},
          contact: {}
        },
        site_Z: {
          address: {address: '', area: {}, street: {}},
          contact: {},
          vlanId: ''
        },
        temp_A: {},
        temp_Z: {}
      }
    },
    mounted () {
      // this.site_data = this.dataToEdit.data.basic.sites
      // console.log('暂存草稿中站点信息', this.site_data)
      console.log('暂存草稿', this.dataToEdit)
      let tempsite = this.dataToEdit.data.basic.sites
      if ((tempsite !== null) && (tempsite.length !== 'undefined')) {
        for (let i = 0; i < tempsite.length; i++) {
          if (tempsite[i].master) {
            this.site_A = tempsite[i]
          } else {
            this.site_Z = tempsite[i]
          }
        }
      }
    },
    onUnload () {
      this.order_time = formatTime(new Date())
      this.indicatorDots = true
      this.autoplay = false
      this.interval = 5000
      this.duration = 1000
      this.site_A = {
        address: {address: '', area: {}, street: {}},
        contact: {}
      }
      this.site_Z = {
        address: {address: '', area: {}, street: {}},
        contact: {},
        vlanId: ''
      }
      this.temp_A = {}
      this.temp_Z = {}
    },
    methods: {
      formSubmitA (e) {
        console.log('待提交草稿', this.dataToEdit)
        let that = this
        let orderid = this.dataToEdit.data.basic.id
        wx.request({ // 提交数据
          url: 'http://10.220.98.168:8080/orders/' + orderid + 'submit',
          data: that.dataToEdit.data.basic,
          header: {
            'content-type': 'application/json', // 默认值
            'user_id': '1'
          },
          method: 'POST',
          success (res) {
            console.log(res.data)
            if (res.data.code === 200) {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 1000
              })
              setTimeout(function () {
                mpvue.navigateTo({url: '../../pages/ordermanage/main'})
              }, 1200)
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 1000
              })
            }
          },
          fail (res) {
            console.log(res.data)
          }
        })
      },
      edit (e) { // 修改草稿
        let that = this
        console.log('待修改数据', that.dataToEdit)
        // 这里要进行数据转换
        if (that.dataToEdit.data.basic.sites !== null) { // 草稿中存在站点格式的数据
          that.$set(that.globalPara, 'business_name', that.dataToEdit.data.basic.contact.name)
          that.$set(that.globalPara, 'business_phone', that.dataToEdit.data.basic.contact.mobile)
          that.$set(that.globalPara, 'business_email', that.dataToEdit.data.basic.contact.email)
          that.$set(that.globalPara, 'business_managerID', that.dataToEdit.data.basic.managerId)
          that.$set(that.globalPara, 'business_OpenTime', (that.dataToEdit.data.basic.period === 'one year') ? '1年' : '2年')
          that.$set(that.globalPara, 'business_IsRenew', that.dataToEdit.data.basic.renew)
          that.$set(that.globalPara, 'business_PaidCycle', (that.dataToEdit.data.basic.payMethod === 'month') ? '按月' : '按年')
          that.$set(that.globalPara, 'business_type', (that.dataToEdit.data.basic.bizType === 'p2p') ? '点到点' : '点到多点')
          that.$set(that.globalPara, 'business_band', that.dataToEdit.data.basic.bandwidth)
          that.$set(that.globalPara, 'orderId', that.dataToEdit.data.basic.id)
          that.$set(that.globalPara, 'orderNumber', that.dataToEdit.data.basic.orderNumber)
          that.$set(that.globalPara, 'service_start_time', that.dataToEdit.data.basic.openDate)
          that.$set(that.globalPara, 'service_end_time', that.dataToEdit.data.basic.realEndDate)

          for (let i = 0; i < that.dataToEdit.data.basic.sites.length; i++) {
            if (that.dataToEdit.data.basic.sites[i].master) {
              that.temp_A = that.dataToEdit.data.basic.sites[i]
            } else {
              that.temp_Z = that.dataToEdit.data.basic.sites[i]
            }
          }
          that.$set(that.globalPara, 'business_IsVlan', (that.temp_Z.vlanId === 'null') ? '否' : '是')
          that.$set(that.globalPara, 'business_VlanId', (that.temp_Z.vlanId === 'null') ? '—' : that.temp_Z.vlanId)

          // 传递点到点
          if (typeof (that.temp_A.address) !== 'undefined') {
            that.$set(that.pointToPoint.pointA, 'site_region', [that.temp_A.address.area.name, that.temp_A.address.street.name])
            that.$set(that.pointToPoint.pointA, 'site_DetailAddress', that.temp_A.address.address)
            that.$set(that.pointToPoint.pointA, 'site_ContactName', that.temp_A.contact.name)
            that.$set(that.pointToPoint.pointA, 'site_ContactEmail', that.temp_A.contact.email)
            that.$set(that.pointToPoint.pointA, 'site_ContactPhone', that.temp_A.contact.mobile)
          } else {
            util.progressTips('A点站址不存在,请补充')
            that.$set(that.pointToPoint.pointA, 'site_region', [])
            that.$set(that.pointToPoint.pointA, 'site_DetailAddress', '')
            that.$set(that.pointToPoint.pointA, 'site_ContactName', '')
            that.$set(that.pointToPoint.pointA, 'site_ContactEmail', '')
            that.$set(that.pointToPoint.pointA, 'site_ContactPhone', '')
          }
          if (typeof (that.temp_Z.address) !== 'undefined') {
            that.$set(that.pointToPoint.pointZ, 'site_region', [that.temp_Z.address.area.name, that.temp_Z.address.street.name])
            that.$set(that.pointToPoint.pointZ, 'site_DetailAddress', that.temp_Z.address.address)
            that.$set(that.pointToPoint.pointZ, 'site_ContactName', that.temp_Z.contact.name)
            that.$set(that.pointToPoint.pointZ, 'site_ContactEmail', that.temp_Z.contact.email)
            that.$set(that.pointToPoint.pointZ, 'site_ContactPhone', that.temp_Z.contact.mobile)
          } else {
            util.progressTips('Z点站址不存在，请补充')
            that.$set(that.pointToPoint.pointZ, 'site_region', [])
            that.$set(that.pointToPoint.pointZ, 'site_DetailAddress', '')
            that.$set(that.pointToPoint.pointZ, 'site_ContactName', '')
            that.$set(that.pointToPoint.pointZ, 'site_ContactEmail', '')
            that.$set(that.pointToPoint.pointZ, 'site_ContactPhone', '')
          }

          const url = '../../pages/index/main' // 前往创建订单页面，进行修改
          mpvue.switchTab({url})
          // setTimeout(function () {
          //   mpvue.navigateTo({url})
          // }, 2000)
        } else {
          util.progressTips('站点数据格式有问题，无法解析，请删除后，重新下单')
        }
      }
    }
  }
</script>

<style>
  .showbasePara {
    border-radius: 5px;
    border: lightgrey;
    border-style: solid;
    border-width: 1px;
    font-size: 14px;
    font-family: "PingFang SC","Helvetica Neue", Helvetica,  "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #657180;
    height: 420px;
    width: 90%;
    align-items: center;
    padding-left: 15px;
    padding-top: 15px;
  }
</style>
