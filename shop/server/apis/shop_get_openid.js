var tools = require("./../tool");
var https = require('https');
var wxConfig = require("./../config/wxConfig")
var appid = wxConfig.appid
var secret = wxConfig.secret

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
                    data = JSON.parse(e)
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