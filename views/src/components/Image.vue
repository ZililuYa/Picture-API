<template>
  <div class="hello container">
    <div class="none" v-title>搜图 - 小章鱼🐙</div>
    <div class="row ">
      <!--<h3>所有图片来源于互联网</h3>-->
      <img :src="logo" alt="" style="width: 75px">
      <br><br>
    </div>
    <div :class="searchClass">
      <Input class="input" v-model="input" @keyup.enter.native="isSearch" placeholder="所有图片来源于互联网">
      <Button slot="append" icon="ios-search" type="primary" @click="isSearch">搜索</Button>
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
    <div ref="html"></div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

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
    z-index: 9999999;
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

  .image {
    background-color: #000;
  }

  .input {
    max-width: 400px;
    margin: 0 auto;
  }

  .input .ivu-input, .input .ivu-input-group-append {
    border-radius: 0;
  }

  .input .ivu-input-group-append {
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

</style>
