// var db = require("./../utils/dba");
// var tools = require("./../tool");
var appId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')
var fm = require('./../utils/formatTime')


async function yinbaoAddOnLineOrder(data = {}) {
    console.info(data)
    // 推送在线订单
    let current_time = fm(new Date())
    let items = []
    let deliveryType = data.style == 1 ? 0 : 1
    for (let i in data.cart) {
        items.push({
            "productUid": data.cart[i].goodsId,
            "comment": "这是口味的备注",
            "quantity": data.cart[i].number,
            "manualSellPrice": data.cart[i].price
        })
    }
    // console.info(items)
    let postData = {
        "appId": appId,
        "payMethod": "Wxpay",
        "payOnLine": 1,
        "orderRemark": "",
        "orderDateTime": current_time,
        "contactAddress": "无",
        "contactName": "无",
        "contactTel": "无",
        "deliveryType": deliveryType,
        "restaurantTableName": 7, //桌号
        "items": items
    }
    console.info(postData)
    let postDataJson = JSON.stringify(postData)
    let router = "addOnLineOrder"
    console.info(2)
    let e = await request(router, postDataJson)
    console.info("获得分类数据：")
    console.info(e)
    // addOnLineOrder

}

module.exports = yinbaoAddOnLineOrder;