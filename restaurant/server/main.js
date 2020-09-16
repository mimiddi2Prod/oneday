const http = require('http');
const Cmd = require('./utils/CuteCmd.js');
const url = require('url');
var Router = require("./router.js");

const contentType = {"content-type": "text/html;charset=utf-8"};

http.createServer(function (req, res) {
    var reqUrl = req.url;
    var path = url.parse(reqUrl).pathname;
    if (path.indexOf("favicon.ico") != -1) {
        res.writeHead(404, contentType);
        res.write("<h1>404</h1>");
        res.end();
        return;
    }
    let postRaw = '';
    req.on('data', function (chunk) {
        postRaw += chunk;
        if (reqUrl == '/apis/restaurant_wxPay_notify') {
            var wxPayNotify = require("./apis/restaurant_wxPay_notify")
            var work = new wxPayNotify()
            work.run(postRaw)
        }
        if (reqUrl == '/apis/restaurant_wxPay_notify_test') {
            var wxPayNotifyTest = require("./apis/restaurant_wxPay_notify_test")
            var works = new wxPayNotifyTest()
            works.run(postRaw)
        }
    })
    req.on('end', function () {
        try {
            var params = JSON.parse(postRaw);
            res.writeHead(200, contentType);
            var router = new Router;
            router.Run(path, params, res);
        } catch (err) {
            res.writeHead(404, contentType);
            res.write("{}");
            res.end();
        }
    })
}).listen(Cmd.GetCmd("--port", 5463));
