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
    sm: 600,
    md: 1264,
    lg: 1904
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
