var db = require("./dba")

/**
 * 采用session验证登录，目前暂时废弃使用
 *
 * 用于验证web登录状态
 * 顺便通过小程序传递过来的token获取id用于数据存储
 * await check.check_login_status(params["token"],params["user_agent"])
 * */
exports.check_login_status = async function (token, user_agent) {
    let call = {}
    let conditionList = [{
        key: "token",
        value: token
    }]
    let result = await db.Select("id,expire_time,user_agent", "admin_user", conditionList)
    if (result.length) {
        if (user_agent == result[0].user_agent) {
            if (new Date() < new Date(result[0].expire_time)) {
                call.errcode = 10000
                call.errmsg = "你通过了所有关卡，恭喜你！"
                call.id = result[0].id
            } else {
                call.errcode = 10003
                call.errmsg = "登录状态超时，请重新登录"
            }
        } else {
            call.errcode = 10002
            call.errmsg = "与最后登录时的设备不同，请重新登录"
        }
    } else {
        call.errcode = 100001
        call.errmsg = "没有找到用户"
    }
    return call
}