var express = require('express');
var http = require("http");
var router = express.Router();

/**
 * 服务：seed
 * {key} 关键字
 * {pageNum} 显示多少条 ， 默认20
 * {current} 当前页 ， 默认1
 * */
router.get('/search', function (req, res, next) {
  var key = req.query.key;
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
  var request = http.request(options, function (opt) {
    var chunks = '';
    opt.setEncoding('utf8');
    opt.on("data", function (chunk) {
      chunks += chunk;
    });

    opt.on("end", function () {
      var data = JSON.parse(chunks);
      data.code = '200';
      data.msg = '歌曲获取成功';
      res.send(data);
    });
    opt.on('timeout', function () {
      request.end();
      res.send({
        code: '500',
        msg: '连接超时'
      });
    });
  }).on('error', function (e) {
    console.error(e);
    res.send({
      code: '500',
      msg: '接口错误'
    });
  });
  request.end();
});

module.exports = router;
