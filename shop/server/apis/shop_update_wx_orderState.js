var tools = require("./../tool");

async function SHOPUpdateWxOrderState(param) {
    var tool = new tools;

    var data = {};
    var sql = '', row = [];

    if (!param["order_id"]) {
        tool.log.warn(name, 'order_id is not defined')
    } else if (param["order_id"]) {
        if (param["trade_id"]) {
            sql = "update `order` set state = ?,tradeId = ? where id = ?"
            row = await tool.query(sql, [param["state"], param["trade_id"], param["order_id"]])
        }
        if (row.changedRows == 1) {
            data.text = "更新订单成功"
            data.updateOrderStatus = 0
        }
        return data
    }
}

module.exports = SHOPUpdateWxOrderState;