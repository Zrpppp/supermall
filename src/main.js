import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue();

//使用懒加载插件
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/img.png')
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
