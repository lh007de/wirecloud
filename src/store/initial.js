const state = {
  userCentral: {
    userName: '张三',
    userPhone: '15888888888',
    idCard: '请输入',
    pcLoginPwd: '请输入',
    contactEmail: '请录入',
    companyName: '请输入',
    companyCategory: '请输入',
    companyPhone: '请输入',
    companyQualification: '请输入',
    newUser: true
  },
  globalPara: { // 全局参数
    business_name: '', // 业务联系人姓名
    business_phone: '', // 业务联系人电话
    business_email: '', // 业务联系人邮箱
    business_managerID: '', // 客户经理ID
    business_OpenTime: '2年', // 业务预计开通周期
    business_IsRenew: true, // 是否自动续费
    business_PaidCycle: '按年', // 业务服务缴费周期
    business_type: '点到点', // 业务类型/名称
    business_band: '', // 服务宽带
    business_IsVlan: true, // 是否划分VLAN
    business_VlanId: '' // VLAN ID
  },
  pointToPoint: { // 点到点
    pointA: { // A端设置
      site_region: ['四川省', '成都市', '高新区'], // 站点地区
      site_DetailAddress: '', // 站点详细地址
      site_ContactName: '', // 站点联系人姓名
      site_ContactEmail: '', // 站点联系人邮箱
      site_ContactPhone: ''// 站点联系人电话
    },
    pointZ: { // Z端设置
      site_region: ['四川省', '成都市', '高新区'], // 站点地区
      site_DetailAddress: '', // 站点详细地址
      site_ContactName: '', // 站点联系人姓名
      site_ContactEmail: '', // 站点联系人邮箱
      site_ContactPhone: ''// 站点联系人电话
    }
  },
  pointToMultiPoint: { // 点到多点
    centerPoint: { // 中心节点
      site_region: ['四川省', '成都市', '高新区'], // 站点地区
      site_DetailAddress: '', // 站点详细地址
      site_ContactName: '', // 站点联系人姓名
      site_ContactEmail: '', // 站点联系人邮箱
      site_ContactPhone: '', // 站点联系人电话
      site_SerBand: '—', // 服务宽带
      site_VlanId: '—' // VLAN ID
    },
    branchPoint: {
    } // 分支节点动态添加
  }
}
const mutations = {
  setUserCentral (state, userCentral) { // 设置用户信息
    state.userCentral = userCentral
  },
  setGlobalPara (state, globalPara) { // 全局参数
    state.globalPara = globalPara
  },
  setPointToPoint (state, pointToPoint) { // 全局参数
    state.pointToPoint = pointToPoint
  },
  setPointToMultiPoint (state, pointToMultiPoint) { // 全局参数
    state.pointToMultiPoint = pointToMultiPoint
  }
}
const getters = {
  exportUserCentral: state => state.userCentral,
  exportGlobalPara: state => state.globalPara,
  exportPointToPoint: state => state.pointToPoint,
  exportPointToMultiPoint: state => state.pointToMultiPoint
}
const actions = {
  setUserCentral ({commit}, userCentral) {
    commit('setUserCentral', userCentral)
  },
  setGlobalPara ({commit}, globalPara) {
    commit('setGlobalPara', globalPara)
  },
  setPointToPoint ({commit}, pointToPoint) {
    commit('setPointToPoint', pointToPoint)
  },
  setPointToMultiPoint ({commit}, pointToMultiPoint) {
    commit('setPointToMultiPoint', pointToMultiPoint)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
