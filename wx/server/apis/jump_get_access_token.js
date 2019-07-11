var tools = require("./../tool");
var https = require('https');

function JUMPGetAccessToken() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "JUMPGetAccessToken::Run";
        log.debug("JUMPGetAccessToken::Run.in");
        var data = {};
        var response = tool.error.OK;
        if (!param["code"]) {
            log.warn('没有用户登录凭证code')
            // response = tool.error.ErrorNotCode;
        } else {
            try {
                // https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
                // 获取access_token by code
                const appid = 'wx9a7f04eeea0842be'; // 公众号的唯一标识
                const secret = '4a70772c68e8b62a606bf6973cacf7ac';
                var options = {
                    host: 'api.weixin.qq.com',
                    path: '/sns/oauth2/access_token?appid=' + appid + '&secret=' + secret +
                        '&code=' + param["code"] + '&grant_type=authorization_code',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
			
                async function CallAccessToken() {
                    var e = await HttpsGet(options)
					e = JSON.parse(e)
					
					const access_token = e.access_token
					const openid = e.openid
                   
					options = {
                        host: 'api.weixin.qq.com',
                        path: '/cgi-bin/customservice/getkflist?access_token=' + access_token,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                       }
                    };
					
					async function CallUserInfo() {
						var e = await HttpsGet(options)
						e = JSON.parse(e)
						console.info(e)
						// userinfo 存数据库
						//var sql = "select id from user where openid = ?"
						//var row = await query(sql,[e.openid])
						//if(row.length > 0){
						//	data.id = row[0].id
						//}else{
						//   sql = "insert into user(openid,name,avatar,create_time)values(?,?,?,CURRENT_TIMESTAMP)"
						//   row = await query(sql,[e.openid,e.nickname,e.headimgurl])
						//   if(row.insertId){
						//	 data.id = row.insertId  
						//   }
						//}
					}
					
					 await CallUserInfo()
                }
				await CallAccessToken()
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
                action: "get_access_token",
            }, res);
        tool.log.debug("JUMPGetAccessToken::Run.out");
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

module.exports = JUMPGetAccessToken;