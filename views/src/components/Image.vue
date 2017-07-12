<template>
  <div class="hello container">
    <div class="row ">
      <!--<h1 class="image"><img v-lazy="title" alt=""></h1>-->
    </div>
    <div class="row">
      <Input class="input" v-model="input" @keyup.enter.native="isSearch" placeholder="请输入关键字">
      <Button slot="append" icon="ios-search" type="primary" @click="isSearch">搜索</Button>
      </Input>
    </div>
    <div class="row" v-if="data.length">
      <!--<Table :columns="columns" :data="data"></Table>-->
      <div class="col-sm-6 col-md-4 col-lg-3 ">
        <div class="img" v-for="(item, i) in data" v-if="(i+1)%4 === 1">
          <img v-lazy="item.img" alt="">
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 ">
        <div class="img" v-for="(item, i) in data" v-if="(i+1)%4 === 2">
          <img v-lazy="item.img" alt="">
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 ">
        <div class="img" v-for="(item, i) in data" v-if="(i+1)%4 === 3">
          <img v-lazy="item.img" alt="">
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 ">
        <div class="img" v-for="(item, i) in data" v-if="(i+1)%4 === 0">
          <img v-lazy="item.img" alt="">
        </div>
      </div>
    </div>
    <div class="row" v-if="!data.length">
      <div class="">
        <img src="" alt="">
      </div>
    </div>
    <div class="page">
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
  export default {
    name: 'hello',
    data () {
      return {
        input: '火影忍者壁纸',
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
        title: '',
        current: 1,
        pageNum: 50
      }
    },
    mounted () {
      this.isData()
    },
    methods: {
      isData () {
        this.data = []
        this.$Loading.start()
        this.$http.get('/search?key=' + this.input + '&current=' + this.current + '&pageNum=' + this.pageNum, {}).then((req) => {
          if (req.body.code === '200') {
            this.data = req.body.list
            this.total = req.body.total
            this.$Loading.finish()
          } else {
            this.$Loading.error()
          }
//          console.log(req.body)
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .image {
    background-color: #000;
  }

  .input {
    max-width: 400px;
    margin: 0 auto;
  }

  .row {
    padding-top: 20px;
  }

  .container {
    padding-bottom: 150px;
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

  .page {
    z-index: 99999;
    width: 100%;
    position: fixed;
    text-align: center;
    padding-bottom: 20px;
    background-color: #fff;
    /*border-top:1px solid #e9eaec;*/
    box-shadow: 0 0 10px #dddee1;
    left: 0;
    bottom: 0;
  }

  .page .ivu-select-dropdown {
    top: auto !important;
    bottom: 50px !important;
  }
</style>
