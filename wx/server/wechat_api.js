var wxConfig = require('./config/wxConfig.js')
var appid = wxConfig.appid,
    secret = wxConfig.secret

function WXApi() {
}

WXApi.Init = function () {
    if (!WXApi.api) {
		const WechatAPI = require('wechat-api');
		WXApi.api = new WechatAPI(appid, secret)
    }
    return WXApi.api;
}

module.exports = WXApi;