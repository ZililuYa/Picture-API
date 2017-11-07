<template>
  <div class="music container">
    <div class="none" v-title>音乐 - 小章鱼</div>
    <div class="row ">
      <object :data="logo" alt="" style="width: 75px"></object>
      <br><br>
    </div>
    <div :class="searchClass">
      <Input class="input" v-model="input" @keyup.enter.native="isSearch" placeholder="所有音乐来源于互联网">
      <Button slot="append" icon="ios-search" type="success" @click="isSearch">搜索音乐</Button>
      </Input>
    </div>
    <div class="row">
      <br>
      <br>
      <Tabs type="card" @on-click="tabClick">
        <TabPane v-for="m in menu" :key="m.name" :label="m.label" :name="m.name">
          <div class="demo-spin-container" v-show="loading">
            <Spin fix></Spin>
          </div>
          <div class="div music_div" v-show="!loading" v-for="i in data[m.name]">
            <img :src="i.album.coverBig" class="fm" alt="">
            <Tooltip :content="'收录在专辑《 ' + i.album.name + ' 》'" placement="top">
              <span class="music_span">{{i.name}} - {{i.artists[0].name}}</span>
            </Tooltip>
            <div class="fr">
              <Button type="info" size="small" @click="isPlay(i)">播放</Button>
              <Button type="text" size="small" @click="isDownload">下载</Button>
            </div>
          </div>
          <div class="row" v-if="data[m.name + '_total']">
            <br>
            <br>
            <Page :total="data[m.name + '_total']" :page-size="pageNum" :current="data[m.name + '_current']" show-total @on-change="isChange"></Page>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <div id="player" class="aplayer"></div>
  </div>
</template>

<script>
  import logo from '@/assets/images/logo.svg'
  import APlayer from 'aplayer'
  //  import $ from 'jquery'

  export default {
    name: 'hello',
    data () {
      return {
        loading: false,
        name: 'netease',
        menu: [{
          label: '网易云音乐',
          name: 'netease'
        }, {
          label: '虾米',
          name: 'xiami'
        }, {
          label: 'QQ音乐',
          name: 'qq'
        }],
        logo,
        input: '',
        data: {
          netease: [],
          xiami: [],
          qq: [],
          xiami_total: 0,
          xiami_current: 1,
          netease_total: 0,
          netease_current: 1,
          qq_total: 0,
          qq_current: 1
        },
        title: '',
        pageNum: 20,
        images: [],
        searchClass: '',
        key: '',
        sip: '',
        url: ''
      }
    },
    mounted () {
//      this.isData()
      this.handleScroll()
    },
    methods: {
      isDownload () {
        if (this.url) window.open(this.url)
        if (!this.url) this.$Message.info('请您先播放')
      },
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
      tabClick (name) {
        this.name = name
      },
      isData (vendor) {
        this.loading = true
        this.$http.get(`/music/search?key=${this.input}&current=${this.data[vendor + '_current']}&vendor=${vendor}`).then((req) => {
          if (req.body.code === '200') {
            this.data[vendor] = req.body.songList
            this.data[vendor + '_total'] = req.body.total
          } else {
            this.$Loading.error()
          }
          this.loading = false
          console.log(req.body)
        })
      },
      isSearch () {
        this.data['netease_current'] = 1
        this.data['xiami_current'] = 1
        this.data['qq_current'] = 1
        this.isData('netease')
        this.isData('xiami')
        this.isData('qq')
      },
      isChange (n) {
        this.data[this.name + '_current'] = n
        this.isData(this.name)
      },
      isPlay (arr) {
        this.$http.get(`/music/getSong?id=${arr.id}&vendor=${this.name}`).then((req) => {
          console.log(req.body)
          callback(req.body)
        })
        let callback = (item) => {
          this.url = item.url
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
              title: arr.name,
              author: arr.artists[0].name,
              url: item.url,
              pic: arr.album.coverBig
            }
          })
          console.log(ap1)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .loop(@counter) when (@counter > 0) {
    .loop((@counter - 1));
    .song {
      &:nth-child(@{counter}) {
        animation-delay: @counter / 5 - 0.2s;
      }
    }
  }

  .music {
    .aplayer {
      position: fixed;
      right: -300 + 61px;
      bottom: 200px;
      min-width: 300px;
      background-color: #fff;
      transition-duration: 1s;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
    .loop(30)
  }

  .demo-spin-container {
    display: inline-block;
    width: 200px;
    height: 100px;
    position: relative;
  }
</style>
