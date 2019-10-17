var tools = require("./../tool");

const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()

function RestaurantWxPayNotify() {
    var tool = new tools;
    // var log = tool.log;
    var query = tool.query;

    this.run = async function (xml) {
        var sql = '', row = ''
        console.info('获得支付结果回调')
        console.info(xml)

        // 修改订单支付状态 并且给银豹发送订单请求
        var e = await xmlParse(xml)
        if (e.xml.return_code[0] === 'SUCCESS') {
            let tradeId = e.xml.out_trade_no[0]
            let openid = e.xml.openid[0]
            let totalPrice = Number(e.xml.total_fee[0]) * 0.01 // 获取的值 1 = 0.01

            // 更改支付状态
            sql = 'update restaurant_goods_order set pay_status = ? where trade_id = ? and open_id = ?'
            row = await query(sql, [0, tradeId, openid])

            // 查询对应订单用于给银豹推送订单
            sql = 'select * from restaurant_goods_order where trade_id = ? and open_id = ?'
            row = await query(sql, [tradeId, openid])
            console.info(row)
            if (row.length > 0) {
                // customerUid 更新积分时使用
                let customerUid = row[0].customer_uid

                let param = {}
                param.openid = openid
                param.style = row[0].style
                param.dinnersNumber = row[0].dinners_number
                param.restaurantTableName = row[0].table_number
                param.payMethod = 'Wxpay'
                param.cart = row.map(function (eData) {
                    eData.goodsId = eData.goods_id
                    eData.goodsParam = eData.param
                    return eData
                })

                var yinbaoAddOrder = require("./yinbao_add_onLineOrder")
                let AddOrderCall = await yinbaoAddOrder(param)

                // todo 写本地日志保存 用于保存银豹订单推送的情况  code:0 成功，1 失败
                if (AddOrderCall.code == 0) {

                } else if (AddOrderCall.code == 1) {

                }

                // todo 推送银豹订单 微信支付时银豹不计算积分 需自行更新
                if (customerUid) {
                    let updateCustomerData = {}
                    updateCustomerData.customerUid = customerUid
                    updateCustomerData.balanceIncrement = 0
                    updateCustomerData.pointIncrement = totalPrice
                    let updateCustomer = require('./yinbao_update_customer')
                    let updateCustomerCall = await updateCustomer(param)
                    // todo 微信支付更新积分成功和失败的提醒 code:0 成功，1 失败
                    if (updateCustomerCall.code == 0) {

                    } else {

                    }
                }
            }
        }
    }


}

module.exports = RestaurantWxPayNotify;

async function xmlParse(xml) {
    return new Promise(function (resolve, reject) {
        xmlParser.parseString(xml, (err, success) => {
            if (err) {
                log('parser xml error ', err)
                reject(err)
            } else {
                resolve(success)
            }
        })
    })
}