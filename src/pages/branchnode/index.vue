<template>
  <div>
    <div style="display: flex; padding-top: 8px">
      <label style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family: PingFang;color: #464c5b">业务类型：云专线</label>
      <label style=" width:50%;display:inline-block;font-size:14px;padding-right:15px;font-family:PingFang;color: #464c5b;text-align: right">业务名称：点到多点</label>
    </div>
    <div v-if="isstart">
      <swiper :indicator-dots="indicatorDots"
              :duration="2000"
              :current-item-id="currentitem"
              :autoplay="true"
              @change="onSlideChangeEnd"
              circular="true"
              style=" padding-top: 10px"
              indicator-active-color="#8A2BE2">
        <div v-for = "(item,index) in swiperdata" :key="index" >
          <swiper-item>
            <i-card :title="'分支节点'+(index+1)" style="width: 90%" @click="openmodal" extra="删除">
              <div slot="content">
                <p>站点联系人：{{item.contactName}}</p>
                <p>站点联系人邮箱：{{item.contactEmail}}</p>
                <p>站点联系人电话：{{item.contactPhone}}</p>
                <p>站点地址：{{item.siteAddress}}</p>
                <p>宽带：{{item.serviceBand}}</p>
                <p>VLAN ID：{{item.vlanID}}</p>
              </div>
            </i-card>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <i-modal title="删除确认" :visible="isdeletevisible" :actions="deleteitem" @iclick="deletebranch">
      <view>删除后无法恢复哦</view>
    </i-modal>

      <div style="display: flex;padding-top: 20px">
        <div style=" width: 50%; display: inline-block; font-size: 14px;padding-left: 15px;font-family:PingFang;color: #464c5b">站点地区</div>
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
  export default {
    data () {
      return {
        branchname: ['分支节点一设置', '分支节点二设置',
          '分支节点三设置', '分支节点四设置',
          '分支节点五设置', '分支节点六设置',
          '分支节点七设置', '分支节点八设置',
          '分支节点九设置', '分支节点十设置'
        ],
        region: ['四川省', '成都市', '高新区'],
        customItem: '全部',
        // count 用来标记分支节点
        count: '',
        siteAddress: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        serviceBand: '',
        vlanID: '',
        // swiperdata_bak: [
        //   {contactName: '', contactEmail: '', contactPhone: '', siteAddress: '', serviceBand: '', vlanID: '', region: ''}
        // ],
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
    mounted () {
    },
    methods: {
      deleteconfirm (e) {
        const that = this
        mpvue.showModal({
          title: '删除',
          content: '确定删除分支节点？',
          success: function (res) {
            if (res.confirm) {
              let tempdata = that.swiperdata
              that.swiperdata = []
              tempdata.splice(that.current, 1) // 删除子节点信息
              // that.swiperdata = tempdata
              that.setData(that.swiperdata, tempdata)
              tempdata = null
              console.log(that.swiperdata)
              if (that.swiperdata.length === 0) {
                that.isstart = false
              }
            } else if (res.cancel) {
            }
          }
        })
      },
      deletebranch (e) {
        if (e.mp.detail.index === 0) {
          this.isdeletevisible = false
        } else {
          const action = this.deleteitem
          let tempdata = []
          for (let i of this.swiperdata) {
            tempdata.push(i)
          }
          action[1].loading = true
          this.deleteitem = action

          tempdata.splice(this.current, 1) // 删除子节点信息
          // this.$delete(this.swiperdata, this.current)
          this.swiperdata = tempdata
          // this.$root.$mp.page.setData(this.swiperdata, tempdata)
          // this.setData(this.swiperdata, tempdata)
          if (this.swiperdata.length === 0) {
            this.isstart = false
          }
          console.log(this.swiperdata)
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
        this.current = e.mp.detail.current
        // console.log(this.current)
      },
      formSubmit (e) {
        console.log('form发生了submit事件，携带数据为：', e)
        wx.setNavigationBarTitle({
          title: '当前页面'
        })
        // A端数据暂存
        //  前往Z端页面
        // const url = '../../pages/ordershare/main'
        // mpvue.navigateTo({url})
      },
      addBranchNode (e) {
      //  点击继续添加时间逻辑
      //  1.把该页面数据存储 2.相应轮播组件添加分支节点信息 3.页面标题进行更新 4.清空当前输入
      //   console.log(e)
        let tempdata = {
          'region': this.region,
          'siteAddress': this.siteAddress,
          'contactName': this.contactName,
          'contactEmail': this.contactEmail,
          'contactPhone': this.contactPhone,
          'serviceBand:': this.serviceBand,
          'vlanID': this.vlanID
        }
        // 这里应该有个检查 任何必要输入为空时 进行处理
        this.swiperdata.push(tempdata)
        // this.swiperdata.push({'this.current': tempdata})
        this.isstart = true // 首次添加不显示轮播
        // 下次提交之前清空输入框
        this.region = ''
        this.siteAddress = ''
        this.contactName = ''
        this.contactEmail = ''
        this.contactPhone = ''
        this.serviceBand = ''
        this.vlanID = ''
      },
      nextStep (e) {
        const url = '../../pages/orderdetailmulti/main'
        mpvue.navigateTo({url})
      },
      siteAddressChange (e) {
        this.siteAddress = e.mp.detail.detail.value
      },
      bindRegionChange (e) {
        this.region = e.mp.detail.value
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
