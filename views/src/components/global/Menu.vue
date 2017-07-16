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
          name: 'Image',
          cn: '',
          path: '/'
        }, {
          name: 'Seed',
          cn: '',
          path: '/seed'
        }, {
          name: '...',
          cn: '',
          path: ''
        }, {
          name: '...',
          cn: '',
          path: ''
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

<style lang="less">
  .menu {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.5);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9999887;
    display: none;
    .li {
      float: left;
      width: 25%;
      height: 100vh;
      line-height: 100vh;
      color: #fff;
      font-size: 30px;
      z-index: 0;
      position: relative;
      transition-duration: .3s;
      cursor: pointer;
      &:hover {
        animation-fill-mode: none !important;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
        z-index: 999;
        transform: scale(1.2, 1.2) !important;
      }
      &:nth-child(1) {
        background-color: rgba(45, 140, 240, 0.9);
      }
      &:nth-child(2) {
        background-color: rgba(25, 190, 107, 0.9);
        animation-delay: 0.3s;
      }
      &:nth-child(3) {
        background-color: #ff9900;
        background-color: rgba(255, 153, 0, 0.9);
        animation-delay: 0.6s;
      }
      &:nth-child(4) {
        background-color: rgba(237, 63, 20, 0.9);
        animation-delay: 0.9s;
      }
      &:nth-child(5) {
        background-color: #e4b0a6;
        animation-delay: 1.2s;
      }
      &:nth-child(6) {
        background-color: #a5e439;
        animation-delay: 1.5s;
      }
      &:nth-child(7) {
        background-color: #a62ce4;
        animation-delay: 1.8s;
      }
      &:nth-child(8) {
        background-color: #e4a823;
        animation-delay: 2.1s;
      }
    }
  }
</style>
