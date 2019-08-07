var db = require("./../utils/dba");
var https = require('https');
var fm = require('./../utils/formatTime')
const md5 = require('blueimp-md5')


function yinbao() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            let appId = "0C581113F5EF82EC48A4563EDF4CF4A9"
            let current_time = fm(new Date())
            let postData = {
                "appId": appId,
                "payMethod": "Wxpay",
                // "customerNumber": "001",
                // "customerNum":"155893853835",
                "shippingFee":15.00,
                "orderRemark": "addOnLineOrder",
                "orderDateTime": current_time,
                "contactAddress": "测试测试。。。。",
                "contactName": "张三",
                "contactTel": "1360097865",
                "deliveryType":0,
                "payOnLine":1,
                // "deliveryType": 1,
                // "dinnersNumber": 5,
                // "restaurantAreaName": "一楼",
                // "restaurantTableName": "11",
                // "reservationTime": current_time,
                "items": [
                    {
                        "productUid": 491535479940357172,
                        "comment": "测试添加",
                        "quantity": 1,
                        "manualSellPrice":30.2
                    }
                ]
            }
            // let postData = {
            //     "appId": appId,
            // }
            // let postData = {
            //     "appId": appId,
            // }
            let postDataJson = JSON.stringify(postData)
            let appKey = '718070985931782035'
            let sign = md5(appKey + postDataJson).toUpperCase()
            console.info(sign)
            var timeStamp = new Date().getTime()
            var options = {
                host: 'area8-win.pospal.cn',
                port: 443,
                path: '/pospal-api2/openapi/v1/orderOpenApi/addOnLineOrder',
                // path: '/pospal-api2/openapi/v1/cashierOpenApi/queryAllCashier',
                // path: '/pospal-api2/openapi/v1/productOpenApi/queryProductImagePages',
                method: 'POST',
                form: postDataJson,
                headers: {
                    'User-Agent': 'openApi',
                    'Content-Type': 'application/json;charset=utf-8',
                    'accept-encoding': 'gzip,deflate',
                    'time-stamp': timeStamp,
                    'data-signature': sign,
                },
            }
            console.info(options)
            console.info(postDataJson)
            console.info(sign)

            async function Call() {
                var e = await HttpsPost(options, postDataJson, sign)
                console.info(e)
                data = e
            }

            Call()

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

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

async function HttpsPost(option, postData, sign) {
    return new Promise(function (resolve, reject) {
        var req = https.request(option, function (res) {
            let data = '';
            res.headers = {
                'data-signature': sign,
                'Content-Type': 'application/json;charset=UTF-8'
            }
            // console.info(res)
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
                // console.info(data)
            })
            res.on('end', function (e) {
                // const contentType = res.headers['content-type'];
                resolve(data)
            })
        })
        req.write(postData);
        req.end();
    })
}

module.exports = yinbao;