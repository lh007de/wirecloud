<template>
  <div>
    <form :class="container" @submit="formSubmitA">
      <p :class="left">业务类型：云专线</p>
      <p>业务名称：点到点</p>
      <div :class="">
        <p >站点地区</p>
        <input type="text" name="site_area" class="siteclass"  autofocus/>
        <p >站点详细地址</p>
        <input type="text" name="site_address" class="siteclass"  autofocus/>
        <p >站点联系人姓名</p>
        <input type="text" name="site_name" class="siteclass"  autofocus/>
        <p >站点联系人邮箱</p>
        <input type="text" name="site_email" class="siteclass"  autofocus/>
        <p >站点联系人电话</p>
        <input type="text" name="site_phone" class="siteclass"  autofocus/>
      </div>

      <button formType="submit">下一步</button>

    </form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      formSubmitA (e) {
        console.log('form发生了submit事件，携带数据为：', e)
        // A端数据暂存
        //  前往Z端页面
        const url = '../../pages/pointZ/main'
        mpvue.navigateTo({url})
      }
    }

  }
</script>

<style>
.siteclass
{
  border-radius: 2px;
  border: lightgrey;
  border-style: solid;
  border-width: 1px;
  font-size: 14px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  height: 31px;
  padding-left: 10px;
}
</style>
