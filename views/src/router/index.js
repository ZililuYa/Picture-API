import Vue from 'vue'
import Router from 'vue-router'
import Image from '@/components/Image.vue'
import Seed from '@/components/Seed.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Image',
      component: Image
    },
    {
      path: '/seed',
      name: 'Seed',
      component: Seed
    }
  ]
})
