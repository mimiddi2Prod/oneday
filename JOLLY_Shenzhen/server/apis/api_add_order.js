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
    let cart = params['cart'].map(value => {
        return {
            open_id: params.openid,
            goods_sku_id: value.paramId,
            goods_id: value.goodsId,
            name: value.goodsName,
            describe: value.goodsDesc,
            img: value.goodsImage || '',
            param: JSON.stringify(value.goodsParam),
            price: value.price,
            number: value.number,
            coupon: params.selcCardInfo,
            trade_id: params.tradeId,
            create_time: new Date(),
            take_meal_style: params.takeMealStyle,
            table_number: params.tableNumber,
            pay_status: params.payStatus,
            dinners_number: params.dinnersNumber,
            pay_method: params.payMethod
        }
    })
    let result = await db.BulkInsert('goods_order', cart)
    if (result.id_list.length == cart.length) {
        return {code: 0, text: '添加订单成功'}
    } else {
        return {code: 1, text: '添加订单失败'}
    }
}
