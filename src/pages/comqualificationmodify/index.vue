<template>
  <div>
    <div class="section" style="display: flex; padding-top: 5px">
      <div  style=" width: 80%; display: inline-block; font-size: 14px;font-family:PingFang;color: #464c5b">
        <i-input  type="text" placeholder="请选择其中一项验证公司资质" :value="companyQualification" disabled: true  :maxlength="100"  autofocus />
      </div>
      <picker
        mode="selector"
        :range="rangeArray"
        @change="companyQualificationChange"
        style=" width: 50%; display: inline-block; font-size: 14px;padding-right: 15px">
        <img src="/static/images/arrow.png" style="width: 20%;height: 100%" />
      </picker>
    </div>
    <div v-if="openmodal">
      <div v-if="index ==='0'">
      <i-input  type="text" placeholder="请输入18位数数字和大写字母"  :maxlength="18"  autofocus />
    </div>
      <div v-if="index ==='1'">
        <i-input  type="text" placeholder="请输入15位数数字"  :maxlength="15"  autofocus />
      </div>
      <div v-if="index ==='2'">
        <i-input  type="text" placeholder="请输入8位数数字和大写字母"  :maxlength="8"  autofocus />
      </div>
      <div v-if="index ==='3'">
        <i-input  type="text" placeholder="请输入13位数数字"  :maxlength="13"  autofocus />
      </div>
    </div>

      <i-button @click="formSubmit" type="primary" shape="circle" style="padding-bottom: 20px">确认</i-button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        rangeArray: ['统一信用代码', '营业执照编号', '组织机构代码', '法人证书编号'],
        index: 0,
        companyQualification: '',
        openmodal: false
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })},
    methods: {
      companyQualificationChange (e) {
        this.index = e.mp.detail.value
        this.companyQualification = this.rangeArray[this.index]
        this.openmodal = true
      },
      formSubmit (e) {
        this.$set(this.userCentral, 'companyQualification', this.companyQualification) // vuex项目名称
        mpvue.navigateBack()
      }
    }

  }
</script>

<style>
</style>
