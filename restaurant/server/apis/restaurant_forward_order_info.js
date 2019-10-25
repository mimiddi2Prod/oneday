var https = require('https');
// var fs = require('fs')
const appid = require('./../config/wxConfig').appid;
const secret = require('./../config/wxConfig').secret;
const TEMPLATE_ID = 'uT1omE2L_riFv0af7Vyuhdd1v7wQzDqZRCBDaPAgzQ4';

async function RestaurantForwardOrderInfo(openid) {
    var options = {
        host: 'api.weixin.qq.com',
        path: '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    async function Call() {
        var e = await HttpsGet(options)

        let access_token = JSON.parse(e).access_token
        console.info(access_token)

        let postData = JSON.stringify({
            "touser": openid,
            "template_id": TEMPLATE_ID,
            "data": {
                "number1": {
                    "value": "1111"
                },
                "date4": {
                    "value": "2015-01-05 12:30:10"
                },
            }
        })

        options = {
            host: 'api.weixin.qq.com',
            path: '/cgi-bin/message/subscribe/send?access_token=' + access_token,
            method: 'POST',
            form: postData,
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            },
            // encoding: 'binary'
        }

        async function CallCODE() {
            e = await HttpsPost(options, postData)
            console.info(e)
            // fs.writeFile('./index.png', e, function (err) {
            //     if (err) {
            //         throw err;
            //     }
            // })
        }

        await CallCODE()
    }

    await Call()

}

module.exports = RestaurantForwardOrderInfo;

async function HttpsGet(option) {
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

async function HttpsPost(option, postData) {
    return new Promise(function (resolve, reject) {
        var req = https.request(option, function (res) {
            let data = ''
            // res.setEncoding('binary')
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
            })
            res.on('end', function (e) {
                console.info(e)
                // const contentType = res.headers['content-type'];
                // if (!contentType.includes('image')) {
                //     console.log('获取小程序码图片失败，微信api返回的json为：')
                //     console.log(JSON.parse(data))
                //     return resolve(null);
                // }
                // const imgBuffer = Buffer.from(data, 'binary');
                // resolve(imgBuffer)
            })
        })
        req.write(postData);
        req.end();
    })
}