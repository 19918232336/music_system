import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSlideMini from 'vue-slide-mini'
import './assets/css/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueSlideMini)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
