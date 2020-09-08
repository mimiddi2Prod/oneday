// var db = require("./../utils/dba");
var tools = require("./../tool");
var tool = new tools;
var query = tool.query;

var appId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')
var fm = require('./../utils/formatTime')
var fs = require('fs')


async function yinbaoAddOnLineOrder(data = {}) {
    fs.appendFile("log.txt", new Date().toLocaleString() + '--推送订单--' + JSON.stringify(data) + '/n', function (err) {

    })
    // console.info(data)
    // 推送在线订单
    let current_time = fm(new Date())
    let items = []
    // data.style 0 堂食 1 外带
    // let deliveryType = data.style == 1 ? 0 : 1
    let deliveryType = 1
    let cart = []
    // let totalAmount = "" // 余额使用，优惠券
    for (let i in data.cart) {
        let valueList = Object.values(data.cart[i].goodsParam)
        let comment = (valueList.length > 0 ? data.cart[i].number + '份' + function () {
            let temp = ''
            for (let j in valueList) {
                temp += valueList[j] + (j < valueList.length - 1 ? "/" : ' ')
            }
            return temp
        }() : '')
        cart.push({
            goodsId: data.cart[i].goodsId,
            goodsNumber: data.cart[i].number,
            goodsPrice: data.cart[i].price,
            comment: comment
        })
        // totalAmount += data.cart[i].number * data.cart[i].price
    }
    let newArr = []
    cart.forEach(el => {
        const result = newArr.findIndex(ol => {
            return el.goodsId === ol.goodsId
        })
        if (result !== -1) {
            newArr[result].comment = newArr[result].comment + el.comment
            newArr[result].goodsNumber = newArr[result].goodsNumber + el.goodsNumber
        } else {
            newArr.push(el)
        }
    })
    for (let i in newArr) {
        // let value = Object.values(data.cart[i].goodsParam)
        // value = (value.length > 0 ? JSON.stringify(value) : '')
        items.push({
            "productUid": newArr[i].goodsId,
            "comment": newArr[i].comment,
            "quantity": newArr[i].goodsNumber,
            "manualSellPrice": newArr[i].goodsPrice
        })
    }

    let postData = {}
    // deliveryType 0 外卖单 1 店内单
    // if (deliveryType == 0) {
    //     postData = {
    //         "appId": appId,
    //         "payMethod": "Wxpay",
    //         "payOnLine": 1,
    //         "orderRemark": "这是订单备注",
    //         "orderDateTime": current_time,
    //         "contactAddress": "这是地址",
    //         "contactName": "这是姓名",
    //         "contactTel": "这是电话",
    //         "deliveryType": deliveryType,
    //         // "restaurantTableName": 7, //桌号
    //         "items": items
    //     }
    // } else
    if (deliveryType == 1) {
        if (data.payMethod == 'Wxpay') {
            postData = {
                "appId": appId,
                "payMethod": "Wxpay",
                "payOnLine": 1,
                "orderRemark": (data.style == 0 ? "堂食 " : "外带 ") + '桌号:' + data.restaurantTableName.toString() + ' 就餐人数:' + data.dinnersNumber,
                "dinnersNumber": data.dinnersNumber,
                "orderDateTime": current_time,
                "deliveryType": deliveryType,
                "restaurantTableName": data.restaurantTableName, //桌号
                "contactAddress": "contactAddress",
                "contactName": "contactName",
                "contactTel": "contactTel",
                "items": items
            }
            // if (data.totalAmount) {
            //     postData.totalAmount = data.totalAmount
            // }
            if (data.CouponTitle) {
                postData.orderRemark = postData.orderRemark + ' ' + data.CouponTitle
            }
        } else if (data.payMethod == 'CustomerBalance') {
            postData = {
                "appId": appId,
                "customerNumber": data.customerNumber, // 会员号
                "payMethod": "CustomerBalance",
                //"payOnLine": 1,
                "orderRemark": (data.style == 0 ? "堂食 " : "外带 ") + '桌号:' + data.restaurantTableName.toString() + ' 就餐人数:' + data.dinnersNumber,
                "dinnersNumber": data.dinnersNumber,
                "orderDateTime": current_time,
                "deliveryType": deliveryType,
                "restaurantTableName": data.restaurantTableName, //桌号
                "contactAddress": "contactAddress",
                "contactName": "contactName",
                "contactTel": "contactTel",
                "items": items
            }
            if (data.coupon) {
                // postData.orderSource = "openApi"
                // postData.totalAmount = totalAmount - data.coupon.reduce_cost

                let sql = "select cash from restaurant_card_info where card_id = (select card_id from restaurant_card where id = ?)"
                let row = await query(sql, data.coupon.id)
                let CouponTitle = typeof row[0].cash == "string" ? JSON.parse(row[0].cash).base_info.title : row[0].cash.base_info.title
                postData.orderRemark = postData.orderRemark + ' ' + CouponTitle
            }
        }

    }
    // return
    // console.info(items)

    // console.info('显示推送订单数据')
    // console.info(postData)
    let postDataJson = JSON.stringify(postData)
    let router = "addOnLineOrder"
    let e = await request(router, postDataJson)
    // console.info("获得添加订单数据：")
    // console.info(e)
    fs.appendFile("log.txt", new Date().toLocaleString() + '--推送订单成功--' + JSON.stringify(e) + '/n', function (err) {

    })
    e = JSON.parse(e)
    let callback = {}
    if (e.status == 'success' && e.data) {
        callback.code = 0
        callback.text = 'success'
        callback.orderNo = e.data.orderNo
    } else {
        callback.code = 1
        callback.text = 'fail'
    }
    return callback
    // addOnLineOrder

}

module.exports = yinbaoAddOnLineOrder;
