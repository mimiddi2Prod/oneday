var db = require("./../utils/dba");

function getOrder() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            // 旧版本
            // if (param["status"] == -1) {
            //     sql = "select count(id) from goods_order where pay_status = ?";
            //     row = await db.Query(sql, [0]);
            //     data.number = row[0]['count(id)']
            //
            //     sql = "select * from goods_order where pay_status = ? ORDER BY create_time desc limit ?,?"
            //     row = await db.Query(sql, [0, param['last_id'] * 5, 5]);
            // } else {
            //     sql = "select count(id) from goods_order where take_meal_style = ? and pay_status = ?";
            //     row = await db.Query(sql, [param["status"], 0]);
            //     data.number = row[0]['count(id)']
            //
            //     sql = "select * from goods_order where take_meal_style = ? and pay_status = ? ORDER BY create_time desc limit ?,?"
            //     row = await db.Query(sql, [param["status"], 0, param['last_id'] * 5, 5]);
            // }
            // data.list = row

            // 新版本
            // let trade_list = []
            // if (param["status"] == -1) {
            //     sql = "select count(id),trade_id,take_meal_style,table_number,dinners_number,create_time from goods_order where pay_status = ? group by trade_id ORDER BY create_time desc limit ?,?";
            //     row = await db.Query(sql, [0, param['last_id'] * 5, 5]);
            //     trade_list = row
            //     data.number = trade_list.length
            // } else {
            //     sql = "select count(id),trade_id,take_meal_style,table_number,dinners_number,create_time from goods_order where take_meal_style = ? and pay_status = ? group by trade_id ORDER BY create_time desc limit ?,?";
            //     row = await db.Query(sql, [param["status"], 0, param['last_id'] * 5, 5]);
            //     trade_list = row
            //     data.number = trade_list.length
            // }

            console.info(param)
            // 新新版本
            let trade_list = []
            if (param["trade_platform"] == 0) {
                sql = "select count(id) as number from goods_trade where pay_status = 1"
                row = await db.Query(sql);
                data.number = row[0].number

                sql = "select * from goods_trade where pay_status = ? ORDER BY create_time desc limit ?,?";
                row = await db.Query(sql, [1, param['last_id'] * 20, 20]);
                trade_list = row

            } else {
                sql = "select count(id) as number from goods_trade where trade_platform = ? and pay_status = 1"
                row = await db.Query(sql, [param["trade_platform"]]);
                data.number = row[0].number

                sql = "select * from goods_trade where trade_platform = ? and pay_status = ? ORDER BY create_time desc limit ?,?";
                row = await db.Query(sql, [param["trade_platform"], 1, param['last_id'] * 20, 20]);
                trade_list = row
                // data.number = trade_list.length
            }

            if (trade_list.length) {
                sql = "select `name`,`describe`,img,param,price,`number`,trade_id,discount_price,return_number from goods_order where trade_id in (?)"
                row = await db.Query(sql, [trade_list.map(value => {
                    return value.trade_id
                })]);

                data.trade = trade_list.map(value => {
                    delete value.open_id;
                    value.order = []
                    // value.total_price = 0
                    // value.total_num = 0
                    row.forEach(m => {
                        if (m.trade_id == value.trade_id) {
                            m.param = m.param ? JSON.parse(m.param) : ""
                            // value.total_num += m.number
                            // value.total_price += m.price * m.number
                            value.order.push(m)
                        }
                    })
                    return value
                })
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getOrder;