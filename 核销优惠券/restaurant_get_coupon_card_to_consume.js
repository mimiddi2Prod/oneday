var tools = require("./../tool");
var https = require('https');
var wxConfig = require("./../config/wxConfig")
var sha1 = require("js-sha1")

// var HttpsGet = require("./../utils/httpRequest")
// var appid = wxConfig.appid
// var secret = wxConfig.secret

function RestaurantGetCouponCardToConsume() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetCouponCardToConsume::Run";
        log.debug("RestaurantGetCouponCardToConsume::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (!param["openid"]) {
            log.warn('没有用户openid')
            response = tool.error.ErrorNotCode;
        } else {
            try {

                var appid = "wx9a7f04eeea0842be"
                var secret = "4a70772c68e8b62a606bf6973cacf7ac"
                var options = {
                    host: 'api.weixin.qq.com',
                    path: '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                // 1.获取token
                async function Call() {
                    var e = await HttpsGet(options)
                    console.info(e)
                    let access_token = JSON.parse(e).access_token

                    let postData = JSON.stringify({
                        // "card_id" : "pmwdi1UO9BBF6_fKXQiGh9OIPe64",
                        // "code" : "eIkL5sZAEIvaxXuaYuRZNFF13S13XfdK65XJ4B1tSnU=",
                        // "check_consume" : true
                        "encrypt_code": "eIkL5sZAEIvaxXuaYuRZNFF13S13XfdK65XJ4B1tSnU="
                    })

                    // 2.通过加密code获得 解密后的code
                    options = {
                        host: 'api.weixin.qq.com',
                        path: '/card/code/decrypt?access_token=' + access_token,
                        method: 'POST',
                        form: postData,
                        headers: {
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                            'Content-Type': 'application/json',
                            'Content-Length': postData.length
                        },
                        // encoding: 'binary'
                    }

                    async function getCode() {
                        e = await HttpsPost(options, postData)
                        console.info(e)
                        let code = JSON.parse(e).code

                        // 3.查询是否能够核销
                        postData = JSON.stringify({
                            "card_id": "pmwdi1UO9BBF6_fKXQiGh9OIPe64",
                            "code": code,
                            "check_consume": true
                        })
                        options = {
                            host: 'api.weixin.qq.com',
                            path: '/card/code/get?access_token=' + access_token,
                            method: 'POST',
                            form: postData,
                            headers: {
                                'Content-Type': 'application/json',
                                'Content-Length': postData.length
                            }
                        }

                        async function checkConsume() {
                            e = await HttpsPost(options, postData)
                            e = JSON.parse(e)
                            if (e.errmsg == "ok") {
                                // 4.核销
                                postData = JSON.stringify({
                                    "card_id": "pmwdi1UO9BBF6_fKXQiGh9OIPe64",
                                    "code": code
                                })
                                options = {
                                    host: 'api.weixin.qq.com',
                                    path: '/card/code/consume?access_token=' + access_token,
                                    method: 'POST',
                                    form: postData,
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Content-Length': postData.length
                                    }
                                }

                                async function consumeCard() {
                                    e = await HttpsPost(options, postData)
                                    console.info(e)
                                    console.info(111111111111111)
                                    // e = JSON.parse(e)
                                }

                                await consumeCard()
                            }
                        }

                        await checkConsume()
                    }

                    await getCode()
                }

                await Call()

            } catch (err) {
                if (err.code) {
                    response = tool.error.ErrorSQL;
                    log.warn(name, "code:", err.code, ", sql:", err.sql);
                } else {
                    log.warn(name, JSON.stringify(response));
                    response = tool.error.ErrorCatch;
                }
            }
        }


        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_coupon_card",
            }, res);
        tool.log.debug("RestaurantGetCouponCardToConsume::Run.out");
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

// 签名工具
// async function getSign(api_ticket, card_id, nonceStr, openid, timestamp) {
//     var oriArray = new Array();
//     oriArray[0] = api_ticket;
//     oriArray[1] = card_id;
//     oriArray[2] = nonceStr;
//     oriArray[3] = timestamp;
//     oriArray.sort();
//     let stringA = oriArray.join("")
//     console.info(stringA)
//     var sign = sha1(stringA)
//     return sign
// }

// 随机字符串
// function getNonceStr() {
//     var text = ""
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
//     for (var i = 0; i < 16; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return text
// }

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
                // console.info(e)
                // const contentType = res.headers['content-type'];
                // if (!contentType.includes('image')) {
                //     console.log('获取小程序码图片失败，微信api返回的json为：')
                //     console.log(JSON.parse(data))
                //     return resolve(null);
                // }
                // const imgBuffer = Buffer.from(data, 'binary');
                resolve(data)
            })
        })
        req.write(postData);
        req.end();
    })
}

module.exports = RestaurantGetCouponCardToConsume;