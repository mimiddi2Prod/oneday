var tools = require("./../tool");
var https = require('https');

function JUMPGetOpenid() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "JUMPGetOpenid::Run";
        log.debug("JUMPGetOpenid::Run.in");
        var data = {};
        var response = tool.error.OK;
        if (!param["code"]) {
            log.warn('没有用户登录凭证code')
            // response = tool.error.ErrorNotCode;
        } else {
            try {
                // https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
                // 获取access_token openid
                const appid = 'wx9a7f04eeea0842be'; // 公众号的唯一标识
                const secret = '';
                var options = {
                    host: 'api.weixin.qq.com',
                    path: 'sns/oauth2/access_token?appid=' + appid + '&secret=' + secret +
                        '&code=' + param["code"] + '&grant_type=authorization_code',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                async function CallOpenid() {
                    var e = await HttpsGet(options)
                    console.info(e)

                    e = JSON.parse(e)
                    // 获取用户信息
                    // https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
                    const access_token = e.access_token
                    const openid = e.openid
                    options = {
                        host: 'api.weixin.qq.com',
                        path: 'sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };
                    await CallUserInfo()
                }

                async function CallUserInfo() {
                    var e = await HttpsGet(options)
                    console.info(e)
                    // userinfo 存数据库
                    var sql = "insert into user(avatar)values(?)"
                    var row = await query(sql,[param["avatar"]])
                    console.info(row)
                    data = JSON.parse(e)
                }

                await CallOpenid()
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
        tool.log.debug("JUMPGetOpenid::Run.out");
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

module.exports = JUMPGetOpenid;