function Router() {
    this.Service = function (data, url, callback) {
        var baseApi = {};
        var arr = url.split("/");
        var version = arr[1];
        var apiFunction = arr[2];

        switch (apiFunction) {
            case "login":
                var shopLogin = require("./api/login.js");
                baseApi = new shopLogin;
                break;
            case "get_menu":
                var getMenu = require("./api/get_menu.js");
                baseApi = new getMenu;
                break;
            case "get_goods":
                var getGoods = require("./api/get_goods.js");
                baseApi = new getGoods;
                break;
            case "get_category":
                var getCategory = require("./api/get_category.js");
                baseApi = new getCategory;
                break;
            case "get_uploadToken":
                var getUploadToken = require("./api/get_uploadToken.js");
                baseApi = new getUploadToken;
                break;
            case "add_goods":
                var addGoods = require("./api/add_goods.js");
                baseApi = new addGoods;
                break;
            default:
                callback({code: 4, data: {}, error: "api错误"});
                return;
        }

        return baseApi.Service(version, data, callback);
    }
}

module.exports = Router;