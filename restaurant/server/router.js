var tools = require("./tool")

function FBRouter() {
    var tool = new tools;
    this.Run = function (path, param, res) {
        var arr = path.split("/");
        tool.log.info('入口', arr[2], ',' + JSON.stringify(param))
        if (arr.length < 3) {
            tool.MakeResponse(200, {res: tool.error.ErrorPath, data: {}}, res);
            tool.log.warn("FBRouter::Run", "path is error");
        } else {
            var work = null;
            switch (arr[2]) {
                case "restaurant_get_openid": {
                    var RestaurantGetOpenid = require("./apis/restaurant_get_openid");
                    work = new RestaurantGetOpenid;
                    break;
                }
                case "restaurant_check_order_stock": {
                    var RestaurantCheckOrderStock = require("./apis/restaurant_check_order_stock");
                    work = new RestaurantCheckOrderStock;
                    break;
                }
                case "restaurant_restore_stock": {
                    var RestaurantRestoreStock = require("./apis/restaurant_restore_stock");
                    work = new RestaurantRestoreStock;
                    break;
                }
                case "restaurant_get_category_by_location_code": {
                    var RestaurantGetCategoryByLocationCode = require("./apis/restaurant_get_category_by_location_code");
                    work = new RestaurantGetCategoryByLocationCode;
                    break;
                }
                case "restaurant_add_order": {
                    var RestaurantAddOrder = require("./apis/restaurant_add_order");
                    work = new RestaurantAddOrder;
                    break;
                }
                case "restaurant_add_order_by_yinbao_balance": {
                    var RestaurantAddOrderByYinbaoBalance = require("./apis/restaurant_add_order_by_yinbao_balance");
                    work = new RestaurantAddOrderByYinbaoBalance;
                    break;
                }
                case "restaurant_get_order_by_openid": {
                    var RestaurantGetOrderByOpenid = require("./apis/restaurant_get_order_by_openid");
                    work = new RestaurantGetOrderByOpenid;
                    break;
                }
                case "restaurant_get_user_phone": {
                    var RestaurantGetUserPhone = require("./apis/restaurant_get_user_phone");
                    work = new RestaurantGetUserPhone;
                    break;
                }
                case "restaurant_get_order_detail_by_tradeid": {
                    var RestaurantGetOrderDetailByTradeid = require("./apis/restaurant_get_order_detail_by_tradeid");
                    work = new RestaurantGetOrderDetailByTradeid;
                    break;
                }
                case "restaurant_get_banner": {
                    var RestaurantGetBanner = require("./apis/restaurant_get_banner");
                    work = new RestaurantGetBanner;
                    break;
                }
                case "restaurant_payfee": {
                    var RestaurantPayfee = require("./apis/restaurant_payfee");
                    work = new RestaurantPayfee;
                    break;
                }
                case "yinbao_get_customer": {
                    var YinbaoGetCustomer = require("./apis/yinbao_get_customer");
                    work = new YinbaoGetCustomer;
                    break;
                }
                case "restaurant_yinbao_pay": {
                    var RestaurantYinbaoPay = require("./apis/restaurant_yinbao_pay");
                    work = new RestaurantYinbaoPay;
                    break;
                }
                case "restaurant_get_subscribe_message": {
                    var RestaurantGetSubscribeMessage = require("./apis/restaurant_get_subscribe_message");
                    work = new RestaurantGetSubscribeMessage;
                    break;
                }
                /**
                 *优惠券相关
                 * */
                case "restaurant_get_coupon_card": {
                    var CCSGetCouponCard = require("./apis/ccs_get_coupon_card");
                    work = new CCSGetCouponCard;
                    break;
                }
                case "restaurant_save_card": {
                    var RestaurantSaveCard = require("./apis/restaurant_save_card");
                    work = new RestaurantSaveCard;
                    break;
                }
                case "restaurant_get_had_card": {
                    var RestaurantGetHadCard = require("./apis/restaurant_get_had_card");
                    work = new RestaurantGetHadCard;
                    break;
                }
                default:
                    break;
            }
            if (work) {
                work.Run(arr[1], param, res).then(function (obj) {
                    res.end();
                    // tool.log.info("FBRouter::Run.out");
                });
            } else {
                tool.MakeResponse(200, {res: tool.error.ErrorBranch, data: {}}, res);
                res.end();
            }
        }
    }
}

module.exports = FBRouter;
