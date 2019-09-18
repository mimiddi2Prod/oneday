var tools = require("./../tool");

// const config = require('./../config/wxConfig.js')
// var WechatAPI = require('wechat-api');
// var api = new WechatAPI(config.appid, config.secret);
const wechatApi = require('./../wechat_api.js')

function WXCreateLimitQRCode() {
	var tool = new tools;
	var query = tool.query;
    this.Run = async function (type, param){
		// console.info(type)
		// console.info(param)
		var row = ''
		var sql = ''
		param = JSON.parse(param)
		for(let i in param){
			wechatApi.api.createLimitQRCode(param[i], function(err,result){
				// console.info('桌号:'+param[i]+'\n'+'二维码地址')
				// console.info(result.url)
				sql = "insert into wechat_qrcode (number,url,create_time) values (?,?,CURRENT_TIMESTAMP)"
				// console.info(sql)
				row = query(sql, [param[i],result.url])
				// console.info(row)
			});
		}
	}
}

module.exports = WXCreateLimitQRCode;