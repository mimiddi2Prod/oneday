var tools = require("./../tool");

function SHOPUpdateOrderState() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPUpdateOrderState::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["order_id"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'order_id is not defined')
        } else if (param["order_id"]) {
            var row = [];
            try {
                if(param["trade_id"]){
                    var sql = "update `order` set state = ?,tradeId = ? where id = ?"
                    row = await tool.query(sql, [param["state"], param["trade_id"], param["order_id"]])
                }else{
                    var sql = "update `order` set state = ? where id = ?"
                    row = await tool.query(sql, [param["state"], param["order_id"]])
                }
                if (row.changedRows == 1) {
                    data.text = "更新订单成功"
                    if (param['state'] == -1) {
                        // 取消订单
                        sql = "delete from paid where order_id = ?"
                        row = await tool.query(sql, param["order_id"])
                    } else if (param['state'] == 1) {
                        // 已支付
                        sql = "update paid set state = ? where order_id = ?"
                        row = await tool.query(sql, [1, param["order_id"]])
                    }
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPUpdateOrderState::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPUpdateOrderState::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "update_orderState",
            }, res);
        tool.log.debug("SHOPUpdateOrderState::Run.out");
    }
}

module.exports = SHOPUpdateOrderState;