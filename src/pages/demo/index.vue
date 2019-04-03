<template>
  <div class="test">
    <div class="testNav">
      <div
        :class="{'selected':tab === 1,'testTitle':true}"
        @click="changTab(1)"
      >待提交</div>
      <div
        :class="{'selected':tab === 2,'testTitle':true}"
        @click="changTab(2)"
      >待编辑</div>
      <div
        :class="{'selected':tab === 3,'testTitle':true}"
        @click="changTab(3)"
      >已提交</div>
    </div>
    <div class="container">
      <div v-if="tab===1">
        <div>
          <h1 style="alignment: top" @click="showInfo">查看个人信息</h1>
        </div>


      </div>
      <div v-else-if="tab===2">页面2</div>
      <div v-else>页面3</div>
    </div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        tab: 1
      }
    },
    methods: {
      changTab (index) {
        this.tab = index
      },
      showInfo () {
        const url = '../../pages/modify/main'
        mpvue.navigateTo({url})
      }
    }
  }
</script>

<style>
  .test {
    width: 100%;}

  .testNav {
    padding: 0 20 rpx;
    height: 80 rpx;
    line-height: 80 rpx;
    display: flex;
  }
  .testTitle {
    flex: 1;
    text-align: center;
  }
  .selected {
    color: #87caee;
    border-bottom: 1px solid #87caee;
  }
  .container {}

</style>
