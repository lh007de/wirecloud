<template>
  <div>
    <form @submit="formSubmit">
        <label style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family: PingFang;color: #464c5b">业务类型：云专线</label>

      <div>
        <i-input  type="text" name="business_name" :maxlength="10"right title="业务联系人姓名" placeholder="请输入姓名" autofocus />
        <i-input  type="number" name="business_phone" :maxlength="11" right title="业务联系人电话" placeholder="请输入电话" autofocus/>
        <i-input  type="email" name="business_name" :maxlength="50"right title="业务联系人邮箱" placeholder="请输入邮箱" autofocus/>
      </div>

      <div>
        <i-input  type="text" name="business_managerID" :maxlength="50"right title="客户经理ID" placeholder="请输入客户经理ID" autofocus/>
      </div>
      <!--业务开通相关信息-->
      <div>
        <div style="display: flex">
          <label style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family: PingFang;color: #464c5b">业务预计开通周期</label>
          <!--<p style="width: 80%; border:1px solid green; font-size: 12px" align="right">预计业务结束时间{{currenttime}}</p>-->
          <picker @change="PickerChange" style=" width: 50%; display: inline-block; font-size: 14px;padding-right: 15px;font-family: PingFang;color: #464c5b;text-align: right" :value="true" :range="array">
            请选择：{{array[index]}}
          </picker>
        </div>
          <i-cell title="是否自动续费" >
            <i-switch  :value="isRenew" @change="switch1Change" slot="footer"></i-switch>
          </i-cell>
        <div>
          <!--是否自动续费-->
          <!--<switch :checked="isRenew" name="switch" @change="switch1Change" />-->
            <i-panel title="业务服务缴费周期">
              <i-radio-group :current="current_item" @change="handletimeChange">
                <i-radio  position="left"  value="按年" style=" width: 50%; display: inline-block;justify-content: center"></i-radio>
                <i-radio  position="left"  value="按月" style=" width: 50%; display: inline-block;justify-content: center"></i-radio>
              </i-radio-group>
            </i-panel>

            <!--<label>业务服务缴费周期</label>-->
            <!--<radio-group @change="radioChange">-->
              <!--<label class="radio">-->
                <!--<radio value="byYear" checked="true" />-->
                <!--按年-->
              <!--</label>-->

              <!--<label class="radio">-->
                <!--<radio value="byMonth"  />-->
                <!--按月-->
              <!--</label>-->

            <!--</radio-group>-->
          </div>

          <div>

            <i-panel title="业务名称">
              <i-radio-group :current="current_service" @change="handleServiceChange">
                <span style=" width: 50%; display: inline-block">
                  <i-radio  position="left"  value="点到点"></i-radio>
                </span>
                <span style=" width: 50%; display: inline-block;align-items: right">
                  <i-radio  position="left"  value="点到多点"></i-radio>
                </span>
              </i-radio-group>
            </i-panel>

            <!--<p>业务名称</p>-->
            <!--<radio-group @change="serviceChange">-->
              <!--<label class="radio">-->
                <!--<radio value="oneToone" checked="true" />-->
                <!--点到点-->
              <!--</label>-->
              <!--<label class="radio">-->
                <!--<radio value="oneTomore"  />-->
                <!--点到多点-->
              <!--</label>-->
            <!--</radio-group>-->

          <!--点到点选择，点到多点选择-->
          <div v-if='oneToone'>
            <i-input  type="num" name="business_band" :maxlength="10" right title="服务宽带(M)" placeholder="请输入" autofocus />
            <i-cell title="携带划分VLAN" >
              <i-switch  :value="isDivdeBand" @change="divideBandChange" slot="footer"></i-switch>
            </i-cell>

            <div v-if="isDivdeBand">
              <i-input  type="text" name="vlanID" :maxlength="30" right title="VLAN ID" placeholder="请输入" autofocus />
            </div>
          </div>

        </div>
      </div>

      <i-button @click="formSubmit" type="primary" shape="circle">下一步</i-button>
    </form>
  </div>
</template>
<script>
  // import { formatTime } from '@/utils/index'
  export default {
    data () {
      return {
        index: 1,
        array: ['1年', '2年'],
        isRenew: true,
        oneToone: true,
        isVlanID: true,
        currenttime: '',
        current_item: '按年',
        current_service: '点到点',
        isDivdeBand: true
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
      formSubmit (e) {
        console.log('form发生了submit事件，携带数据为：', e)
        // 全局参数数据暂存
        //  前往A 或者端页面
        let url
        if (this.oneToone) {
          url = '../../pages/pointA/main'
        } else { url = '../../pages/centralnode/main' }
        mpvue.navigateTo({url})
      },
      PickerChange (e) {
        console.log('picker选择改变', e)
        this.index = e.mp.detail.value
        const date = new Date()
        const endyear = date.getFullYear() + parseInt(this.index) + 1
        this.currenttime = endyear + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() +
        ':' + date.getSeconds()
      },
      switch1Change (e) {
        this.isRenew = e.mp.detail.value
      },
      vlanIDswitch1Change (e) {
        this.isVlanID = e.mp.detail.value
      },
      radioChange (e) {
        console.log('radio选择改变', e)
      },
      serviceChange (e) {
        console.log('服务类型改变', e)
        this.oneToone = !this.oneToone
        console.log('服务类型改变', this.oneToone)
      },
      handletimeChange (e) {
        this.current_item = e.mp.detail.value
      },
      handleServiceChange (e) {
        this.current_service = e.mp.detail.value
        this.oneToone = !this.oneToone
      },
      divideBandChange (e) {
        this.isDivdeBand = e.mp.detail.value
      }

    }

  }
</script>

<style>
  .div_block {
    width: 250pt;
    height: 26.7pt;
  }
  .content{
    font-size: 9.3pt;
    padding-left: 5pt;
    padding-bottom: 5pt;
  }
  .business_name
  {
    width: 60%;
  }
</style>
