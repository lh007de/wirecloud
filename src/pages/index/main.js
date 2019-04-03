import Vue from 'vue'
import App from './index'

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()

// export default {
//   config: {
//     usingComponents: {
//       'i-card': '../../../static/iview/card/index',
//       'i-button': '../../../static/iview/button/index'
//     }
//   }
// }
