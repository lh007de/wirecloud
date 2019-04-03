<template>
  <div>
    <div class="section" style="display: flex; padding-top: 5px">
      <div  style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family:PingFang;color: #464c5b">
        <i-input  type="text" placeholder="请选择行业分类" :value="comCategory" disabled: true  :maxlength="100"  autofocus />
      </div>
      <picker
        mode="selector"
        :range="rangeArray"
        @change="categoryChange"
        style=" width: 50%; display: inline-block; font-size: 14px;padding-right: 15px">
        <img src="/static/images/arrow.png" style="width: 100%;height: 100%" />
      </picker>
    </div>
      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">确认</i-button>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        rangeArray: ['机构组织', '农林牧渔', '医药卫生', '建筑建材', '冶金矿产', '石油化工', '水利水电', '交通运输', '信息产业', '机械机电', '轻工食品', '服装纺织',
          '专业服务', '安全防护', '环保绿化', '旅游休闲', '办公文教', '电子电工', '玩具礼品', '家居用品', '物资', '包装', '体育', '办公'],
        index: 0,
        comCategory: ''
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })},
    methods: {
      categoryChange (e) {
        this.comCategory = this.rangeArray[e.mp.detail.value]
      },
      formSubmit (e) {
        this.$set(this.userCentral, 'companyCategory', this.comCategory) // vuex项目名称
        mpvue.navigateBack()
      }
    }

  }
</script>

<style>
</style>
