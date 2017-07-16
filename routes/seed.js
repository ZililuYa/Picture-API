var express = require('express');
var http = require("http");
var router = express.Router();

/**
 * 服务：seed
 * {key} 关键字
 * {pageNum} 显示多少条 ， 默认20
 * {current} 当前页 ， 默认1
 * */
router.get('/seed', function (req, res, next) {
  var key = req.query.key;
  var pageNum = req.query.pageNum || 20;
  var current = req.query.current || 1;
  current = current * pageNum - pageNum;
  // https://api.ziyuanmao.com/search/common
  var options = {
    "method": "POST",
    "hostname": "api.ziyuanmao.com",
    "path": encodeURI("/search/common&ul=zh-cn&de=UTF-8&dt=资源猫 磁力搜索引擎 种子搜索神器网页版 番号搜索神器 网页版 种子搜索网站 网盘搜索神器 百度网盘搜索&sd=24-bit&sr=1366x768&vp=1366x638&je=0&fl=25.0 r0&ec=Search&ea=search&el=钢铁侠&_u=CACAAEABI~&jid=&gjid=&cid=909967149.1500193702&tid=UA-85209037-1&_gid=253073475.1500193702&z=712780331")
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
      // data.code = '200';
      // data.msg = '图片获取成功';
      console.log(chunks);
      res.send(chunks);
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
