<template>
  <div>
    <div style="display: flex; padding-top: 8px">
      <label style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family: PingFang;color: #464c5b">业务类型：云专线</label>
      <label style=" width:50%;display:inline-block;font-size:14px;padding-right:15px;font-family:PingFang;color: #464c5b;text-align: right">业务名称：点到多点</label>
    </div>
    <div v-if="isstart">
      <swiper :indicator-dots="indicatorDots"
              :duration="2000"
              @change="onSlideChangeEnd"
              :current="current"
              style=" padding-top: 10px"
              indicator-active-color="#8A2BE2">
        <div v-for = "(item,index) in pointToMultiPoint.branchPoint" :key="index" >
          <swiper-item>
            <i-card :title="'分支节点'+(index+1)" style="width: 90%" @click="openmodal" extra="删除">
              <div slot="content">
                <p>站点联系人：{{item.site_ContactName}}</p>
                <p>站点联系人邮箱：{{item.site_ContactEmail}}</p>
                <p>站点联系人电话：{{item.site_ContactPhone}}</p>
                <p>站点地址：{{item.site_region.name + item.site_Street.name + item.site_DetailAddress}}</p>
                <p>宽带：{{item.site_SerBand}}</p>
                <p>VLAN ID：{{item.site_VlanId}}</p>
              </div>
            </i-card>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <i-modal title="删除确认" :visible="isdeletevisible" :actions="deleteitem" @iclick="deletebranch">
      <view>删除后无法恢复,确定删除?</view>
    </i-modal>

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
      <i-input type="text" :value="siteAddress" :maxlength="100" right title="站点详细地址"  placeholder="请输入详细地址" @change="siteAddressChange" autofocus/>

      <div>
        <i-input  type="text" :value="contactName" :maxlength="10" right title="站点联系人姓名" placeholder="请输入姓名" @change="contactNameChange" autofocus/>
        <i-input  type="text" :value="contactEmail" :maxlength="50" right title="站点联系人邮箱"  placeholder="请输入邮箱" @change="contactEmailChange" autofocus/>
        <i-input  type="text" :value="contactPhone" :maxlength="50" right title="站点联系人电话"  placeholder="请输入电话" @change="contactPhoneChange" autofocus/>
      </div>

      <div>
        <i-input  type="text"  :value="serviceBand" :maxlength="10" right title="服务宽带(M)"  placeholder="请输入" @change="serviceBandChange" autofocus/>
        <i-input  type="text"  :value="vlanID" :maxlength="50"  right title="VLAN ID"  placeholder="请输入" @change="vlanIDChange" autofocus/>
      </div>

      <i-button @click="addBranchNode" 	type="primary" shape="circle">继续添加</i-button>
      <i-button @click="nextStep" type="dashed" shape="circle">下一步</i-button>
  </div>
