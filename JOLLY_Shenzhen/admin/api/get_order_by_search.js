var db = require("./../utils/dba");

function getOrderBySearch() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select * from goods_order where"
            let arr = []
            if (param['id_or_name'].length > 0) {
                if (param['select'] == 0) {
                    sql += ' id = ?'
                } else if (param['select'] == 1) {
                    sql += ' name = ?'
                }
                arr.push(param['id_or_name'])
            }
            if (param['start_time'] && param['end_time']) {
                sql += (param['id_or_name'].length > 0 ? ' and' : '') + ' create_time >= ? and create_time <= ?'
                arr.push(param['start_time'])
                arr.push(param['end_time'])
            }
            if (param['trade_id'].length > 0) {
                sql += (param['id_or_name'].length > 0 || (param['start_time'] && param['end_time']) ? ' and' : '') + ' trade_id = ?'
                arr.push(param['trade_id'])
            }
            row = await db.Query(sql, arr);
            // console.info(row)

            data.list = row


            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getOrderBySearch;