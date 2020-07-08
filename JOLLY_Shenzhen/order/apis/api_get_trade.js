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
 * trade_platform: 1小程序 2前台
 */
async function getData(params) {
    try {
        let trade = await db.Query("select * from goods_trade where trade_platform = ? and pay_status = ?", [2, 1])
        if (trade.length) {
            let order = await db.Query("select * from goods_order where trade_id in (?)", [trade.map(value => {
                return value.trade_id
            })])
            trade = trade.map(value => {
                delete value.open_id;
                value.create_time = formatTime(new Date(value.create_time))
                value.pay_time = formatTime(new Date(value.pay_time))
                value.order = []
                order.forEach(m => {
                    let {goods_sku_id, goods_id, name, describe, img, param, price, discount_price, number} = m
                    param = param ? JSON.parse(param) : ""
                    if (value.trade_id == m.trade_id) {
                        value.order.push({
                            goods_sku_id,
                            goods_id,
                            name,
                            describe,
                            img,
                            param,
                            price,
                            discount_price,
                            number
                        })
                    }
                })
                return value
            })
        }
        return {"trade": trade}
    } catch (e) {
        console.info(e)
    }
}