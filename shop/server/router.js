var tools = require("./tool")

function FBRouter(){
    var tool = new tools;
    this.Run = function(path, param, res){
        tool.log.info("FBRouter::Run.in");
        var arr = path.split("/");
        console.info(arr);
        if(arr.length < 3){
            tool.MakeResponse(200, {res: tool.error.ErrorPath, data: {}}, res);
            tool.log.warn("FBRouter::Run", "path is error");
        }else {
            var work = null;
            switch(arr[2]){
                case "get_openid":{
                    var SHOPGetOpenId = require("./apis/shop_get_openid");
                    work = new SHOPGetOpenId;
                    break;
                }
                case "register":{
                    var SHOPRegister = require("./apis/shop_register");
                    work = new SHOPRegister;
                    break;
                }
                case "login":{
                    var SHOPLogin = require("./apis/shop_login");
                    work = new SHOPLogin;
                    break;
                }
                case "get_ad":{
                    var SHOPGetAd = require("./apis/shop_get_ad");
                    work = new SHOPGetAd;
                    break;
                }
                case "get_subCategory":{
                    var SHOPGetSubCategory = require("./apis/shop_get_subCategory");
                    work = new SHOPGetSubCategory;
                    break;
                }
                case "get_brand":{
                    var SHOPGetBrand = require("./apis/shop_get_brand");
                    work = new SHOPGetBrand;
                    break;
                }
                case "get_waterfall":{
                    var SHOPGetWaterfall = require("./apis/shop_get_waterfall");
                    work = new SHOPGetWaterfall;
                    break;
                }
                case "get_category":{
                    var SHOPGetCategory = require("./apis/shop_get_category");
                    work = new SHOPGetCategory;
                    break;
                }
                case "get_goodsList":{
                    var SHOPGetGoodsList = require("./apis/shop_get_goodsList");
                    work = new SHOPGetGoodsList;
                    break;
                }
                case "get_goodsInfo":{
                    var SHOPGetGoodsInfo = require("./apis/shop_get_goodsInfo");
                    work = new SHOPGetGoodsInfo;
                    break;
                }
                case "get_price":{
                    var SHOPGetPrice = require("./apis/shop_get_price");
                    work = new SHOPGetPrice;
                    break;
                }
                case "add_cart":{
                    var SHOPAddCart = require("./apis/shop_add_cart");
                    work = new SHOPAddCart;
                    break;
                }
                case "get_cart":{
                    var SHOPGetCart = require("./apis/shop_get_cart");
                    work = new SHOPGetCart;
                    break;
                }
                case "del_cart":{
                    var SHOPDelCart = require("./apis/shop_del_cart");
                    work = new SHOPDelCart;
                    break;
                }
                case "update_cartGoodsNum":{
                    var SHOPUpdateCartGoodsNum = require("./apis/shop_update_cartGoodsNum");
                    work = new SHOPUpdateCartGoodsNum;
                    break;
                }
                case "get_address":{
                    var SHOPGetAddress = require("./apis/shop_get_address");
                    work = new SHOPGetAddress;
                    break;
                }
                case "update_default_address":{
                    var SHOPUpdateDefaultAddress = require("./apis/shop_update_defaultAddress");
                    work = new SHOPUpdateDefaultAddress;
                    break;
                }
                case "add_address":{
                    var SHOPAddAddress = require("./apis/shop_add_address");
                    work = new SHOPAddAddress;
                    break;
                }
                case "del_address":{
                    var SHOPDelAddress = require("./apis/shop_del_address");
                    work = new SHOPDelAddress;
                    break;
                }
                case "update_address":{
                    var SHOPUpdateAddress = require("./apis/shop_update_address");
                    work = new SHOPUpdateAddress;
                    break;
                }
                case "add_submitOrder":{
                    var SHOPAddSubmitOrder = require("./apis/shop_add_submitOrder");
                    work = new SHOPAddSubmitOrder;
                    break;
                }
                case "payfee":{
                    var SHOPPayfee = require("./apis/shop_payfee");
                    work = new SHOPPayfee;
                    break;
                }
                case "get_order":{
                    var SHOPGetOrder = require("./apis/shop_get_order");
                    work = new SHOPGetOrder;
                    break;
                }
                case "update_orderState":{
                    var SHOPUpdateOrderState = require("./apis/shop_update_orderState");
                    work = new SHOPUpdateOrderState;
                    break;
                }
                case "add_review":{
                    var SHOPAddReview = require("./apis/shop_add_review");
                    work = new SHOPAddReview;
                    break;
                }
                case "get_review":{
                    var SHOPGetReview = require("./apis/shop_get_review");
                    work = new SHOPGetReview;
                    break;
                }
                case "get_uploadToken":{
                    var SHOPGetUploadToken = require("./apis/shop_get_UploadToken");
                    work = new SHOPGetUploadToken;
                    break;
                }
                case "get_afterSale":{
                    var SHOPGetAfterSale = require("./apis/shop_get_afterSale");
                    work = new SHOPGetAfterSale;
                    break;
                }
                case "add_afterSale":{
                    var SHOPAddAfterSale = require("./apis/shop_add_afterSale");
                    work = new SHOPAddAfterSale;
                    break;
                }
                case "update_afterSaleState":{
                    var SHOPUpdateAfterSaleState = require("./apis/shop_update_afterSaleState");
                    work = new SHOPUpdateAfterSaleState;
                    break;
                }
                case "get_afterSaleNotice":{
                    var SHOPGetAfterSaleNotice = require("./apis/shop_get_afterSaleNotice");
                    work = new SHOPGetAfterSaleNotice;
                    break;
                }
                case "get_logistics":{
                    var SHOPGetLogistics = require("./apis/shop_get_logistics");
                    work = new SHOPGetLogistics;
                    break;
                }
                case "get_integral":{
                    var SHOPGetIntegral = require("./apis/shop_get_integral");
                    work = new SHOPGetIntegral;
                    break;
                }
                case "update_integral":{
                    var SHOPUpdateIntegral = require("./apis/shop_update_integral");
                    work = new SHOPUpdateIntegral;
                    break;
                }
                case "get_wxacodeunlimit":{
                    var SHOPGetWxacodeunlimit = require("./apis/shop_get_wxacodeunlimit");
                    work = new SHOPGetWxacodeunlimit;
                    break;
                }
                case "get_user_phone":{
                    var SHOPGetUserPhone = require("./apis/shop_get_user_phone");
                    work = new SHOPGetUserPhone;
                    break;
                }
                case "update_customer":{
                    var SHOPUpdateCustomer = require("./apis/shop_update_customer");
                    work = new SHOPUpdateCustomer;
                    break;
                }
                default:
                    break;
            }
            if(work){
                work.Run(arr[1], param, res).then(function(obj){
                    res.end();
                    tool.log.info("FBRouter::Run.out");
                });
            }else{
                tool.MakeResponse(200, {res: tool.error.ErrorBranch, data: {}}, res);
                res.end();
            }
        }
    }
}

module.exports = FBRouter;