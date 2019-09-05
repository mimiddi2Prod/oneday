const wechatApi = require('./../wechat_api.js')

function WXReply() {
    this.Run = async function (type, param){
		send(param)
	}
}

function send(param){
	let content = JSON.parse(param).content
	let openid = JSON.parse(param).openid
	let message = ''
	let url = ''
	
	// 内容关键词 根据关键词回复响应内容
	let keyword = ['仲夏','PARTY','party','Party','活动','邀请函']
	let flag = 0
	for(let i in keyword){
		if(content.indexOf(keyword[i]) != -1){
			flag = 1
		}
	}
	switch (flag) {
		// case "item2_2":{
			// message = '🍉即将上线，敬请期待~'
			// break;
		// }
		// case "item2_3":{
			// message = '🍉即将上线，敬请期待~'
			// break;
		// }
		// case "item2_4":{
			// url = './images/traffic.jpg'
			// break;
		// }
		case 1:{
			message = '️0907Oneday Jolly仲夏开业趴期待和你一起玩儿：）'
			break;
		}
		case "item3_2":{
			url = './images/join.jpg'
			break;
		}
		default:
			message = '您的Oneday Jolly正在加载中'
			break;
	}
	if(message.length > 0){
		sendText(openid,message,flag)
	}
	if(url.length > 0){
		sendImage(url,openid)
	}
}
	
function sendText(openid,message,flag){	
	wechatApi.api.sendText(openid, message, function(err,result){
		// console.info(result)
		if(result.errcode == 0){
			if(flag == 0){
				sendText(openid,'☎详询更多，可致电客服：19859263629（微信同号）')
			}
			if(flag == 1){
				sendText(openid,'没有收到邀请函的宝宝下次还有机会，期待正式开业后见面啦～')
			}
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

module.exports = WXReply;