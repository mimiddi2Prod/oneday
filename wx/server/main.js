const http = require('http');
const fs = require('fs');
var path = require('path');
const Cmd = require('./../utils/CuteCmd.js');
const url = require('url');
var JUMPRouter = require("./router.js");
var ContentType = require("./../utils/content_type.js")
var optfile = require('./readImage.js');
var JUMPLog = require("./../utils/log.js");

// var gameRouter = require("./game_router.js");

var log = new JUMPLog
var WXAccessToken = require("./apis/wx_get_access_token.js")
var WXCreateMenu = require("./apis/wx_create_menu.js")
let acceesToken = new WXAccessToken()
acceesToken.Run().then(function(res){
	// console.info(res)
	let createMenu = new WXCreateMenu()
	createMenu.Run(res)
	// createMenu.Run(res).then(function(resa){
		// console.info(resa)
	// })
})

http.createServer(function (req, res) {
    // if (req.url === '/images/favicon.ico') {
    //     return
    // }
	console.info(res)
	console.info(req.url)
	
    var reqUrl = req.url;
    var urlPath = url.parse(reqUrl).pathname;
    var ext = path.extname(urlPath);
    var contentType = ContentType.GetContentType(ext);
    var type = urlPath.split('/')
    if (urlPath == '/') {
        // 进入首页
        loadPage('src/index.html');
    } else if (urlPath == '/authorize_success') {
        loadPage('src/html/authorize_success.html')
    }
	else if(urlPath == '/tyt'){
		loadPage('src/tyt/index.html');
	} 
	else {
        if (contentType != '') {
            if (type[1] == 'css' || type[1] == 'js' || type[1] == 'node_modules' || type[1] == 'jquery-3.3.1' || type[1] == 'bootstrap' || type[1] == 'utils') {
                loadPage('src/' + urlPath.substr(1))
            } else if (type[1] == 'libjs') {
                loadPage('src/tyt/' + urlPath.substr(1))
            } else if (type[1] == 'resource') {
                if (ext == '.png' || ext == '.mp3') {
                    optfile.readImg('src/tyt/' + urlPath.substr(1), res);
                } else {
                    loadPage('src/tyt/' + urlPath.substr(1))
                }
            } else if (type[1] == 'images') {
                optfile.readImg('src/' + urlPath.substr(1), res);
            }
        } else if (ext == '.fnt') {
            optfile.readImg('src/tyt/' + urlPath.substr(1), res);
        } else if (type[1] == 'tyt') {
            // console.info(reqUrl)
            let param = {}, strList = reqUrl.split('?').splice(1)
            if (strList.length > 0) {
                // 将 string 转为 key-value 形式
                strList = strList[0].split('&')
                for (let i in strList) {
                    let temp = strList[i].split('='), key = temp[0], value = temp[1]
                    param[key] = value
                }
            }
            let text = ''
            // 对param进行处理，然后拼接字符串给 text 用于返回数据
            console.info(param)
            try {
                res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
                // res.write(text);
                // res.end();
                let router = new gameRouter;
                router.Run(urlPath, param, res);
            } catch (err) {
                res.writeHead(404, {"content-type": "text/html;charset=utf-8"});
                res.write("{}");
                res.end();
            }

        } else if (type[1] == 'api') {
            console.info(type)
            let postRaw = '';
            req.on('data', function (chunk) {
                postRaw += chunk;
            })
            req.on('end', function () {
                try {
                    var params = JSON.parse(postRaw);
                    res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
                    let router = new JUMPRouter;
                    router.Run(urlPath, params, res);
                    log.info("deal request over");
                } catch (err) {
                    res.writeHead(404, {"content-type": "text/html;charset=utf-8"});
                    res.write("{}");
                    res.end();
                }
            })
        } else {
            loadPage('src/html/404.html')
        }
    }


    function loadPage(pathName) {
        fs.readFile(pathName, function (err, data) {
            if (err) {
                console.log(err);
                res.setHeader("content-type", contentType);
            } else {
                res.setHeader("content-type", contentType);
                // }
                // 响应文件内容
                res.write(data.toString());
            }
            //  发送响应数据
            res.end();
        });
    }

}).listen(Cmd.GetCmd("--port", 5463));