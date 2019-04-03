<template>
  <div>
    <form :class="container" @submit="formSubmitA">
      <div style="display: flex; padding-top: 8px">
        <label style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family: PingFang;color: #464c5b">业务类型：云专线</label>
        <label style=" width:50%;display:inline-block;font-size:14px;padding-right:15px;font-family:PingFang;color: #464c5b;text-align: right">业务名称：点到点</label>
      </div>

      <div class="section" style="display: flex; padding-top: 5px">
        <div class="section__title" style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family:PingFang;color: #464c5b">站点地区</div>
        <picker
          mode="region"
          @change="bindRegionChange"
          :value="region"
          :custom-item="customItem"
          style=" width: 50%; display: inline-block; font-size: 14px;padding-right: 15px;font-family:PingFang;color: #657180;text-align: right"
        >
          <div>{{region[0]}}-{{region[1]}}-{{region[2]}}</div>

        </picker>
      </div>
      <i-input  type="text" :value="siteaddress" :maxlength="100"right title="站点详细地址" placeholder="请输入详细地址" @change="siteaddressChange" autofocus />

      <div>
        <i-input  type="text" :value="sitename" :maxlength="10"right title="站点联系人姓名" placeholder="请输入姓名" @change="sitenameChange" autofocus />
        <i-input  type="email" :value="siteemail" :maxlength="50" right title="站点联系人邮箱" placeholder="请输入邮箱" @change="siteemailChange" autofocus/>
        <i-input  type="phone" :value="sitephone" :maxlength="50"right title="站点联系人电话" placeholder="请输入电话" @change="sitephoneChange"  autofocus/>
      </div>

      <i-button @click="formSubmitA" type="primary" shape="circle" style="padding-bottom: 20px">下一步</i-button>

    </form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        region: ['四川省', '成都市', '高新区'],
        customItem: '全部',
        siteaddress: '',
        sitename: '',
        siteemail: '',
        sitephone: ''
      }
    },
    methods: {
      formSubmitA (e) {
        // console.log('form发生了submit事件，携带数据为：', e)
        // A端数据暂存
        let tempdata = []
        tempdata.push({'region': this.region})
        tempdata.push({'siteaddress': this.siteaddress})
        tempdata.push({'sitename': this.sitename})
        tempdata.push({'siteemail': this.siteemail})
        tempdata.push({'sitephone': this.sitephone})
        // {
        //   'region': this.region,
        //   'siteaddress': this.siteaddress,
        //   'sitename': this.sitename,
        //   'siteemail': this.siteemail,
        //   'sitephone': this.sitephone}
        mpvue.setStorageSync('storageA', tempdata)
        //  前往Z端页面
        const url = '../../pages/pointZ/main'
        mpvue.navigateTo({url})
      },
      bindRegionChange (e) {
        this.region = e.mp.detail.value
      },
      siteaddressChange (e) {
        this.siteaddress = e.mp.detail.detail.value
      },
      sitenameChange (e) {
        this.sitename = e.mp.detail.detail.value
      },
      siteemailChange (e) {
        this.siteemail = e.mp.detail.detail.value
      },
      sitephoneChange (e) {
        this.sitephone = e.mp.detail.detail.value
      }
    }

  }
</script>

<style>
</style>
