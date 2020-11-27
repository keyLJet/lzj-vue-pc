// @ts-nocheck
import Vue from 'vue'
import App from './App.vue'
import router from './router/'

//公共资源
import "./styles/reset.css";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
