var db = require("./../utils/dba");
var utils = require("./../utils/utils.js")
var uuid = require('node-uuid')

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
    let call = {}
    if (!params["username"] || !params["password"]) {
        // 没有获取到账号或密码
        call.text = "没有获取到账号或密码"
        return call
    }
    const privateKey = require('./../utils/getPrivateKey').Get()
    const password = utils.Decrypt(params['password'], privateKey)
    // state 0 删除 1 启用 2 禁用
    let result = await db.Select("*", "admin", {"username": params["username"], "password": password, "state": 1})
    if (result.length) {
        let expiredTime = new Date(new Date().getTime() + (24 * 60 * 60 * 1000))
        call.token = uuid.v4()
        call.expires = expiredTime
        db.Update({
            "token": call.token,
            "last_login_time": new Date(),
            "token_expire": expiredTime,
            "user_agent": params["user_agent"],
            "id": result[0].id
        }, "admin", {"username": params["username"], "password": password})

        // 设置session用
        delete result[0].password
        result[0].token = call.token
        result[0].user_agent = params["user_agent"]
        call.user = result[0]

        return call
    } else {
        // 账号或密码错误
        call.text = "账号或密码错误"
        return call
    }
}