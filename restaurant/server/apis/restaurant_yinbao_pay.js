var tools = require("./../tool");

function RestaurantYinbaoPay() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantYinbaoPay::Run";
        // log.debug("RestaurantYinbaoPay::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['customerUid'].length <= 0) {
            console.info('没有收到customerUid')
        } else if (param['balanceIncrement'].length <= 0) {
            console.info('没有收到balanceIncrement')
        } else if (param['pointIncrement'].length <= 0) {
            console.info('没有收到pointIncrement')
        } else {
            try {
                // 更新会员信息
                let updateCustomer = require('./yinbao_update_customer')
                let callData = await updateCustomer(param)
                // console.info(callData)
                if (callData.code == 0) {
                    data = callData
                }
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
        // tool.log.debug("RestaurantYinbaoPay::Run.out");
    }
}

module.exports = RestaurantYinbaoPay;