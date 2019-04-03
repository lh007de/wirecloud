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
    </i-card></div>

    <i-button @click="formSubmitA" type="primary" shape="circle">提交</i-button>
  </div>
</template>
<script>
  import { formatTime } from '@/utils/index'
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
        service_payment_cycle: '按年'

      }
    },
    mounted () {
      // let storageA = (mpvue.getStorageSync('storageA') || [])
      // if (storageA) { this.storageA = storageA } else {
      //   console.log('A端数据读取失败')
      // },

      // let storageZ = (mpvue.getStorageSync('storageZ') || [])
      // if (storageZ) { this.storageA = storageZ } else {
      //   console.log('Z端数据读取失败')
      // }
      // console.log(storageA.site_phone)
      // storageA.site_phone = '88888888888'
      // mpvue.setStorageSync('storageA', storageA)
      // console.log(storageA)
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
