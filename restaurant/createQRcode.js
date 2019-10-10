// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
// 请求参数
// http://onedayqiniu.minidope.com/shenheceshitu.png

var https = require('https');
var fs = require('fs')

const appid = 'wx3a3f97ca688ddcea'
const secret = '5cfbffbaeaedefb495f107a5e529d89f'

var options = {
        host: 'api.weixin.qq.com',
        path: '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

function Call() {
        var e = HttpsGet(options)
        e.then(function(ress){
            let postData = JSON.stringify({
                    // scene: 'expire_time=1601424000000&id=3',
                    path: 'pages/blank/blank?expire_time=1601424000000&id=3',
                    width: 430
                })
            console.info(ress)
            options = {
                    host: 'api.weixin.qq.com',
                    path: '/cgi-bin/wxaapp/createwxaqrcode?access_token=' + JSON.parse(ress).access_token,
                    method: 'POST',
                    form: postData,
                    headers: {
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Type': 'application/json',
                        'Content-Length': postData.length
                    },
                    encoding: 'binary'
                }
            console.info(options)
            let re = HttpsPost(options, postData)
            console.info(re)
            re.then(function(ee){
                fs.writeFile('./index.png', ee, function (err) {
                    if (err) {
                        throw err;
                    }
                })
            })
                    
        })
}

Call()

function HttpsGet(option) {
    return new Promise(function (resolve, reject) {
        https.get(option, function (res) {
            let data = ''
            res.on('data', function (chunk) {
                data += chunk;
            })
            res.on('end', function (e) {
                resolve(data)
            })
        })
    })
}


function HttpsPost(option, postData) {
    return new Promise(function (resolve, reject) {
        var req = https.request(option, function (res) {
            let data = ''
            res.setEncoding('binary')
            res.on('data', function (chunk) {
                data += chunk;
            })
            res.on('end', function (e) {
                const contentType = res.headers['content-type'];
                if (!contentType.includes('image')) {
                    console.log('获取小程序码图片失败，微信api返回的json为：')
                    console.log(JSON.parse(data))
                    return resolve(null);
                }
                const imgBuffer = Buffer.from(data, 'binary');
                // resolve({imgBuffer, contentType});
                resolve(imgBuffer)
            })
        })
        req.write(postData);
        req.end();
    })
}