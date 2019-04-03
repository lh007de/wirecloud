import Vue from 'vue'
import Vuex from 'vuex'

import initial from './initial.js'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    initial
  }
})
