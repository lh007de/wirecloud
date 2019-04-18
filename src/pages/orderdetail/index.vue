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
          <p>站点地址：{{pointToPoint.pointA.site_region.name + pointToPoint.pointA.site_Street.name + pointToPoint.pointA.site_DetailAddress}}</p>
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

    <!--基础参数展示-->
    <div><i-card title="基础参数">
      <view slot="content">
        <p>业务类型：云专线</p>
        <p>业务名称：点到点</p>
        <p>订单ID：{{order_id}}</p>
        <p>服务宽带(M)：{{globalPara.business_band}}</p>
        <p>携带划分VLAN：{{globalPara.business_IsVlan ? '是': '否'}}</p>
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

    <i-button @click="formSubmitA" type="primary" shape="circle">提交</i-button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        pointToPoint: 'exportPointToPoint',
        globalPara: 'exportGlobalPara'
      })},
    data () {
      return {
        order_id: '—',
        order_time: '—',
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        service_end_time: '',
        service_start_time: ''
      }
    },
    mounted () {
      console.log('测试', this.pointToPoint)
      const date = new Date()
      this.service_start_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
      const endyear = date.getFullYear() + parseInt(this.globalPara.business_OpenTime)
      this.service_end_time = endyear + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
      this.$set(this.globalPara, 'service_start_time', this.service_start_time)
      this.$set(this.globalPara, 'service_end_time', this.service_end_time)
    },
    methods: {
      formSubmitA (e) {
        // 提交到后台
        let that = this
        // 这里区分是创建提交还是草稿提交
        if (this.globalPara.orderId) {
          let orderid = this.globalPara.orderId
          wx.request({ // 提交数据
            url: 'http://10.220.98.168:8080/orders/' + orderid + '/submit',
            data: {
              'bizType': 'p2p',
              'contact': { // 全局参数
                'email': this.globalPara.business_email,
                'mobile': this.globalPara.business_phone,
                'name': this.globalPara.business_name
              },
              'managerId': this.globalPara.business_managerID,
              'payMethod': this.globalPara.business_PaidCycle === '按年' ? 'year' : 'month',
              'period': this.globalPara.business_OpenTime === '2年' ? 'two year' : 'one year',
              'renew': this.globalPara.business_IsRenew,
              'orderNumber': this.globalPara.orderNumber,
              'id': this.globalPara.orderId,
              'sites': [
                {
                  'address': {
                    'address': this.pointToPoint.pointA.site_DetailAddress,
                    'area': {
                      'name': this.pointToPoint.pointA.site_region[0] + this.pointToPoint.pointA.site_region[1]
                    },
                    'street': {
                      'name': this.pointToPoint.pointA.site_region[2]
                    }
                  },
                  'contact': {
                    'email': this.pointToPoint.pointA.site_ContactEmail,
                    'mobile': this.pointToPoint.pointA.site_ContactPhone,
                    'name': this.pointToPoint.pointA.site_ContactName
                  },
                  'master': true // 标志是否A端 或者是中心节点
                },
                {
                  'address': {
                    'address': this.pointToPoint.pointZ.site_DetailAddress,
                    'area': {
                      'name': this.pointToPoint.pointZ.site_region[0] + this.pointToPoint.pointZ.site_region[1]
                    },
                    'street': {
                      'name': this.pointToPoint.pointZ.site_region[2]
                    }
                  },
                  'bandwidth': this.globalPara.business_band,
                  'contact': {
                    'email': this.pointToPoint.pointZ.site_ContactEmail,
                    'mobile': this.pointToPoint.pointZ.site_ContactPhone,
                    'name': this.pointToPoint.pointZ.site_ContactName
                  },
                  'master': false, // 标志是否A端 或者是中心节点
                  'vlanId': this.globalPara.business_IsVlan ? this.globalPara.business_VlanId : ''
                }
              ]
            },
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
              setTimeout(function () {
                const url = '../../pages/ordercommiteddetail/main'
                mpvue.navigateTo({url})
              }, 2000)
            },
            fail (res) {
              console.log(res.data)
            }
          })
        } else {
          wx.request({ // 提交数据
            url: 'http://10.220.98.168:8080/orders/submit',
            data: {
              'bizType': 'p2p',
              'contact': { // 全局参数
                'email': this.globalPara.business_email,
                'mobile': this.globalPara.business_phone,
                'name': this.globalPara.business_name
              },
              'managerId': this.globalPara.business_managerID,
              'payMethod': this.globalPara.business_PaidCycle === '按年' ? 'year' : 'month',
              'period': this.globalPara.business_OpenTime === '2年' ? 'two year' : 'one year',
              'renew': this.globalPara.business_IsRenew,
              'sites': [
                {
                  'address': {
                    'address': this.pointToPoint.pointA.site_DetailAddress,
                    'area': {
                      'code': this.pointToPoint.pointA.site_region.code,
                      'name': this.pointToPoint.pointA.site_region.name
                    },
                    'street': {
                      'code': this.pointToPoint.pointA.site_Street.code,
                      'name': this.pointToPoint.pointA.site_Street.name
                    }
                  },
                  'contact': {
                    'email': this.pointToPoint.pointA.site_ContactEmail,
                    'mobile': this.pointToPoint.pointA.site_ContactPhone,
                    'name': this.pointToPoint.pointA.site_ContactName
                  },
                  'master': true // 标志是否A端 或者是中心节点
                },
                {
                  'address': {
                    'address': this.pointToPoint.pointZ.site_DetailAddress,
                    'area': {
                      'code': this.pointToPoint.pointZ.site_region.code,
                      'name': this.pointToPoint.pointZ.site_region.name
                    },
                    'street': {
                      'code': this.pointToPoint.pointZ.site_Street.code,
                      'name': this.pointToPoint.pointZ.site_Street.name
                    }
                  },
                  'bandwidth': this.globalPara.business_band,
                  'contact': {
                    'email': this.pointToPoint.pointZ.site_ContactEmail,
                    'mobile': this.pointToPoint.pointZ.site_ContactPhone,
                    'name': this.pointToPoint.pointZ.site_ContactName
                  },
                  'master': false, // 标志是否A端 或者是中心节点
                  'vlanId': this.globalPara.business_IsVlan ? this.globalPara.business_VlanId : ''
                }
              ]
            },
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
              that.$set(that.globalPara, 'orderId', res.data.data.id)
              that.$set(that.globalPara, 'orderNumber', res.data.data.orderNumber)
              setTimeout(function () {
                const url = '../../pages/ordercommiteddetail/main'
                mpvue.navigateTo({url})
              }, 2000)
            },
            fail (res) {
              console.log(res.data)
            }
          })
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
