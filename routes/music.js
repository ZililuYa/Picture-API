var express = require('express');
var http = require("http");
var router = express.Router();
const musicAPI = require('music-api');

/**
 * 服务：seed
 * {key} 关键字
 * {pageNum} 显示多少条 ， 默认20
 * {current} 当前页 ， 默认1
 * */
router.get('/search', function (req, res, next) {
  var key = req.query.key;
  var vendor = req.query.vendor;
  var pageNum = req.query.pageNum || 20;
  var current = req.query.current || 1;
  // current = current * pageNum - pageNum;
  // https://api.ziyuanmao.com/search/common
  let qq = 0;
  let url = `/fcgi-bin/music_search_new_platform?t=0&n=${pageNum}&aggr=1&cr=1&loginUin=${qq}&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=${current}&catZhida=0&remoteplace=sizer.newclient.next_song&w=${key}`;
  var options = {
    "method": "GET",
    "hostname": "s.music.qq.com",
    "path": encodeURI(url)
  };
  if (!key) {
    res.send({
      code: '500',
      msg: '没有关键字'
    });
    return;
  }
  musicAPI.searchSong(vendor, {
    key: key,
    limit: pageNum,
    page: current,
  }).then((req) => {
    req.code = '200';
    req.msg = '图片获取成功';
    res.send(req)
  }).catch((err) => {
    err.code = '500';
    res.send(err)
  })
});


router.get('/getSong', function (req, res, next) {
  var id = req.query.id;
  var vendor = req.query.vendor;
  musicAPI.getSong(vendor, {
    id
  }).then((req) => {
    req.code = '200';
    req.msg = '获取歌曲链接成功';
    res.send(req)
  }).catch((err) => {
    err.code = '500';
    res.send(err)
  })
})

module.exports = router;
