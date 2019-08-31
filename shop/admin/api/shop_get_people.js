var db = require("./../utils/dba");

function shopGetPeople() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select * from `user` where register_time >= ? and register_time <= ? order by register_time"
            row = await db.Query(sql, [param['start_time'], param['end_time']])
            if (row.length > 0) {
                data.people = row
            }

            // sql = "select * from aftersale where state = ? and order_id in (select id from `order` where after_sale_state >= ?) and create_time >= ? and create_time <= ? order by create_time"
            // row = await db.Query(sql, [0, 4, param['start_time'], param['end_time']])
            // if (row.length > 0) {
            //     data.refund = row
            // }


            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetPeople;