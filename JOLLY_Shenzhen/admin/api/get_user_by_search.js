var db = require("./../utils/dba");

function getUserBySearch() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            console.info(param)
            // 新新版本
            let user_list = []

            // sql = "select count(id) as number from `user` where register_time >= ? and register_time < ?"
            // row = await db.Query(sql, [param.start_time, param.end_time]);
            // data.number = row[0].number

            sql = "select * from `user` where phone_number like ?";
            row = await db.Query(sql, ["%" + param['searchString'] + "%"]);
            user_list = row


            if (user_list.length) {
                sql = "select * from user_recharge_record ORDER BY create_time desc"
                row = await db.Query(sql);

                data.user = user_list.map(value => {
                    value.history = []
                    row.forEach(m => {
                        if (m.phone_number == value.phone_number) {
                            value.history.push(m)
                        }
                    })
                    return value
                })
            }

            return callback(data);
        } catch (e) {
            console.info(e)
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getUserBySearch;