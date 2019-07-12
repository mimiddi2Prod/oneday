// var tools = require("./../tool");
const config = require('./../config/wxConfig.js')
var WechatAPI = require('wechat-api');
var api = new WechatAPI(config.appid, config.secret);

function WXCreateMenu() {
	// var query = tool.query;
    this.Run = function (type, param){
		// console.info(type)
		// console.info(param)
		api.createMenu(param,function(err,result){
			console.info(result)
		})
	}
}

module.exports = WXCreateMenu;