var yinbaoAppId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')
var jsonBigInt = require('json-bigint')

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

    e = jsonBigInt.parse(e)
    // console.info("获得用户数据：")
    // console.info(e)

    if (e.data) {
        if (e.data[0].number.length > 0 && e.data[0].number == phone) {
            e.data[0].customrUid = e.data[0].customrUid.c.join("")
            e.data[0].customerUid = e.data[0].customerUid.c.join("")

            callData.code = 0
            callData.text = "success"
            callData.data = {}
            callData.data.point = e.data[0].point
            callData.data.balance = e.data[0].balance
            callData.data.discount = e.data[0].discount
            callData.data.customerUid = e.data[0].customerUid
        }
    } else {
		callData.code = 1
        callData.text = "fail"
    }
    return callData

}

module.exports = YinbaoGetCustomer;