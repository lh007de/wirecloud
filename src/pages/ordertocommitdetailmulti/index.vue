<template>
  <div>
    <div v-if="swiperdata.length">
      <swiper :indicator-dots="indicatorDots"
              :duration="2000"
              :current-item-id="currentitem"
              :autoplay="true"
              @change="onSlideChangeEnd"
              circular="true"
              style=" padding-top: 10px"
              indicator-active-color="#8A2BE2">
        <div v-for = "(item,index) in swiperdata" :key="index" >
          <swiper-item>
            <i-card :title="'分支节点'+(index+1)" style="width: 90%">
              <div slot="content">
                <p>站点联系人：{{item.contact.name}}</p>
                <p>站点联系人邮箱：{{item.contact.email}}</p>
                <p>站点联系人电话：{{item.contact.mobile}}</p>
                <p>站点地址：{{item.address.area.name+item.address.street.name+item.address.address}}</p>
                <p>宽带：{{item.bandwidth}}</p>
                <p>VLAN ID：{{item.vlanId}}</p>
              </div>
            </i-card>
          </swiper-item>
        </div>
      </swiper>
    </div>


    <!--基础参数展示-->
    <div>
      <i-card title="基础参数">
      <view slot="content">
        <p>业务类型：云专线</p>
        <p>业务名称：点到多点</p>
        <p>业务ID：{{dataToEdit.data.basic.orderNumber}}</p>
        <p>订单提交时间：{{order_time}}</p>
      </view>
    </i-card>
    </div>


    <!--全局参数展示-->
    <div style="padding-top: 20px"><i-card title="全局参数" >
      <view slot="content">
        <p>业务联系人姓名：{{dataToEdit.data.basic.contact.name}}</p>
        <p>业务联系人电话:{{dataToEdit.data.basic.contact.mobile}}</p>
        <p>业务联系人邮箱：{{dataToEdit.data.basic.contact.email}}</p>
        <p>客户经理ID：{{dataToEdit.data.basic.managerId}}</p>
        <p>业务预计开通周期：{{(dataToEdit.data.basic.period === 'one year')? '1年':'2年'}}</p>
        <p>是否自动续约：{{dataToEdit.data.basic.renew ? '是': '否'}}</p>
        <p>预计业务结束时间：{{service_end_time}}</p>
        <p>业务服务缴费周期：{{(dataToEdit.data.basic.payMethod === 'year')? '按年': '按月'}}</p>
      </view>
    </i-card></div>



    <!--中心节点展示-->
    <div style="padding-top: 20px">
      <i-card title="中心节点" style="width: 90%">
        <div slot="content">
          <p>站点联系人：{{(centerSites.length === undefined) ? '': centerSites.contact.name}}</p>
          <p>站点联系人邮箱：{{(centerSites.length === undefined) ? '': centerSites.contact.email}}</p>
          <p>站点联系人电话：{{(centerSites.length === undefined) ? '': centerSites.contact.mobile}}</p>
          <p>站点地址：{{(centerSites.length === undefined) ? '': centerSites.address.area.name+centerSites.address.street.name+centerSites.address.address }}</p>
          <p>宽带：{{dataToEdit.data.basic.bandwidth}}</p>
          <p>VLAN ID：{{vlanid}}</p>
        </div>
      </i-card>
    </div>

    <i-button @click="formSubmitA " type="primary" shape="circle">提交</i-button>
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
        pointToMultiPoint: 'exportPointToMultiPoint'
      })
    },
    data () {
      return {
        order_time: formatTime(new Date()),
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        service_end_time: formatTime(new Date()),
        swiperdata: [],
        branch: [],
        centerSites: {},
        vlanid: []
      }
    },
    onUnload () {
      this.order_time = formatTime(new Date())
      this.indicatorDots = true
      this.autoplay = false
      this.interval = 5000
      this.duration = 1000
      this.service_end_time = formatTime(new Date())
      this.swiperdata = []
      this.centerSites = {}
      this.vlanid = []
      this.branch = []
    },
    mounted () {
      console.log('点到多点传过来的数据', this.dataToEdit)
      // 把数据分为中心节点和分支节点
      let tempsite = {} // 存储节点数据
      if (this.dataToEdit.data.basic.sites !== null) {
        tempsite = this.dataToEdit.data.basic.sites
        for (let i = 0; i < tempsite.length; i++) {
          if (tempsite[i].master) {
            this.centerSites = tempsite[i]
          } else {
            this.vlanid.push(tempsite[i].vlanId)
            this.swiperdata.push(tempsite[i])
          }
        }
        this.vlanid = this.vlanid.toString()
        // 中心节点检测
        if (this.centerSites.length === undefined) {
          util.progressTips('中心节点不存在，请编辑')
        }
        // 分支节点检测
        if (this.swiperdata.length === undefined) {
          util.progressTips('分支节点不存在，请编辑')
        }
      } else {
        util.progressTips('站点数据不存在，请完善')
      }
    },
    methods: {
      formSubmitA (e) {
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
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 1000
              })
              setTimeout(function () {
                mpvue.navigateTo({url: '../../pages/ordermanage/main'})
              }, 1200)
            }
          },
          fail (res) {
            util.progressTips('提交失败，请稍后重试')
          }
        })
      },
      edit (e) {
        let that = this
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
          that.$set(that.globalPara, 'business_IsVlan', '是')
          that.$set(that.globalPara, 'business_VlanId', that.vlanid)

          // 传递中心节点
          if (typeof (that.centerSites.length) !== 'undefined') {
            that.$set(that.pointToMultiPoint.centerPoint, 'site_region', [that.centerSites.address.area.name, that.centerSites.address.street.name])
            that.$set(that.pointToMultiPoint.centerPoint, 'site_DetailAddress', that.centerSites.address.address)
            that.$set(that.pointToMultiPoint.centerPoint, 'site_ContactName', that.centerSites.contact.name)
            that.$set(that.pointToMultiPoint.centerPoint, 'site_ContactEmail', that.centerSites.contact.email)
            that.$set(that.pointToMultiPoint.centerPoint, 'site_ContactPhone', that.centerSites.contact.mobile)
            that.$set(that.pointToMultiPoint.centerPoint, 'site_SerBand', that.dataToEdit.data.basic.bandwidth)
            that.$set(that.pointToMultiPoint.centerPoint, 'site_VlanId', that.vlanid)
          } else {
            that.$set(that.pointToMultiPoint.centerPoint, 'site_region', [])
            that.$set(that.pointToMultiPoint.centerPoint, 'site_DetailAddress', '')
            that.$set(that.pointToMultiPoint.centerPoint, 'site_ContactName', '')
            that.$set(that.pointToMultiPoint.centerPoint, 'site_ContactEmail', '')
            that.$set(that.pointToMultiPoint.centerPoint, 'site_ContactPhone', '')
            that.$set(that.pointToMultiPoint.centerPoint, 'site_SerBand', '')
            that.$set(that.pointToMultiPoint.centerPoint, 'site_VlanId', '')
          }
          console.log('分支节点数据', that.swiperdata)
          if (that.swiperdata.length !== 'undefined') {
            for (let item of that.swiperdata) {
              let tempdata = {
                'site_region': item.address.area.name,
                'site_DetailAddress': item.address.address,
                'site_ContactName': item.contact.name,
                'site_ContactEmail': item.contact.email,
                'site_ContactPhone': item.contact.mobile,
                'site_SerBand': item.bandwidth,
                'site_VlanId': item.vlanId
              }
              that.branch.push(tempdata)
            }
            console.log('组织好的分支节点信息', that.branch)
            this.$set(this.pointToMultiPoint, 'branchPoint', that.branch)
          } else {
            util.progressTips('分支节点不存在，请编辑')
          }
          const url = '../../pages/index/main' // 前往创建订单页面，进行修改
          mpvue.switchTab({url})
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
