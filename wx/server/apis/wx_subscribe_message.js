var tools = require("./../tool");
const config = require('./../config/wxConfig.js')
var WechatAPI = require('wechat-api');
var api = new WechatAPI(config.appid, config.secret);

function WXSubscribeMessage() {
	var tool = new tools;
	var query = tool.query;
    this.Run = async function (type, param){
		// console.info(type)
		// console.info(param)
		var row = ''
		var sql = ''
		sql = "select message from subscribe_message order by sort"
		row = await query(sql)
		console.info(row)
		let i = 0
		sendText(param,row,i);
	}
}
	
function sendText(openid,messages,index){
	if(index < messages.length){
		let message = messages[index].message
		api.sendText(openid, message, function(err,result){
			console.info(result)
			if(result.errcode == 0){
				sendText(openid,messages,index+1)
			}
		});
	}
}

module.exports = WXSubscribeMessage;