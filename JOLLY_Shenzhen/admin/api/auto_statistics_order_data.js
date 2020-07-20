var db = require("./../utils/dba");

/**
 * today：今天日期
 * mini_program_income：今日小程序收入
 * reception_income：今日前台收入
 * actually_income：今日前台+小程序收入
 * refund_price：今日退款金额
 * refund_order_number：今日退款订单数
 * order_number：今日订单数
 * increase_user：今日新增用户，指小程序的
 *
 * 订单总数：小程序+前台-反结账   （退货算在订单总数内）
 * 今日订单：定义和订单总数一样
 * 营业实收：不包含反结账 和 退货单品
 * 退款金额：反结账 + 退货单品
 *
 * 折线图：
 *  营业实收：同上
 *  退款：同上
 */
function autoStatisticsOrderData() {
    var data = {}, row = []
    try {
        let today = new Date().toLocaleDateString()
        // 每30分钟检查一次
        setInterval(async () => {
            let time = today + " 00:00:00"
            let mini_program_income = 0, reception_income = 0, actually_income = 0,
                refund_price = 0, refund_order_number = 0, order_number = 0,
                increase_user = 0
            row = await db.Query("select * from goods_trade where create_time > ?", [time]);
            row.forEach(m => {
                if (m.trade_platform == 1) {
                    // 小程序部分
                    mini_program_income += m.actually_total_price
                }
                if (m.trade_platform == 2) {
                    // 前台部分
                    reception_income += m.actually_total_price
                }
                // after_sale_type 0不是售后的 1反结账 2有退货商品
                if (m.after_sale_type) {
                    refund_price += m.after_sale_price
                    refund_order_number++
                }
                if (m.after_sale_type != 1) {
                    order_number++  // 包括退货 不包括反结账
                }
            })
            actually_income = mini_program_income + reception_income - refund_price

            // 新增用户
            row = await db.Query("select count(id) as user_total_number from `user` where register_time > ?", [time]);
            increase_user = row[0].user_total_number
            // 插入/更新
            // 有则更新无则添加
            // row = await db.BulkInsertOrDuplicateUpdate("home_data", [{
            //     "create_date": today,
            //     "mini_program_income": mini_program_income,
            //     "reception_income": reception_income,
            //     "actually_income": actually_income,
            //     "refund_price": refund_price,
            //     "refund_order_number": refund_order_number,
            //     "order_number": order_number,
            //     "increase_user": increase_user
            // }], {
            //     str: "mini_program_income=" + mini_program_income +
            //         ",reception_income=" + reception_income +
            //         ",actually_income=" + actually_income +
            //         ",refund_price=" + refund_price +
            //         ",refund_order_number=" + refund_order_number +
            //         ",order_number=" + order_number +
            //         ",increase_user=" + increase_user
            // })
            row = await db.Query("select create_date from home_data where create_date = ?", [today])
            if (row.length) {
                db.Query("update home_data set mini_program_income=?,reception_income=?,actually_income=?,refund_price=?,refund_order_number=?,order_number=?,increase_user=? where create_date = ?",
                    [mini_program_income, reception_income, actually_income, refund_price, refund_order_number, order_number, increase_user, today])
            } else {
                db.Query("insert into home_data(mini_program_income,reception_income,actually_income,refund_price,refund_order_number,order_number,increase_user,create_date)value(?,?,?,?,?,?,?,?)",
                    [mini_program_income, reception_income, actually_income, refund_price, refund_order_number, order_number, increase_user, today])
            }
        }, 10 * 1000)
    } catch (e) {
        console.info('boom!!!!!!!!!!!!!')
    }
}

module.exports = autoStatisticsOrderData;