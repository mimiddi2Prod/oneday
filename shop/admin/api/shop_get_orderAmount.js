var db = require("./../utils/dba");

function shopGetOrderAmount() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select sum(total_price) from `order` where state >= ?";
            row = await db.Query(sql, 1);
            let total_price = row[0]['sum(total_price)']

            data.number = Number(total_price).toFixed(2)

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetOrderAmount;