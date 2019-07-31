var Router = require("./router.js");
// var http = require("http");
var url = require("url");
var fs = require('fs');
var path = require('path');
var ContentType = require("./storeContent-type.js");
var optfile = require('./utils/readImage.js');
var router = new Router();
var port = 9010;

// 初始化数据库连接池
var db = require("./utils/dba");
db.Init()


var express = require('express');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express()

const hour = 1000 * 60 * 60;
var sessionOpts = {
    // 设置密钥
    secret: 'a cool secret',
    // Forces the session to be saved back to the session store
    resave: true,
    // Forces a session that is "uninitialized" to be saved to the store.
    saveUninitialized: true,
    // 设置会话cookie名, 默认是connect.sid
    key: 'myapp_sid',
    // If secure is set to true, and you access your site over HTTP, the cookie will not be set.
    cookie: {maxAge: hour * 2, secure: false}
}
app.use(session(sessionOpts))

app.use(function (req, res, next) {
    if (req.url === '/favicon.ico') {
        return
    }

    var urlPath = url.parse(req.url).pathname;
    var ext = path.extname(urlPath);
    var contentType = ContentType.GetContentType(ext);
    var type = urlPath.split('/')

    if (type[1] == 'api') {
        var sess = req.session;
        var data = "";
        req.on('data', function (chunk) {
            data += chunk.toString();
        });
        req.on('end', function () {
            if (urlPath == "/api/login_check") {
                data = JSON.parse(data)
                if (sess.user) {
                    data.serverSessionUser = sess.user
                } else {
                    data.serverSessionUser = ''
                }
                data = JSON.stringify(data)
            }

            console.info("on request end, data:\n" + data + ", url:\n" + urlPath);
            router.Service(JSON.parse(data), urlPath, function (json) {
                if (urlPath == "/api/login") {
                    // console.info(json)
                    if (json.text == "login is success") {
                        let text = ""
                        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                        for (let i = 0; i < 32; i++) {
                            text += possible.charAt(Math.floor(Math.random() * possible.length))
                        }
                        json.str = text
                        req.session.user = json;
                    }
                }

                res.setHeader('Content-Type', 'text/html; charset=utf8');
                res.write(JSON.stringify(json));
                res.end();
            });
        });
    } else if (type[1] == 'css' || type[1] == 'js' || type[1] == 'node_modules' || type[1] == 'jquery-3.3.1' || type[1] == 'bootstrap' || type[1] == 'layDate-v5.0.9') {
        showPaper(urlPath.substr(1))
    } else if (type[1] == 'images') {
        optfile.readImg('./' + req.url, res);
    } else {
        console.info(type[1])
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
        } else {
            showPaper('html/404.html')
        }
    }

    function showPaper(pathName) {
        fs.readFile(pathName, function (err, data) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/plain
                // res.setHeader('location','http://localhost:9010/index.html/');
                res.setHeader("content-type", contentType);
                // showPaper('index.html');
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

    // if (ext != "") {
    //     res.setHeader("content-type", contentType);
    //     if (req.url !== "/favicon.ico") {
    //         if (ext.split('/')[0] == ".png") {
    //             optfile.readImg('./' + req.url, res);
    //         } else {
    //             if (ext.split('/')[0] == ".html") {
    //                 // console.info(urlPath)
    //                 switch (urlPath) {
    //                     //'首页'
    //                     case '/':
    //                     case '/html/main.html':
    //                         showPaper('html/main.html');
    //                         break;
    //                     case '/html/menu.html':
    //                         showPaper('html/menu.html');
    //                         break;
    //                     case '/html/home.html':
    //                         showPaper('html/home.html');
    //                         break;
    //                     case '/html/order_detail.html':
    //                         showPaper('html/order_detail.html');
    //                         break;
    //                     default:
    //                         showPaper('index.html');
    //                         break;
    //                 }
    //             } else {
    //                 showPaper(urlPath.substr(1))
    //             }
    //
    //             function showPaper(pathName) {
    //                 fs.readFile(pathName, function (err, data) {
    //                     if (err) {
    //                         console.log(err);
    //                         // HTTP 状态码: 404 : NOT FOUND
    //                         // Content Type: text/plain
    //                         // res.setHeader('location','http://localhost:9010/index.html/');
    //                         // res.setHeader("content-type", contentType);
    //                         showPaper('index.html');
    //                     } else {
    //                         // HTTP 状态码: 200 : OK
    //                         // Content Type: text/plain
    //                         if (ext == ".css") {
    //                             res.setHeader('Content-Type', 'text/css');
    //                         } else {
    //                             res.setHeader("content-type", contentType);
    //                         }
    //                         // 响应文件内容
    //                         res.write(data.toString());
    //                     }
    //                     //  发送响应数据
    //                     res.end();
    //                 });
    //             }
    //
    //             // console.info(urlPath.substr(1))
    //             // console.info('获取地址')
    //             // fs.readFile(urlPath.substr(1), function (err, data) {
    //             //     if (err) {
    //             //         console.log(err);
    //             //         // HTTP 状态码: 404 : NOT FOUND
    //             //         // Content Type: text/plain
    //             //         // res.setHeader('location','http://localhost:9010/index.html/');
    //             //         res.setHeader("content-type", contentType);
    //             //     } else {
    //             //         // HTTP 状态码: 200 : OK
    //             //         // Content Type: text/plain
    //             //         if (ext == ".css") {
    //             //             res.setHeader('Content-Type', 'text/css');
    //             //         } else {
    //             //             res.setHeader("content-type", contentType);
    //             //         }
    //             //         // 响应文件内容
    //             //         res.write(data.toString());
    //             //     }
    //             //     //  发送响应数据
    //             //     res.end();
    //             // });
    //
    //         }
    //     }
    // } else {
    //     var sess = req.session;
    //     var data = "";
    //     req.on('data', function (chunk) {
    //         data += chunk.toString();
    //     });
    //     req.on('end', function () {
    //         // console.info(sess.user)
    //         // if (sess.user) {
    //         //     console.log("user session str is" + sess.user.str)
    //         // }
    //         if (urlPath == "/api/login_check") {
    //             data = JSON.parse(data)
    //             if(sess.user){
    //                 data.serverSessionUser = sess.user
    //             }else{
    //                 data.serverSessionUser = ''
    //             }
    //             data = JSON.stringify(data)
    //         }
    //
    //         console.info("on request end, data:\n" + data + ", url:\n" + urlPath);
    //         router.Service(JSON.parse(data), urlPath, function (json) {
    //
    //             if (urlPath == "/api/login") {
    //                 // console.info(json)
    //                 if (json.text == "login is success") {
    //                     let text = ""
    //                     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    //                     for (let i = 0; i < 32; i++) {
    //                         text += possible.charAt(Math.floor(Math.random() * possible.length))
    //                     }
    //                     json.str = text
    //                     req.session.user = json;
    //                 }
    //             }
    //
    //             res.setHeader('Content-Type', 'text/html; charset=utf8');
    //             res.write(JSON.stringify(json));
    //             res.end();
    //         });
    //     });
    // }
});

app.listen(port);

// http.createServer(function (req, res) {
//
//     var urlPath = url.parse(req.url).pathname;
//     var ext = path.extname(urlPath);
//     var contentType = ContentType.GetContentType(ext);
//     //console.info(req)
//     if (ext != "") {
//         res.writeHead(200, {"content-type": +contentType});
//         if (req.url !== "/favicon.ico") {
//             // console.info(ext)
//             if (ext.split('/')[0] == ".png") {
//                 // console.info(1)
//                 optfile.readImg('./' + req.url, res);
//             } else {
//                 // console.info(2)
//                 fs.readFile(urlPath.substr(1), function (err, data) {
//                     if (err) {
//                         console.log(err);
//                         // HTTP 状态码: 404 : NOT FOUND
//                         // Content Type: text/plain
//                         res.writeHead(404, {'Content-Type': +contentType});
//                     } else {
//                         // HTTP 状态码: 200 : OK
//                         // Content Type: text/plain
//                         if (ext == ".css") {
//                             // console.info(ext)
//                             // console.info( contentType)
//                             res.writeHead(200, {'Content-Type': 'text/css'});
//                         } else {
//                             res.writeHead(200, {'Content-Type': +contentType});
//                         }
//
//
//                         // 响应文件内容
//                         res.write(data.toString());
//                     }
//                     //  发送响应数据
//                     res.end();
//                 });
//             }
//         }
//     } else {
//         var data = "";
//         req.on('data', function (chunk) {
//             data += chunk.toString();
//         });
//         //console.info(data)
//         //return
//         req.on('end', function () {
//             console.info("on request end, data:\n" + data + ", url:\n" + urlPath);
//             router.Service(JSON.parse(data), urlPath, function (json) {
//
//                 res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
//                 res.write(JSON.stringify(json));
//                 res.end();
//             });
//         });
//     }
//
// }).listen(port);

console.info("server work on port:" + port);