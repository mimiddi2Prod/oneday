var tools = require("./../tool");
var http = require("http")

function CCSGetCouponCard() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "CCSGetCouponCard::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["openid"]) {
            tool.log.warn(name, 'openid is not defined')
        } else {
            var row = [];
            var sql = ""
            try {
                /* get
                    var options = {
                        host: '127.0.0.1',
                        port: 9900,
                        path: '/apis/test',
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                    }
                    let e = await HttpGet(options)
                    console.info(e)
                    data = e
                */
                sql = "select * from card_info where `type` = ?"
                row = await tool.query(sql, param["type"])
                console.info(row)
                if (row.length > 0) {
                    let current_time = new Date().getTime() / 1000
                    let card_id = row.filter(function (e) {
                        e.cash = JSON.parse(e.cash)
                        console.info(e.cash)
                        if (e.cash.base_info.date_info.type == 'DATE_TYPE_FIX_TIME_RANGE') {
                            return (current_time >= e.cash.base_info.date_info.begin_timestamp && current_time <= e.cash.base_info.date_info.end_timestamp)
                        } else {
                            return true
                        }
                    }).map(function (e) {
                        return e.card_id
                    })
                    if (card_id.length > 0) {
                        // post
                        // 3.签名
                        // 签名生成规则如下：
                        // 将所有参数的value值进行字符串的字典序排序；
                        // 将所有参数字符串拼接成一个字符串进行sha1加密，得到signature；
                        // 自定义code (勾选请确认创建接口中use_custom_code填写为true)；
                        // 指定用户领取 (勾选请确认创建接口中bind_openid填写为true)。
                        var postDataJson = JSON.stringify({
                            openid: param["openid"],
                            card_id: card_id,
                            code: ''
                        })
                        var options = {
                            host: '127.0.0.1',
                            port: '9900',
                            path: '/apis/getCardExt',
                            method: 'POST',
                            form: postDataJson,
                            headers: {
                                // 'User-Agent': 'openApi',
                                'Content-Type': 'application/json;charset=utf-8',
                                // 'accept-encoding': 'gzip,deflate',
                                // 'time-stamp': timeStamp,
                                // 'data-signature': sign,
                            },
                        }

                        async function Call() {
                            let e = await HttpPost(options, postDataJson)
                            e = JSON.parse(e)
                            console.info(e)
                            if (e.code == 0) {
                                data.cardList = e.data
                            }
                        }

                        await Call()
                    }

                }


            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("CCSGetCouponCard::Run", "code:", err.code, ", sql:", err.sql);
            }
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("CCSGetCouponCard::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_address",
            }, res);
        tool.log.debug("CCSGetCouponCard::Run.out");
    }
}

module.exports = CCSGetCouponCard;

// async function HttpsGet(option) {
//     return new Promise(function (resolve, reject) {
//         https.get(option, function (res) {
//             let data = ''
//             res.on('data', function (chunk) {
//                 data += chunk;
//             })
//             res.on('end', function (e) {
//                 resolve(data)
//             })
//         })
//     })
// }

async function HttpGet(option) {
    return new Promise(function (resolve, reject) {
        http.get(option, function (res) {
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

async function HttpPost(option, postData) {
    return new Promise(function (resolve, reject) {
        var req = http.request(option, function (res) {
            let data = '';
            // res.headers = {
            //     'data-signature': sign,
            //     'Content-Type': 'application/json;charset=UTF-8'
            // }
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
            })
            res.on('end', function (e) {
                resolve(data)
            })
        })
        req.write(postData);
        req.end();
    })
}