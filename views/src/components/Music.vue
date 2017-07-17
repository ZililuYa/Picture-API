<template>
  <div class="music container">
    <div class="none" v-title>音乐 - 小章鱼</div>
    <div class="row ">
      <!--<h3>所有图片来源于互联网</h3>-->
      <img :src="logo" alt="" style="width: 75px">
      <br><br>
    </div>
    <div :class="searchClass">
      <Input class="input" v-model="input" @keyup.enter.native="isSearch" placeholder="所有音乐来源于互联网">
      <Button slot="append" icon="ios-search" type="success" @click="isSearch">搜索音乐</Button>
      </Input>
    </div>
    <div class="row">
      <div class="song animated fadeInUp" v-for="item in data">
        {{ item.fsinger }} - {{ item.fsong }}
        <div class="btndiv">
          {{ }}
          <a @click="isPlay(item.f.split('|'))">播放</a>
          <a>下载</a>
        </div>
      </div>
    </div>
    <div class="page" v-if="total">
      <div class="row">
        <Page :total="total" :page-size="pageNum" :current="current" size="small" @on-change="isChange"
              @on-page-size-change="isSizeChange"
              :page-size-opts="[20, 40, 60, 80]"></Page>
      </div>
    </div>
    <div id="player" class="aplayer"></div>
  </div>
</template>

<script>
  import logo from '@/assets/logo.png'
  import APlayer from 'aplayer'
//  import $ from 'jquery'

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
        pageNum: 20,
        images: [],
        searchClass: '',
        key: '',
        sip: ''
      }
    },
    mounted () {
      this.isData()
      this.handleScroll()
//      $.ajax({
//        async: false,
//        url: 'http://base.music.qq.com/fcgi-bin/fcg_musicexpress.fcg?json=3&loginUin=0&format=jsonp&inCharset=GB2312&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0',
//        type: 'GET',
//        dataType: 'jsonp',
//        jsonp: 'callback',
//        jsonpCallback: 'jsonCallback',
//        timeout: 5000,
//        beforeSend: function () {
//        },
//        success: (json) => {
//          console.log('KEY:', json)
//          this.key = json.key
//          this.sip = json.sip
//        },
//        complete: function (XMLHttpRequest, textStatus) {
//        },
//        error: function (xhr) {
//          alert('请求出错(请检查相关度网络状况.)')
//        }
//      })
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
        this.$http.get(`/music/search?key=${this.input}&current=${this.current}`).then((req) => {
          if (req.body.code === '200') {
            this.data = req.body.data.song.list
            this.total = req.body.data.song.totalnum
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
      },
      isPlay (arr) {
//        console.log(arr)
        let lrc = `http://music.qq.com/miniportal/static/lyric/${arr[0] % 100}/${arr[0]}.xml`
        console.log('歌词：', lrc)
        var ap1 = new APlayer({
          element: document.getElementById('player'),
          narrow: false,
          autoplay: true,
          showlrc: false,
          mutex: true,
          theme: '#e6d0b2',
          preload: 'metadata',
          mode: 'circulation',
          music: {
            title: arr[1],
            author: arr[3],
//            lrc: lrc,
            url: `http://ws.stream.qqmusic.qq.com/${arr[0]}.m4a?fromtag=46`,
            pic: `http://imgcache.qq.com/music/photo/mid_album_90/${arr[22].split('')[12]}/${arr[22].split('')[13]}/${arr[22]}.jpg`
          }
        })
        console.log(ap1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .music {
    .aplayer {
      position: fixed;
      right: -500 + 30px;
      bottom: 300px;
      min-width: 500px;
      background-color: #fff;
      transition-duration: 1s;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
      &:hover {
        right: 0;
      }
    }
    .song {
      padding: 0 20px;
      width: 100%;
      line-height: 40px;
      border-bottom: 2px solid #eee;
      margin-top: 20px;
      text-align: left;
      transition-duration: .5s;
      &:hover {
        border-bottom: 2px solid #2b85e4;
      }
      .btndiv {
        float: right;
        a:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
  }
</style>
