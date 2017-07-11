var express = require('express');
var http = require("http");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 * 服务：360图片API
 * {key} 关键字
 * {pageNum} 显示多少条 ， 默认20
 * {current} 当前页 ， 默认1
 * */
router.get('/search', function (req, res, next) {
  //http://image.so.com/j?q=123&src=srp&correct=123&sn=0&pn=20&sid=25488ccd46a01e898920b5e4a5d369c6&ran=0&ras=0
  var key = req.query.key;
  var pageNum = req.query.pageNum || 20;
  var current = req.query.current || 1;
  current = current * pageNum - pageNum;
  var options = {
    "method": "GET",
    "hostname": "image.so.com",
    "path": encodeURI("/j?q=" + key + "&src=srp&correct=123&sn=" + current + "&pn=" + pageNum + "&ran=0&ras=0")
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
      // var body = Buffer.concat(chunks);
      var data = JSON.parse(chunks);
      data.code = '200';
      data.msg = '图片获取成功';
      res.send(data);
    });
  }).on('error', function (e) {
    console.error(e);
  });
  request.end();
});

module.exports = router;
