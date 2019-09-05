var tools = require("./tool");

function Router() {
	var tool = new tools;
    this.Run = function (type, param) {
		if(type.length <= 0){
			tool.MakeResponse(200, {res: tool.error.ErrorPath, data: {}}, res);
            tool.log.warn("JUMPRouter::Run", "path is error");
		}else{
			var work = null;
			switch (type) {
				case "create_menu": {
					var WXCreateMenu = require("./apis/wx_create_menu.js");
					work = new WXCreateMenu;
					break;
				}
				case "create_limit_qr_code": {
					var WXCreateLimitQRCode = require("./apis/wx_create_limit_qr_code.js");
					work = new WXCreateLimitQRCode;
					break;
				}
				case "subscribe_message": {
					var WXSubscribeMessage = require("./apis/wx_subscribe_message.js");
					work = new WXSubscribeMessage;
					break;
				}
				case "scan": {
					var WXScan = require("./apis/wx_scan.js");
					work = new WXScan;
					break;
				}
				case "click_menu": {
					var WXClickMenu = require("./apis/wx_click_menu.js");
					work = new WXClickMenu;
					break;
				}
				case "reply": {
					var WXReply = require("./apis/wx_reply.js");
					work = new WXReply;
					break;
				}
				default:
					break;
			}
			if (work) {
                work.Run(type, param)
            } else {
                tool.MakeResponse(200, {res: tool.error.ErrorBranch, data: {}}, res);
            }			
		}
		
    }
}

module.exports = Router;