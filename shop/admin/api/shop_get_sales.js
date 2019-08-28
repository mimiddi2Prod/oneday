var db = require("./../utils/dba");

function shopGetSales() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select sum(total_price) from `order` where state >= ?";
            row = await db.Query(sql, 1);
            let totalPrice = row[0]['sum(total_price)']

            sql = "select sum(total_refund) from aftersale where state = ?"
            row = await db.Query(sql, 1);
            data.number = row[0]['count(id)']

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetSales;