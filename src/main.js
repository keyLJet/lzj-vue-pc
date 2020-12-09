// @ts-nocheck
import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from "./store";

//公共资源
import "./styles/reset.css";
import "./styles/iconfont.css";
import "swiper/swiper-bundle.min.css";

import './plugins/element.js'
import './plugins/lazyload.js'

//引入mockServer
import './mock/mockServer'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store,
}).$mount('#app')
