// @ts-nocheck
import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from "./store";


//公共资源
import "./styles/reset.css";

import './plugins/element.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
