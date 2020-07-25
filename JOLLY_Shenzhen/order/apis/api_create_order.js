var db = require("./../utils/dba");
var {formatTime} = require("./../utils/utils.js")
var yly = require("./yly_print")
var _calcBalance = require("./_calc_balance")

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
 * trade_platform : 点单平台 1小程序 2前台
 * trade_platform为2时 open_id为null
 * */
async function getData(params) {
    /**
     * 会员余额支付
     */
    let member
    if (params.pay_type == "余额") {
        // 进行会员余额的计算
        let price = params.total_diacount_price ? params.total_diacount_price : params.total_price
        member = await _calcBalance.getData({
            "increment_balance": -(price),
            "phone_number": params.member.phone_number
        })
        if (member.data.balance < 0) {
            // 余额不足，恢复
            _calcBalance.getData({
                "increment_balance": price,
                "phone_number": params.member.phone_number
            })
            return {state: 2, errmsg: "余额不足，请确认余额足够支付"}
        }
    }
    // 顶部新增会员余额支付

    let trade_platform = 2,
        trade_id
    if (params.trade_id) {
        trade_id = params.trade_id
    } else {
        trade_id = formatTime(new Date()).replace(/\//g, "").replace(/:/g, "").replace(/ /g, "")
    }
    let trade, order = params.order.map(value => {
            value.discount_price = Math.round(value.discount_price * 100) / 100
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
        }),
        result = await db.BulkInsert("goods_order", order)

    params.total_price = Math.round(params.total_price * 100) / 100
    params.total_original_price = Math.round(params.total_original_price * 100) / 100
    params.total_diacount_price = Math.round(params.total_diacount_price * 100) / 100
    if (result.errmsg == "success") {
        trade = {
            "trade_id": trade_id,
            "trade_platform": trade_platform,
            "order_id_list": JSON.stringify(result.id_list),
            "goods_total_number": params.total_num,
            "goods_total_price": params.total_price,
            "goods_total_original_price": params.total_original_price,
            "actually_total_price": params.total_diacount_price ? params.total_diacount_price : params.total_price,
            "pay_status": 1,
            "pay_method": params.pay_type,
            "create_time": new Date(),
            "pay_time": new Date(),
            "take_meal_style": 0,  // 0堂食 1外带 目前默认
            "table_number": params.table_number,
            "dinners_number": params.dinners_number,
            "employee_account": params.user.username,
            "remark": params.remark
        }
        result = await db.BulkInsert("goods_trade", [trade])
    }
    if (result.errmsg == "success") {
        // 打单
        // 新增会员支付 {"balance": member.data.balance}
        yly.run({
            "type": "order",
            "trade": Object.assign(trade, {
                "order": params.order.map(value => {
                    return {
                        "goods_sku_id": value.sku_id,
                        "goods_id": value.id,
                        "name": value.name.split("-")[0],
                        "img": value.img,
                        "param": value.param,
                        "price": value.price,
                        "discount_price": value.discount_price,
                        "subtotal": Math.round(Number(value.subtotal) * 100) / 100, // 小计
                        "number": value.num,
                        "trade_id": trade_id,
                        "create_time": new Date(),
                        "remark": value.remark
                    }
                })
            }, {"balance": member.data.balance, "phone_number": member.phone_number})
        })

        if (params.trade_id) {
            // 改变挂单状态
            db.Query("update goods_pending_trade set state = ? where trade_id = ?", [2, params.trade_id])
        }
        return {state: 0, errmsg: "success"}
    } else {
        return {state: 1, errmsg: "fail"}
    }
}