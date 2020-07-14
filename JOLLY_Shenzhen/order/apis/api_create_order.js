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
 * trade_platform : 点单平台 1小程序 2前台
 * trade_platform为2时 open_id为null
 * */
async function getData(params) {
    console.info(params, 6666666666)
    let trade_platform = 2,
        trade_id
    if (params.trade_id) {
        trade_id = params.trade_id
    } else {
        trade_id = 'qt' + formatTime(new Date()).replace(/\//g, "").replace(/:/g, "").replace(/ /g, "")
    }
    let order = params.order.map(value => {
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
    if (result.errmsg == "success") {
        result = await db.BulkInsert("goods_trade", [{
            "trade_id": trade_id,
            "trade_platform": trade_platform,
            "order_id_list": JSON.stringify(result.id_list),
            "goods_total_number": params.total_num,
            "goods_total_price": params.total_price,
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

        }])
    }
    if (result.errmsg == "success") {
        if (params.trade_id) {
            // 改变挂单状态
            db.Query("update goods_pending_trade set state = ? where trade_id = ?", [2, params.trade_id])
        }
        return {state: 0, errmsg: "success"}
    } else {
        return {state: 1, errmsg: "fail"}
    }
}