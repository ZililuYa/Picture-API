var express = require('express');
var http = require("http");
var router = express.Router();
var qs = require("querystring");
var cheerio = require('cheerio');
var request = require("request");
/**
 * 服务：80s
 * {key} 关键字
 * */
router.get('/search', function (req, res, next) {
  var data = {
    list: []
  }
  var key = req.query.key;
  // https://api.ziyuanmao.com/search/common
  // http://www.80s.tw/search
  var options = {
    "method": "POST",
    "hostname": "www.80s.tw",
    "port": null,
    "path": "/search",
    "headers": {
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      "cache-control": "no-cache"
    }
  };
  if (!key) {
    res.send({
      code: '500',
      msg: '没有关键字'
    });
    return;
  }
  var requestHttp = http.request(options, function (opt) {
    var chunks = '';
    opt.setEncoding('utf8');
    opt.on("data", function (chunk) {
      chunks += chunk;
    });
    opt.on("end", function () {
      var $ = cheerio.load(chunks, {decodeEntities: false});
      // data.items = [];
      for (var i in $('.search_list a')) {
        let a = $('.search_list a').eq(i);
        let obj = {};
        obj.name = a.text();
        if (!obj.name) break;
        obj.href = a.attr('href');
        data.list.push(obj);
      }
      deep();
    });
    opt.on('timeout', function () {
      requestHttp.end();
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
  // request.write(reqData);
  requestHttp.write("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"keyword\"\r\n\r\n" + key + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--");
  requestHttp.end();

  var num = 0

  function deep() {
    if (data.list.length <= num) {
      data.code = '200'
      data.msg = '数据获取成功'
      res.send(data);
      num = 0;
      return;
    }
    let a = data.list[num];
    // console.log(a)
    let path = '';
    if (a.href) path = a.href.replace('movie', 'ju')
    var options = {
      method: 'GET',
      url: 'http://www.80s.tw' + path,
      headers: {
        'postman-token': '2f4396ec-6f5f-a1c0-5a8c-389f6bd7a13f',
        'cache-control': 'no-cache'
      }
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      var $ = cheerio.load(body, {decodeEntities: false});
      a.arr = []
      a.img = $('#minfo .img img').eq(0).attr('src');
      a.movie_content = $('#movie_content').text().replace('80s', '');
      for (var i in $('.clearfix input[type=checkbox]')) {
        let nofo = $('.clearfix input[type=checkbox]').eq(i);
        let kk = {
          name: nofo.text(),
          thunder: nofo.attr('value')
        }
        if (kk.thunder && kk.thunder != 'on') a.arr.push(kk)
      }
      num++;
      deep();
    });
  }
});

module.exports = router;
