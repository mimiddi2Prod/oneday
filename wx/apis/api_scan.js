var wechatApi = require("./../utils/wechat_api")
var config = require("../config/wxConfig")

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        sendText(params);
    })

};

function sendText(param) {
    let expire_time = new Date().getTime() + (30 * 60 * 1000)
    let message = '<a data-miniprogram-appid="' + config.restaurant_mini_appid + '" data-miniprogram-path="pages/blank/blank?id=' + param.eventkey + '&expire_time=' + expire_time + '" href="">你选择了:' + param.eventkey + '桌，点击进入菜单</a>'
    wechatApi.api.sendText(param.openid, message, function (err, result) {
        if (result.errcode == 0) {

        }
    });
}