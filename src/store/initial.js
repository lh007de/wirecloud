const state = {
  userCentral: { // 选择派单id 总重量，总数量
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
  }
}
const mutations = {
  setUserCentral (state, userCentral) { // 设置用户信息
    state.userCentral = userCentral
  }
}
const getters = {
  exportUserCentral: state => state.userCentral// 获取用户信息
}
const actions = {
  setUserCentral ({commit}, userCentral) {
    commit('setUserCentral', userCentral)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
