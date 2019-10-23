var tools = require("./../tool");

function SHOPPayfee() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPPayfee::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["openid"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'openid is not defined')
        } else if (!param["money"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'money! money! money! is not defined')
        } else if (param["money"]) {
            try {
                var payData = {}
                var money = param['money']
                var openid = param['openid']

                payData.openid = openid
                // payData.mch_id = '1508603281'//商户号
                // payData.key = '81ef119935811ab9339b8c802a2ffc7B'
                // payData.appid = 'wx14dd6120d4882a81'
                // payData.out_trade_no = new Date().getTime()
                payData.body = '啾哩好物'
                payData.total_fee = money * 100

                var payfee = require("./../utils/wxpay");
                async function Call() {
                    var e = await payfee(payData)
                    data = e

                    var addOrder = require('./shop_add_wx_order')
                    let order = {}
                    order.order = param['order']
                    order.tradeId = e.tradeId
                    let callback = await addOrder(order)
                    data.addOrderStatus = callback
                }

                await Call()
                // data = payData
            } catch (err) {
                tool.log.warn(name, "payfee is boom");
                // response = tool.error.ErrorSQL;
                // tool.log.error("SHOPPayfee::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPPayfee::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "payfee",
            }, res);
        tool.log.debug("SHOPPayfee::Run.out");
    }
}

module.exports = SHOPPayfee;