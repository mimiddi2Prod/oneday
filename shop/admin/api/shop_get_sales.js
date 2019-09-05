var db = require("./../utils/dba");

function shopGetSales() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            // 销售减售后
            // sql = "select sum(total_price) from `order` where state >= ?";
            // row = await db.Query(sql, 1);
            // let total_price = row[0]['sum(total_price)']
            //
            // sql = "select sum(total_refund) from aftersale where state = ? and order_id in (select id from `order` where after_sale_state >= ?)"
            // row = await db.Query(sql, [0, 4]);
            // let total_refund = row[0]['sum(total_refund)']
            // console.info(total_price)
            // console.info(total_refund)
            //
            // data.number = Number(Number(total_price) - Number(total_refund)).toFixed(2)

            // 本系统
            // 销售额
            // sql = "select * from `order` where state >= ? and create_time >= ? and create_time <= ? order by create_time"
            // row = await db.Query(sql, [1, param['start_time'], param['end_time']])
            // if (row.length > 0) {
            //     data.order = row
            // }

            // 退款
            sql = "select * from aftersale where state = ? and order_id in (select id from `order` where after_sale_state >= ?) and create_time >= ? and create_time <= ? order by create_time"
            row = await db.Query(sql, [0, 4, param['start_time'], param['end_time']])
            // console.info(row)
            if (row.length > 0) {
                data.refund = row
            }

            sql = "select * from yinbao_refund where `time` >= ? and `time` <= ?"
            row = await db.Query(sql, [param['start_time'], param['end_time']])
            console.info(row)
            if (row.length > 0) {
                data.yinbaoRefund = row
            }

            // 银豹销售额
            sql = "select * from `yinbao_order_sellprice` where start_time >= ? and end_time <= ? order by start_time"
            row = await db.Query(sql, [param['start_time'], param['end_time']])
            if (row.length > 0) {
                data.order = row
            }


            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetSales;

