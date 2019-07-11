// var tools = require("./../tool");
var https = require('https');
var config = require("./../config/wxConfig");

function WXGetAccessToken() {
	const appid = config.appid
	const secret = config.secret
	
	this.Run = async function(){
		return new Promise(function(resolve,reject){
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
			let accessToken = e.access_token
			resolve(accessToken)
		}
		CallAccessToken()
		})
		
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

module.exports = WXGetAccessToken;