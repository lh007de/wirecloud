<template>
  <div style="height: 100%;width: 100%; background-color: #f5f5f6">
    <!--<cardxue :sortlist="sortlist"></cardxue>-->
    <!--<carddemo @showCityName="updateCity" :sendData="sortlist"></carddemo>-->
    <div>
      <i-tabs :current="current" @change="tabChange">
        <i-tab key="tab1" title="待提交" :count="orderdatatocommit.length"></i-tab>
        <i-tab key="tab2" title="待编辑" :count="orderdatatoedit.length"></i-tab>
        <i-tab key="tab3" title="已提交" :count="orderdatacommit.length"></i-tab>
      </i-tabs>
    </div>
    <div v-show="current==='tab1'">
      <div v-for = "(item,index) in orderdatatocommit" :key="index" >
        <div style="padding-top: 15px" >
          <i-swipeout :actions="actions" @change="deleteitemtocommit" i-class="i-class">
          <div slot="content">
            <!--<i-card :title="'云专线点到点'+(index+1)" extra="查看详情">-->
              <!--<div slot="content">-->
                <!--<p>业务ID:{{item.id}}</p>-->
                <!--<p>业务联系人:{{item.person}}      联系电话：{{item.phone}}</p>-->
                <!--<p>最后编辑时间:{{item.time}}</p>-->
              <!--</div>-->
            <!--</i-card>-->
            <carddemo @click="refertocommit" :sendData="item" :itemid="index"></carddemo>
          </div>
          <div slot="button" style="text-align: center" >
            <div >删除</div>
          </div>
        </i-swipeout>
        </div>
      </div>
    </div>
    <div v-show="current==='tab2'">
      <div v-for = "(item,index) in orderdatatoedit" :key="index" >
        <div style="padding-top: 15px" >
        <i-swipeout :actions="actions" @change="deleteitemtoedit" i-class="i-class">
          <div slot="content">
            <!--<i-card :title="'云专线点到点'+(index+1)" extra="查看详情">-->
              <!--<div slot="content">-->
                <!--<p>业务ID:{{item.id}}</p>-->
                <!--<p>业务联系人:{{item.person}}      联系电话：{{item.phone}}</p>-->
                <!--<p>最后编辑时间:{{item.time}}</p>-->
              <!--</div>-->
            <!--</i-card>-->
            <carddemo @click="refertoedit" :sendData="item" :itemid="index"></carddemo>
          </div>
          <div slot="button" style="text-align: center" >
            <div >删除</div>
          </div>
        </i-swipeout>
      </div>
      </div>
    </div>
    <div v-show="current==='tab3'">
      <div v-for = "(item,index) in orderdatacommit" :key="index" >
      <div style="padding-top: 15px" >
        <i-swipeout :actions="actions"  @change="deleteitemcommit" i-class="i-class">   <!--@click="deleteitemcommit"-->
          <div slot="content">
            <carddemo @click="refercommit" :sendData="item" :itemid="index"></carddemo>
          </div>
          <div slot="button" style="text-align: center" >
            <div >删除</div>
          </div>
        </i-swipeout>
      </div>
    </div>
    </div>


    <div></div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import cardxue from '../../components/cardxue'
  import carddemo from '../../components/carddemo'
  export default {
    components: {
      cardxue, carddemo
    },
    data () {
      return {
        sortlist: {id: 1, phone: '15666666666', name: 'lh', time: '2019-3-26'},
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
        orderdatatocommit: [
          {
            id: '1001',
            person: '张三',
            phone: '15888888888',
            time: '2019-3-1'
          }, {
            id: '1002',
            person: '李四',
            phone: '15666666666',
            time: '2019-3-2'
          }, {
            id: '1003',
            person: '王五',
            phone: '15999999999',
            time: '2019-3-3'
          }],
        orderdatatoedit: [
          {
            id: '2001',
            person: '张三',
            phone: '15888888888',
            time: '2019-3-1'
          }, {
            id: '2002',
            person: '李四',
            phone: '15666666666',
            time: '2019-3-2'
          }, {
            id: '2003',
            person: '王五',
            phone: '15999999999',
            time: '2019-3-3'
          }, {
            id: '2004',
            person: '李辉',
            phone: '18888888888',
            time: '2019-3-5'
          }],
        orderdatacommit: [
          {
            id: '31001',
            person: '张三',
            phone: '15888888888',
            time: '2019-3-1'
          }, {
            id: '3002',
            person: '李四',
            phone: '15666666666',
            time: '2019-3-2'
          }]
      }
    },
    computed: {
      ...mapGetters({
        userCentral: 'exportUserCentral'
      })
    },
    mounted () {
      this.userinfo = getApp().globalData.userInfo
    },
    methods: {
      refertoedit (e) {
        console.log(e)
      },
      refercommit (e) {
        console.log(e)
        const url = '../../pages/ordercommiteddetail/main'
        mpvue.navigateTo({url})
      },
      refertocommit (e) { // 点击查看详情跳转
        console.log(e) // e中含有数据索引，此类型数据为点到点，跳转详情页面时要同步传递
        const url = '../../pages/ordertocommitdetail/main'
        mpvue.navigateTo({url})
      },
      tabChange (e) {
        console.log(e)
        this.current = e.mp.detail.key
      },
      deleteitemtocommit (e) {
        let eventid = e.mp.target.dataset.eventid
        if (eventid) {
          let arr = eventid.split('_')
          console.log(arr[1])
          this.orderdatatocommit.splice(arr[1], 1)
        }
      },
      deleteitemtoedit (e) {
        let eventid = e.mp.target.dataset.eventid
        if (eventid) {
          let arr = eventid.split('_')
          console.log(arr[1])
          this.orderdatatoedit.splice(arr[1], 1)
        }
      },
      deleteitemcommit (e) {
        let eventid = e.mp.target.dataset.eventid
        if (eventid) {
          let arr = eventid.split('_')
          console.log(arr[1])
          this.orderdatacommit.splice(arr[1], 1)
        }
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
</style>
