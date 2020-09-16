var tools = require("./../tool");

function RestaurantGetOrderByOpenid() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetOrderByOpenid::Run";
        // log.debug("RestaurantGetOrderByOpenid::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['openid'].length <= 0) {
            log.warn(name, '没有收到用户的openid')
        } else {
            try {
                sql = "select trade_id,yinbao_order_no,group_concat(price),group_concat(number),coupon,create_time from restaurant_goods_order where open_id = ? and pay_status = ? group by trade_id order by create_time desc";
                row = await query(sql, [param["openid"], 0]);
                // console.info(row)
                if (row.length > 0) {
                    data.order_list = row
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
                action: "get_order",
            }, res);
        // tool.log.debug("RestaurantGetOrderByOpenid::Run.out");
    }
}

module.exports = RestaurantGetOrderByOpenid;
