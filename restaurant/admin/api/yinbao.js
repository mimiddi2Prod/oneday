var db = require("./../utils/dba");
var fm = require('./../utils/formatTime') // 按银豹请求数据要求格式化时间
var appId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')


function yinbao() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            // let current_time = fm(new Date())
            // let postData = {
            //     "appId": appId,
            //     "payMethod": "Wxpay",
            //     // "customerNumber": "001",
            //     // "customerNum":"155893853835",
            //     "shippingFee":15.00,
            //     "orderRemark": "addOnLineOrder",
            //     "orderDateTime": current_time,
            //     "contactAddress": "测试测试。。。。",
            //     "contactName": "张三",
            //     "contactTel": "1360097865",
            //     "deliveryType":0,
            //     "payOnLine":1,
            //     // "deliveryType": 1,
            //     // "dinnersNumber": 5,
            //     // "restaurantAreaName": "一楼",
            //     // "restaurantTableName": "11",
            //     // "reservationTime": current_time,
            //     "items": [
            //         {
            //             "productUid": 491535479940357172,
            //             "comment": "测试添加",
            //             "quantity": 1,
            //             "manualSellPrice":30.2
            //         }
            //     ]
            // }
            // let postData = {
            //     "appId": appId,
            // }
            let postData = {
                "appId": appId,
                "productUid": '877929674817045283'
            }
            let postDataJson = JSON.stringify(postData)
            let router = "queryProductByUid"
            let e = await request(router, postDataJson)
            console.info(e)
            data = e

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = yinbao;