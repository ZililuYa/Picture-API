<template>
  <div class="seed container">
    <div class="none" v-title>树苗 - 小章鱼</div>
    <div class="row ">
      <!--<h3>所有图片来源于互联网</h3>-->
      <object :data="logo" alt="" style="width: 75px"></object>
      <br><br>
    </div>
    <div :class="searchClass">
      <Input class="input" v-model="input" @keyup.enter.native="isSearch" placeholder="所有数据来源于互联网">
      <Button slot="append" icon="ios-search" class="" type="success" @click="isSearch">搜索哈希</Button>
      </Input>
    </div>
    <div class="row items">
      <div class="item" v-for="item in data">
        {{item.name}}
        <div class="btnDiv">
          <span class="a">时间：{{item.time}}</span>
          <span class="a">大小：{{item.size}}</span>
          <span class="a">文件数：{{item.fileNum}}</span>
          <a :href="item.magnet" target="_blank" class="a">Hash</a>
        </div>
      </div>
    </div>
    <div class="page" v-if="data.length">
      <div class="row">
        <Page :total="total" :page-size="pageNum" :current="current" size="small" @on-change="isChange"></Page>
      </div>
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
        input: '',
        total: 0,
        data: [],
        title: '',
        current: 1,
        pageNum: 50,
        images: [],
        searchClass: ''
      }
    },
    mounted () {
      this.isData()
      this.handleScroll()
    },
    methods: {
      handleScroll () {
        let sllY = 0
        window.onscroll = () => {
          sllY = window.scrollY
          if (sllY > 135) {
            this.searchClass = 'searchClass'
          } else {
            this.searchClass = ''
          }
        }
      },
      isData () {
        this.data = []
        this.$Loading.start()
        this.$http.get('/seed/search?key=' + this.input + '&current=' + this.current + '&pageNum=' + this.pageNum, {}).then((req) => {
          if (req.body.code === '200') {
            this.data = req.body.items
            this.total = parseInt(req.body.total)
            this.$Loading.finish()
          } else {
            this.$Loading.error()
          }
          console.log(req.body)
        })
      },
      isSearch () {
        this.current = 1
        this.isData()
      },
      isChange (n) {
        this.current = n
        this.isData()
      },
      isSizeChange (n) {
        this.pageNum = n
        this.current = 1
        this.isData()
      },
      isLoad () {
        this.images = []
        this.$refs.img.forEach((a, b) => {
//          console.log(a, b)
          this.images.push(a.getAttribute('lazy'))
        })
        console.log(this.images)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
