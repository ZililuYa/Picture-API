import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import Image from '@/components/Image.vue'
import Music from '@/components/Music.vue'
import Seed from '@/components/Seed.vue'
import Video from '@/components/Video.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/image',
      name: 'Image',
      component: Image
    },
    {
      path: '/seed',
      name: 'Seed',
      component: Seed
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    }
  ]
})
