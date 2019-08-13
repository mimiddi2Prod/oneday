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
    // data.style 0 堂食 1 外带
    // let deliveryType = data.style == 1 ? 0 : 1
    let deliveryType = 1
    let cart = []
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
    }
    let newArr = []
    cart.forEach(el=>{
        const result = newArr.findIndex(ol=>{return el.goodsId === ol.goodsId})
        if(result!== -1){
            newArr[result].comment = newArr[result].comment + el.comment
            newArr[result].goodsNumber = newArr[result].goodsNumber + el.goodsNumber
        }else{
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
        postData = {
            "appId": appId,
            "payMethod": "Wxpay",
            "payOnLine": 1,
            "orderRemark": (data.style == 0 ? "堂食" : "外带"),
            "orderDateTime": current_time,
            "deliveryType": deliveryType,
            "restaurantTableName": 7, //桌号
            "contactName": "这是姓名",
            "contactTel": "这是电话",
            "items": items
        }
    }
    // return
    // console.info(items)

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