<template>
  <div class="sortList">
    <div
      v-for="(item,i) in sortlist"
      :key="i"
      :class="isClick === item.type ? 'sort-active':''"
      class="sort-grid"
      @click="clickFn(item)">
      <div class="sort-title">
        <p class="num">{{ item.num }}</p>
        <p class="name">{{ item.name }}</p>
      </div>
      <svg-icon :icon-class="item.icon" class="svg-style"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardxue',
  props: {
    sortlist: { // 数据源
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isClick: ''
    }
  },
  methods: {
    clickFn (data) {
      const vm = this
      if (vm.isClick !== data.type) {
        vm.isClick = data.type
        this.$emit('sortCilck', data.type)
      } else {
        vm.isClick = ''
        this.$emit('sortCilck', '')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .sortList{
    display: flex;
    .sort-grid{
      float: left;
      margin-right: 50px;
      padding: 16px 24px;
      width: 200px;
      height: 80px;
      border-radius: 5px;
      background-color: #70c0b3;
      border: solid 1px #6bb3a7;
      cursor: pointer;
      .sort-title{
        display: inline-block;
        p{
          margin: 0;
          &.num{
            line-height: 26px;
            letter-spacing: 3px;
            font-size: 30px;
            color: #ffffff;
          }
          &.name{
            line-height: 20px;
            letter-spacing: 1.2px;
            font-size: 12px;
            color: #a8f5e9;
          }
        }
      }
      .svg-style{
        margin-top: 4px;
        float: right;
        font-size: 32px;
        color: #fcffcd;
      }
    }
    .sort-active{
      background-color: #b3dbc0;
      border: solid 1px rgba(162, 200, 175, 0.8);
      .sort-title{
        p{
          &.name{
            color: #ffffff;
          }
        }
      }
      .svg-style{
        color: #ffffff;
      }
    }
  }
</style>
