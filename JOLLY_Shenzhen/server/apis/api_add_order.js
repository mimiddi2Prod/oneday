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
    try {
        let goods_total_number = 0
        let cart = params['cart'].map(value => {
            goods_total_number += value.number
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
                // pay_status: params.payStatus,
                pay_status: 0,
                dinners_number: params.dinnersNumber,
                pay_method: params.payMethod
            }
        })
        let result = await db.BulkInsert('goods_order', cart)
        if (result.id_list.length == cart.length) {
            result = await db.BulkInsert("goods_trade", [{
                "trade_id": params.tradeId,
                "open_id": params.openid,
                "trade_platform": 1, // 点单平台: 1小程序 / 2前台
                "order_id_list": JSON.stringify(result.id_list),
                "goods_total_number": goods_total_number,
                "goods_total_price": params.totalPrice,
                "actually_total_price": params.totalPrice,
                "pay_status": 0, // 付款状态 0 未付款 1已付款
                "pay_method": params.payMethod, // 'Wxpay' / 其他方式
                "create_time": new Date(),
                "take_meal_style": params.takeMealStyle, // 0 堂食 1 外带
                "table_number": params.tableNumber, // 桌号
                "dinners_number": params.dinnersNumber, // 用餐人数
            }])
            if (result.id_list.length) {
                return {code: 0, text: '添加订单成功'}
            } else {
                return {code: 1, text: '添加订单失败'}
            }
        } else {
            return {code: 1, text: '添加订单失败'}
        }
    } catch (e) {
        console.info(e)
    }

}
