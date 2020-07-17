var db = require("./../utils/dba");
var {formatTime} = require("./../utils/utils.js")
var get_pending_order = require("./api_get_pending_order")
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
 * state：状态：0 在售 1 下架 2 删除（不在后台展示）
 */
async function getData(params) {
    let trade_platform = 2,
        trade_id = null
    if (params.trade_id) {
        // 挂单追加
        trade_id = params.trade_id
    } else {
        // 新增挂单
        trade_id = formatTime(new Date()).replace(/\//g, "").replace(/:/g, "").replace(/ /g, "")
    }
    let trade, order = params.order.map(value => {
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
            "create_time": new Date(),
            "remark": value.remark
        }
    })
    let result = await db.BulkInsert("goods_pending_order", order)
    if (result.errmsg == "success" && !params.trade_id) {
        trade = {
            "trade_id": trade_id,
            "trade_platform": trade_platform,
            // "order_id_list": JSON.stringify(result.id_list),
            // "goods_total_number": params.trade.total_num,
            // "goods_total_price": params.trade.total_price,
            // "actually_total_price": params.trade.total_diacount_price ? params.trade.total_diacount_price : params.trade.total_price,
            // "pay_status": 0,
            // "pay_method": params.pay_type,
            "create_time": new Date(),
            // "pay_time": new Date(),
            // "take_meal_style": 0,  // 0堂食 1外带 目前默认
            "table_number": params.table_number,
            // "dinners_number": params.dinners_number,
            "employee_account": params.user.username,
            "remark": params.remark,
            "state": 1
        }
        result = await db.BulkInsert("goods_pending_trade", [trade])
    }
    if (result.errmsg == "success") {
        // 打单
        yly.run({
            "type": "pending_order",
            "trade": Object.assign(trade, {
                "goods_total_price": params.trade.total_price,
                "goods_total_original_price": params.trade.total_original_price
            }, {
                "order": params.order.map(value => {
                    return {
                        "goods_sku_id": value.sku_id,
                        "goods_id": value.id,
                        "name": value.name.split("-")[0],
                        "img": value.img,
                        "param": value.param,
                        "price": value.price,
                        "discount_price": value.discount_price,
                        "subtotal": value.subtotal, // 小计
                        "number": value.num,
                        "trade_id": trade_id,
                        "create_time": new Date(),
                        "remark": value.remark
                    }
                })
            })
        })

        return {code: 0, errmsg: "挂单成功", data: await get_pending_order.getData()}
    } else {
        return {code: 1, errmsg: "挂单失败"}
    }
}