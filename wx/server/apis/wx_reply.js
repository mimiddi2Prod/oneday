const wechatApi = require('./../wechat_api.js')

function WXReply() {
    this.Run = async function (type, param){
		let openid = JSON.parse(param).openid
		let content = JSON.parse(param).content
		let message = ''
		if(typeof(Number(content)) == 'number' && content.length == 11){
			console.info(content)
			let getCustomer = require('./yinbao_get_customer')
			let callback = getCustomer(content)
			callback.then(function(eData){
				console.info(eData)
				if(eData.code == 0){
					message = '当前余额为：'+ eData.data.balance
					let message2 = '当前积分为：'+eData.data.point
					let message3 = ''
					sendCustomerText(openid,message,message2,message3)
				}else{
					message = '没有查询到会员卡，请咨询前台工作人员确认是否有注册'
					sendCustomerText(openid,message)
				}
				let balance = eData.data
			})
		}else{
			send(param)
		}
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
		case 1:{
			message = '️0907Oneday Jolly仲夏开业趴期待和你一起玩儿：）'
			break;
		}
		// case "item3_2":{
			// url = './images/join.jpg'
			// break;
		// }
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

// 会员卡
function sendCustomerText(openid,message,message2,message3){	
	wechatApi.api.sendText(openid, message, function(err,result){
		// console.info(result)
		if(result.errcode == 0){
			wechatApi.api.sendText(openid, message2, function(err,result){
				// console.info(result)
				if(result.errcode == 0){
					wechatApi.api.sendText(openid, message3, function(err,result){
						// console.info(result)
						if(result.errcode == 0){
							
						}
					});
				}
			});
		}
	});
}

module.exports = WXReply;