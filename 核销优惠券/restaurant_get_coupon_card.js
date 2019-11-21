var tools = require("./../tool");
var https = require('https');
var wxConfig = require("./../config/wxConfig")
var sha1 = require("js-sha1")

// var HttpsGet = require("./../utils/httpRequest")
// var appid = wxConfig.appid
// var secret = wxConfig.secret

function RestaurantGetCouponCard() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetCouponCard::Run";
        log.debug("RestaurantGetCouponCard::Run.in");
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

                    options = {
                        host: 'api.weixin.qq.com',
                        path: '/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=wx_card',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }

                    // 2.获取ticket
                    async function getTicket() {
                        var e = await HttpsGet(options)
                        console.info(e)
                        let api_ticket = JSON.parse(e).ticket

                        // 3.签名
                        // 签名生成规则如下：
                        // 将所有参数的value值进行字符串的字典序排序；
                        // 将所有参数字符串拼接成一个字符串进行sha1加密，得到signature；
                        // 自定义code (勾选请确认创建接口中use_custom_code填写为true)；
                        // 指定用户领取 (勾选请确认创建接口中bind_openid填写为true)。
                        const nonceStr = getNonceStr()
                        const card_id = "pmwdi1UO9BBF6_fKXQiGh9OIPe64"
                        const openid = param["openid"]
                        const timestamp = new Date().getTime().toString().slice(0, 10)
                        const cardSign = await getSign(api_ticket, card_id, nonceStr, openid, timestamp)

                        data.cardList = [{
                            cardId: card_id,
                            cardExt: JSON.stringify({
                                code: '',
                                openid: '',
                                nonce_str: nonceStr,
                                timestamp: timestamp,
                                signature: cardSign
                            })
                        }]
                        console.info(data)
                    }

                    await getTicket()
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
        tool.log.debug("RestaurantGetCouponCard::Run.out");
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
async function getSign(api_ticket, card_id, nonceStr, openid, timestamp) {
    var oriArray = new Array();
    oriArray[0] = api_ticket;
    oriArray[1] = card_id;
    oriArray[2] = nonceStr;
    oriArray[3] = timestamp;
    oriArray.sort();
    let stringA = oriArray.join("")
    console.info(stringA)
    var sign = sha1(stringA)
    return sign
}

// 随机字符串
function getNonceStr() {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < 16; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

module.exports = RestaurantGetCouponCard;