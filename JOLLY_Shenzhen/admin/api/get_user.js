var db = require("./../utils/dba");

function getUser() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            console.info(param)
            // 新新版本
            let user_list = []
            if (param["trade_platform"] == 0) {
                sql = "select count(id) as number from `user` where register_time >= ? and register_time < ?"
                row = await db.Query(sql, [param.start_time, param.end_time]);
                data.number = row[0].number

                sql = "select * from `user` where register_time >= ? and register_time < ? ORDER BY register_time desc limit ?,?";
                row = await db.Query(sql, [param.start_time, param.end_time, param['last_id'] * 20, 20]);
                user_list = row

            } else {
                if (param["trade_platform"] == 1) {
                    // 普通用户
                    sql = "select count(id) as number from `user` where register_time >= ? and register_time < ? and phone_number is null"
                    row = await db.Query(sql, [param.start_time, param.end_time]);
                    data.number = row[0].number

                    sql = "select * from `user` where register_time >= ? and register_time < ? and phone_number is null ORDER BY register_time desc limit ?,?";
                    row = await db.Query(sql, [param.start_time, param.end_time, param['last_id'] * 20, 20]);
                    user_list = row
                } else {
                    // 注册会员的用户
                    sql = "select count(id) as number from `user` where register_time >= ? and register_time < ? and phone_number is not null"
                    row = await db.Query(sql, [param.start_time, param.end_time]);
                    data.number = row[0].number

                    sql = "select * from `user` where register_time >= ? and register_time < ? and phone_number is not null ORDER BY register_time desc limit ?,?";
                    row = await db.Query(sql, [param.start_time, param.end_time, param['last_id'] * 20, 20]);
                    user_list = row
                }
            }

            if (user_list.length) {
                if (param["trade_platform"] == 1) {
                    data.user = user_list.map(value => {
                        value.history = []
                        return value
                    })
                } else {
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
            }

            return callback(data);
        } catch (e) {
            console.info(e)
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getUser;