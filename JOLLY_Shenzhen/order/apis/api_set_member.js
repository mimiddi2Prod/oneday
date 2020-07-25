var db = require("./../utils/dba");
var {formatTime} = require("./../utils/utils.js")
var yly = require("./yly_print")
var getMember = require("./api_get_member")

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
        let result = await db.Query("select * from `user` where phone_number = ?", [params.phone_number])
        if (result.length) {
            let {balance, total_balance, total_handsel} = result[0],
                calcBalance = balance + params.increment_balance + params.handsel_balance,
                calcTotalBalance = total_balance + params.increment_balance,
                calcTotalHandsel = total_handsel + params.handsel_balance
            db.Query("insert into user_recharge_record(phone_number,increment_balance,handsel_balance,current_balance,create_time,employee_account)value(?,?,?,?,?,?)",
                [params.phone_number, params.increment_balance, params.handsel_balance, calcBalance, new Date(), params.user.username])
            result = await db.Query("update `user` set balance = ?,total_balance = ?,total_handsel = ? where phone_number = ?",
                [calcBalance, calcTotalBalance, calcTotalHandsel, params.phone_number])
            if (result.affectedRows) {
                // 打单
                yly.run({
                    "type": "member",
                    "member": {
                        "employee_account": params.user.username,
                        "phone_number": params.phone_number,
                        "increment_balance": params.increment_balance,
                        "handsel_balance": params.handsel_balance,
                        "calcBalance": calcBalance
                    }
                })
                return {code: 0, errmsg: "充值成功", data: (await getMember.getData(params)).data}
            } else {
                return {code: 1, errmsg: "充值失败"}
            }
        }
    } catch (e) {
        console.info(e)
    }
}