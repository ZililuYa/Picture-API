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
router.get('/so', function (req, res, next) {
  var key = req.query.key;
  var pageNum = req.query.pageNum || 20;
  var current = req.query.current || 1;
  current = current * pageNum - pageNum;
  var options = {
    "method": "GET",
    "hostname": "image.so.com",
    "path": encodeURI("/j?q=" + key + "&src=srp&correct=" + key + "&sn=" + current + "&pn=" + pageNum + "&ran=0&ras=0")
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
    opt.on('timeout',function(){
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

/**
 * 服务：sogou图片API
 * {key} 关键字d
 * {current} 当前页 ， 默认1
 * */
// sogou图片服务
router.get('/sogou', function (req, res, next) {
  var key = req.query.key;
  var current = req.query.current || 1;
  // var pageNum = req.query.pageNum || 20;
  var pageNum = 48; // soso无法设置每页显示多少，默认48
  current = current * pageNum - pageNum;
  var options = {
    "method": "GET",
    "hostname": "pic.sogou.com",
    "path": encodeURI("/pics?query=" + key + "&reqType=ajax&start=" + current)
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
    opt.on('timeout',function(){
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
