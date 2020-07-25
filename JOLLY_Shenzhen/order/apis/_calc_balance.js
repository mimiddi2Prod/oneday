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

async function getData(params) {
    let result = await db.Query("update `user` set balance = balance + ? where phone_number = ?", [params.increment_balance, params.phone_number])
    if (result.affectedRows) {
        result = await db.Query("select * from `user` where phone_number = ?", [params.phone_number])
        return {code: 0, data: result[0]}
    }
}