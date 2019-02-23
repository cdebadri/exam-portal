import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueScrollTo from 'vue-scrollto'
import VueMq from 'vue-mq'

Vue.config.productionTip = false

Vue.use(VueScrollTo)

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
