<template>
  <div>
    <swiper :indicator-dots="indicatorDots"
            :duration="2000"
            :current-item-id="currentitem"
            :autoplay="true"
            @change="onSlideChangeEnd"
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
              <p>站点地址：{{item.site_DetailAddress}}</p>
              <p>宽带：{{item.site_SerBand}}</p>
              <p>VLAN ID：{{item.site_VlanId}}</p>
            </div>
          </i-card>
        </swiper-item>
      </div>
    </swiper>

    <!--基础参数展示-->
    <div><i-card title="基础参数">
      <view slot="content">
        <p>业务类型：云专线</p>
        <p>业务名称：点到多点</p>
        <p>业务ID：{{order_id}}</p>
        <p>订单提交时间：{{order_time}}</p>
      </view>
    </i-card></div>


    <!--全局参数展示-->
    <div style="padding-top: 20px"><i-card title="全局参数" >
      <view slot="content">
        <p>业务联系人姓名：{{globalPara.business_name}}</p>
        <p>业务联系人电话:{{globalPara.business_phone}}</p>
        <p>业务联系人邮箱：{{globalPara.business_email}}</p>
        <p>客户经理ID：{{globalPara.business_managerID}}</p>
        <p>业务预计开通周期：{{globalPara.business_OpenTime}}</p>
        <p>是否自动续约：{{globalPara.business_IsRenew ? '是': '否'}}</p>
        <p>预计业务结束时间：{{service_end_time}}</p>
        <p>业务服务缴费周期：{{globalPara.business_PaidCycle}}</p>
      </view>
    </i-card></div>



    <!--中心节点展示-->
    <div style="padding-top: 20px">
      <i-card title="中心节点" style="width: 90%">
        <div slot="content">
          <p>站点联系人：{{pointToMultiPoint.centerPoint.site_ContactName}}</p>
          <p>站点联系人邮箱：{{pointToMultiPoint.centerPoint.site_ContactEmail}}</p>
          <p>站点联系人电话：{{pointToMultiPoint.centerPoint.site_ContactPhone}}</p>
          <p>站点地址：{{pointToMultiPoint.centerPoint.site_DetailAddress}}</p>
          <p>宽带：{{serviceBand}}</p>
          <p>VLAN ID：{{serviceVlanId}}</p>
        </div>
      </i-card>
    </div>

    <i-button @click="formSubmitA " type="primary" shape="circle">提交</i-button>
  </div>
</template>
<script>
  import { formatTime } from '@/utils/index'
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        pointToMultiPoint: 'exportPointToMultiPoint',
        globalPara: 'exportGlobalPara'
      })},
    data () {
      return {
        order_id: '—',
        order_time: formatTime(new Date()),
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        service_end_time: '',
        serviceBand: 0,
        serviceVlanId: ''

      }
    },
    mounted () {
      const date = new Date()
      const endyear = date.getFullYear() + parseInt(this.globalPara.business_OpenTime)
      this.service_end_time = endyear + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
      for (let item of this.pointToMultiPoint.branchPoint) {
        this.serviceBand += parseInt(item.site_SerBand)
        this.serviceVlanId = this.serviceVlanId + item.site_VlanId + ' '
      }
    },
    methods: {
      formSubmitA (e) {
        // 提交数据
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
