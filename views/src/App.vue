<template>
  <div id="app">
    <MenuPage ref="menu"></MenuPage>
    <router-view></router-view>
    <Back-top :bottom="100"></Back-top>
    <a class="drag-menu" @click="menuFun">
      <Icon type="drag"></Icon>
    </a>
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
      console.clear()
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
        this.$refs.menu.open()
      }
    }
  }
</script>

<style lang="less">
  @import "./assets/css/app.less";
</style>
