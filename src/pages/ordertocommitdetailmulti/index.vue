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
                <p>站点地址：{{item.address.address}}</p>
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
          <p>站点地址：{{(centerSites.length === undefined) ? '': centerSites.address.address}}</p>
          <p>宽带：{{bandwidthcom}}</p>
          <p>VLAN ID：{{this.vlanid}}</p>
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
  export default {
    computed: {
      ...mapGetters({
        dataToEdit: 'exportDataToEdit'
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
        centerSites: {},
        bandwidthcom: 0,
        vlanid: []
      }
    },
    mounted () {
      console.log('点到多点传过来的数据', this.dataToEdit)
      // 把数据分为中心节点和分支节点
      let tempsite = this.dataToEdit.data.basic.sites
      for (let i = 0; i < tempsite.length; i++) {
        if (tempsite[i].master) {
          this.centerSites = tempsite[i]
        } else {
          this.bandwidthcom += parseInt(tempsite[i].bandwidth)
          this.vlanid.push(tempsite[i].vlanId)
          this.swiperdata.push(tempsite[i])
        }
      }
      this.vlanid = this.vlanid.toString()
      console.log('中心节点', this.centerSites.length === undefined)
      console.log('分支节点', this.swiperdata)
      console.log('分支vlanid', this.vlanid)
    },
    methods: {
      formSubmitA (e) {
        console.log('form发生了submit事件，携带数据为：', e)
        // A端数据暂存
        //  前往Z端页面
        // const url = '../../pages/ordershare/main'
        // mpvue.navigateTo({url})
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