</template>
<script>
  // import { formatTime } from '@/utils/index'
  import {mapGetters} from 'vuex'
  import util from '../../utils/index'
  export default {
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
        streetArray: [],
        siteAddress: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        serviceBand: '',
        vlanID: '',
        swiperdata: [],
        isstart: false,
        current: 0,
        isdeletevisible: false,
        deleteitem: [
          {
            name: '取消'
          },
          {
            name: '删除',
            color: '#ed3f14',
            loading: false
          }
        ]
      }
    },
    onUnload () {
      this.region = ['四川省', '成都市', '高新区']
      this.customItem = '全部'
      this.siteAddress = ''
      this.contactName = ''
      this.contactEmail = ''
      this.contactPhone = ''
      this.serviceBand = ''
      this.vlanID = ''
      this.swiperdata = []
      this.isstart = false
      this.current = 0
      this.isdeletevisible = false
      this.deleteitem = [
        {
          name: '取消'
        },
        {
          name: '删除',
          color: '#ed3f14',
          loading: false
        }
      ]
    },
    mounted () {
      // 如果从草稿中跳转过来的数据，要进行显示
      if (typeof (this.pointToMultiPoint.branchPoint.length) !== 'undefined') {
        this.isstart = true
      }
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
            // that.$set(that.pointToMultiPoint.centerPoint, 'site_region', that.regin[0])
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
            // that.$set(that.pointToMultiPoint.centerPoint, 'site_Street', that.street[0])
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
    methods: {
      deletebranch (e) {
        console.log(e)
        if (e.mp.detail.index === 0) {
          this.isdeletevisible = false
        } else {
          const action = this.deleteitem
          action[1].loading = true
          this.deleteitem = action
          this.swiperdata = this.pointToMultiPoint.branchPoint
          let index = this.current
          this.swiperdata.splice(index, 1)

          if (this.swiperdata.length === 0) {
            this.isstart = false
          } else { // 没有删除完，也要区分是否删除的是最后一张
            if (this.swiperdata.length === index) { // 是最后一张，显示上一张
              this.current = index - 1
            } else { // 不是最后一张，显示下一张
              this.current = index
            }
          }
          this.$set(this.pointToMultiPoint, 'branchPoint', this.swiperdata)
          setTimeout(() => {
            action[1].loading = false
            this.isdeletevisible = false
            this.deleteitem = action
          }, 1000)
        }
      },
      openmodal (e) {
        this.isdeletevisible = true
      },
      onSlideChangeEnd (e) {
        console.log('滑动事件触发 index', e.mp.detail.current)
        this.current = e.mp.detail.current
        // console.log(this.current)
      },
      addBranchNode (e) {
      //  点击继续添加时间逻辑
      //  1.把该页面数据存储 2.相应轮播组件添加分支节点信息 3.页面标题进行更新 4.清空当前输入
      //   console.log(e)
        if (this.isstart) { this.swiperdata = this.pointToMultiPoint.branchPoint }
        let tempdata = {
          'site_region': this.regin[this.regionIndex],
          'site_Street': this.street[this.streetIndex],
          'site_DetailAddress': this.siteAddress,
          'site_ContactName': this.contactName,
          'site_ContactEmail': this.contactEmail,
          'site_ContactPhone': this.contactPhone,
          'site_SerBand': this.serviceBand,
          'site_VlanId': this.vlanID
        }
        // 这里应该有个检查 任何必要输入为空时 进行处理
        this.swiperdata.push(tempdata)
        console.log('swiperdata数据为', this.swiperdata)
        this.$set(this.pointToMultiPoint, 'branchPoint', this.swiperdata)
        this.isstart = true // 首次添加不显示轮播
        // 下次提交之前清空输入框
        this.region = ''
        this.siteAddress = ''
        this.contactName = ''
        this.contactEmail = ''
        this.contactPhone = ''
        this.serviceBand = ''
        this.vlanID = ''
        console.log(this.pointToMultiPoint)
      },
      nextStep (e) {
        const url = '../../pages/orderdetailmulti/main'
        mpvue.navigateTo({url})
      },
      siteAddressChange (e) {
        this.siteAddress = e.mp.detail.detail.value
      },
      bindRegionChange (e) {
        this.regionIndex = e.mp.detail.value
        // this.$set(this.pointToMultiPoint.centerPoint, 'site_region', this.regin[this.regionIndex])
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
        // this.$set(this.pointToMultiPoint.centerPoint, 'site_Street', this.street[this.streetIndex])
      },
      contactNameChange (e) {
        this.contactName = e.mp.detail.detail.value
      },
      contactEmailChange (e) {
        this.contactEmail = e.mp.detail.detail.value
      },
      contactPhoneChange (e) {
        this.contactPhone = e.mp.detail.detail.value
      },
      serviceBandChange (e) {
        console.log('带宽改变', e)
        this.serviceBand = e.mp.detail.detail.value
      },
      vlanIDChange (e) {
        this.vlanID = e.mp.detail.detail.value
      }
    }

  }
</script>

<style>
  .showbasePara {
    border-radius: 5px;
    border: lightgrey;
    border-style: solid;
    border-width: 1px;
    font-size: 14px;
    font-family: "PingFang SC","Helvetica Neue", Helvetica,  "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #657180;
    height: 420px;
    width: 90%;
    align-items: center;
    padding-left: 15px;
    padding-top: 15px;
  }
</style>
