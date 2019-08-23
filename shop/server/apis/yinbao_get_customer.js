var yinbaoAppId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')
// var fm = require('./../utils/formatTime')


async function YinbaoGetCustomer(phone) {
    let callData = {}
    // 1.获取会员
    let postData = {
        "appId": yinbaoAppId,
        "customerTel": phone
    }
    let postDataJson = JSON.stringify(postData)
    let router = "queryBytel"
    let e = await request(router, postDataJson)

    e = e.replace(/\"customrUid\":/g, "\"customrUid\":\"")
    e = e.replace(/,\"customerUid\"/g, "\",\"customerUid\"")
    e = e.replace(/\"customerUid\":/g, "\"customerUid\":\"")
    e = e.replace(/,\"categoryName\"/g, "\",\"categoryName\"")

    console.info("获得分类数据：")
    console.info(e)
    e = JSON.parse(e)
    if (e.data) {
        if (e.data[0].number.length > 0 && e.data[0].number == phone) {
            callData.code = 0
            callData.text = "success"
            callData.data = {}
            callData.data.point = e.data[0].point
            callData.data.balance = e.data[0].balance
            callData.data.discount = e.data[0].discount
            callData.data.customerUid = e.data[0].customerUid
        }
    } else {
        // 2.没查询到对应的会员卡 注册
        let postData = {
            "appId": yinbaoAppId,
            "customerInfo":{
                "number": phone
            }
        }
        let postDataJson = JSON.stringify(postData)
        console.info(postDataJson)
        let router = "add"
        let e = await request(router, postDataJson)

        e = e.replace(/\"customrUid\":/g, "\"customrUid\":\"")
        e = e.replace(/,\"customerUid\"/g, "\",\"customerUid\"")
        e = e.replace(/\"customerUid\":/g, "\"customerUid\":\"")
        e = e.replace(/,\"number\"/g, "\",\"number\"")

        console.info("获得分类数据：")
        console.info(e)
        e = JSON.parse(e)
        if (e.data) {
            if (e.data.number.length > 0 && e.data.number == phone) {
                callData.code = 0
                callData.text = "success"
                callData.data = {}
                callData.data.point = e.data.point
                callData.data.balance = e.data.balance
                callData.data.discount = e.data.discount
                data.data.customerUid = e.data.customerUid
            }
        }
    }
    return callData

}

module.exports = YinbaoGetCustomer;