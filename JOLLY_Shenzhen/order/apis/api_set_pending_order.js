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
    console.info(params, 22222222222222)
    let trade_platform = 2,
        trade_id = 'qt' + formatTime(new Date()).replace(/\//g, "").replace(/:/g, "").replace(/ /g, ""),
        order = params.order.map(value => {
            return {
                "goods_sku_id": value.sku_id,
                "goods_id": value.id,
                "name": value.name.split("-")[0],
                "img": value.img,
                "param": value.param,
                "price": value.price,
                "discount_price": value.discount_price,
                "number": value.num,
                "trade_id": trade_id,
                "create_time": new Date()
            }
        })
    let result = await db.BulkInsert("goods_pending_order", order)
    if (result.errmsg == "success") {
        result = await db.BulkInsert("goods_pending_trade", [{
            "trade_id": trade_id,
            "trade_platform": trade_platform,
            "order_id_list": JSON.stringify(result.id_list),
            "goods_total_number": params.trade.total_num,
            "goods_total_price": params.trade.total_price,
            "actually_total_price": params.trade.total_diacount_price ? params.trade.total_diacount_price : params.trade.total_price,
            "pay_status": 0,
            // "pay_method": params.pay_type,
            "create_time": new Date(),
            // "pay_time": new Date(),
            // "take_meal_style": 0,  // 0堂食 1外带 目前默认
            "table_number": params.table_number,
            // "dinners_number": params.dinners_number,
            "employee_account": params.user.username,
            "state": 1
        }])
    }
    if (result.errmsg == "success") {
        return {code: 0, errmsg: "挂单成功", data: await get_pending_order.getData()}
    } else {
        return {code: 1, errmsg: "挂单失败"}
    }
}