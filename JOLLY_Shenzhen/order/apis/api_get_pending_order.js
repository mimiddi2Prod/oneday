var db = require("./../utils/dba");
var {formatTime} = require("./../utils/utils.js")

module.exports = {
    run: async function (params) {
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
    },
    getData: getData
}

/**
 * trade_platform: 1小程序 2前台
 */
async function getData(params) {
    try {
        let trade = await db.Query("select * from goods_pending_trade where state = 1")
        if (trade.length) {
            let order = await db.Query("select * from goods_pending_order where trade_id in (?)", [trade.map(val => {
                return val.trade_id
            })])
            trade = trade.map(val => {
                val.order = []
                order.forEach(m => {
                    if (val.trade_id == m.trade_id && m.number) {
                        m.param = JSON.parse(m.param)
                        val.order.push(m)
                    }
                })
                return val
            })
            trade = trade.filter(val => {
                return val.order.length > 0
            })
        }
        return {code: 0, data: trade}
    } catch (e) {
        console.info(e)
    }
}

// async function getPendingTrade() {
//     try {
//         let result = await db.Query("select * from goods_pending_trade where state = 1")
//         return result
//     } catch (e) {
//         console.info(e)
//     }
// }