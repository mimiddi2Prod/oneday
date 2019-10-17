var tools = require("./../tool");

function RestaurantPayfee() {
    var tool = new tools;
    var log = tool.log;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantPayfee::Run";
        log.debug("RestaurantPayfee::Run.in");
        var data = {};
        var response = tool.error.OK;

        if (!param["openid"]) {
            log.warn(name, 'openid is not defined')
        } else if (!param["money"]) {
            log.warn(name, 'money! money! money! is not defined')
        } else {
            try {
                var payData = {}
                payData.openid = param['openid']
                payData.body = '啾哩Brunch'
                payData.total_fee = param['money'] * 100

                var payfee = require("./../utils/wxpay");
                async function Call() {
                    var e = await payfee(payData)
                    data = e

                    // 获得订单号后，将订单添加到数据库 并且支付状态为未支付
                    var addOrder = require('./restaurant_add_order')
                    let order = param['order']
                    order.tradeId = e.tradeId
                    let callback = await addOrder(order)
                    data.addOrderStatus = callback

                }
                await Call()

            } catch (err) {
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
        tool.log.debug("RestaurantPayfee::Run.out");
    }
}

module.exports = RestaurantPayfee;