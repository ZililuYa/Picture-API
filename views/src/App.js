// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/iview/dist/styles/iview.css'
import iView from 'iview'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
import error from '@/assets/images/error.jpg'
import '@/assets/css/animate.min.css'
// use options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: error,
  loading: loading,
  attempt: 1
})

Vue.use(VueResource)
Vue.use(iView)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

Vue.directive('title', function (el, binding) {
  document.title = el.innerHTML
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

import 'bootstrap'
