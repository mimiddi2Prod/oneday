var db = require("./../utils/dba");

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
    let result = await db.Query("select * from `user` where openid = ?", [params.openid])
    if (result[0].phone_number) {
        if (result[0].balance >= params.totalPrice) {
            return {code: 0, errmsg: "余额充足"}
        } else {
            // 余额不足以支付
            return {code: 1, errmsg: "余额不足，请前往前台充值"}
        }
    } else {
        // 没有手机号码 应该先注册会员
        return {code: 2, errmsg: "不是会员"}
    }
}
