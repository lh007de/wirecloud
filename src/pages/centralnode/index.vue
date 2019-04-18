<template>
  <div>
    <form :class="container" @submit="formSubmitA">
      <div style="display: flex; padding-top: 8px">
        <label style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family: PingFang;color: #464c5b">业务类型：云专线</label>
        <label style=" width:50%;display:inline-block;font-size:14px;padding-right:15px;font-family:PingFang;color: #464c5b;text-align: right">业务名称：点到多点</label>
      </div>

      <div class="section" style="display: flex; padding-top: 5px">
        <div class="section__title" style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family:PingFang;color: #464c5b">站点地区</div>
        <picker
          mode="selector"
          @change="bindRegionChange"
          :value="regionIndex"
          :range="regionArray"
          style=" width: 50%; display: inline-block; font-size: 14px;padding-right: 15px;font-family:PingFang;color: #657180;text-align: right"
        >
          <div>{{regionArray[regionIndex]}}</div>

        </picker>
      </div>
      <div class="section" style="display: flex; padding-top: 5px">
        <div class="section__title" style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family:PingFang;color: #464c5b">站点街道</div>
        <picker
          mode="selector"
          @change="bindStreetChange"
          :value="streetIndex"
          :range="streetArray"
          style=" width: 50%; display: inline-block; font-size: 14px;padding-right: 15px;font-family:PingFang;color: #657180;text-align: right"
        >
          <div>{{streetArray[streetIndex]}}</div>

        </picker>
      </div>
      <i-input  type="text" :value="pointToMultiPoint.centerPoint.site_DetailAddress" :maxlength="100"right title="站点详细地址" placeholder="请输入详细地址"  @change="siteaddressChange" autofocus />

      <div>
        <i-input  type="text" :value="pointToMultiPoint.centerPoint.site_ContactName" :maxlength="10"right title="站点联系人姓名" placeholder="请输入姓名" @change="sitenameChange"  autofocus />
        <i-input  type="email" :value="pointToMultiPoint.centerPoint.site_ContactEmail" :maxlength="50" right title="站点联系人邮箱" placeholder="请输入邮箱" @change="siteemailChange" autofocus/>
        <i-input  type="phone" :value="pointToMultiPoint.centerPoint.site_ContactPhone" :maxlength="50"right title="站点联系人电话" placeholder="请输入电话" @change="sitephoneChange" autofocus/>
      </div>

      <div>
        <i-input  type="text" :value="pointToMultiPoint.centerPoint.site_SerBand" right title="服务宽带" disabled="true" placeholder="—" autofocus />
        <i-input  type="text" :value="pointToMultiPoint.centerPoint.site_VlanId" right title="VLAN ID" disabled="true" placeholder="—"  autofocus />
      </div>

      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">下一步</i-button>
    </form>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import util from '../../utils/index'
  export default {
    mounted () {
      // 这里要请求重庆地区和街道
      let that = this
      wx.request({
        url: 'http://10.220.98.168:8080/districts/500100/children/',
        header: {
          'content-type': 'application/json', // 默认值
          'user_id': '1'
        },
        method: 'GET',
        success (res) {
          if (res.data.code === 200) {
            that.regin = res.data.data
            that.$set(that.pointToMultiPoint.centerPoint, 'site_region', that.regin[0])
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
            that.$set(that.pointToMultiPoint.centerPoint, 'site_Street', that.street[0])
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
    onUnload () {
      console.log('要离开了，好怀念')
    },
    computed: {
      ...mapGetters({
        pointToMultiPoint: 'exportPointToMultiPoint'
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
      formSubmit (e) {
        // console.log('中心节点携带数据为：', this.pointToMultiPoint)
        const url = '../../pages/branchnode/main'
        mpvue.navigateTo({url})
      },
      bindRegionChange (e) {
        this.regionIndex = e.mp.detail.value
        this.$set(this.pointToMultiPoint.centerPoint, 'site_region', this.regin[this.regionIndex])
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
        this.$set(this.pointToMultiPoint.centerPoint, 'site_Street', this.street[this.streetIndex])
      },
      siteaddressChange (e) {
        this.$set(this.pointToMultiPoint.centerPoint, 'site_DetailAddress', e.mp.detail.detail.value)
      },
      sitenameChange (e) {
        this.$set(this.pointToMultiPoint.centerPoint, 'site_ContactName', e.mp.detail.detail.value)
      },
      siteemailChange (e) {
        this.siteemail = e.mp.detail.detail.value
        this.$set(this.pointToMultiPoint.centerPoint, 'site_ContactEmail', e.mp.detail.detail.value)
      },
      sitephoneChange (e) {
        this.$set(this.pointToMultiPoint.centerPoint, 'site_ContactPhone', e.mp.detail.detail.value)
      }
    }

  }
</script>

<style>
</style>
