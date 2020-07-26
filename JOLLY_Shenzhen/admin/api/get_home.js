var db = require("./../utils/dba");

/**
 * order_number：订单总数
 */
function getHome() {
    this.Service = async function (version, param, callback) {
        if (param.start_time && param.end_time) {
            param.start_time = param.start_time + ' 00:00:00'
            param.end_time = param.end_time + ' 23:59:59'
        }
        var data = {
            "total_order_number": 0,
            "today_order_number": 0,
            "total_actually_income": 0,
            "total_refund": 0,
            "order_list": {
                xLabels: [],
                yData: [{title: "营业实收", data: []}, {title: "退款", data: []}]
            },
            "increase_user_list": {
                xLabels: [],
                yData: [{title: "小程序新增用户", data: []}, {title: "小程序新增会员", data: []}]
            }
        }, row = [], today = new Date().toLocaleDateString()
        try {
            row = await db.Query("select * from home_data order by create_date")
            row.forEach(m => {
                data["total_order_number"] += m.order_number + m.order_number_balance // (order_number和order_number_balance:不包含反结账)
                data["today_order_number"] = new Date(m.create_date).getTime() == new Date(today).getTime() ? (m.order_number + m.order_number_balance) : data["today_order_number"]
                data["total_actually_income"] += m.actually_income + m.member_recharge  // 营业实收（前台（不含余额支付）+后台（不含余额支付）+充值）
                data["total_refund"] += m.refund_price

                if (!param.type) {
                    if (new Date(m.create_date).getTime() >= (new Date(today).getTime() - (6 * 24 * 60 * 60 * 1000))) {
                        data["order_list"].xLabels.push(new Date(m.create_date).toLocaleDateString().slice(5, 10))
                        data["order_list"].yData.forEach(n => {
                            n.title == "营业实收" ? n.data.push(Math.round((m.actually_income + m.member_recharge) * 100) / 100) : n.data.push(m.refund_price)
                        })

                        // 新增用户
                        data["increase_user_list"].xLabels.push(new Date(m.create_date).toLocaleDateString().slice(5, 10))
                        data["increase_user_list"].yData.forEach(n => {
                            n.title == "小程序新增用户" ? n.data.push(m.increase_user) : n.data.push(m.increase_member)
                        })
                    }
                } else {
                    if (param.type == "order") {
                        if (new Date(m.create_date).getTime() >= new Date(param.start_time).getTime() && new Date(m.create_date).getTime() <= new Date(param.end_time).getTime()) {
                            data["order_list"].xLabels.push(new Date(m.create_date).toLocaleDateString().slice(5, 10))
                            data["order_list"].yData.forEach(n => {
                                n.title == "营业实收" ? n.data.push(Math.round((m.actually_income + m.member_recharge) * 100) / 100) : n.data.push(m.refund_price)
                            })
                        }
                    } else if (param.type == "user") {
                        if (new Date(m.create_date).getTime() >= new Date(param.start_time).getTime() && new Date(m.create_date).getTime() <= new Date(param.end_time).getTime()) {
                            // 新增用户
                            data["increase_user_list"].xLabels.push(new Date(m.create_date).toLocaleDateString().slice(5, 10))
                            data["increase_user_list"].yData.forEach(n => {
                                n.title == "小程序新增用户" ? n.data.push(m.increase_user) : n.data.push(m.increase_member)
                            })
                        }
                    }
                }
            })

            data["total_actually_income"] = Number(data["total_actually_income"]).toFixed(2)
            data["total_refund"] = Number(data["total_refund"]).toFixed(2)
            return callback(data);
        } catch (e) {
            console.info(e)
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getHome;