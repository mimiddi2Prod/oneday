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
    let sql = "select `name`,`describe`,img,param,price,`number`,create_time,take_meal_style from goods_order where open_id = ? and trade_id = ? and pay_status = ?",
    row = await db.Query(sql, [params["openid"], params["tradeid"], 0]);
    // if (row.length > 0) {
        // let order_list = row

        // 优惠券部分
        // if(row[0].restaurant_card_id){
        //     sql = "select * from restaurant_card where id = ?";
        //     row = await query(sql, result[0].restaurant_card_id);
        //
        //     sql = "select * from restaurant_card_info where card_id = ?";
        //     row = await query(sql, row[0].card_id);
        //
        //     data.card = row[0]
        // }
    // }
    return {order_list: row}
}
