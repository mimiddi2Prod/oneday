var db = require("./../utils/dba");
var https = require('https');

function yinbao() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            let postData = JSON.stringify({
                // access_token: access_token,
                "appId": "abcdefghijklmn",
                "payMethod": "Cash",
                "customerNumber": "001",
                "shippingFee":15.00,
                "orderRemark": "addOnLineOrder",
                "orderDateTime": "2015-12-04 10:05:01",
                "contactAddress": "测试测试。。。。",
                "contactName": "张三",
                "contactTel": "1360097865",
                "deliveryType": 1,
                "dinnersNumber": 5,
                "restaurantAreaName": "一楼",
                "restaurantTableName": "11",
                "reservationTime": "2018-01-12 12:30:00",
                "items": [
                    {
                        "productUid": 102066793346170331,
                        "comment": "测试添加",
                        "quantity": 1.2,
                        "manualSellPrice":30.2
                    }
                ]
            })

            var options = {
                host: 'pospal.cn',
                path: '/pospal-api2/openapi/v1/orderOpenApi/addOnLineOrder',
                method: 'POST',
                form: postData,
                headers: {
                    'User-Agent': 'openApi',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json; charset=utf-8',
                    'accept-encoding': 'gzip,deflate',
                    'time-stamp': 1437528688233,
                    'data-signature': 'BF706E6AC693BA3B1BABD32E6713431D'
                    // 'Content-Length': postData.length,
                },
                // encoding: 'binary'
            }

            async function Call() {
                var e = await HttpsPost(options,postData)
                // let openid = JSON.parse(e).openid
                // let sessionkey = JSON.parse(e).session_key
                console.info(e)
                // var sql = 'select id from `user` where open_id = ?'
                // var row = await query(sql, openid)
                // console.info(1)
                // console.info(row)
                // if (row.length <= 0) {
                //     sql = 'insert into `user` (open_id,session_key)values(?,?)'
                //     row = await query(sql, [openid, sessionkey])
                //     console.info(row)
                // } else {
                //     sql = 'update `user` set session_key = ? where open_id = ?'
                //     row = await query(sql, [sessionkey, openid])
                // }
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

async function HttpsPost(option, postData) {
    return new Promise(function (resolve, reject) {
        var req = https.request(option, function (res) {
            let data = ''
            // res.setEncoding('binary')
            res.on('data', function (chunk) {
                data += chunk;
                // console.info(data)
            })
            res.on('end', function (e) {
                const contentType = res.headers['content-type'];
                // if (!contentType.includes('image')) {
                //     // console.log('获取小程序码图片失败，微信api返回的json为：')
                //     // console.log(JSON.parse(data))
                //     return resolve(null);
                // }
                // const imgBuffer = Buffer.from(data, 'binary');
                // resolve({imgBuffer, contentType});
                // resolve(imgBuffer)
                resolve(data)
            })
        })
        req.write(postData);
        req.end();
    })
}

module.exports = yinbao;