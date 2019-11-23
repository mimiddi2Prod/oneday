var db = require("./../utils/dba");
var https = require('https');
const Official_Account_Appid = require("./../config/wxConfig").Official_Account_Appid
const Official_Account_Secret = require("./../config/wxConfig").Official_Account_Secret

function shopAddCoupon() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            // 1.获得access_token (这边需要改成从公众号存在数据库上的进行获取)
            var options = {
                host: 'api.weixin.qq.com',
                path: '/cgi-bin/token?grant_type=client_credential&appid=' + Official_Account_Appid + '&secret=' + Official_Account_Secret,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            async function Call() {
                var e = await HttpsGet(options)
                console.info(e)
                let access_token = JSON.parse(e).access_token

                // 2.获得卡券信息 通过加密card_id获得 card_info
                let postData = JSON.stringify({
                    "card_id": param["card_id"]
                })
                options = {
                    host: 'api.weixin.qq.com',
                    path: '/card/get?access_token=' + access_token,
                    method: 'POST',
                    form: postData,
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': postData.length
                    }
                }

                async function getCard() {
                    e = await HttpsPost(options, postData)
                    console.info(e)
                    e = JSON.parse(e)
                    // 将卡券信息提取出来，并添加到数据库中
                    if (e.errmsg == "ok" && e.card.card_type == "CASH") {
                        let card = e.card.cash,
                            title = card.base_info.title,
                            least_cost = card.least_cost,
                            reduce_cost = card.reduce_cost,
                            time_limit = card.advanced_info.time_limit

                        // let
            if(card.base_info.date_info.type == "DATE_TYPE_FIX_TIME_RANGE"){

            }
                            // date_info = card.base_info.date_info.type == "DATE_TYPE_FIX_TIME_RANGE",

                        sql = "insert into store(`name`,location,phone,start_time,end_time,create_time)values(?,?,?,?,?,CURRENT_TIMESTAMP)";
                        row = await db.Query(sql, [param['name'], param['location'], param['phone'], param['start_time'], param['end_time']]);
                        if (row.insertId) {
                            data.code = 1
                            data.text = '添加成功'
                        } else {
                            data.code = 0
                            data.text = '添加失败'
                        }
                    }
                }

                await getCard()
            }

            await Call()


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

module.exports = shopAddCoupon;