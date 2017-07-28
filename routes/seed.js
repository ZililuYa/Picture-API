var express = require('express');
var http = require("http");
var router = express.Router();
var cheerio = require('cheerio');

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
  current = current * pageNum - pageNum;
  // https://api.ziyuanmao.com/search/common
  var options = {
    "method": "GET",
    "hostname": "www.btcherry.info",
    "path": encodeURI("/search?keyword=" + key + "&p=" + current)
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
      // var data = JSON.parse(chunks);

      var $ = cheerio.load(chunks);
      var data = {
        total: $('#content .costs').html()
      };
      // data.total = parseInt(data.total)
      // console.log(data.total.split('&#x6761;')[0].split('&#x5230;')[1], data.total)
      data.total = data.total.split('&#x6761;')[0].split('&#x5230;')[1];
      data.items = [];
      for (var i in $('#content .r')) {
        var sres = {
          html: $('#content .r').eq(i).html(),
          name: $('#content .r .h').eq(i).text(),
          time: $('#content .r').eq(i).find('.prop_val').eq(0).html(),
          size: $('#content .r').eq(i).find('.prop_val').eq(1).html(),
          fileNum: $('#content .r').eq(i).find('.prop_val').eq(2).html(),
          magnet: $('#content .r').eq(i).find('a').eq(1).attr('href')
        }
        if (sres.html && sres.name) {
          data.items.push(sres);
        }
      }
      // console.log(data);
      data.code = '200';
      data.msg = '哈希获取成功';
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
