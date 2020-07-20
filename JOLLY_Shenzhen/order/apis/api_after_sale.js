var db = require("./../utils/dba");
var {formatTime} = require("./../utils/utils.js")
var restoreStock = require("./api_restore_stock")
var yly = require("./yly_print")

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

/**
 * type: 1反结账 2退货
 * 反结账不恢复库存， 退货会对库存进行恢复
 */
async function getData(params) {
    let data, result, call
    try {
        if (params.type == 1) {
            // result = await db.Update({
            //     "after_sale_type": params.type,
            //     "after_sale_remark": params.after_sale_remark
            // }, "goods_trade", {"id": params.trade_id})
            result = await db.Query("update goods_trade set after_sale_type = ?,after_sale_remark = ?,after_sale_price = actually_total_price where trade_id = ?", [params.type, params.after_sale_remark, params.trade_id])
            call = result.changedRows ?
                {code: 0, errmsg: "success", text: "反结账成功"} : {code: 1, errmsg: "fail", text: "反结账失败"}

            // 反结账打单
            let order = await db.Query("select * from goods_order where trade_id = ?", [params.trade_id]),
                trade = await db.Query("select * from goods_trade where trade_id = ?", [params.trade_id])
            yly.run({
                "type": "after_sale",
                "trade": Object.assign(trade[0], {
                    "title": "反结账"
                }, {
                    "order": order.map(value => {
                        value.return_number = value.number
                        return value
                    })
                })
            })
        } else if (params.type == 2) {
            data = params.order.map(value => {
                return {
                    "id": value.id,
                    "return_number": Number(value.return_number),
                }
            })
            // 先查询订单中退货商品的单价 计算出总退款金额
            let willRestoreStock = [], // 对退货商品进行库存恢复
                after_sale_price = 0,
                willPrint = [], // 退货打单
                order = await db.Query("select * from goods_order where id in (?)", [data.map(value => {
                    return value.id
                })])
            order.forEach(m => {
                data.forEach(n => {
                    if (m.id == n.id) {
                        after_sale_price += m.discount_price * n.return_number
                        willRestoreStock.push({
                            goodsId: m.goods_id,
                            number: Number(n.return_number)
                        })
                        willPrint.push({
                            "name": m.name,
                            "param": m.param,
                            "return_number": Number(n.return_number)
                        })
                    }
                })
            })
            // 退货价还要算上总订单折扣
            let trade = await db.Query("select * from goods_trade where trade_id = ?", [params.trade_id])
            after_sale_price = (trade[0].actually_total_price / trade[0].goods_total_price) * after_sale_price

            // 退货库存恢复
            restoreStock.run({"cart": willRestoreStock})
            result = await db.BulkInsertOrDuplicateUpdate("goods_order", data, {str: 'return_number = VALUES (return_number)'})
            result.errmsg == "success" ? (() => {
                result = db.Update({
                    "after_sale_type": params.type,
                    "after_sale_price": after_sale_price,
                    "after_sale_remark": params.return_text
                }, "goods_trade", {"trade_id": params.trade_id})
                call = {code: 0, errmsg: "success", text: "退货成功"}
            })() : (() => {
                call = {code: 1, errmsg: "fail", text: "退货失败"}
            })()

            // 退货打单
            yly.run({
                "type": "after_sale",
                "trade": Object.assign({
                    "title": "退货",
                    "trade_id": trade[0].trade_id,
                    "table_number": trade[0].table_number,
                    "after_sale_price": after_sale_price,
                    "after_sale_remark": params.return_text
                }, {
                    "order": willPrint
                })
            })
        }
        return call
    } catch (e) {
        console.info(e)
    }
}