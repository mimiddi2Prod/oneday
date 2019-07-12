// var tools = require("./../tool");
const config = require('./../config/wxConfig.js')
var WechatAPI = require('wechat-api');
var api = new WechatAPI(config.appid, config.secret);

function WXClickMenu() {
	// var tool = new tools;
	// var query = tool.query;
    this.Run = async function (type, param){
		// console.info(type)
		// console.info(param)
		// var row = ''
		// var sql = ''
		// sql = "select message from subscribe_message order by sort"
		// row = await query(sql)
		// console.info(row)
		sendText(param);
	}
}
	
function sendText(param){	
	let key = JSON.parse(param).eventkey
	let openid = JSON.parse(param).openid
	let message = ''
	switch (key) {
		case "item1":{
			message = '跳转小程序'
			break;
		}
		default:
			break;
	}
	api.sendText(openid, message, function(err,result){
		// console.info(result)
		if(result.errcode == 0){
			
		}
	});
}

module.exports = WXClickMenu;