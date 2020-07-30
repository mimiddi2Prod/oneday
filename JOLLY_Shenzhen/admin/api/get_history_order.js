var db = require("./../utils/dba");

function getHistoryOrder() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            console.info(param)
            let goods = await db.Query("select * from goods")
            let order = await db.Query("select * from goods_order where trade_id in (select trade_id from goods_trade where pay_status = 1 and after_sale_type != 1 and create_time >= ? and create_time <= ?)",
                [new Date(param.start_time), new Date(param.end_time)])
            let category = await db.Query("select * from category")
            // 先把商品添加上分类名
            let _goods = []
            category.forEach(m => {
                goods.forEach(n => {
                    if (n.category_id == m.id) {
                        n.category = m.name
                        _goods.push(n)
                    }
                })
            })
            let list = _goods.filter(val => {
                val.sales = 0
                val.sales_total_price = 0
                order.forEach(m => {
                    if (val.id == m.goods_id) {
                        let num = m.return_number ? m.number - m.return_number : m.number
                        val.sales += num
                        val.sales_total_price += num * m.discount_price
                    }
                })
                return val.sales > 0
            })
            data = list
            // data = list.map(val => {
            //     category.forEach(m => {
            //         if (val.category_id == m.id) {
            //             val.category = m.name
            //         }
            //     })
            //     return val
            // })
            // sql = "select id,`name`,location_code,sort,create_time from category order by sort";
            // row = await db.Query(sql);
            // data = row
            // if (data.length > 0) {
            //     for (let i in data) {
            //         sql = "select count(category_id) from goods where category_id = ?";
            //         row = await db.Query(sql, data[i].id);
            //         data[i].goods_number = row[0]['count(category_id)']
            //         // if (row[0]['sum(category_id)']) {
            //         //
            //         // } else {
            //         //     data[i].goods_number = 0
            //         // }
            //         // console.info(row)
            //     }
            // }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getHistoryOrder;