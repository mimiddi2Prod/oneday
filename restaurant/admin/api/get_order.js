var db = require("./../utils/dba");

function getOrder() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            if (param["status"] == -1) {
                sql = "select count(id) from restaurant_goods_order";
                row = await db.Query(sql);
                data.number = row[0]['count(id)']

                sql = "select * from restaurant_goods_order ORDER BY create_time desc limit ?,?"
                row = await db.Query(sql, [param['last_id'] * 5, 5]);
            } else {
                sql = "select count(id) from restaurant_goods_order where style = ?";
                row = await db.Query(sql, param["status"]);
                data.number = row[0]['count(id)']

                sql = "select * from restaurant_goods_order where style = ? ORDER BY create_time desc limit ?,?"
                row = await db.Query(sql, [param["status"], param['last_id'] * 5, 5]);
            }
            data.list = row

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getOrder;