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

<style>
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .none {
    display: none;
  }

  .searchClass {
    transition-duration: 0.5s;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 99999;
    padding: 10px 0;
  }

  .padding0 {
    padding: 0 !important;
  }

  .demo-badge {
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
    background: #eee;
    border-radius: 6px;
    display: inline-block;
    font-size: 12px;
  }

  .input {
    max-width: 400px;
    margin: 0 auto;
  }

  .input .ivu-input, .input .ivu-input-group-append {
    border-radius: 0;
  }

  .image .input .ivu-input-group-append {
    background-color: #2d8cf0;
    color: #fff;
    border: 1px solid #2d8cf0;
  }

  .container.hello {
    padding-bottom: 70px;
  }

  .ivu-table-cell {
    padding: 18px;
  }

  .img {
    padding: 5px;
    border: 1px solid #dddee1;
    margin-bottom: 20px;
  }

  .img:hover {
    box-shadow: 0 0 10px #dddee1;
  }

  .img img {
    width: 100%;
  }

  .img[lazy=error] {
    display: none;
  }

  .img[src*=".baidu.com"],
  .img[src*=".bimg.126.net"],
  .img[src*=".bdimg.com"],
  .img[src*=".soso.com"],
  .img[src*=".nipic.com"],
  .img[src*=".taopic.com"],
  .img[src*=".ivsky.com"],
  .img[src*=".redocn.com"],
  .img[src*=".3conline.com"],
  .img[src*=".126.net"],
  .img[src*=".pconline.com.cn"],
  .img[src*=".pcgames.com.cn"],
  .img[src*=".cecb2b.com"],
  .img[src*=".sinaimg.cn"],
  .img[src*=".ik123.com"],
  .img[src*=".qq.com"],
  .img[src*=".cnhuadong.net"],
  .img[src*=".tuzhan.com"] {
    display: none;
  }

  .page {
    z-index: 99999;
    width: 100%;
    position: fixed;
    text-align: center;
    padding: 10px 0;
    background-color: #fff;
    /*border-top:1px solid #e9eaec;*/
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    left: 0;
    bottom: 0;
  }

  .page .ivu-select-dropdown {
    top: auto !important;
    bottom: 50px !important;
  }

  .page .ivu-page-item-active {
    border-radius: 0 !important;
  }

  .operation {
    overflow: hidden;
    padding-top: 5px;
  }

  .operation .col-xs-4 {
    border-right: 1px solid #d6d6d6;
  }

  .operation .col-xs-4:last-child {
    border-right: 0;
  }

  .title {
    text-align: left;
    padding-bottom: 20px;
    font-weight: bold;
  }

  .seed .input .ivu-input-group-append {
    background-color: #19be6b;
    color: #fff;
    border: 1px solid #19be6b;
  }
</style>
