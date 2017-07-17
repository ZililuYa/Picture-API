<template>
  <div id="app">
    <MenuPage ref="menu"></MenuPage>
    <router-view></router-view>
    <Back-top :bottom="100"></Back-top>
  </div>
</template>

<script>
  import MenuPage from '@/components/global/Menu.vue'
  export default {
    components: {
      MenuPage
    },
    name: 'app',
    data () {
      return {}
    },
    mounted () {
      this.keyUp()
    },
    methods: {
      keyUp () {
        document.body.onkeyup = (e) => {
          if (e.target.tagName === 'INPUT') return
          if (e.keyCode === 77) {
            this.menuFun()
          }
        }
      },
      menuFun () {
        console.log('操作菜单！')
        this.$refs.menu.open()
      }
    }
  }
</script>

<style lang="less">
  @import "./assets/css/app.less";
</style>
