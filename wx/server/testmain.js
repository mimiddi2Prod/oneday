const Cmd = require('./../utils/CuteCmd.js');
var Koa = require('koa');
var Url = require('url');
const config = require('./config/wxConfig.js')
// var WechatAPI = require('wechat-api');
const XMLJS = require('xml2js');
const sha1 = require('js-sha1');

// var fs = require('fs')

var Router = require("./router.js");
var router = new Router;

const wechatApi = require('./wechat_api.js')
wechatApi.Init()
// router.Run(type);

// var api = new WechatAPI(config.appid, config.secret)
// var api = new WechatAPI(config.appid, config.secret, function(callback){
	// 传入一个获取全局token的方法
	  // fs.readFile('access_token.txt', 'utf8', function (err, txt) {
		  // console.info(err)
		  // console.info(txt)
		// if (err) {return callback(err);}
		// callback(null, JSON.parse(txt));
	  // });
	// }, function (token, callback) {
		// console.info(token)
	  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
	  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
	  // fs.writeFile('access_token.txt', JSON.stringify(token), callback);
// });
// console.info(api)
var menu = {
	"button": [
		// {
			// "name": "JOLLY", 
			// "type": "click",
			// "key": "item1"
		// }, 
		{
			"name": "JOLLY",
			"type": "view",
			"url":"https://weibo.com/u/7208197320"
		},
		{
			"name": "JOLLY UP",
			"sub_button":[
				{
					"name": "关于JOLLY",
					"type": "view",
					"url": "https://mp.weixin.qq.com/s/44MLQq5Sh4l824F_ht33DA"
				},
				// {
					// "type": "click",
					// "name": "关于JOLLY",
					// "key": "item2_1",
					// "sub_button": []
				// },
				{
					"type": "click",
					"name": "玩赏指南",
					"key": "item2_2",
					"sub_button": []
				},
				{
					"type": "click",
					"name": "活动课程",
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
					"name": "即将开业",
					"key": "item3_4",
					"sub_button": []
				},
				{
					"type": "click",
					"name": "联系客服",
					"key": "item3_1",
					"sub_button": []
				},
				{
					"type": "click",
					"name": "JOLLY+",
					"key": "item3_2",
					"sub_button": []
				},
				// {
					// "type": "click",
					// "name": "商务合作",
					// "key": "item3_2",
					// "sub_button": []
				// },
				// {
					// "type": "click",
					// "name": "JOLLY互动",
					// "key": "item3_3",
					// "sub_button": []
				// },
			]
		}
	]
}
menu = JSON.stringify(menu)
// 创建菜单
// api.createMenu(menu,function(err,result){
	// console.info(result)
// })

// 创建长期二维码
// api.createLimitQRCode(100, function(err,result){
	// console.info(result.url)
// });

// createMenu()
function createMenu(){
	router.Run('create_menu', menu);
}
// createLimitQRCode()
function createLimitQRCode(){
	// let codeList = [100,101]
	let codeList = []
	for(let i=1;i<=50;i++ ){
		codeList.push(i)
	}
	console.info(codeList)
	codeList = JSON.stringify(codeList)
	router.Run('create_limit_qr_code',codeList);
}

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
			const msgType = result.xml.MsgType[0]
			if(msgType === 'event'){
				const event = result.xml.Event[0];
				if (event === 'subscribe') {
				  // 订阅，获取用户基本信息存入订阅表，建议使用非同步写法以加快response
				  //ctx.service.wechat.saveSubscibeUser(result.xml.FromUserName[0]);
				  // sendMessage(openid)
				  let param = {
					  openid:openid,
					  eventkey:result.xml.EventKey[0] // 扫描带参二维码并关注,否则为空
				  }
				  param = JSON.stringify(param)
				  router.Run('subscribe_message',param);
				} else if (event === 'unsubscribe') {
				  // 取消订阅
				  //ctx.service.wechat.deleteSubscibeUser(result.xml.FromUserName[0]);
				} else if(event === 'SCAN'){
				  // 扫描二维码进入
				  let param = {
					  openid:openid,
					  eventkey:result.xml.EventKey[0] // 扫描带参二维码且已关注,否则为空
				  }
				  param = JSON.stringify(param)
				  router.Run('scan',param);
				} else if(event === 'CLICK'){
				  // 菜单栏点击进入
				  let param = {
					  openid:openid,
					  eventkey:result.xml.EventKey[0] // 点击菜单栏CLICK事件
				  }
				  param = JSON.stringify(param)
				  router.Run('click_menu',param);
				}
			} else if(msgType === 'text'){
				let param = {
					openid:openid,
					content:result.xml.Content[0]
				}
				param = JSON.stringify(param)
				router.Run('reply',param);
			}
				
			
			// if(event === 'SCAN'){
				// let eventKey = result.xml.EventKey[0].split('_')[0];
				// if(eventKey){
					// if(eventKey == 'qrscene'){
						// eventKey = result.xml.EventKey[0].split('_')[1];
						// sendText(openid,'桌号'+eventKey,0)
					// }else{
						// eventKey = result.xml.EventKey[0];
						// sendText(openid,'桌号'+eventKey,0)
					// }	
				// }
			// }
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
	
	// function sendMessage(openid){
		// var message = '欢迎您关注oneday'
		// let index = 1
		// sendText(openid,message,index)
	// }
	
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
});

// 在端口监听:
app.listen(Cmd.GetCmd("--port", 5463));