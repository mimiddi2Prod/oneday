var tools = require("./../tool");
var https = require('https');

function TESTGetAccessToken() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "TESTGetAccessToken::Run";
        log.debug("TESTGetAccessToken::Run.in");
        var data = {};
        var response = tool.error.OK;
        //if (!param["code"]) {
        //    log.warn('没有用户登录凭证code')
            // response = tool.error.ErrorNotCode;
        //} else {
            try {
                // https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
                // 获取access_token by code
                const appid = 'wx9a7f04eeea0842be'; // 公众号的唯一标识
                const secret = '4a70772c68e8b62a606bf6973cacf7ac';
                var options = {
                    host: 'api.weixin.qq.com',
                    path: '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                async function CallAccessToken() {
                    var e = await HttpsGet(options)
					e = JSON.parse(e)
					console.info(e)
					const access_token = e.access_token
					//const openid = e.openid
                   
					//options = {
                    //    host: 'api.weixin.qq.com',
                    //    path: '/cgi-bin/customservice/getkflist?access_token=' + access_token,
                    //    method: 'GET',
                    //    headers: {
                    //        'Content-Type': 'application/json'
                    //   }
                    //};
					let postData = {
							"touser":"YVA29gikwKB8umXaDng",
							"msgtype":"text",
							"text":
							{
								 "content":"Hello World"
							}
						}
					options = {
						host: 'api.weixin.qq.com',
						path: '/cgi-bin/message/custom/send?access_token=' + access_token,
						method: 'POST',
						form: postData,
						headers: {
							// 'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Type': 'application/json',
							'Content-Length': postData.length
						},
						//encoding: 'binary'
					}
					
					async function CallCODE() {
						e = await HttpsPost(options, postData)
						console.info(e)

						// var base64Image = JSON.parse(e).imgBuffer.toString('base64')
						// console.info(base64Image)
						// var decodedImage = new Buffer(base64Image, 'base64');
						// console.info(decodedImage)
						// var b = JSON.parse(e)
						// console.info(b)
						//fs.writeFile('./index.png', e, function (err) {
						//	if (err) {
						//		throw err;
						//	}
						//})
					}

					await CallCODE()
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
        //}

        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_access_token",
            }, res);
        tool.log.debug("TESTGetAccessToken::Run.out");
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
            //res.setEncoding('binary')
            res.on('data', function (chunk) {
                data += chunk;
            })
            res.on('end', function (e) {
				console.info(data)
                //const contentType = res.headers['content-type'];
                //if (!contentType.includes('image')) {
                //    console.log('获取小程序码图片失败，微信api返回的json为：')
                //    console.log(JSON.parse(data))
                //    return resolve(null);
                //}
                //const imgBuffer = Buffer.from(data, 'binary');
                //resolve(imgBuffer)
				resolve(data)
            })
        })
        req.write(postData);
        req.end();
    })
}

module.exports = TESTGetAccessToken;