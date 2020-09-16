var tools = require("./../tool");

async function RestaurantAddOrder(param) {
    var tool = new tools;
    var log = tool.log;
    // var query = tool.query;
    var BulkInsert = tool.BulkInsert
    var name = "RestaurantAddOrder::Run";

    var data = {};
    // var sql = '', row = [];

    if (param['tradeId'].length <= 0) {
        log.warn(name, '没有收到订单号')
    } else if (param['cart'].length <= 0) {
        log.warn(name, '没有收到订单数据')
    } else if (param['openid'].length <= 0) {
        log.warn(name, '没有收到用户的openid')
    } else {
        try {
            let cart = param['cart']
            let current_time = new Date()
            let DATA = cart.map(val => {
                return {
                    "name": val["goodsName"],
                    "describe": val["goodsDesc"],
                    "img": val["goodsImage"] ? val["goodsImage"] : '',
                    "goods_id": val["goodsId"],
                    "open_id": param["openid"],
                    "param": JSON.stringify(val["goodsParam"]),
                    "goods_sku_id": val["paramId"],
                    "number": val["number"],
                    "trade_id": param['tradeId'],
                    "price": val["price"],
                    "style": param['style'],
                    "pay_status": param['payStatus'],
                    "dinners_number": param['dinnersNumber'],
                    "pay_method": param['payMethod'],
                    "table_number": param['restaurantTableName'],
                    "customer_uid": param['customerUid'],
                    "restaurant_card_id": param["coupon"] ? param["coupon"].id : null,
                    "coupon": param["coupon"] ? param["coupon"].reduce_cost : null,
                    "create_time": current_time
                }
            })
            let result = await BulkInsert("restaurant_goods_order", DATA)
            if (result["id_list"].length == cart.length) {
                data.code = 0
                data.text = "添加订单成功"
            } else {
                data.code = 1
                data.text = "添加订单失败"
            }

            return data
        } catch (e) {
            log.error(name, e)
        }

    }
}

module.exports = RestaurantAddOrder;
