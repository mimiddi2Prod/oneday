var db = require("./../utils/dba");

/**
 * today：今天日期
 * mini_program_income：今日小程序收入
 * reception_income：今日前台收入
 * actually_income：今日前台+小程序收入-今日退款金额
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
 *
 * 收入只按充值的来算，充值后的余额消费和退款，都不再计入订单里面
 * member_recharge：当日会员充值总计
 * member_recharge_number：会员充值笔数
 * member_recharge_handsel：当日充值赠送的额度
 * mini_program_income_balance：当日小程序余额下单部分
 * reception_income_balance：当日前台余额下单部分
 * actually_income_balance：小程序和前台余额支付单的-今日退款金额(余额的)
 * refund_price_balance：当日余额退款
 * order_number_balance：当日余额支付单数量
 * refund_order_number_balance：当日余额退款的
 */
function autoStatisticsOrderData() {
    var data = {}, row = []
    try {
        // 每30分钟检查一次
        setInterval(async () => {
            let today = new Date().toLocaleDateString()
            let time = today + " 00:00:00"
            let mini_program_income = 0, reception_income = 0, actually_income = 0,
                refund_price = 0, refund_order_number = 0, order_number = 0,
                increase_user = 0, increase_member = 0
            /**
             * 余额部分
             */
            let member_recharge = 0, member_recharge_number = 0, member_recharge_handsel = 0,
                mini_program_income_balance = 0,
                reception_income_balance = 0, actually_income_balance = 0, refund_price_balance = 0,
                refund_order_number_balance = 0, order_number_balance = 0
            row = await db.Query("select * from goods_trade where pay_status = ? and create_time > ?", [1, time]);
            row.forEach(m => {
                if (m.pay_method != "Balance" && m.pay_method != "余额") {
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
                } else {
                    // 余额支付部分
                    if (m.trade_platform == 1) {
                        // 小程序部分
                        mini_program_income_balance += m.actually_total_price
                    }
                    if (m.trade_platform == 2) {
                        // 前台部分
                        reception_income_balance += m.actually_total_price
                    }
                    // after_sale_type 0不是售后的 1反结账 2有退货商品
                    if (m.after_sale_type) {
                        refund_price_balance += m.after_sale_price
                        refund_order_number_balance++
                    }
                    if (m.after_sale_type != 1) {
                        order_number_balance++  // 包括退货 不包括反结账
                    }
                }
            })
            // 非余额部分
            actually_income = mini_program_income + reception_income - refund_price
            // 余额部分
            actually_income_balance = mini_program_income_balance + reception_income_balance - refund_price_balance

            // 新增用户
            row = await db.Query("select count(id) as user_total_number from `user` where register_time > ?", [time]);
            increase_user = row[0].user_total_number
            // 注册成为会员的
            row = await db.Query("select count(id) as member_total_number from `user` where get_phone_time > ?", [time]);
            increase_member = row[0].member_total_number

            /**
             * 会员充值部分
             */
            row = await db.Query("select * from user_recharge_record where create_time > ?", [time])
            row.forEach(m => {
                member_recharge += m.increment_balance
                member_recharge_handsel += m.handsel_balance
                member_recharge_number++
            })

            row = await db.Query("select create_date from home_data where create_date = ?", [today])
            if (row.length) {
                // db.Query("update home_data set mini_program_income=?,reception_income=?,actually_income=?,refund_price=?,refund_order_number=?,order_number=?,increase_user=?,member_recharge=?,member_recharge_handsel=? where create_date = ?",
                //     [mini_program_income, reception_income, actually_income, refund_price, refund_order_number, order_number, increase_user, member_recharge, member_recharge_handsel, today])
                let sql = "update home_data set mini_program_income=?,reception_income=?,actually_income=?,refund_price=?,refund_order_number=?,order_number=?,increase_user=?"
                let list = [mini_program_income, reception_income, actually_income, refund_price, refund_order_number, order_number, increase_user]
                sql += ",member_recharge=?,member_recharge_handsel=?,member_recharge_number=?"
                list.push(member_recharge, member_recharge_handsel, member_recharge_number)

                // 余额部分
                sql += ",mini_program_income_balance=?,reception_income_balance=?,actually_income_balance=?,refund_price_balance=?,refund_order_number_balance=?,order_number_balance=?,increase_member=?"
                list.push(mini_program_income_balance, reception_income_balance, actually_income_balance, refund_price_balance, refund_order_number_balance, order_number_balance, increase_member)

                sql += " where create_date = ?"
                list.push(today)
                db.Query(sql, list)
            } else {
                db.Query("insert into home_data(mini_program_income,reception_income,actually_income,refund_price,refund_order_number,order_number,increase_user,create_date,member_recharge,member_recharge_number,member_recharge_handsel,mini_program_income_balance, reception_income_balance, actually_income_balance, refund_price_balance, refund_order_number_balance, order_number_balance,increase_member)value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [mini_program_income, reception_income, actually_income, refund_price, refund_order_number, order_number, increase_user, today, member_recharge, member_recharge_number, member_recharge_handsel, mini_program_income_balance, reception_income_balance, actually_income_balance, refund_price_balance, refund_order_number_balance, order_number_balance, increase_member])
            }
        }, 10 * 1000)
    } catch (e) {
        console.info('boom!!!!!!!!!!!!!')
    }
}

module.exports = autoStatisticsOrderData;