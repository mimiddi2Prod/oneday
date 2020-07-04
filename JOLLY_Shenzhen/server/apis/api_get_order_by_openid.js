var db = require("./../utils/dba");
const {formatTime} = require("./../utils/utils")

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
    // let sql = "select trade_id,group_concat(price),group_concat(number),create_time from goods_order where open_id = ? and pay_status = ? group by trade_id order by create_time desc",
    //     call = await db.Query(sql, [params["openid"], 0]);
    // return {order: call}
    try {
        let trade = await db.Query("select * from goods_trade where open_id = ? and pay_status = ?", [params["openid"], 1])
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
                    let {goods_sku_id, goods_id, name, describe, img, param, price, number} = m
                    if (value.trade_id == m.trade_id) {
                        value.order.push({goods_sku_id, goods_id, name, describe, img, param, price, number})
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
