var db = require("./../utils/dba");
var wechatApi = require("./../utils/wechat_api")

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        let condition = [{key: 'appid', value: wechatApi.wxConfig.appid}]
        let row = await db.Select("message", "subscribe_message", condition, "", "sort")
        if (row.length > 0) {
            let i = 0
            sendText(params, row, i);
        } else {
            sendImage(params)
        }
    })

};

function sendText(param, messages, index) {
    if (index < messages.length) {
        let message = messages[index].message
        wechatApi.api.sendText(param.openid, message, function (err, result) {
            if (result.errcode == 0) {
                sendText(param, messages, index + 1)
            }
        });
    } else {
        if (param.eventkey.length > 0) {
            sendMiniProgram(param)
        }
    }
}

function sendImage(param) {
    wechatApi.api.uploadMedia('./images/subscribe.jpg', 'image', function (err, result) {
        wechatApi.api.sendImage(param.openid, result.media_id, function (err, result) {
            if (result.errcode == 0) {
                if (param.eventkey.length > 0) {
                    sendMiniProgram(param)
                }
            }
        });
    });
}

function sendMiniProgram(param) {
    let expire_time = new Date().getTime() + (30 * 60 * 1000)
    let message = '<a data-miniprogram-appid="' + config.restaurant_mini_appid + '" data-miniprogram-path="pages/blank/blank?id=' + param.eventkey.split('_')[1] + '&expire_time=' + expire_time + '" href="">你选择了:' + param.eventkey.split('_')[1] + '桌，点击进入菜单</a>'
    wechatApi.api.sendText(param.openid, message, function (err, result) {
        if (result.errcode == 0) {

        }
    });
}