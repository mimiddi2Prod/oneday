var db = require("./../utils/dba");

exports.run = async function (params) {
    let data = null
    return new Promise(async function (resolve, reject) {
        let condition = [{key: 'type', value: 0}, {key: 'state', value: 0}]
        let row = await db.Select('*', 'test', condition)
        data = row
        if (data) {
            resolve({
                errcode: 0,
                errmsg: 'request success',
                data: {
                    params: params,
                    data: data
                }
            })
        } else {
            reject({
                errcode: 2,
                errmsg: 'request fail'
            })
        }
    })

};
