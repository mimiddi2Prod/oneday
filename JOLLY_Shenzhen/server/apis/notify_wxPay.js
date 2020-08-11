var db = require("./../utils/dba");
// const calculate_point = require("./interface_calculate_point_and_balance")
// const calculate_stock = require("./interface_calculate_stock")
// const {verifySign} = require("../utils/wxpay")
let yly = require("./yly_print")

exports.run = async function (params) {
    if (params.xml.return_code[0] === 'SUCCESS' && params.xml.result_code[0] === 'SUCCESS') {
        // let verifySign = verifySign(params.xml)
        // console.info(verifySign)
        // if (verifySign.code == 0) {
        let result = await db.Query("select id from goods_trade where pay_status = ? and trade_id = ?", [0, params.xml.out_trade_no[0]])
        if (result.length) {
            result = await db.Query("update goods_trade set pay_status = ?,pay_time = ? where trade_id = ?", [1, new Date(), params.xml.out_trade_no[0]])
            if (result.changedRows == 1) {
                // 打单
                let trade = await db.Query("select * from goods_trade where trade_id = ?", [params.xml.out_trade_no[0]]),
                    order = await db.Query("select * from goods_order where trade_id = ?", [params.xml.out_trade_no[0]])
                yly.run({
                    "type": "order", "trade": Object.assign(trade[0], {
                        "order": order.map(val => {
                            return {
                                "name": val.name,
                                "param": val.param,
                                "number": val.number,
                                "price": val.price,
                                "discount_price": val.discount_price,
                                "subtotal": Math.round(val.discount_price * val.number * 100) / 100,
                                "goods_id": val.goods_id
                            }
                        })
                    })
                })
                // return verifySign.xml
            }
        }
        // } else {
        //     return verifySign.xml
        // }
    }
}