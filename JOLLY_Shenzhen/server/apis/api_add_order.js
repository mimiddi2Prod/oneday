var db = require("./../utils/dba");
let yly = require("./yly_print")

exports.run = async function (params) {
    let data = null
    return new Promise(async function (resolve, reject) {
        data = await getData(params)
        if (!data.err) {
            resolve({
                errcode: 0,
                errmsg: "request success",
                data: data
            })
        } else {
            reject({
                errcode: 2,
                errmsg: "request fail"
            })
        }
    })
};

async function getData(params) {
    try {
        let goods_total_number = 0
        let cart = params['cart'].map(value => {
            goods_total_number += value.number
            return {
                open_id: params.openid,
                goods_sku_id: value.paramId,
                goods_id: value.goodsId,
                name: value.goodsName,
                describe: value.goodsDesc,
                img: value.goodsImage || '',
                param: JSON.stringify(value.goodsParam),
                price: value.price,
                discount_price: value.price,  // 小程序暂无折扣价 , 以原价显示
                number: value.number,
                coupon: params.selcCardInfo,
                trade_id: params.tradeId,
                create_time: new Date(),
                take_meal_style: params.takeMealStyle,
                table_number: params.tableNumber,
                // pay_status: params.payStatus,
                pay_status: params.payStatus,
                dinners_number: params.dinnersNumber,
                pay_method: params.payMethod
            }
        })
        let result = await db.BulkInsert('goods_order', cart)
        if (result.id_list.length == cart.length) {
            result = await db.BulkInsert("goods_trade", [{
                "trade_id": params.tradeId,
                "open_id": params.openid,
                "trade_platform": 1, // 点单平台: 1小程序 / 2前台
                "order_id_list": JSON.stringify(result.id_list),
                "goods_total_number": goods_total_number,
                "goods_total_price": params.totalPrice,
                "goods_total_original_price": params.totalPrice,
                "actually_total_price": params.totalPrice,
                "pay_status": params.payStatus, // 付款状态 0 未付款 1已付款
                "pay_method": params.payMethod, // 'Wxpay' / ‘Balance’
                "create_time": new Date(),
                "take_meal_style": params.takeMealStyle, // 0 堂食 1 外带
                "table_number": params.tableNumber, // 桌号
                "dinners_number": params.dinnersNumber, // 用餐人数
            }])
            if (result.id_list.length) {
                // 余额支付还需计算金额扣除 并打印订单
                let balance = 0
                if (params.payMethod == "Balance") {
                    let r = await db.Query("update `user` set balance = balance - ? where openid = ?", [params.totalPrice, params.openid])
                    if (r.affectedRows) {
                        balance = (await db.Query("select * from `user` where openid = ?", [params.openid]))[0].balance
                        BalancePay(params, balance)
                        // todo 做更新余额失败和打单失败的处理
                    }
                }
                return {code: 0, text: '添加订单成功', data: {trade_id: params.tradeId, balance: balance}}
            } else {
                return {code: 1, text: '添加订单失败'}
            }
        } else {
            return {code: 1, text: '添加订单失败'}
        }
    } catch (e) {
        console.info(e)
    }

}

async function BalancePay(params, balance) {
    // 打单
    let trade = await db.Query("select * from goods_trade where trade_id = ?", [params.tradeId]),
        order = await db.Query("select * from goods_order where trade_id = ?", [params.tradeId])
    yly.run({
        "type": "order", "trade": Object.assign(trade[0], {
            "order": order.map(val => {
                return {
                    "name": val.name,
                    "param": val.param,
                    "number": val.number,
                    "price": val.price,
                    "discount_price": val.discount_price,
                    "subtotal": Math.round(val.discount_price * val.number * 100) / 100
                }
            })
        }, {"balance": balance})
    })
}
