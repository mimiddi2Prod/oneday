var db = require("./../utils/dba");
var {formatTime} = require("./../utils/utils.js")
var get_pending_order = require("./api_get_pending_order")
var checkStock = require("./api_check_order_stock")
var restoreStock = require("./api_restore_stock")

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
    let result
    if (params.type == "invalidRemark") {
        // trade_id 此处为订单号
        // 订单作废先找出这一订单的商品，并进行库存恢复
        result = await db.Query("select * from goods_pending_order where trade_id = ?", [params.trade_id])
        if (result.length) {
            let cart = result.map(val => {
                return {
                    goodsId: val.goods_id,
                    number: val.number
                }
            })
            restoreStock.run({"cart": cart})
        }
        result = await db.Query("update goods_pending_trade set invalid_remark = ?,state = ? where trade_id = ?", [params.invalid_remark, 3, params.trade_id])
    } else if (params.type == "cuteNum" || params.type == "addNum") {
        // 数量增加先检查库存 数量减少恢复库存
        if (params.type == "addNum") {
            result = await checkStock.run({"cart": [{"goodsId": params.goodsId, "number": 1}]})
            if (result.data.canPay == 1) {
                return {code: 2, errmsg: "库存不足"}
            }
        }
        if (params.type == "cuteNum") {
            restoreStock.run({"cart": [{"goodsId": params.goodsId, "number": 1}]})
        }
        result = await db.Query("update goods_pending_order set `number` = `number` + ? where `number` > 0 and id = ?", [params.IncrementNum, params.id])
    } else if (params.type == "updateDiscountPrice") {
        result = await db.Query("update goods_pending_order set `discount_price` = ? where id = ?", [params.discount_price, params.id])
    }
    if (result.affectedRows) {
        return {code: 0, errmsg: "success", data: await get_pending_order.getData()}
    } else {
        return {code: 1, errmsg: "更新失败"}
    }
}