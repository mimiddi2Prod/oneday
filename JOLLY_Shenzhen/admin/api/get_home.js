var db = require("./../utils/dba");

/**
 * order_number：订单总数
 */
function getHome() {
    this.Service = async function (version, param, callback) {
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
                yData: [{title: "小程序新增用户", data: []}]
            }
        }, row = [], today = new Date().toLocaleDateString()
        try {
            row = await db.Query("select * from home_data")
            row.forEach(m => {
                data["total_order_number"] += m.order_number
                data["today_order_number"] = m.create_date == today ? m.order_number : data["today_order_number"]
                data["total_actually_income"] += m.actually_income
                data["total_refund"] += m.refund_price

                if (!param.type) {
                    if (new Date(m.create_date).getTime() >= (new Date(today).getTime() - (7 * 24 * 60 * 60 * 1000))) {
                        data["order_list"].xLabels.push(new Date(m.create_date).toLocaleDateString().slice(5, 10))
                        data["order_list"].yData.forEach(n => {
                            n.title == "订单收入" ? n.data.push(m.actually_income) : n.data.push(m.refund_price)
                        })

                        // 新增用户
                        data["increase_user_list"].xLabels.push(new Date(m.create_date).toLocaleDateString().slice(5, 10))
                        data["increase_user_list"].yData.forEach(n => {
                            n.title == "小程序新增用户" ? n.data.push(m.increase_user) : ''
                        })
                    }
                } else {
                    if (param.type == "order") {
                        if (new Date(m.create_date).getTime() >= new Date(param.start_time).getTime() && new Date(m.create_date).getTime() <= new Date(param.end_time).getTime()) {
                            data["order_list"].xLabels.push(new Date(m.create_date).toLocaleDateString().slice(5, 10))
                            data["order_list"].yData.forEach(n => {
                                n.title == "订单收入" ? n.data.push(m.actually_income) : n.data.push(m.refund_price)
                            })
                        }
                    } else if (param.type == "user") {
                        if (new Date(m.create_date).getTime() >= new Date(param.start_time).getTime() && new Date(m.create_date).getTime() <= new Date(param.end_time).getTime()) {
                            // 新增用户
                            data["increase_user_list"].xLabels.push(new Date(m.create_date).toLocaleDateString().slice(5, 10))
                            data["increase_user_list"].yData.forEach(n => {
                                n.title == "小程序新增用户" ? n.data.push(m.increase_user) : ''
                            })
                        }
                    }
                }
            })

            return callback(data);
        } catch (e) {
            console.info(e)
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getHome;