import Vue from 'vue'
import App from './index'

import api from '../../utils/api'
Vue.prototype.$api = api
// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()
