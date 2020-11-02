var db = require("./../utils/dba");
var wechatApi = require("./../utils/wechat_api")

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        let condition = [{key: 'appid', value: wechatApi.wxConfig.appid}]
        let row = await db.Select("*", "menu", condition, "", "sort")
        /**
         * parent_button_id：0 为一级菜单
         * 一级菜单：type为空，则有二级菜单
         * @type {{button: *}}
         */
        let parent = {
            "button": row.filter(val => {
                return val.parent_button_id === 0
            }).map(val => {
                return buttonType(val)
            })
        }
        let sub_button = row.filter(val => {
            return val.parent_button_id !== 0
        }).map(val => {
            return buttonType(val)
        })

        parent.button = parent.button.map(val => {
            sub_button.forEach(m => {
                if (m.parent_button_id && val.id === m.parent_button_id) {
                    delete m.parent_button_id
                    val.sub_button.push(m)
                }
            })
            val.id ? delete val.id : ""
            val.sub_button.length === 0 ? delete val.sub_button : ""
            return val
        })

        let menu = JSON.stringify(parent)

        // let menu = JSON.stringify({
        //     "button": [{
        //         "name": "民宿预定",
        //         "sub_button": [{
        //             "type": "miniprogram",
        //             "name": "客房预定",
        //             "url": "http://mp.weixin.qq.com",
        //             "appid": "wxba832bcb326b64f3",  // onedayonehome小程序
        //             "pagepath": "zh_jdgjb/pages/blank/blank"
        //         }]
        //     }, {
        //         "name": "设计咨询",
        //         "sub_button": [{
        //             "type": "click",
        //             "name": "民宿改造与合作",
        //             "key": "item2_2",
        //             "sub_button": []
        //         }]
        //     }, {
        //         "name": "更多关于",
        //         "sub_button": [{
        //             "type": "click",
        //             "name": "ONETE",
        //             "key": "item3_1",
        //             "sub_button": []
        //         }, {
        //             "name": "ONEDAY品牌",
        //             "type": "view",
        //             "url": "https://mp.weixin.qq.com/s/CTCDB647EWaNZzp2QwOlfg"
        //         }, {
        //             "name": "ONEDAYJOLLY",
        //             "type": "view",
        //             "url": "https://mp.weixin.qq.com/s/44MLQq5Sh4l824F_ht33DA"
        //         }, {
        //             "type": "click",
        //             "name": "招聘",
        //             "key": "item3_4",
        //             "sub_button": []
        //         }]
        //     }]
        // })
        wechatApi.api.createMenu(menu, function (err, result) {
            console.info(result)
        })
    })
};

function buttonType(val) {
    let obj = {}
    if (!val.type) {
        obj = {
            "name": val.name
        }
    } else {
        switch (val.type) {
            case "click" : {
                obj = {
                    "name": val.name,
                    "type": val.type,
                    "key": val.key
                }
                break;
            }
            case "view": {
                obj = {
                    "name": val.name,
                    "type": val.type,
                    "url": val.url
                }
                break;
            }
            case "miniprogram": {
                obj = {
                    "name": val.name,
                    "type": val.type,
                    "url": val.url,
                    "appid": val.miniappid,  // onedayonehome小程序
                    "pagepath": "zh_jdgjb/pages/blank/blank"
                }
                break;
            }
        }
    }
    if (val.parent_button_id === 0) {
        // 一级菜单
        // 一级菜单可以有二级菜单，二级菜单通过parent_button_id与一级菜单的id对应
        obj = Object.assign(obj, {"id": val.id, "sub_button": []})
    } else {
        // 二级菜单
        obj = Object.assign(obj, {"parent_button_id": val.parent_button_id})
    }
    return obj
}
