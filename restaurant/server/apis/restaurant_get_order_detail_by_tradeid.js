var tools = require("./../tool");

function RestaurantGetOrderDetailByTradeid() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetOrderDetailByTradeid::Run";
        // log.debug("RestaurantGetOrderDetailByTradeid::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['openid'].length <= 0) {
            log.warn(name, '没有收到用户的openid')
        } else if (param['tradeid'].length <= 0) {
            log.warn(name, '没有收到tradeid')
        } else {
            try {
                sql = "select `name`,yinbao_order_no,`describe`,img,param,price,`number`,create_time,style,restaurant_card_id,table_number from restaurant_goods_order where open_id = ? and trade_id = ? and pay_status = ?";
                row = await query(sql, [param["openid"], param["tradeid"], 0]);
                if (row.length > 0) {
                    data.order_list = row

                    if (row[0].restaurant_card_id) {
                        sql = "select * from restaurant_card where id = ?";
                        row = await query(sql, row[0].restaurant_card_id);

                        sql = "select * from restaurant_card_info where card_id = ?";
                        row = await query(sql, row[0].card_id);

                        data.card = row[0]
                    }
                }

            } catch (err) {
                log.error(name, err)
                // if (err.code) {
                //     response = tool.error.ErrorSQL;
                //     log.warn(name, "code:", err.code, ", sql:", err.sql);
                // } else {
                //     log.warn(name, JSON.stringify(response));
                //     response = tool.error.ErrorCatch;
                // }
            }
        }


        // if (response.code != tool.error.OKCode) {
        //     log.warn(name, JSON.stringify(response));
        // }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_order_detail",
            }, res);
        // tool.log.debug("RestaurantGetOrderDetailByTradeid::Run.out");
    }
}

module.exports = RestaurantGetOrderDetailByTradeid;
