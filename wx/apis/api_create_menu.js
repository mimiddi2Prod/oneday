var wechatApi = require("./../utils/wechat_api")

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        let menu = JSON.stringify({
            "button": [{
                "name": "JOLLY",
                // "type": "miniprogram",
                // "url": "https://weibo.com/u/7208197320",
                // "appid": "wxa0869cd59ebaaa06",
                // "pagepath": "pages/blank/blank"
				"sub_button": [{
                    "name": "JOLLY商城",
					"type": "miniprogram",
                    "url": "https://weibo.com/u/7208197320",
					"appid": "wxa0869cd59ebaaa06",
					"pagepath": "pages/blank/blank"
                }, {
                    "name": "ONEDAY民宿",
					"type": "miniprogram",
                    "url": "https://weibo.com/u/7208197320",
					"appid": "wxba832bcb326b64f3",
					"pagepath": "zh_jdgjb/pages/blank/blank"
                }]
            }, {
                "name": "JOLLY UP",
                "sub_button": [{
                    "name": "关于JOLLY",
                    "type": "view",
                    // "url": "https://mp.weixin.qq.com/s/44MLQq5Sh4l824F_ht33DA"
					"url": "https://mp.weixin.qq.com/s/sKRuNYzktp7jdcNpyrHHsA"
                }, {
                    "type": "click",
                    "name": "玩赏指南",
                    "key": "item2_2",
                    "sub_button": []
                }, {
					"type": "click",
                    "name": "NEW JOLLY",
                    // "type": "view",
                    // "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MzU3OTk3MTQ4Mw==&hid=1&sn=20d703a4142c265dfb7e22898b843255"
					"key": "item2_3",
                    "sub_button": []
                }, {
                    "type": "click",
                    "name": "交通指南",
                    "key": "item2_4",
                    "sub_button": []
                }]
            }, {
                "name": "ABOUT US",
                "sub_button": [{
                    "name": "关于ONEDAY",
                    "type": "view",
                    // "url": "https://mp.weixin.qq.com/s/44MLQq5Sh4l824F_ht33DA"
					"url": "https://mp.weixin.qq.com/s/CTCDB647EWaNZzp2QwOlfg"
                }, {
                    "type": "click",
                    "name": "联系客服",
                    "key": "item3_1",
                    "sub_button": []
                }, {
                    "type": "click",
                    "name": "JOLLY+",
                    "key": "item3_2",
                    "sub_button": []
                }]
            }]
        })
        wechatApi.api.createMenu(menu, function (err, result) {
            console.info(result)
        })
    })
};