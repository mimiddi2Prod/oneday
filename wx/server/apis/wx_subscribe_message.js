var tools = require("./../tool");
const config = require('./../config/wxConfig.js')
var WechatAPI = require('wechat-api');
var api = new WechatAPI(config.appid, config.secret);

function WXCreateLimitQRCode() {
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
		for(let i = 0;)
		sendText(param,row[i]['message'],i)
	}
}
	
async function sendText(openid,message,index){
	api.sendText(openid, message, function(err,result){
		if(result.errcode == 0){
			
		}
	});
}

module.exports = WXCreateLimitQRCode;