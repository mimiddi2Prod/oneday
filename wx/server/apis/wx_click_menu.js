// var tools = require("./../tool");
// const config = require('./../config/wxConfig.js')
// var WechatAPI = require('wechat-api');

// var api = new WechatAPI(config.appid, config.secret);
const wechatApi = require('./../wechat_api.js')
// console.info(wechatApi)

function WXClickMenu() {
	// var tool = new tools;
	// var query = tool.query;
    this.Run = async function (type, param){
		send(param)
	}
}

function send(param){
	let key = JSON.parse(param).eventkey
	let openid = JSON.parse(param).openid
	let message = ''
	let url = ''
	switch (key) {
		// case "item1":{
			// message = '微博链接：https://weibo.com/u/7208197320'
			// break;
		// }
		case "item2_2":{
			message = '🍉即将上线，敬请期待~'
			break;
		}
		case "item2_3":{
			message = '🍉即将上线，敬请期待~'
			break;
		}
		case "item2_4":{
			url = './images/traffic.jpg'
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
		// case "item3_3":{
			// url = './images/interaction.jpg'
			// break;
		// }
		case "item3_4":{
			url = './images/load.jpg'
			// url = './images/load.png'
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
	wechatApi.api.sendText(openid, message, function(err,result){
		// console.info(result)
		if(result.errcode == 0){
			
		}
	});
}

function sendImage(url,openid){
	wechatApi.api.uploadMedia(url, 'image', function(err,result){
		console.info(err)
		console.info(result)
		wechatApi.api.sendImage(openid, result.media_id, function(err,result){
			console.info(result)
		});
	});
}

module.exports = WXClickMenu;