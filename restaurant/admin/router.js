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
            case "update_goodsStatus":
                var updateGoodsStatus = require("./api/update_goodsStatus.js");
                baseApi = new updateGoodsStatus;
                break;
            case "add_category":
                var addCategory = require("./api/add_category.js");
                baseApi = new addCategory;
                break;
            case "update_category":
                var updateCategory = require("./api/update_category.js");
                baseApi = new updateCategory;
                break;
            case "del_category":
                var delCategory = require("./api/del_category.js");
                baseApi = new delCategory;
                break;
            case "get_order":
                var getOrder = require("./api/get_order.js");
                baseApi = new getOrder;
                break;
            case "get_order_by_search":
                var getOrderBySearch = require("./api/get_order_by_search.js");
                baseApi = new getOrderBySearch;
                break;
            case "update_goods":
                var updateGoods = require("./api/update_goods.js");
                baseApi = new updateGoods;
                break;
            case "yinbao_get_goodsInfo":
                var yinbaoGetGoodsInfo = require("./api/yinbao_get_goodsInfo.js");
                baseApi = new yinbaoGetGoodsInfo;
                break;
            default:
                callback({code: 4, data: {}, error: "api错误"});
                return;
        }

        return baseApi.Service(version, data, callback);
    }
}

module.exports = Router;