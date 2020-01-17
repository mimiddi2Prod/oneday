var wechatApi = require("./../utils/wechat_api")

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        let menu = JSON.stringify({
            "button": [{
                "name": "JOLLY",
                "type": "miniprogram",
                "url": "https://weibo.com/u/7208197320",
                "appid": "wxa0869cd59ebaaa06",
                "pagepath": "pages/blank/blank"
            }, {
                "name": "JOLLY UP",
                "sub_button": [{
                    "name": "关于JOLLY",
                    "type": "view",
                    "url": "https://mp.weixin.qq.com/s/44MLQq5Sh4l824F_ht33DA"
                }, {
                    "type": "click",
                    "name": "玩赏指南",
                    "key": "item2_2",
                    "sub_button": []
                }, {
                    "name": "活动课程",
                    "type": "view",
                    "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MzU3OTk3MTQ4Mw==&hid=1&sn=20d703a4142c265dfb7e22898b843255"
                }, {
                    "type": "click",
                    "name": "交通指南",
                    "key": "item2_4",
                    "sub_button": []
                }]
            }, {
                "name": "ABOUT US",
                "sub_button": [{
                    "type": "click",
                    "name": "试营业中",
                    "key": "item3_4",
                    "sub_button": []
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