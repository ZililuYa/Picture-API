<template>
  <div class="video container">
    <div class="none" v-title>视频 - 小章鱼</div>
    <div class="row ">
      <!--<h3>所有图片来源于互联网</h3>-->
      <object :data="logo" alt="" style="width: 75px"></object>
      <br><br>
    </div>
    <div :class="searchClass">
      <Input class="input" v-model="input" @keyup.enter.native="isSearch" placeholder="所有资源来源于互联网">
      <Button slot="append" icon="ios-search" type="success" @click="isSearch">搜索视频</Button>
      </Input>
    </div>
    <div class="row video-row" v-for="item in data">
      <div class="col-sm-12 col-md-3 col-lg-3">
        <img style="width:100%;" :src="item.img" alt="">
      </div>
      <div class="col-sm-12 col-md-9 col-lg-9">
        <h3 class="text-left h3">{{item.name}}</h3>
        <p class="text-left p">
          {{item.movie_content}}
        </p>
      </div>
      <div class="col-lg-12 list">
          <div class="video-input" v-for="i in item.arr">
            <input type="text" :value="i.thunder" disabled="disabled">
            <a :href="i.thunder" target="_blank" class="download">Download</a>
          </div>
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
        this.$http.get(`/video/search?key=${this.input}`).then((req) => {
          if (req.body.code === '200') {
            this.$Loading.finish()
            console.log(req.body)
            this.data = req.body.list
          } else {
            this.$Loading.error()
          }
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
<style lang="less">
  .video-row {
    margin-top: 20px;
    padding: 15px 0;
    border: 1px solid #ddd;
    .h3 {
      margin-bottom: 20px;
      margin-top: 5px;
    }
    .p {
      line-height: 25px;
    }

    .list {
      padding-top: 30px;
      float: left;
      width: 100%;
    }
    .video-input {
      width: 100%;
      padding: 15px;
      border: 1px solid #ddd;
      border-bottom: 0;
      position: relative;
      &:last-child {
        border-bottom: 1px solid #ddd;
      }
      input {
        width: 100%;
        border: 0;
        background-color: transparent;
      }
      .download {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 25px;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        padding: 0 10px;
        background-color: #fff;
        transition-duration: 0.5s;
        &:hover {
          box-shadow: 0 0 10px #ddd;
        }
      }
    }
  }
</style>
