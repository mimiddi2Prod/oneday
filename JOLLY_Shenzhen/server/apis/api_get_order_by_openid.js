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
    let sql = "select trade_id,group_concat(price),group_concat(number),create_time from goods_order where open_id = ? and pay_status = ? group by trade_id order by create_time desc",
        call = await db.Query(sql, [params["openid"], 0]);
    return {order: call}
}
