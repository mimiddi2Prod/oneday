var db = require("./../utils/dba");

function getOrderBySearch() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            // sql = "select * from goods_order where"
            // let arr = []
            // if (param['id_or_name'].length > 0) {
            //     if (param['select'] == 0) {
            //         sql += ' id = ?'
            //     } else if (param['select'] == 1) {
            //         sql += ' name = ?'
            //     }
            //     arr.push(param['id_or_name'])
            // }
            // if (param['start_time'] && param['end_time']) {
            //     sql += (param['id_or_name'].length > 0 ? ' and' : '') + ' create_time >= ? and create_time <= ?'
            //     arr.push(param['start_time'])
            //     arr.push(param['end_time'])
            // }
            // if (param['trade_id'].length > 0) {
            //     sql += (param['id_or_name'].length > 0 || (param['start_time'] && param['end_time']) ? ' and' : '') + ' trade_id = ?'
            //     arr.push(param['trade_id'])
            // }
            // row = await db.Query(sql, arr);
            // // console.info(row)
            //
            // data.list = row

            sql = "select * from goods_order where pay_status = ? and"
            let arr = [0]
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
            let order = row
            if (order.length) {
                sql = "select count(id),trade_id,take_meal_style,table_number,dinners_number,create_time from goods_order where trade_id in (?) group by trade_id ORDER BY create_time desc";
                let trade_list = await db.Query(sql, [order.map(value => {
                    return value.trade_id
                })]);
                data.number = trade_list.length

                data.trade = trade_list.map(value => {
                    value.order = []
                    value.total_price = 0
                    value.total_num = 0
                    order.forEach(m => {
                        if (m.trade_id == value.trade_id) {
                            value.total_num += m.number
                            value.total_price += m.price * m.number
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

module.exports = getOrderBySearch;