var tools = require("./../tool");

function SHOPAddSubmitOrder() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPAddSubmitOrder::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["user_id"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'user_id is not defined')
        } else if (param["user_id"]) {
            var row = [];
            var sql = ""
            try {
                sql = "insert into `order`(user_id,item_id,param_id_1,param_id_2,param_1,param_2,image,`number`,state,address_text,tel,receiver,single_price,postage,tradeId,have_cost_integral,create_time,update_time)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)"
                row = await tool.query(sql, [param["user_id"], param["item_id"], param["param_id_1"], param["param_id_2"], param["param_1"],param["param_2"],param["image"], param["number"], param["state"], param["address_text"], param["tel"], param["receiver"], param["single_price"], param["postage"],param["tradeId"],param["have_cost_integral"]])
                // console.info(row)
                if (row.insertId) {
                    var order_id = row.insertId
                    data.text = "添加订单成功"
                    sql = "select id from item_price where param_id_1 = ? and param_id_2 = ?"
                    row = await tool.query(sql, [param["param_id_1"], param["param_id_2"]])
                    if (row.length > 0) {
                        sql = "insert into paid(user_id,item_price_id,`number`,state,order_id,create_time)values(?,?,?,?,?,CURRENT_TIMESTAMP)"
                        row = await tool.query(sql, [param["user_id"], row[0].id, param["number"], param["state"], order_id])
                    }

                    sql = "delete from cart where user_id = ? and item_param_id_1 = ? and item_param_id_2 = ?"
                    row = await tool.query(sql, [param['user_id'], param["param_id_1"], param["param_id_2"]])
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPAddSubmitOrder::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPAddSubmitOrder::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_address",
            }, res);
        tool.log.debug("SHOPAddSubmitOrder::Run.out");
    }
}

module.exports = SHOPAddSubmitOrder;