import Vue from 'vue'
import Router from 'vue-router'
import Image from '@/components/Image.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Image',
      component: Image
    }
  ]
})
