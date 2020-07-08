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
            result = await db.Update({
                "after_sale_type": params.type,
                "after_sale_remark": params.after_sale_remark
            }, "goods_trade", {"id": params.trade_id})
            call = result.changedRows ?
                {code: 0, errmsg: "success", text: "反结账成功"} : {code: 1, errmsg: "fail", text: "反结账失败"}
        } else if (params.type == 2) {
            data = params.order.map(value => {
                return {
                    "id": value.id,
                    "return_number": Number(value.return_number),
                }
            })
            result = await db.BulkInsertOrDuplicateUpdate("goods_order", data, {str: 'return_number = VALUES (return_number)'})
            result.errmsg == "success" ? (() => {
                result = db.Update({"after_sale_type": params.type}, "goods_trade", {"id": params.trade_id})
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