<template>
  <div style="background-color: #f5f5f6">
    <div>
      <i-tabs :current="current" @change="tabChange">
        <i-tab key="tab1" title="待编辑" :count="editdata.total"></i-tab>
        <i-tab key="tab2" title="已提交" :count="commitdata.total"></i-tab>
      </i-tabs>
    </div>
    <div v-show="current==='tab1'">
      <div v-for = "(item,index) in editdata.records" :key="index" >
        <div style="padding-top: 15px" >
        <i-swipeout :actions="actions" @change="deleteitemtoedit" i-class="i-class">
          <div slot="content">
            <carddemo @click="refertoedit" :sendData="item" :itemid="index"></carddemo>
          </div>
          <div slot="button" style="text-align: center" >
            <div >删除</div>
          </div>
        </i-swipeout>
      </div>
      </div>
    </div>
    <div v-show="current==='tab2'">
      <div v-for = "(item,index) in commitdata.records" :key="index" >
      <div class="commited" >
          <div >
            <carddemo @click="refercommit" :sendData="item" :itemid="index"></carddemo>
          </div>
      </div>
    </div>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import carddemo from '../../components/carddemo'
  import util from '../../utils/index'
  export default {
    components: {
      carddemo
    },
    data () {
      return {
        current: 'tab1',
        url: '',
        actions: [
          {
            name: '删除',
            width: 100,
            color: '#ffffff',
            fontsize: '20',
            icon: 'delete',
            background: '#FF0000'
          }
        ],
        editdata: {}, // 获取到的后台草稿列表
        commitdata: {}, // 获取到的后台提交订单列表
        temp_A: {},
        temp_Z: {},
        currentEditPage: '',
        totalEditPage: '',
        currentCommitPage: '',
        totalCommitPage: ''
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral',
        dataToEdit: 'exportDataToEdit',
        dataCommit: 'exportDataCommit',
        globalPara: 'exportGlobalPara',
        pointToPoint: 'exportPointToPoint'
      })
    },
    mounted () {
      let that = this
      wx.request({ // 获取订单列表
        url: 'http://10.220.98.168:8080/orders/my?applyStatus=draft&limit=10&offset=1&order=ASC&sort=openDate&type=maintain',
        header: {
          'content-type': 'application/json', // 默认值
          'user_id': '1'
        },
        method: 'GET',
        success (res) {
          console.log('待编辑数据获取', res.data)
          if (res.data.code === 200) {
            that.editdata = res.data.data
            that.currentEditPage = res.data.data.current
            that.totalEditPage = res.data.data.pages
          } else {
            util.progressTips('获取数据失败，请稍后重试')
          }
        },
        fail (res) {
          console.log(res.data)
        }
      })
      wx.request({ // 获取订单列表
        url: 'http://10.220.98.168:8080/orders/my?applyStatus=submitted&limit=10&offset=1&order=ASC&sort=openDate&type=maintain',
        header: {
          'content-type': 'application/json', // 默认值
          'user_id': '1'
        },
        method: 'GET',
        success (res) {
          console.log('已提交数据获取', res.data)
          if (res.data.code === 200) {
            that.commitdata = res.data.data
            that.currentCommitPage = res.data.data.current
            that.totalCommitPage = res.data.data.pages
            console.log(that.commitdata)
          } else {
            util.progressTips('获取数据失败，请稍后重试')
          }
        },
        fail (res) {
          console.log(res.data)
        }
      })
    },
    async onPullDownRefresh () {
      // to doing..
      // 停止下拉刷新
      console.log('下拉刷新')
      this.updateDraft(1)
      this.updateCommit(1)
      wx.stopPullDownRefresh()
    },
    onReachBottom () {
      // 到这底部在这里需要做什么事情
      console.log('触发底部')
      let that = this
      if (this.current === 'tab1') {
        if (this.currentEditPage <= this.totalEditPage) {
          this.currentEditPage += 1
          wx.request({ // 获取订单列表
            url: 'http://10.220.98.168:8080/orders/my?applyStatus=draft&limit=10&offset=' + this.currentEditPage + '&order=ASC&sort=openDate&type=maintain',
            header: {
              'content-type': 'application/json', // 默认值
              'user_id': '1'
            },
            method: 'GET',
            success (res) {
              console.log('刷新待编辑数据获取', res.data)
              if (res.data.code === 200) {
                that.editdata.records = that.editdata.records.concat(res.data.data.records)
                console.log('刷新编辑数据获取', that.editdata)
              } else {
                util.progressTips('获取数据失败，请稍后重试')
              }
            },
            fail (res) {
              console.log(res.data)
            }
          })
        }
      }
      if (this.current === 'tab2') {
        if (this.currentCommitPage <= this.totalCommitPage) {
          this.currentCommitPage += 1
          wx.request({ // 获取订单列表
            url: 'http://10.220.98.168:8080/orders/my?applyStatus=sumbitted&limit=10&offset=' + this.currentCommitPage + '&order=ASC&sort=openDate&type=maintain',
            header: {
              'content-type': 'application/json', // 默认值
              'user_id': '1'
            },
            method: 'GET',
            success (res) {
              console.log('刷新提交数据获取', res.data)
              if (res.data.code === 200) {
                that.commitdata.records = that.commitdata.records.concat(res.data.data.records)
                console.log('提交数据获取', that.commitdata)
              } else {
                util.progressTips('获取数据失败，请稍后重试')
              }
            },
            fail (res) {
              console.log(res.data)
            }
          })
        }
      }
    },
    methods: {
      refertoedit (e) {
        let that = this
        let orderId = this.editdata.records[e.value].id // 取出订单id 去查订单详情
        wx.request({ // 获取订单详情
          url: 'http://10.220.98.168:8080/orders/' + orderId + '/my',
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'GET',
          success (res) {
            console.log('详情数据', res.data)
            if (res.data.code === 200) {
              // console.log(that.editdata)
              that.$set(that.dataToEdit, 'data', res.data.data)
              console.log('存储到vuex', that.dataToEdit)
            } else {
              util.progressTips('获取数据失败，请稍后重试')
            }
          },
          fail (res) {
            console.log(res.data)
          }
        })

        let url
        if (this.editdata.records[e.value].bizType === 'p2p') {
          url = '../../pages/ordertocommitdetail/main'
        } else {
          url = '../../pages/ordertocommitdetailmulti/main'
        }
        mpvue.navigateTo({url})
      },
      refercommit (e) {
        let that = this
        let orderId = this.commitdata.records[e.value].id // 取出订单id 去查订单详情
        wx.request({ // 获取订单详情
          url: 'http://10.220.98.168:8080/orders/' + orderId + '/my',
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'GET',
          success (res) {
            console.log('详情数据', res.data)
            if (res.data.code === 200) {
              that.$set(that.dataCommit, 'data', res.data.data)
              console.log('存储到vuex提交数据', that.dataCommit)
              let url
              if (that.commitdata.records[e.value].bizType === 'p2p') {
                url = '../../pages/ordercommiteddetail/main'
                // 这里需要进行后台数据和自定义数据转换
                // 点到点转换
                that.$set(that.globalPara, 'business_name', that.dataCommit.data.basic.contact.name)
                that.$set(that.globalPara, 'business_phone', that.dataCommit.data.basic.contact.mobile)
                that.$set(that.globalPara, 'business_email', that.dataCommit.data.basic.contact.email)
                that.$set(that.globalPara, 'business_managerID', that.dataCommit.data.basic.managerId)
                that.$set(that.globalPara, 'business_OpenTime', (that.dataCommit.data.basic.period === 'one year') ? '1年' : '2年')
                that.$set(that.globalPara, 'business_IsRenew', that.dataCommit.data.basic.renew)
                that.$set(that.globalPara, 'business_PaidCycle', (that.dataCommit.data.basic.payMethod === 'month') ? '按月' : '按年')
                that.$set(that.globalPara, 'business_type', (that.dataCommit.data.basic.bizType === 'p2p') ? '点到点' : '点到多点')
                that.$set(that.globalPara, 'business_band', that.dataCommit.data.basic.bandwidth)
                that.$set(that.globalPara, 'orderId', that.dataCommit.data.basic.id)
                that.$set(that.globalPara, 'orderNumber', that.dataCommit.data.basic.orderNumber)

                if (that.dataCommit.data.basic.sites.length !== 2) {
                  util.progressTips('站点数据缺少，请确认后重试')
                }
                for (let i = 0; i < that.dataCommit.data.basic.sites.length; i++) {
                  if (that.dataCommit.data.basic.sites[i].master) {
                    that.temp_A = that.dataCommit.data.basic.sites[i]
                  } else {
                    that.temp_Z = that.dataCommit.data.basic.sites[i]
                  }
                }
                that.$set(that.globalPara, 'business_IsVlan', (that.temp_Z.vlanId === 'null') ? '否' : '是')
                that.$set(that.globalPara, 'business_VlanId', (that.temp_Z.vlanId === 'null') ? '—' : that.temp_Z.vlanId)
                that.$set(that.globalPara, 'service_start_time', that.dataCommit.data.basic.openDate)
                that.$set(that.globalPara, 'service_end_time', that.dataCommit.data.basic.realEndDate)

                // 传递点到点
                if (typeof (that.temp_A.address) !== 'undefined') {
                  that.$set(that.pointToPoint.pointA, 'site_region', [that.temp_A.address.area.name, that.temp_A.address.street.name])
                  that.$set(that.pointToPoint.pointA, 'site_DetailAddress', that.temp_A.address.address)
                  that.$set(that.pointToPoint.pointA, 'site_ContactName', that.temp_A.contact.name)
                  that.$set(that.pointToPoint.pointA, 'site_ContactEmail', that.temp_A.contact.email)
                  that.$set(that.pointToPoint.pointA, 'site_ContactPhone', that.temp_A.contact.mobile)
                } else {
                  util.progressTips('A点站址不存在')
                }
                if (typeof (that.temp_Z.address) !== 'undefined') {
                  that.$set(that.pointToPoint.pointZ, 'site_region', [that.temp_Z.address.area.name, that.temp_Z.address.street.name])
                  that.$set(that.pointToPoint.pointZ, 'site_DetailAddress', that.temp_Z.address.address)
                  that.$set(that.pointToPoint.pointZ, 'site_ContactName', that.temp_Z.contact.name)
                  that.$set(that.pointToPoint.pointZ, 'site_ContactEmail', that.temp_Z.contact.email)
                  that.$set(that.pointToPoint.pointZ, 'site_ContactPhone', that.temp_Z.contact.mobile)
                } else {
                  util.progressTips('Z点站址不存在')
                }
              } else {
                url = '../../pages/ordercommiteddetailmulti/main'
              }
              mpvue.navigateTo({url})
            } else {
              util.progressTips('获取数据失败，请稍后重试')
            }
          },
          fail (res) {
            console.log(res.data)
          }
        })
      },
      tabChange (e) {
        console.log(e)
        this.current = e.mp.detail.key
      },
      deleteitemtoedit (e) {
        let eventid = e.mp.target.dataset.eventid
        let current
        if (eventid) {
          let arr = eventid.split('_')
          console.log(arr[1])
          current = arr[1]
          // this.orderdatatoedit.splice(arr[1], 1)
        }
        let orderId = this.editdata.records[current].id
        this.deleteDraft(orderId)
        // 获取操纵项的订单id
      },
      updateDraft (page) {
        let that = this
        wx.request({ // 获取订单列表
          url: 'http://10.220.98.168:8080/orders/my?applyStatus=draft&limit=10&offset=' + page + '&order=ASC&sort=openDate&type=maintain',
          header: {
            'content-type': 'application/json', // 默认值
            'user_id': '1'
          },
          method: 'GET',
          success (res) {
            console.log('待编辑数据获取', res.data)
            if (res.data.code === 200) {
              that.editdata = res.data.data
              that.currentEditPage = res.data.data.current
              that.totalEditPage = res.data.data.pages
            } else {
              util.progressTips('获取数据失败，请稍后重试')
            }
          },
          fail (res) {
            console.log(res.data)
          }
        })
      },
      updateCommit (page) {
        let that = this
        wx.request({ // 获取订单列表
          url: 'http://10.220.98.168:8080/orders/my?applyStatus=submitted&limit=10&offset=' + page + '&order=ASC&sort=openDate&type=maintain',
          header: {
            'content-type': 'application/json', // 默认值
            'user_id': '1'
          },
          method: 'GET',
          success (res) {
            console.log('已提交数据获取', res.data)
            if (res.data.code === 200) {
              that.commitdata = res.data.data
              that.currentCommitPage = res.data.data.current
              that.totalCommitPage = res.data.data.pages
              console.log(that.commitdata)
            } else {
              util.progressTips('获取数据失败，请稍后重试')
            }
          },
          fail (res) {
            console.log(res.data)
          }
        })
      },
      deleteDraft (orderID) {
        let that = this
        wx.request({ // 获取订单列表
          url: 'http://10.220.98.168:8080/orders/' + orderID,
          header: {
            'content-type': 'application/json', // 默认值
            'user_id': '1'
          },
          method: 'DELETE',
          success (res) {
            console.log('删除数据后返回', res.data)
            if (res.data.code === 200) {
              util.progressTips('删除成功')
              that.updateDraft(1)
            } else {
              util.progressTips('获取数据失败，请稍后重试')
            }
          },
          fail (res) {
            console.log(res.data)
          }
        })
      }

    }
  }
</script>

<style>
  .i-class{
    margin-left:10px ;
    border: solid 1px #dddee1;
    border-radius: 5px;
  }
  .commited{
    margin-top: 15px;
    margin-left:10px ;
    padding: 15px;
    border: solid 1px #dddee1;
    border-radius: 5px;
    background: white;
  }
</style>
