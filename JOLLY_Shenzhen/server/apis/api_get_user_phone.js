var db = require("./../utils/dba");
let wxParse = require('./../utils/wxParse/demo')

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
    let result = await db.Query("select session_key from `user` where openid = ?", [params["openid"]]), demo = {}
    demo.encryptedData = params["encryptedData"]
    demo.iv = params['iv']
    demo.sessionKey = result[0].session_key
    let rawData = wxParse(demo)
    let phoneNumber = rawData.phoneNumber

    result = await db.Query('update `user` set phone_number = ?,get_phone_time = current_timestamp where openid = ?', [phoneNumber, params["openid"]])
    if (result.affectedRows) {
        return {code: 0, errmsg: "注册成功", data: {balance: 0}}
    } else {
        return {code: 1, errmsg: "注册失败，请联系前台解决"}
    }
}
