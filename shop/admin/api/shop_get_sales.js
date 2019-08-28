var db = require("./../utils/dba");

function shopGetSales() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select sum(total_price) from `order` where state >= ?";
            row = await db.Query(sql, 1);
            let total_price = row[0]['sum(total_price)']

            sql = "select sum(total_refund) from aftersale where state = ? and order_id in (select id from `order` where after_sale_state >= ?)"
            row = await db.Query(sql, [0, 4]);
            let total_refund = row[0]['sum(total_refund)']
            console.info(total_price)
            console.info(total_refund)

            data.number = Number(Number(total_price) - Number(total_refund)).toFixed(2)

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetSales;