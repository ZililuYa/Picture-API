<template>
  <div :class="className" id="menu">
    <div class="li animated fadeInRight" @click="pathFun(item.path)" v-for="item in data">{{item.name}}</div>
  </div>

</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'MenuPage',
    data () {
      return {
        className: 'menu',
        data: [{
          name: '图片',
          cn: '',
          path: '/image'
        }, {
          name: '哈希',
          cn: '',
          path: '/seed'
        }, {
          name: '音乐',
          cn: '',
          path: '/music'
        }, {
          name: '视频',
          cn: '',
          path: '/video'
        }],
        isf: true
      }
    },
    mounted () {
    },
    methods: {
      open () {
        console.log(this.isf)
        if (this.isf) {
          $('#menu').stop().fadeIn(500, function () {
            $('#menu').addClass('active')
          })
        } else {
          $('#menu').stop().fadeOut(500, function () {
            $('#menu').removeClass('active')
          })
        }
        this.isf = !this.isf
      },
      pathFun (path) {
        if (!path) return
        this.isf = true
        $('#menu').stop().fadeOut(0, function () {
          $('#menu').removeClass('active')
        })
        this.$router.push(path)
      }
    }
  }
</script>
