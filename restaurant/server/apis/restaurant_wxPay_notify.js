var tools = require("./../tool");

const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()

var http = require("http")
var fs = require("fs")

function RestaurantWxPayNotify() {
    var tool = new tools;
    // var log = tool.log;
    var query = tool.query;

    this.run = async function (xml) {
        var sql = '', row = ''
        // console.info('获得支付结果回调', new Date().toLocaleString(), xml)
        // console.info(xml)

        // 修改订单支付状态 并且给银豹发送订单请求
        var e = await xmlParse(xml)
        if (e.xml.return_code[0] === 'SUCCESS' && e.xml.result_code[0] === 'SUCCESS') {
            let tradeId = e.xml.out_trade_no[0]
            let openid = e.xml.openid[0]
            let totalPrice = Number(e.xml.total_fee[0]) * 0.01 // 获取的值 1 = 0.01

            // 查询对应订单用于给银豹推送订单
            sql = 'select * from restaurant_goods_order where trade_id = ? and open_id = ?'
            row = await query(sql, [tradeId, openid])
            // console.info(row)

            if (row.length > 0) {
                let rowData = row
                if (rowData[0].pay_status == 1) {
                    fs.appendFile("log.txt", new Date().toLocaleString() + '--获得支付结果回调--' + JSON.stringify(xml) + '/n', function (err) {

                    })
                    // 更改支付状态
                    sql = 'update restaurant_goods_order set pay_status = ? where trade_id = ? and open_id = ?'
                    row = await query(sql, [0, tradeId, openid])

                    // customerUid 更新积分时使用
                    let customerUid = rowData[0].customer_uid

                    let param = {}
                    param.openid = openid
                    param.style = rowData[0].style
                    param.dinnersNumber = rowData[0].dinners_number
                    param.restaurantTableName = rowData[0].table_number
                    param.payMethod = 'Wxpay'
                    param.cart = rowData.map(function (eData) {
                        eData.goodsId = eData.goods_id
                        eData.goodsParam = JSON.parse(eData.param)
                        return eData
                    })

                    var yinbaoAddOrder = require("./yinbao_add_onLineOrder")
                    let AddOrderCall = await yinbaoAddOrder(param)

                    // todo 写本地日志保存 用于保存银豹订单推送的情况  code:0 成功，1 失败
                    if (AddOrderCall.code == 0) {
                        let yinbao_orderNo = AddOrderCall.orderNo
                        sql = 'update restaurant_goods_order set yinbao_order_no = ? where trade_id = ? and open_id = ?'
                        row = await query(sql, [yinbao_orderNo, tradeId, openid])
                        fs.appendFile("log.txt", new Date().toLocaleString() + '--修改数据库完成--' + JSON.stringify(row) + '/n/n', function (err) {

                        })
                        /**
                         * 订阅消息
                         */
                        // var forwardOrder = require("./restaurant_forward_order_info")
                        // let ForwardOrderCall = await forwardOrder(openid)
                    } else if (AddOrderCall.code == 1) {

                    }

                    // todo 推送银豹订单 微信支付时银豹不计算积分 需自行更新
                    if (customerUid) {
                        let updateCustomerData = {}
                        updateCustomerData.customerUid = customerUid
                        updateCustomerData.balanceIncrement = 0
                        updateCustomerData.pointIncrement = totalPrice
                        let updateCustomer = require('./yinbao_update_customer')
                        let updateCustomerCall = await updateCustomer(updateCustomerData)
                        // todo 微信支付更新积分成功和失败的提醒 code:0 成功，1 失败
                        if (updateCustomerCall.code == 0) {

                        } else {

                        }
                    }

                    /**
                     * 如果有使用优惠券，就进行核销
                     * select_card_id:数据库中用户领取优惠券的存储id restaurant_card:id
                     * */
                    // let select_card_id = rowData[0].restaurant_card_id
                    // sql = "update restaurant_card set trade_id = ? where id = ?"
                    // row = await query(sql, [tradeId, select_card_id])
                    //
                    // sql = "select * from restaurant_card where id = ?"
                    // row = await query(sql, select_card_id)
                    //
                    // var postDataJson = JSON.stringify({
                    //     card_id: row[0].card_id,
                    //     encrypt_code: row[0].code
                    // })
                    // var options = {
                    //     host: '127.0.0.1',
                    //     port: '9131',
                    //     path: '/apis/consumeCard',
                    //     method: 'POST',
                    //     form: postDataJson,
                    //     headers: {
                    //         'Content-Type': 'application/json;charset=utf-8',
                    //     },
                    // }
                    //
                    // async function Call() {
                    //     let e = await HttpPost(options, postDataJson)
                    //     e = JSON.parse(e)
                    //     console.info(e)
                    //     // if (e.code == 0) {
                    //     //     data.cardList = e.data
                    //     // }
                    // }
                    //
                    // await Call()
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

async function HttpPost(option, postData) {
    return new Promise(function (resolve, reject) {
        var req = http.request(option, function (res) {
            let data = '';
            // res.headers = {
            //     'data-signature': sign,
            //     'Content-Type': 'application/json;charset=UTF-8'
            // }
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
            })
            res.on('end', function (e) {
                resolve(data)
            })
        })
        req.write(postData);
        req.end();
    })
}