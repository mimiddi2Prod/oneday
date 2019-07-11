// var tools = require("./../tool");
var https = require('https');

function WXCreateMenu() {
    this.Run = async function (access_token) {
        // console.info(access_token)
        return new Promise(function (resolve, reject) {
            let postData = {
                "button": [
				{
					"name": "JOLLY", 
					"type": "click",
					"key": "item1",
				}, 
				{
					"name": "JOLLY UP",
					"type": "click",
					"key": "item_2",
					"sub_button":[
					{
						"type": "click",
						"name": "关于JOLLY",
						"key": "item2",
					}]
				},
				{
					"name": "ABOUT US", 
					"type": "click",
					"key": "item3",
					"sub_button":[
					{
						"type": "click",
						"name": "联系客服",
						"key": "item3_1",
					}]
				}]
            }
			postData = JSON.stringify(postData)

            let options = {
                host: 'api.weixin.qq.com',
                path: '/cgi-bin/menu/create?access_token=' + access_token,
                method: 'POST',
                form: postData,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': postData.length
                },
            }

            async function CallMenu() {
                let e = await HttpsPost(options, postData)
                console.info(e)
                resolve(e)
            }

            CallMenu()
        });
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
            res.on('data', function (chunk) {
                data += chunk;
            })
            res.on('end', function (e) {
                console.info(data)
                resolve(data)
            })
        })
        req.write(postData);
        req.end();
    })
}

module.exports = WXCreateMenu;