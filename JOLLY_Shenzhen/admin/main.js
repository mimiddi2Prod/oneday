var Router = require("./router.js");
// var http = require("http");
var url = require("url");
var fs = require('fs');
var path = require('path');
var ContentType = require("./content-type.js");
var optfile = require('./utils/readImage.js');
var router = new Router();
var port = 9250;

// 初始化数据库连接池
var db = require("./utils/dba");
db.Init()

// 初始化获取rsa密钥
var privateKey = require("./utils/getPrivateKey");
privateKey.Init()

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express()

// const hour = 1000 * 60 * 60;

app.use(cookieParser());
app.use(function (req, res, next) {
    if (req.url === '/favicon.ico') {
        return
    }

    var urlPath = url.parse(req.url).pathname;
    var ext = path.extname(urlPath);
    var contentType = ContentType.GetContentType(ext);
    var type = urlPath.split('/')

    if (type[1] == 'api') {
        // var sess = req.session;
        var data = "";
        req.on('data', function (chunk) {
            data += chunk.toString();
        });
        req.on('end', function () {
            console.info("on request end, data:\n" + data + ", url:\n" + urlPath);
            router.Service(JSON.parse(data), urlPath, function (json) {
                res.setHeader('Content-Type', 'text/html; charset=utf8');
                res.write(JSON.stringify(json));
                res.end();
            });
        });
    } else if (type[2] == 'fonts') {
        fs.readFile('./' + req.url, function (err, file) {//主要这里的‘binary’
            if (err) {
                console.log(err);
                return;
            } else {
                console.log("输出文件");
                //res.writeHead(200,  {'Content-Type':'image/jpeg'});
                res.write(file, 'binary');//这里输出的是一个二进制的文件流
                res.end();
            }
        });
    } else if (type[1] == 'css' || type[1] == 'js' || type[1] == 'node_modules' || type[1] == 'jquery-3.3.1' || type[1] == 'bootstrap' || type[1] == 'qiniu-js' || type[1] == 'rsa' || type[1] == 'layDate-v5.0.9') {
        showPaper(urlPath.substr(1))
    } else if (type[1] == 'images') {
        optfile.readImg('./' + req.url, res);
    } else {
        let check_login_status = require('./api/check_login_status')
        let cookie = req.cookies
        let isLogin = check_login_status(cookie)
        isLogin.then(function (eData) {
            if (!eData.text) {
                showPaper('index.html')
            } else {
                console.info(type)
                if (type[1] == '') {
                    showPaper('index.html')
                } else if (type[1] == 'home') {
                    showPaper('html/home.html');
                } else if (type[1] == 'goods') {
                    showPaper('html/goods.html');
                } else if (type[1] == 'addGoods') {
                    showPaper('html/addGoods.html');
                } else if (type[1] == 'editGoods') {
                    showPaper('html/editGoods.html');
                } else if (type[1] == 'category') {
                    showPaper('html/category.html');
                } else if (type[1] == 'order') {
                    showPaper('html/order.html');
                } else if (type[1] == 'account') {
                    showPaper('html/account.html');
                } else {
                    showPaper('html/404.html')
                }
            }
        })
    }

    function showPaper(pathName) {
        fs.readFile(pathName, function (err, data) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/plain
                res.setHeader("content-type", contentType);
            } else {
                // HTTP 状态码: 200 : OK
                // Content Type: text/plain
                if (ext == ".css") {
                    res.setHeader('Content-Type', 'text/css');
                } else {
                    res.setHeader("content-type", contentType);
                }
                // 响应文件内容
                res.write(data.toString());
            }
            //  发送响应数据
            res.end();
        });
    }

});

app.listen(port);
console.info("server work on port:" + port);