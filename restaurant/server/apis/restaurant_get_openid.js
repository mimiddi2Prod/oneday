var tools = require("./../tool");
var https = require('https');
var wxConfig = require("./../config/wxConfig")
var appid = wxConfig.appid
var secret = wxConfig.secret

function RestaurantGetOpenid() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetOpenid::Run";
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (!param["code"]) {
            log.warn('没有用户登录凭证code')
            response = tool.error.ErrorNotCode;
        } else {
            try {
                data.phone = ''

                var options = {
                    host: 'api.weixin.qq.com',
                    path: '/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + param["code"] + '&grant_type=authorization_code',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                async function Call() {
                    var e = await HttpsGet(options)
                    let openid = JSON.parse(e).openid
                    let sessionkey = JSON.parse(e).session_key
                    sql = 'select id from restaurant_user where open_id = ?'
                    row = await query(sql, openid)
                    if (row.length <= 0) {
                        sql = 'insert into restaurant_user (open_id,session_key,register_time,last_login_time)values(?,?,current_timestamp,current_timestamp)'
                        row = await query(sql, [openid, sessionkey])
                    } else {
                        sql = 'update restaurant_user set session_key = ?,last_login_time = current_timestamp where open_id = ?'
                        row = await query(sql, [sessionkey, openid])

                        sql = 'select phone from restaurant_user where open_id = ?'
                        row = await query(sql, openid)
                        if (row.length > 0) {
                            if (row[0].phone && row[0].phone.length > 0) {
                                data.phone = row[0].phone
                            }
                        }
                    }
                    data.openid = openid
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


        // if (response.code != tool.error.OKCode) {
        //     log.warn(name, JSON.stringify(response));
        // }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_openid",
            }, res);
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

module.exports = RestaurantGetOpenid;
