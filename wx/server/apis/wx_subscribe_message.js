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
		// console.info(row)
		if(row.length > 0){
			let i = 0
			sendText(param,row,i);
		}else{
			sendImage(param)
		}
	}
}
	
function sendText(param,messages,index){
	if(index < messages.length){
		let message = messages[index].message
		api.sendText(JSON.parse(param).openid, message, function(err,result){
			// console.info(result)
			if(result.errcode == 0){
				sendText(param,messages,index+1)
			}
		});
	}else{
		if(JSON.parse(param).eventkey.length > 0){
			let message = '桌号:' + JSON.parse(param).eventkey.split('_')[1]
			if(message.length > 0){
				api.sendText(JSON.parse(param).openid, message, function(err,result){
					// console.info(result)
				});
			}
		}
	}
}

function sendImage(param){
	api.uploadMedia('./images/subscribe.jpg', 'image', function(err,result){
		console.info(err)
		console.info(result)
		api.sendImage(JSON.parse(param).openid, result.media_id, function(err,result){
			console.info(result)
		});
	});
}

module.exports = WXSubscribeMessage;