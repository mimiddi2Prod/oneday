var db = require("./../utils/dba");

function shopUpdateCoupon() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "update store set `name` = ? ,location = ?,phone = ?,start_time = ?,end_time = ? where id = ?";
            row = await db.Query(sql, [param['name'], param['location'], param['phone'], param['start_time'], param['end_time'], param['id']]);
            if (row.changedRows == 1) {
                data.code = 1
                data.text = '编辑成功'
            } else {
                data.code = 0
                data.text = '编辑失败'
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopUpdateCoupon;