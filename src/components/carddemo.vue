<template>
  <div class="body">
    <div class="header">
      <div class="title">{{sendData.bizType==='p2p'?'云专线点到点': '云专线点到多点'}}</div>
      <div class="righttitle" @click='select(itemid)'>查看详情</div>
    </div>

    <div class="demo_line"><span></span></div>

    <span class="inline">业务ID: {{sendData.orderNumber}}</span>
    <span class="inline">业务联系人: {{sendData.contact.name}}</span>
    <span class="inline">联系电话：{{sendData.contact.mobile}}</span>
    <span class="inline">最后编辑时间: {{sendData.time}}</span>
  </div>
</template>
<script>
  export default {
    name: 'index',
    props: ['sendData', 'itemid'], // 用来接收父组件传给子组件的数据
    methods: {
      select (itemid) {
        let data = {
          value: itemid
        }
        this.$emit('click', data)// select事件触发后，自动触发showCityName事件
      }
    }
  }
</script>
<style lang="less" scoped>
  .body{
    font-family:PingFang;
    font-size: 14px;
    color: #1c2438;
    background-color: #ffffff;
    border-radius: 5px;

  }
  .head{
    display: flex;
  }
  .title{
    color: black;
    width: 50%;
    display: inline-block;
  }
  .righttitle{
    text-align:right;font-size:14px;color:#80848f;
    width: 50%;
    display: inline-block;
  }
  .inline{
    display: block;
  }
  .demo_line{
    padding: 0px;
    height: 1px;
    border-top: 1px solid #ddd;
  }
  .demo_line span{
    position: relative;
    top: -20px;
    background: #fff;
  }
</style>
