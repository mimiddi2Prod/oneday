// var tools = require("./../tool");
const config = require('./../config/wxConfig.js')
var WechatAPI = require('wechat-api');
var api = new WechatAPI(config.appid, config.secret);

function WXScan() {
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
	let message = '桌号:' + JSON.parse(param).eventkey
	api.sendText(JSON.parse(param).openid, message, function(err,result){
		// console.info(result)
		if(result.errcode == 0){
			
		}
	});
}

module.exports = WXScan;