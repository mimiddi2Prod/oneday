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
        let result = await db.Query("select * from `user` where phone_number = ?", [params.phone_number])
        if (result.length) {
            return {
                code: 0,
                errmsg: "获取到会员信息",
                data: {
                    "phone_number": result[0].phone_number,
                    "balance": result[0].balance,
                    "total_balance": result[0].total_balance,
                    "get_phone_time": formatTime(new Date(result[0].get_phone_time)),
                    "history": (await db.Query("select * from user_recharge_record where phone_number = ? order by create_time desc", [params.phone_number])).map(val => {
                        val.create_time = formatTime(new Date(val.create_time))
                        return val
                    })
                }
            }
        } else {
            return {code: 1, errmsg: "没有 `" + params.phone_number + "` 的会员信息，请前往小程序注册"}
        }
    } catch (e) {
        console.info(e)
    }
}