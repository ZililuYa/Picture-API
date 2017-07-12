<template>
  <div class="hello container">
    <div class="row">
      <h2>{{msg}}</h2>
      <br><br><br>
      <Button type="primary" size="small" @click="$router.push('/image')" icon="bookmark">Demo</Button>
      <Button type="success" size="small" @click="open('https://github.com/nesfe/Picture-API')" icon="social-github">Github</Button>
      <br><br><br>
      <hr>
      <Slider v-model="value" range></Slider>
      <hr>
      <Progress :percent="num" status="active"></Progress>
      <hr>
      <i-switch></i-switch>
      <hr>
      <Icon type="checkmark"/>
      <hr>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'PictureAPI',
        value: [],
        num: 0
      }
    },
    mounted () {
      setInterval(() => {
        this.num++
        if (this.num > 100) this.num = 0
      }, 200)
    },
    methods: {
      open (url) {
        window.open(url)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ivu-btn {
    margin: 0 5px;
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
