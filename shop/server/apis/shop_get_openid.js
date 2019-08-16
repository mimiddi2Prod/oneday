var tools = require("./../tool");
var https = require('https');
const appid = 'wx14dd6120d4882a81';
const secret = 'b77ba947d1168d6eff00816ea2f0cf5d';

function SHOPGetOpenId() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetOpenId::Run";
        log.debug("SHOPGetOpenId::Run.in");
        var data = {};
        var response = tool.error.OK;
        if (!param["code"]) {
            log.warn('没有用户登录凭证code')
            // response = tool.error.ErrorNotCode;
        } else {
            try {
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
                    console.info(e)
                    var sql = 'select id from `user` where open_id = ?'
                    var row = await query(sql, openid)
                    console.info(1)
                    console.info(row)
                    if (row.length <= 0) {
                        sql = 'insert into `user` (open_id,session_key)values(?,?)'
                        row = await query(sql, [openid, sessionkey])
                        console.info(row)
                    } else {
                        sql = 'update `user` set session_key = ? where open_id = ?'
                        row = await query(sql, [sessionkey, openid])
                    }
                    data = openid
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
                action: "get_openid",
            }, res);
        tool.log.debug("SHOPGetOpenId::Run.out");
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

module.exports = SHOPGetOpenId;