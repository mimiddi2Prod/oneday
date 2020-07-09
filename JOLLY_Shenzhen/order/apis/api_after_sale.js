var db = require("./../utils/dba");
var {formatTime} = require("./../utils/utils.js")

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
 */
async function getData(params) {
    let data, result, call
    try {
        if (params.type == 1) {
            // result = await db.Update({
            //     "after_sale_type": params.type,
            //     "after_sale_remark": params.after_sale_remark
            // }, "goods_trade", {"id": params.trade_id})
            result = await db.Query("update goods_trade set after_sale_type = ?,after_sale_remark = ?,after_sale_price = goods_total_price where id = ?", [params.type, params.after_sale_remark, params.trade_id])
            call = result.changedRows ?
                {code: 0, errmsg: "success", text: "反结账成功"} : {code: 1, errmsg: "fail", text: "反结账失败"}
        } else if (params.type == 2) {
            data = params.order.map(value => {
                return {
                    "id": value.id,
                    "return_number": Number(value.return_number),
                }
            })
            // 先查询订单中退货商品的单价 计算出总退款金额
            let after_sale_price = 0,
                order = await db.Query("select * from goods_order where id in (?)", [data.map(value => {
                    return value.id
                })])
            order.forEach(m => {
                data.forEach(n => {
                    if (m.id == n.id) {
                        after_sale_price += m.discount_price * n.return_number
                    }
                })
            })

            result = await db.BulkInsertOrDuplicateUpdate("goods_order", data, {str: 'return_number = VALUES (return_number)'})
            result.errmsg == "success" ? (() => {
                result = db.Update({
                    "after_sale_type": params.type,
                    "after_sale_price": after_sale_price
                }, "goods_trade", {"id": params.trade_id})
                call = {code: 0, errmsg: "success", text: "退货成功"}
            })() : (() => {
                call = {code: 1, errmsg: "fail", text: "退货失败"}
            })()
        }
        return call
    } catch (e) {
        console.info(e)
    }
}