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
                yData: [{title: "订单收入", data: []}, {title: "退款", data: []}]
            },
            "increase_user_list": {
                xLabels: [],
                yData: [{title: "小程序新增用户", data: []}, {title: "小程序新增会员", data: []}]
            }
        }, row = [], today = new Date().toLocaleDateString()
        try {
            row = await db.Query("select * from home_data order by create_date")
            row.forEach(m => {
                // data["total_order_number"] += m.order_number - m.refund_order_number // 总单数减去有售后的
                data["total_order_number"] += m.order_number // 总单数减去有售后的
                // data["today_order_number"] = new Date(m.create_date).getTime() == new Date(today).getTime() ? (m.order_number - m.refund_order_number) : data["today_order_number"]
                data["today_order_number"] = new Date(m.create_date).getTime() == new Date(today).getTime() ? m.order_number : data["today_order_number"]
                // data["total_actually_income"] += m.actually_income - m.refund_price  // 营业额减退款的 为 实收
                data["total_actually_income"] += m.actually_income  // 营业额减退款的 为 实收
                data["total_refund"] += m.refund_price

                if (!param.type) {
                    if (new Date(m.create_date).getTime() >= (new Date(today).getTime() - (6 * 24 * 60 * 60 * 1000))) {
                        data["order_list"].xLabels.push(new Date(m.create_date).toLocaleDateString().slice(5, 10))
                        data["order_list"].yData.forEach(n => {
                            // n.title == "订单收入" ? n.data.push(Math.round(Number(m.actually_income - m.refund_price) * 100) / 100) : n.data.push(m.refund_price)
                            n.title == "订单收入" ? n.data.push(m.actually_income) : n.data.push(m.refund_price)
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
                                // n.title == "订单收入" ? n.data.push(Math.round(Number(m.actually_income - m.refund_price) * 100) / 100) : n.data.push(m.refund_price)
                                n.title == "订单收入" ? n.data.push(m.actually_income) : n.data.push(m.refund_price)
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