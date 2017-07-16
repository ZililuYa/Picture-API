<template>
  <div class="image container">
    <div class="none" v-title>搜图 - 小章鱼</div>
    <div class="row ">
      <!--<h3>所有图片来源于互联网</h3>-->
      <img :src="logo" alt="" style="width: 75px">
      <br><br>
    </div>
    <div :class="searchClass">
      <Input class="input" v-model="input" @keyup.enter.native="isSearch" placeholder="所有图片来源于互联网">
      <Button slot="append" icon="ios-search" type="primary" @click="isSearch">搜索图片</Button>
      </Input>
    </div>
    <div class="row" v-if="data.length">
      <div class="col-xs-12">
        <h5 class="title">
          <Badge :count="data.length">
            <span class="demo-badge">第一触角</span>
          </Badge>
        </h5>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3" v-for="x in 4">
        <div class="img" v-for="(item, i) in data" v-if="i%4 === (x-1)" v-lazy="item.img">
          <img v-lazy="item.img" ref="img">
          <div class="operation">
            <div class="col-xs-4">{{item.imgsize}}</div>
            <div class="col-xs-4">{{item.imgtype}}</div>
            <div class="col-xs-4"><a :href="item.img" target="_blank">下载</a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="dataTwo.length">
      <div class="col-xs-12">
        <h5 class="title">
          <Badge :count="dataTwo.length">
            <span class="demo-badge">第二触角</span>
          </Badge>
        </h5>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3" v-for="x in 4">
        <div class="img" v-for="(item, i) in dataTwo" v-if="i%4 === (x-1)" v-lazy="item.pic_url">
          <img v-lazy="item.pic_url" ref="img">
          <div class="operation">
            <div class="col-xs-4">{{(item.size / 1024 / 1024).toFixed(2) + 'M'}}</div>
            <div class="col-xs-4 padding0">{{item.width + ' / ' + item.height}}</div>
            <div class="col-xs-4"><a :href="item.pic_url" target="_blank">下载</a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="dataThree.length">
      <div class="col-xs-12">
        <h5 class="title">
          <Badge :count="dataThree.length">
            <span class="demo-badge">第三触角</span>
          </Badge>
        </h5>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3" v-for="x in 4">
        <div class="img" v-for="(item, i) in dataThree" v-if="i%4 === (x-1)" v-lazy="item.iurl">
          <img v-lazy="item.iurl" ref="img">
          <div class="operation">
            <div class="col-xs-4">{{item.s}}</div>
            <div class="col-xs-4 padding0">{{item.w + ' / ' + item.h}}</div>
            <div class="col-xs-4"><a :href="item.iurl" target="_blank">下载</a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="page" v-if="total">
      <div class="row">
        <Page :total="total" :page-size="pageNum" :current="current" size="small" @on-change="isChange"
              @on-page-size-change="isSizeChange"
              :page-size-opts="[50, 100, 200, 400]"
              show-elevator show-sizer></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import logo from '@/assets/logo.png'
  export default {
    name: 'hello',
    data () {
      return {
        logo,
        input: '',
        total: 0,
        columns: [{
          title: '图片',
          key: 'img',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.img
                }
              })
            ])
          }
        }],
        data: [],
        dataTwo: [],
        dataThree: [],
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
        this.dataTwo = []
        this.dataThree = []
        this.$Loading.start()
        this.$http.get('/so?key=' + this.input + '&current=' + this.current + '&pageNum=' + this.pageNum, {}).then((req) => {
          if (req.body.code === '200') {
            this.data = req.body.list
            this.total = req.body.total
            this.$Loading.finish()
          } else {
            this.$Loading.error()
          }
          console.log(req.body)
        })
        this.$http.get('/sogou?key=' + this.input + '&current=' + this.current + '&pageNum=' + this.pageNum, {}).then((req) => {
          if (req.body.code === '200') {
            this.dataTwo = req.body.items
//            this.total = req.body.total
            this.$Loading.finish()
          } else {
            this.$Loading.error()
          }
          console.log(req.body)
        })
        this.$http.get('/yahoo?key=' + this.input + '&current=' + this.current + '&pageNum=' + this.pageNum, {}).then((req) => {
          if (req.body.code === '200') {
            this.dataThree = req.body.items
//            this.dataTwo = req.body.items
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

