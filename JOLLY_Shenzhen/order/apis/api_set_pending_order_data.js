var db = require("./../utils/dba");
var {formatTime} = require("./../utils/utils.js")
var get_pending_order = require("./api_get_pending_order")

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
 * state：状态：0 在售 1 下架 2 删除（不在后台展示）
 */
async function getData(params) {
    let result
    if (params.type == "cuteNum") {
        result = await db.Query("update goods_pending_order set `number` = `number` - 1 where `number` > 0 and id = ?", [params.id])
    } else if (params.type == "updateNum") {
        result = await db.Query("update goods_pending_order set `number` = ? where id = ?", [params.number, params.id])
    } else if (params.type == "updateDiscountPrice") {
        result = await db.Query("update goods_pending_order set `discount_price` = ? where id = ?", [params.discount_price, params.id])
    }
    if (result.affectedRows) {
        return {code: 0, errmsg: "success", data: await get_pending_order.getData()}
    } else {
        return {code: 1, errmsg: "err"}
    }
}