<template>
  <div class="containner">
      <div class="text">
      <label >业务类型：云专线</label>
    </div>

      <div class="business">
        <i-input  i-class="item" type="text" :value="globalPara.business_name" :maxlength="10"right title="业务联系人姓名" placeholder="请输入姓名" @change="changeName" autofocus />
        <i-input  i-class="item" type="number" :value="globalPara.business_phone" :maxlength="11" right title="业务联系人电话" placeholder="请输入电话" @change="changePhone" autofocus/>
        <i-input  i-class="item" type="email" :value="globalPara.business_email" :maxlength="50"right title="业务联系人邮箱" placeholder="请输入邮箱" @change="changeEmail" autofocus/>
      </div>

      <div class="manager">
        <i-input  type="text" :value="globalPara.business_managerID" :maxlength="50"right title="客户经理ID(非必填)" placeholder="请输入客户经理ID" @change="changeManager" autofocus/>
      </div>
      <!--业务开通相关信息-->
      <div class="service">

        <label class="label" >业务预计开通周期</label>
        <picker @change="PickerChange" class="picker" :value="true" :range="array">
            请选择：{{array[index]}}
        </picker>
        <i-cell title="是否自动续费" i-class="cell">
          <i-switch  :value="globalPara.business_IsRenew" @change="switch1Change" slot="footer"></i-switch>
        </i-cell>
        <div class="paymethod">
          <label class="label">业务服务缴费周期</label>

          <i-radio-group :current="globalPara.business_PaidCycle" @change="handletimeChange">
            <i-radio    value="按年" style="float: right" ></i-radio>
            <i-radio    value="按月"  style="float: right"></i-radio>
          </i-radio-group>
        </div>

      </div>
      <div style="clear: both">
      </div>
      <div class="para">
        <div class="paymethod">
          <label class="label" style="width: 200rpx">业务名称</label>
          <i-radio-group :current="globalPara.business_type" @change="handleServiceChange">
            <span style="float: right">
            <i-radio  position="left"  value="点到多点"></i-radio>
          </span>
            <span style=" float: right">
            <i-radio  position="left"  value="点到点"></i-radio>
          </span>
          </i-radio-group>
        </div>

      <!--点到点选择，点到多点选择-->
      <div v-if="globalPara.business_type === '点到点'">
        <i-input  type="num" :value="globalPara.business_band" :maxlength="10" right title="服务固定带宽(M)" placeholder="请输入" @change="changeBand" autofocus />
        <i-cell title="携带划分VLAN" i-class="cell">
          <i-switch  :value="globalPara.business_IsVlan" @change="divideBandChange" slot="footer"></i-switch>
        </i-cell>

        <div v-if="globalPara.business_IsVlan">
          <i-input  type="text" :value="globalPara.business_VlanId" :maxlength="30" right title="VLAN ID" placeholder="请输入" @change="changeVlanID" autofocus />
        </div>
      </div>
      </div>
      <div class="divide"></div>
      <i-button @click="formSubmit" type="primary" shape="circle">下一步</i-button>
  </div>
</template>
<script>
  // import { formatTime } from '@/utils/index'
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        globalPara: 'exportGlobalPara'
      })},
    data () {
      return {
        index: 1,
        array: ['1年', '2年'],
        currenttime: ''
      }
    },
    mounted () {
      // let time = formatTime(new Date())
      // let timeformat = time.split('/')
      const date = new Date()
      const endyear = date.getFullYear() + parseInt(this.index) + 1
      this.currenttime = endyear + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() +
    ':' + date.getSeconds()
      // console.log(timeyear)
      // this.currenttime = time
    },
    methods: {
      changeName (e) {
        this.$set(this.globalPara, 'business_name', e.mp.detail.detail.value)
      },
      changePhone (e) {
        this.$set(this.globalPara, 'business_phone', e.mp.detail.detail.value)
      },
      changeEmail (e) {
        this.$set(this.globalPara, 'business_email', e.mp.detail.detail.value)
      },
      changeManager (e) {
        this.$set(this.globalPara, 'business_managerID', e.mp.detail.detail.value)
      },
      changeBand (e) {
        this.$set(this.globalPara, 'business_band', e.mp.detail.detail.value)
      },
      changeVlanID (e) {
        this.$set(this.globalPara, 'business_VlanId', e.mp.detail.detail.value)
      },
      formSubmit (e) {
        // console.log('form发生了submit事件，携带数据为：', e)
        // 全局参数数据暂存
        //  前往A 或者端页面
        console.log(this.globalPara)
        let url
        if (this.globalPara.business_type === '点到点') {
          url = '../../pages/pointA/main'
        } else { url = '../../pages/centralnode/main' }
        wx.navigateTo({url})
      },
      PickerChange (e) {
        // console.log('picker选择改变', e)
        this.index = e.mp.detail.value
        this.$set(this.globalPara, 'business_OpenTime', this.array[this.index])
        const date = new Date()
        const endyear = date.getFullYear() + parseInt(this.index) + 1
        this.currenttime = endyear + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() +
        ':' + date.getSeconds()
      },
      switch1Change (e) {
        this.isRenew = e.mp.detail.value
        this.$set(this.globalPara, 'business_IsRenew', this.isRenew)
      },
      handletimeChange (e) {
        this.$set(this.globalPara, 'business_PaidCycle', e.mp.detail.value)
      },
      handleServiceChange (e) {
        this.$set(this.globalPara, 'business_type', e.mp.detail.value)
      },
      divideBandChange (e) {
        this.$set(this.globalPara, 'business_IsVlan', e.mp.detail.value)
      }

    }

  }
</script>

<style>
  .containner{
    background-color: #f8f8f9;
  }
  .text {
    background-color: white;
    font-size: 14px;
    width: 750rpx;
    height: 80rpx;
    display: flex;
    align-items:Center;
    padding-left: 15px;
    font-family: PingFang-SC-Regular;
    color: #464c5b
  }
  .business{
    margin-top: 30rpx;
  }
  .item{
    border-bottom: 1rpx solid #e9eaec;
  }
  .manager{
    margin-top: 30rpx;
    height: 80rpx;
    align-items:Center;
  }
  .service{
    margin-top: 50rpx;
    background-color: white;
    border-bottom: 1rpx solid #e9eaec  ;
  }
  .label{
    font-size: 14px;
    width: 300rpx;
    padding-left: 15px;
    font-family: PingFang;
    color: #464c5b;
    float: left;
    line-height: 80rpx;
    background-color: white;
    align-items: center;
  }
  .picker{
    font-size: 14px;
    padding-right: 15px;
    font-family: PingFang;
    color: #464c5b;
    float: right;
    line-height: 80rpx;
  }
  .cell{
    line-height: 80rpx;
    clear: left;
    color: #464c5b;
    border-bottom: 1rpx solid #e9eaec;
    border-top: 1rpx solid #e9eaec;
  }
  .panel{
    hide-border: true;
  }
  .paymethod{
   background-color: white;
   height: 100rpx;
   align-items: center;
   border-bottom: 1rpx solid #e9eaec;
 }
  .para{
    margin-top: 30rpx;
  }
  .divide{
    height: 60rpx;
    border: 0px transparent;
  }
</style>
