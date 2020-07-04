var db = require("./../utils/dba");
// const calculate_point = require("./interface_calculate_point_and_balance")
// const calculate_stock = require("./interface_calculate_stock")
const {verifySign} = require("../utils/wxpay")

exports.run = async function (params) {
    if (params.xml.return_code[0] === 'SUCCESS' && params.xml.result_code[0] === 'SUCCESS') {
        let verifySign = verifySign(params.xml)
        if (verifySign.code == 0) {
            // let result = await db.Select_ver_2("id", "trade", {
            //     pay_method: 1,
            //     trade_state: 0,
            //     trade_no: params.xml.out_trade_no[0]
            // })
            // let result = await db.Query("select id from goods_order where pay_status = ?,trade_id = ?", [1, params.xml.out_trade_no[0]])
            let result = await db.Query("select id from goods_trade where pay_status = ?,trade_id = ?", [0, params.xml.out_trade_no[0]])
            if (result.length) {
                // result = db.Update_ver_2({
                //     trade_state: 1,
                //     pay_time: new Date()
                // }, "trade", {trade_no: params.xml.out_trade_no[0]})
                result = await db.Query("update goods_trade set pay_status = ?,pay_time = ? where trade_id = ?", [1, new Date(), params.xml.out_trade_no[0]])
                if (result.changedRows == 1) {
                    // params.xml.total_fee 单位为 分
                    // calculate_point.run({
                    //     openid: params.xml.openid[0],
                    //     pointIncrement: Number(params.xml.total_fee) * 100
                    // })
                    // 计算库存
                    // calculate_stock.run({
                    //     openid: params.xml.openid[0],
                    //     trade_no: params.xml.out_trade_no[0]
                    // })
                    return verifySign.xml
                }
            }
        } else {
            return verifySign.xml
        }
    }
}