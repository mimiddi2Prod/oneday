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
    let result = await db.Query("select * from `user` where phone_number = ?", [params.phone_number])
    if (result.length) {
        return {
            code: 0,
            errmsg: "is member",
            data: {"balance": result[0].balance, "phone_number": result[0].phone_number}
        }
    } else {
        return {code: 1, errmsg: "该号码没有注册成会员，请前往小程序注册"}
    }
}
