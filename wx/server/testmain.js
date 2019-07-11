// const http = require('http');
const Cmd = require('./../utils/CuteCmd.js');
var Koa = require('koa');
var Url = require('url');
const config = require('./config/wxConfig.js')
var WechatAPI = require('wechat-api');

const XMLJS = require('xml2js');
const sha1 = require('js-sha1');

var api = new WechatAPI(config.appid, config.secret);
let menu = {
	"button": [
		{
			"name": "JOLLY", 
			"type": "click",
			"key": "item1"
		}, 
		{
			"name": "JOLLY UP",
			"sub_button":[
				{
					"type": "click",
					"name": "关于JOLLY",
					"key": "item2_1",
					"sub_button": []
				},
				{
					"type": "click",
					"name": "玩赏指南",
					"key": "item2_2",
					"sub_button": []
				},
				{
					"type": "click",
					"name": "JOLLY课程",
					"key": "item2_3",
					"sub_button": []
				},
				{
					"type": "click",
					"name": "交通指南",
					"key": "item2_4",
					"sub_button": []
				},
			]
		},
		{
			"name": "ABOUT US", 
			"sub_button":[
				{
					"type": "click",
					"name": "联系客服",
					"key": "item3_1",
					"sub_button": []
				},
				{
					"type": "click",
					"name": "加入我们",
					"key": "item3_2",
					"sub_button": []
				},
				{
					"type": "click",
					"name": "JOLLY互动",
					"key": "item3_3",
					"sub_button": []
				},
			]
		}
	]
}
menu = JSON.stringify(menu)
api.createMenu(menu,function(err,result){
	console.info(result)
})

api.createLimitQRCode(100, function(err,result){
	console.info(result.url)
});

var app = new Koa();

app.use(async (ctx, next) => {
    const params = Url.parse(ctx.req.url, true).query;
	const openid = params.openid
    // 微信传来的加密字符串
    const signature = params.signature;
    // 根据传来的其他值计算加密字符串
    const timestamp = params.timestamp;
    const nonce = params.nonce;
    const token = config.token; // 这是在公众平台上自己设置的
    const array = [ token, timestamp, nonce ];
    array.sort();
    const scyptoString = sha1(array.join(''));

    // 比对两个加密字符串是否相等，相等则为微信官方传来的信息
    if (scyptoString === signature) {
      // 获取请求内的xml参数
      ctx.req.on('data', data => {
        // 将xml解析
        XMLJS.parseString(data.toString(), (err, result) => {
			console.info(result)
          if (result) {
            const event = result.xml.Event[0];
			const eventKey = result.xml.EventKey[0].split('_')[1];
            if (event === 'subscribe') {
              // 订阅，获取用户基本信息存入订阅表，建议使用非同步写法以加快response
              //ctx.service.wechat.saveSubscibeUser(result.xml.FromUserName[0]);
			  sendMessage(openid)
            } else if (event === 'unsubscribe') {
              // 取消订阅
              //ctx.service.wechat.deleteSubscibeUser(result.xml.FromUserName[0]);
            }
			if(eventKey){
				  sendText(openid,'桌号'+eventKey,0)
			}
          }
        });
      });
    }
    // 假如服务器无法保证在五秒内处理并回复，可以直接回复空串，微信服务器不会对此作任何处理，并且不会发起重试
    if (params.echostr) {
      // 用于通过微信验证
      ctx.body = params.echostr;
    } else {
      ctx.body = '';
    }
	
	function sendMessage(openid){
		var message = '欢迎您关注oneday'
		let index = 1
		sendText(openid,message,index)
	}
	
	function sendText(openid,message,index){
		api.sendText(openid, message, function(err,result){
			if(result.errcode == 0){
				if(index > 0){
					message = '这里有各种精彩内容等你发现'
					sendText(openid,message,index-1)
				}else{
					
				}
			}
		});
	}
	
	function getMedia(filepath,type){
		api.getMedia(filepath, type, function(err,result){
			console.info(result)
		});
	}
});

// 在端口3000监听:
app.listen(Cmd.GetCmd("--port", 5463));

/* http.createServer(function (req, res) {
	// console.info(signature)
	// console.info(req.url)
	// let openid = req.url.split('&')[3].split('=')[1]
	// var message = '欢迎您关注oneday'
	// let index = 1
	// sendText(openid,message,index)
	
	// function sendText(openid,message,index){
		// api.sendText(openid, message, function(err,result){
			// if(result.errcode == 0){
				// if(index > 0){
					// message = '这里有各种精彩内容等你发现'
					// sendText(openid,message,index-1)
				// }else{
					
				// }
			// }
		// });
	// }
	
	// function getMedia(filepath,type){
		// api.getMedia(filepath, type, function(err,result){
			// console.info(result)
		// });
	// }
}).listen(Cmd.GetCmd("--port", 5463));
*/