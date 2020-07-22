var wechatApi = require("./../utils/wechat_api")

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        let menu = JSON.stringify({
            "button": [{
                "name": "民宿预定",
                "sub_button": [{
					"type": "click",
                    "name": "厦门薄荷店优惠订",
                    "key": "item1_1",
                    "sub_button": []
                }, {
					"type": "click",
                    "name": "厦门岛屿店优惠订",
                    "key": "item1_2",
                    "sub_button": []
                }, {
					"type": "click",
                    "name": "大理店优惠预定",
                    "key": "item1_3",
                    "sub_button": []
                }, {
                    "type": "miniprogram",
                    "name": "公众号预定",
					"url":"http://mp.weixin.qq.com",
                    "appid": "wxba832bcb326b64f3",  // onedayonehome小程序
                    "pagepath": "zh_jdgjb/pages/blank/blank"
                }]
            }, {
                "name": "设计咨询",
                "sub_button": [{
                    "type": "click",
                    "name": "联系方式",
                    "key": "item2_1",
                    "sub_button": []
                }, {
                    "type": "click",
                    "name": "民宿改造与合作",
                    "key": "item2_2",
                    "sub_button": []
                }]
            }, {
                "name": "更多关于",
                "sub_button": [{
                    "type": "click",
                    "name": "ONETE",
                    "key": "item3_1",
                    "sub_button": []
                }, {
                    "name": "ONEDAY品牌",
                    "type": "view",
                    "url": "https://mp.weixin.qq.com/s/CTCDB647EWaNZzp2QwOlfg"
                }, {
                    "name": "ONEDAYJOLLY",
                    "type": "view",
                    "url": "https://mp.weixin.qq.com/s/44MLQq5Sh4l824F_ht33DA"
                }, {
					"type": "click",
                    "name": "招聘",
                    "key": "item3_4",
                    "sub_button": []
                }, {
					"type": "click",
                    "name": "新店开业",
                    "key": "item3_5",
                    "sub_button": []
                }]
            }]
        })
        wechatApi.api.createMenu(menu, function (err, result) {
            console.info(result)
        })
    })
};