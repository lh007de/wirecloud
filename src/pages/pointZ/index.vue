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
      <i-input  type="text" name="site_address" :maxlength="100"right title="站点详细地址" placeholder="请输入详细地址" autofocus />

      <div>
        <i-input  type="text" name="site_name" :maxlength="10"right title="站点联系人姓名" placeholder="请输入姓名" autofocus />
        <i-input  type="email" name="site_email" :maxlength="50" right title="站点联系人邮箱" placeholder="请输入邮箱" autofocus/>
        <i-input  type="phone" name="site_phone" :maxlength="50"right title="站点联系人电话" placeholder="请输入电话" autofocus/>
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
        customItem: '全部'
      }
    },
    methods: {
      formSubmitA (e) {
        console.log('form发生了submit事件，携带数据为：', e)
        // A端数据暂存
        mpvue.setStorageSync('storageA', e.mp.detail.value)
        //  前往Z端页面
        const url = '../../pages/orderdetail/main'
        mpvue.navigateTo({url})
      },
      bindRegionChange (e) {
        this.region = e.mp.detail.value
      }
    }

  }
</script>

<style>
</style>
