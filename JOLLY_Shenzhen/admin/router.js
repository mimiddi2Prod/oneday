function Router() {
    this.Service = function (data, url, callback) {
        var baseApi = {};
        var arr = url.split("/");
        var version = arr[1];
        var apiFunction = arr[2];

        switch (apiFunction) {
            case "get_public":
                var shopGetPublic = require("./api/shop_get_public.js");
                baseApi = new shopGetPublic;
                break;
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
            case "get_account":
                var getAccount = require("./api/get_account.js");
                baseApi = new getAccount;
                break;
            case "set_account":
                var setAccount = require("./api/set_account.js");
                baseApi = new setAccount;
                break;
            case "get_brunch_banner":
                var getBrunchBanner = require("./api/get_brunch_banner.js");
                baseApi = new getBrunchBanner;
                break;
            case "del_brunch_banner":
                var delBrunchBanner = require("./api/delete_brunch_banner.js");
                baseApi = new delBrunchBanner;
                break;
            case "update_brunch_banner_status":
                var updateBrunchBannerStatus = require("./api/update_brunch_banner_status.js");
                baseApi = new updateBrunchBannerStatus;
                break;
            case "get_brunch_category":
                var getBrunchCategory = require("./api/get_brunch_category.js");
                baseApi = new getBrunchCategory;
                break;
            case "get_goods_by_brunch_category":
                var getGoodsByBrunchCategory = require("./api/get_goods_by_brunch_category.js");
                baseApi = new getGoodsByBrunchCategory;
                break;
            case "add_brunch_banner":
                var addBrunchBanner = require("./api/add_brunch_banner.js");
                baseApi = new addBrunchBanner;
                break;
            case "update_brunch_banner_sort":
                var updateBrunchBannerSort = require("./api/update_brunch_banner_sort.js");
                baseApi = new updateBrunchBannerSort;
                break;
            case "get_home":
                var getHome = require("./api/get_home.js");
                baseApi = new getHome;
                break;
            case "get_goods_by_search":
                var getGoodsBySearch = require("./api/shop_get_goods_by_search.js");
                baseApi = new getGoodsBySearch;
                break;
            case "get_user":
                var getUser = require("./api/get_user.js");
                baseApi = new getUser;
                break;
            default:
                callback({code: 4, data: {}, error: "api错误"});
                return;
        }

        return baseApi.Service(version, data, callback);
    }
}

module.exports = Router;