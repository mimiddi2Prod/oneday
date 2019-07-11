var tools = require("./../tool");
var https = require('https');

function JUMPGetCode() {
    var tool = new tools;
    var log = tool.log;
    // var query = tool.query;

    this.Run = async function (ver, param, res) {
        process.on('uncaughtException', function (err) {
            //打印出错误
            console.log(err);
            //打印出错误的调用栈方便调试
            console.log(err.stack);
        });

        var name = "JUMPGetCode::Run";
        log.debug("JUMPGetCode::Run.in");
        var data = {};
        var response = tool.error.OK;
		// https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
        try {
            const appid = 'wx9a7f04eeea0842be'; // 公众号的唯一标识
			//const appid = 'wx4e2cba3cd46c841c' // 测试号
            //const secret = 'b5f18d4027429ccd88e826c5c932326c'
			
			const url = 'http://test2.minidope.com/authorize_success'
            //const redirect_uri = encodeURI(url); // 授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
            const scope = 'snsapi_userinfo'; //应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
            			    
            //var options = {
            //    host: 'open.weixin.qq.com',
            //    path: '/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri +
            //        '&response_type=code&scope=' + scope + '#wechat_redirect',
            //    method: 'GET',
            //    headers: {
            //        'Content-Type': 'application/json'
            //    }
            //};
            //var options = {
            //    host: 'open.weixin.qq.com',
            //    path: '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
            //    method: 'GET',
            //    headers: {
            //        'Content-Type': 'application/json'
            //    }
            //};

            /* async function Call() {
				await HttpsGet(options)
                var e = await HttpsGet(options)
				console.info(e)
                data = JSON.parse(e)
            } */

            //await Call()
			
			data.appid = appid
			data.url = url
			data.scope = scope
        } catch (err) {
            if (err.code) {
                response = tool.error.ErrorSQL;
                log.warn(name, "code:", err.code, ", sql:", err.sql);
            } else {
                log.warn(name, JSON.stringify(response));
                response = tool.error.ErrorCatch;
            }
        }

        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_code",
            }, res);
        tool.log.debug("JUMPGetCode::Run.out");
    }
}

/* async function HttpsGet(option) {
    return new Promise(function (resolve, reject) {
        https.get(option, function (res) {
            let data = ''
            res.on('data', function (chunk) {
				console.info(chunk)
                data += chunk;
            })
            res.on('end', function (e) {
				console.info(data)
				console.info(e)
               // resolve(data)
            })
        })
    })
} */

module.exports = JUMPGetCode;