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
          <p>站点地址：{{ site_A ? site_A.address.address : ''}}</p>
          <p>站点联系人：{{site_A ? site_A.contact.name : ''}}</p>
          <p>站点联系人邮箱：{{site_A ? site_A.contact.email : ''}}</p>
          <p>站点联系人电话：{{site_A? site_A.contact.mobile: ''}}</p>
        </view>
        <view slot="footer"></view>
      </i-card></swiper-item>
      <swiper-item><i-card title="Z端" style="width: 80%">
        <view slot="content">
          <p>站点地址：{{site_Z? site_Z.address.address : ''}}</p>
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
  // import util from '../../utils/index'
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
        site_A: {
          address: {},
          contact: {}
        },
        site_Z: {
          address: {},
          contact: {},
          vlanId: ''
        }
      }
    },
    mounted () {
      // this.site_data = this.dataToEdit.data.basic.sites
      // console.log('暂存草稿中站点信息', this.site_data)
      console.log('暂存草稿', this.dataToEdit)
      let tempsite = this.dataToEdit.data.basic.sites
      for (let i = 0; i < tempsite.length; i++) {
        if (tempsite[i].master) {
          this.site_A = tempsite[i]
        } else {
          this.site_Z = tempsite[i]
        }
      }
      console.log('A端', this.site_A)
      console.log('Z端', this.site_Z)
    },
    onUnload () {
      console.log('离开了，我想刷新数据')
    },
    methods: {
      formSubmitA (e) {
        console.log('待提交草稿', this.dataToEdit)
        // let orderid = this.dataToEdit.data.basic.id
        let that = this
        wx.request({ // 提交数据
          url: 'http://10.220.98.168:8080/orders/submit',
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
            }
          },
          fail (res) {
            console.log(res.data)
          }
        })
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
