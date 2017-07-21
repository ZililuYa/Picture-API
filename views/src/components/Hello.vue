<template>
  <div class="container">
    <div class="none" v-title>小章鱼</div>
    <div class="row">
      <object :data="logo" style="width: 100px"></object>
      <br><br>
    </div>
    <div class="row">
      <h5>小章鱼提醒您，请按 M 键</h5>
    </div>
  </div>
</template>

<script>
  import logo from '@/assets/images/logo.svg'
  export default {
    name: 'hello',
    data () {
      return {
        logo,
        value: [],
        num: 0
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>

<style scoped>
  h5 {
    color: #797979;
  }
</style>
