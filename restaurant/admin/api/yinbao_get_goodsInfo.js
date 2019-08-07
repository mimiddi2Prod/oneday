var db = require("./../utils/dba");
var appId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')


function yinbaoGetGoodsInfo() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            let postData = {
                "appId": appId,
                // "productUid":"348449631878274047"
                // "appId": "abcdefghijklmn",
                "payMethod": "Wxpay",
                // "customerNumber": "001",
                "shippingFee":15.00,
                "orderRemark": "addOnLineOrder",
                "orderDateTime": "2015-12-04 10:05:01",
                "contactAddress": "测试测试。。。。",
                "contactName": "张三",
                "contactTel": "1360097865",
                "deliveryType": 0,
                "payOnLine":1,
                // "dinnersNumber": 5,
                // "restaurantAreaName": "一楼",
                // "restaurantTableName": "11",
                // "reservationTime": "2018-01-12 12:30:00",
                "items": [
                    {
                        "productUid": "348449631878274047",
                        "comment": "测试添加",
                        "quantity": 1.2,
                        "manualSellPrice":30.2
                    }
                ]
            }
            // let postData = {
            //     "appId": appId,
            //     "productUid":"348449631878274047"
            // }
            let postDataJson = JSON.stringify(postData)
            let router = "addOnLineOrder"
            // let router = "queryProductByUid"
            // let router = "queryProductImagesByProductUid"
            let e = await request(router, postDataJson)
            console.info(e)
            data = e

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = yinbaoGetGoodsInfo;