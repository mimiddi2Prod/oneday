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
						"key": "item1"
					}, 
					{
						"name": "JOLLY UP",
						"sub_button":[
							{
								"type": "click",
								"name": "关于JOLLY",
								"key": "item2_1",
								"sub_button": []
							},
							{
								"type": "click",
								"name": "玩赏指南",
								"key": "item2_2",
								"sub_button": []
							},
							// {
								// "type": "click",
								// "name": "JOLLY课程",
								// "key": "item2_3",
								// "sub_button": []
							// },
							// {
								// "type": "click",
								// "name": "交通指南",
								// "key": "item2_4",
								// "sub_button": []
							// },
						]
					},
					{
						"name": "ABOUT US", 
						"sub_button":[
							{
								"type": "click",
								"name": "联系客服",
								"key": "item3_1",
								"sub_button": []
							},
							// {
								// "type": "click",
								// "name": "加入我们",
								// "key": "item3_2",
								// "sub_button": []
							// },
							// {
								// "type": "click",
								// "name": "JOLLY互动",
								// "key": "item3_3",
								// "sub_button": []
							// },
						]
					}
				]
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
                //resolve(e)
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
                resolve(data)
            })
        })
        req.write(postData);
        req.end();
    })
}

module.exports = WXCreateMenu;