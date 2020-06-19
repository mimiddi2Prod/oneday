var db = require("./../utils/dba");

function getOrder() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            if (param["status"] == -1) {
                sql = "select count(id) from goods_order where pay_status = ?";
                row = await db.Query(sql, [0]);
                data.number = row[0]['count(id)']

                sql = "select * from goods_order where pay_status = ? ORDER BY create_time desc limit ?,?"
                row = await db.Query(sql, [0, param['last_id'] * 5, 5]);
            } else {
                sql = "select count(id) from goods_order where take_meal_style = ? and pay_status = ?";
                row = await db.Query(sql, [param["status"], 0]);
                data.number = row[0]['count(id)']

                sql = "select * from goods_order where take_meal_style = ? and pay_status = ? ORDER BY create_time desc limit ?,?"
                row = await db.Query(sql, [param["status"], 0, param['last_id'] * 5, 5]);
            }
            data.list = row

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getOrder;