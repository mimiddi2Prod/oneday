var tools = require("./../tool");

function RestaurantAddOrder() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantAddOrder::Run";
        log.debug("RestaurantAddOrder::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['tradeId'].length <= 0) {
            console.info('没有收到订单号')
        } else if (param['cart'].length <= 0) {
            console.info('没有收到订单数据')
        } else if (param['openid'].length <= 0) {
            console.info('没有收到用户的openid')
        } else {
            try {
                let cart = param['cart']
                let length = cart.length, flag = 0
                for (let i in cart) {
                    cart[i].goodsParam = JSON.stringify(cart[i].goodsParam)
                    sql = "insert into restaurant_goods_order (goods_id,open_id,param,goods_sku_id,`number`,trade_id,price,create_time) values (?,?,?,?,?,?,?,current_timestamp)";
                    row = await query(sql, [cart[i].goodsId, param['openid'], cart[i].goodsParam, cart[i].paramId, cart[i].number, param['tradeId'], cart[i].price]);
                    if (row.insertId) {
                        flag++
                    }
                }
                if (flag == length) {
                    data.code = 0
                    data.text = "订单插入成功"
                } else {
                    data.code = 1
                    data.text = "订单插入失败"
                }

            } catch (err) {
                if (err.code) {
                    response = tool.error.ErrorSQL;
                    log.warn(name, "code:", err.code, ", sql:", err.sql);
                } else {
                    log.warn(name, JSON.stringify(response));
                    response = tool.error.ErrorCatch;
                }
            }
        }


        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_order",
            }, res);
        tool.log.debug("RestaurantAddOrder::Run.out");
    }
}

module.exports = RestaurantAddOrder;