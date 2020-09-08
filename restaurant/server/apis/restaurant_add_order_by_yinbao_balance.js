var tools = require("./../tool");
var http = require("http")

function RestaurantAddOrderByYinbaoBalance() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantAddOrderByYinbaoBalance::Run";
        // log.debug("RestaurantAddOrderByYinbaoBalance::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['tradeId'].length <= 0) {
            console.info('没有收到订单号')
        } else if (param['cart'].length <= 0) {
            console.info('没有收到订单数据')
        } else if (param['openid'].length <= 0) {
            console.info('没有收到用户的openid')
        } else {
            try {
                var yinbaoAddOrder = require("./yinbao_add_onLineOrder")
                let call = await yinbaoAddOrder(param)
                // console.info(call)
                if (call.code == 0) {
                    let yinbao_orderNo = call.orderNo
                    let cart = param['cart']
                    let length = cart.length, flag = 0
                    // 新增优惠券id: restaurant_card_id
                    if (param["coupon"]) {
                        for (let i in cart) {
                            cart[i].goodsParam = JSON.stringify(cart[i].goodsParam)
                            let img = (cart[i].goodsImage ? cart[i].goodsImage : '')
                            sql = "insert into restaurant_goods_order (`name`,`describe`,img,goods_id,open_id,param,goods_sku_id,`number`,trade_id,price,style,yinbao_order_no,create_time,pay_status,dinners_number,pay_method,table_number,customer_uid,restaurant_card_id,coupon) values (?,?,?,?,?,?,?,?,?,?,?,?,current_timestamp,?,?,?,?,?,?,?)";
                            row = await query(sql, [cart[i].goodsName, cart[i].goodsDesc, img, cart[i].goodsId, param['openid'], cart[i].goodsParam, cart[i].paramId, cart[i].number, param['tradeId'], cart[i].price, param['style'], yinbao_orderNo, param['payStatus'], param['dinnersNumber'], param['payMethod'], param['restaurantTableName'], param['customerUid'], param["coupon"].id, param["coupon"].reduce_cost]);
                            if (row.insertId) {
                                flag++
                            }
                        }

                        /**
                         * 如果有使用优惠券，就进行核销
                         * select_card_id:数据库中用户领取优惠券的存储id restaurant_card:id
                         * */
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
                            console.info(e)
                            // if (e.code == 0) {
                            //     data.cardList = e.data
                            // }
                        }

                        await Call()

                    } else {
                        for (let i in cart) {
                            cart[i].goodsParam = JSON.stringify(cart[i].goodsParam)
                            let img = (cart[i].goodsImage ? cart[i].goodsImage : '')
                            sql = "insert into restaurant_goods_order (`name`,`describe`,img,goods_id,open_id,param,goods_sku_id,`number`,trade_id,price,style,yinbao_order_no,create_time,pay_status,dinners_number,pay_method,table_number,customer_uid) values (?,?,?,?,?,?,?,?,?,?,?,?,current_timestamp,?,?,?,?,?)";
                            row = await query(sql, [cart[i].goodsName, cart[i].goodsDesc, img, cart[i].goodsId, param['openid'], cart[i].goodsParam, cart[i].paramId, cart[i].number, param['tradeId'], cart[i].price, param['style'], yinbao_orderNo, param['payStatus'], param['dinnersNumber'], param['payMethod'], param['restaurantTableName'], param['customerUid']]);
                            if (row.insertId) {
                                flag++
                            }
                        }
                    }

                    if (flag == length) {
                        data.code = 0
                        data.text = "订单插入成功"
                    } else {
                        data.code = 1
                        data.text = "订单插入失败"
                    }
                } else {
                    data.code = 1
                    data.text = "订单推送失败"
                }


            } catch (err) {
                console.info(err)
                if (err.code) {
                    response = tool.error.ErrorSQL;
                    log.warn(name, "code:", err.code, ", sql:", err.sql);
                } else {
                    log.warn(name, JSON.stringify(response));
                    response = tool.error.ErrorCatch;
                }
            }


        }


        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_order",
            }, res);
        // tool.log.debug("RestaurantAddOrderByYinbaoBalance::Run.out");
    }
}

module.exports = RestaurantAddOrderByYinbaoBalance;

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
