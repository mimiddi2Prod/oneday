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
		send(param)
		//sendText(param);
	}
}

function send(param){
	let key = JSON.parse(param).eventkey
	let openid = JSON.parse(param).openid
	let message = ''
	let url = ''
	switch (key) {
		case "item1":{
			message = '跳转小程序'
			break;
		}
		case "item3_1":{
			message = '️☎详询更多，可致电客服：19859263629'
			break;
		}
		case "item3_2":{
			url = './images/join.jpg'
			break;
		}
		case "item3_3":{
			url = './images/interaction.jpg'
			break;
		}
		default:
			break;
	}
	if(message.length > 0){
		sendText(openid,message)
	}
	if(url.length > 0){
		sendImage(url,openid)
	}
}
	
function sendText(openid,message){	
	api.sendText(openid, message, function(err,result){
		// console.info(result)
		if(result.errcode == 0){
			
		}
	});
}

function sendImage(url,openid){
	api.uploadMedia(url, 'image', function(err,result){
		console.info(err)
		console.info(result)
		api.sendImage(openid, result.media_id, function(err,result){
			console.info(result)
		});
	});
}

module.exports = WXClickMenu;