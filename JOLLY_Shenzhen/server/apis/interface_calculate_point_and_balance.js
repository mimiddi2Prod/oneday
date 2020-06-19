var db = require("./../utils/dba");

exports.run = async function (params) {
    let result = await getUser(params)
    if (result.length) {
        // 微信支付消息通知 进行积分累加
        // 余额支付，扣除余额，增加积分
        if (params.balanceIncrement && (result[0].balance + params.balanceIncrement < 0)) {
            return {state: 1, errmsg: "支付失败，余额不足"}
        }
        result = await db.Update_ver_2({
            point: result[0].point + params.pointIncrement,
            history_total_point: result[0].history_total_point + params.pointIncrement,
            balance: result[0].balance + (params.balanceIncrement || 0),
        }, "user", {openid: params.openid})
        if (result.changedRows && result.errmsg == "success") {
            result = await getUser(params)
            return {state: 0, errmsg: "success", data: {balance: result[0].balance, point: result[0].point}}
        }
    }
}

async function getUser(params) {
    return await db.Select_ver_2("point,history_total_point,balance,history_total_recharge", "user", {openid: params.openid})
}