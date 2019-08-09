const http = require('http');
const Cmd = require('./utils/CuteCmd.js');
var FBLog = require("./utils/log.js");
//var db = require("./utils/mysqlEx");
const url = require('url');
//const path = require('path');
var Router = require("./router.js");

var log = new FBLog;
const contentType = {"content-type": "text/html;charset=utf-8"};
// db.query("select id from test_connection").then(function (row) {
//     log.info(row[0].id);
// });

// var checkStock = require('./apis/shop_checkStock')
// checkStock()

http.createServer(function (req, res) {
    var reqUrl = req.url;
    var path = url.parse(reqUrl).pathname;
    if (path.indexOf("favicon.ico") != -1) {
        res.writeHead(404, contentType);
        res.write("<h1>404</h1>");
        res.end();
        return;
    }
    //var ext = path.extname(urls);    
    let postRaw = '';
    req.on('data', function (chunk) {
        postRaw += chunk;
    })
    req.on('end', function () {
        try {
            var params = JSON.parse(postRaw);
            console.info(reqUrl);
            console.info(params);
            res.writeHead(200, contentType);
            var router = new Router;
            router.Run(path, params, res);
            log.info("deal request over");
        } catch (err) {
            res.writeHead(404, contentType);
            res.write("{}");
            res.end();
        }
    })


}).listen(Cmd.GetCmd("--port", 5463));