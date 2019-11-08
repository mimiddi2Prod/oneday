var tools = require("./../tool");

const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()

function ShopWxPayNotify() {
    var tool = new tools;
    // var log = tool.log;
    var query = tool.query;

    this.run = async function (xml) {
        var sql = '', row = ''
        console.info('获得支付结果回调')
        console.info(xml)

        // 修改订单支付状态
        var e = await xmlParse(xml)
        if (e.xml.return_code[0] === 'SUCCESS' && e.xml.result_code[0] === 'SUCCESS') {
            let tradeId = e.xml.out_trade_no[0]
            let openid = e.xml.openid[0]
            // let total_fee = e.xml.total_fee[0]
            let totalPrice = Number(e.xml.total_fee[0]) * 0.01 // 获取的值 1 = 0.01

            // 查询对应订单
            sql = 'select * from `order` where tradeId = ? and open_id = ?'
            row = await query(sql, [tradeId, openid])
            // console.info(row)

            if (row.length > 0) {
                let rowData = row
                if(rowData[0].state == 0){
                    // 更改支付状态
                    sql = 'update `order` set state = ? where tradeId = ? and open_id = ?'
                    row = await query(sql, [1, tradeId, openid])

                    // 已支付
                    sql = "update paid set state = ? where order_id in(?)"
                    // row = await tool.query(sql, [1, param["order_id"]])
					row = await tool.query(sql, [1, rowData.map(function(eData){
						return eData.id
					})])

                    // customerUid 更新积分时使用
                    let customerUid = rowData[0].customer_uid

                    // let param = {}
                    // param.openid = openid
                    // param.style = rowData[0].style
                    // param.dinnersNumber = rowData[0].dinners_number
                    // param.restaurantTableName = rowData[0].table_number
                    // param.payMethod = 'Wxpay'
                    // param.cart = rowData.map(function (eData) {
                    //     eData.goodsId = eData.goods_id
                    //     eData.goodsParam = JSON.parse(eData.param)
                    //     return eData
                    // })
                    //
                    // var yinbaoAddOrder = require("./yinbao_add_onLineOrder")
                    // let AddOrderCall = await yinbaoAddOrder(param)

                    // todo 写本地日志保存 用于保存银豹订单推送的情况  code:0 成功，1 失败
                    // if (AddOrderCall.code == 0) {
                    //     let yinbao_orderNo = AddOrderCall.orderNo
                    //     sql = 'update restaurant_goods_order set yinbao_order_no = ? where trade_id = ? and open_id = ?'
                    //     row = await query(sql, [yinbao_orderNo, tradeId, openid])
                    // } else if (AddOrderCall.code == 1) {
                    //
                    // }

                    // todo 推送银豹订单 微信支付时银豹不计算积分 需自行更新
                    if (customerUid) {
                        let updateCustomerData = {}
                        updateCustomerData.customerUid = customerUid
                        updateCustomerData.balanceIncrement = 0
                        updateCustomerData.pointIncrement = totalPrice
						console.info(updateCustomerData)
                        let updateCustomer = require('./yinbao_update_customer')
                        let updateCustomerCall = await updateCustomer(updateCustomerData)
                        // todo 微信支付更新积分成功和失败的提醒 code:0 成功，1 失败
                        if (updateCustomerCall.code == 0) {

                        } else {

                        }
                    }
                }

            }
        }
    }


}

module.exports = ShopWxPayNotify;

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