var tools = require("./tool")


function JUMPRouter() {
    var tool = new tools;
    this.Run = function (path, param, res) {
        tool.log.info("JUMPRouter::Run.in");
        var arr = path.split("/");
        console.info(arr);
        if (arr.length < 3) {
            tool.MakeResponse(200, {res: tool.error.ErrorPath, data: {}}, res);
            tool.log.warn("JUMPRouter::Run", "path is error");
        } else {
            var work = null;
            switch (arr[2]) {
                case "test": {
                    var test = require("./apis/test.js");
                    work = new test;
                    break;
                }
                case "get_code": {
                    var JUMPGetCode = require("./apis/jump_get_code.js");
                    work = new JUMPGetCode;
                    break;
                }
				case "get_access_token":{
					var JUMPGetAccessToken = require("./apis/jump_get_access_token.js");
                    work = new JUMPGetAccessToken;
                    break;
				}
                case "get_openid": {
                    var JUMPGetOpenid = require("./apis/jump_get_openid.js");
                    work = new JUMPGetOpenid;
                    break;
                }
                case "get_userInfo": {
                    var JUMPGetUserInfo = require("./apis/jump_get_userInfo.js");
                    work = new JUMPGetUserInfo;
                    break;
                }
				case "test_get_accessToken": {
                    var TESTGetAccessToken = require("./apis/test_get_access_token.js");
                    work = new TESTGetAccessToken;
                    break;
                }
				case "wx_create_menu": {
                    var WXCreateMenu = require("./apis/wx_create_menu.js");
                    work = new WXCreateMenu;
                    break;
                }
                default:
                    break;
            }
            if (work) {
                work.Run(arr[1], param, res).then(function (obj) {
                    res.end();
                    tool.log.info("JUMPRouter::Run.out");
                });
            } else {
                tool.MakeResponse(200, {res: tool.error.ErrorBranch, data: {}}, res);
                res.end();
            }
        }
    }
}

module.exports = JUMPRouter;