var tools = require("./../tool");
var http = require("http")

function RestaurantAddOrderByYinbaoBalance() {
    var tool = new tools;
    var log = tool.log;
    // var query = tool.query;
    var BulkInsert = tool.BulkInsert

    this.Run = async function (ver, param, res) {
        var name = "RestaurantAddOrderByYinbaoBalance::Run";
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['tradeId'].length <= 0) {
            log.warn(name, '没有收到订单号')
        } else if (param['cart'].length <= 0) {
            log.warn(name, '没有收到订单数据')
        } else if (param['openid'].length <= 0) {
            log.warn(name, '没有收到用户的openid')
        } else {
            try {
                var yinbaoAddOrder = require("./yinbao_add_onLineOrder")
                let call = await yinbaoAddOrder(param)
                if (call["code"] == 0) {
                    let yinbao_orderNo = call["orderNo"]
                    let cart = param['cart']
                    let current_time = new Date()
                    let DATA = cart.map(val => {
                        return {
                            "name": val["goodsName"],
                            "describe": val["goodsDesc"],
                            "img": val["goodsImage"] ? val["goodsImage"] : '',
                            "goods_id": val["goodsId"],
                            "open_id": param['openid'],
                            "param": JSON.stringify(val["goodsParam"]),
                            "goods_sku_id": val["paramId"],
                            "number": val["number"],
                            "trade_id": param['tradeId'],
                            "price": val["price"],
                            "style": param['style'],
                            "yinbao_order_no": yinbao_orderNo,
                            "create_time": current_time,
                            "pay_status": param['payStatus'],
                            "dinners_number": param['dinnersNumber'],
                            "pay_method": param['payMethod'],
                            "table_number": param['restaurantTableName'],
                            "customer_uid": param['customerUid'],
                            "restaurant_card_id": param["coupon"] ? param["coupon"].id : null,
                            "coupon": param["coupon"] ? param["coupon"].reduce_cost : null
                        }
                    })
                    let result = await BulkInsert("restaurant_goods_order", DATA)
                    if (result["id_list"].length == cart.length) {
                        data.code = 0
                        data.text = "订单插入成功"
                    } else {
                        data.code = 1
                        data.text = "订单插入失败"
                    }

                    /**
                     * 如果有使用优惠券，就进行核销
                     * select_card_id:数据库中用户领取优惠券的存储id restaurant_card:id
                     * */
                    if (param["coupon"]) {
                        let select_card_id = param["coupon"].id
                        sql = "update restaurant_card set trade_id = ? where id = ?"
                        row = await query(sql, [param['tradeId'], select_card_id])

                        sql = "select * from restaurant_card where id = ?"
                        row = await query(sql, select_card_id)

                        var postDataJson = JSON.stringify({
                            card_id: row[0].card_id,
                            encrypt_code: row[0].code
                        })
                        var options = {
                            host: '127.0.0.1',
                            port: '9131',
                            path: '/apis/consumeCard',
                            method: 'POST',
                            form: postDataJson,
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                            },
                        }

                        async function Call() {
                            let e = await HttpPost(options, postDataJson)
                            e = JSON.parse(e)
                        }

                        await Call()
                    }
                } else {
                    data.code = 1
                    data.text = "订单推送失败"
                }

            } catch (err) {
                log.error(name, err)
            }
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_order",
            }, res);
    }
}

module.exports = RestaurantAddOrderByYinbaoBalance;

async function HttpPost(option, postData) {
    return new Promise(function (resolve, reject) {
        var req = http.request(option, function (res) {
            let data = '';
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
