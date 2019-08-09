// var db = require("./../utils/dba");
// var tools = require("./../tool");
var appId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')
var fm = require('./../utils/formatTime')


async function yinbaoAddOnLineOrder(data = {}) {
    // var tool = new tools;
    // var log = tool.log;
    // var query = tool.query;
    console.info(data)
    // 推送在线订单
    let current_time = fm(new Date())
    let items = []
    for (let i in data.cart) {
        items.push({
            "productUid": data.cart[i].goodsId,
            "comment": "",
            "quantity": data.cart[i].number,
            "manualSellPrice": data.cart[i].price
        })
    }
    console.info(items)
    let postData = {
        "appId": appId,
        "payMethod": "Wxpay",
        "payOnLine": 1,
        "orderRemark": "",
        "orderDateTime": current_time,
        "contactAddress": "",
        "contactName": "无",
        "contactTel": "无",
        "deliveryType": 1,
        "restaurantTableName": 7, //桌号
        "items": items
    }
    let postDataJson = JSON.stringify(postData)
    let router = "addOnLineOrder"
    console.info(2)
    let e = await request(router, postDataJson)
    console.info("获得分类数据：")
    console.info(e)
    // addOnLineOrder

}

module.exports = yinbaoAddOnLineOrder;