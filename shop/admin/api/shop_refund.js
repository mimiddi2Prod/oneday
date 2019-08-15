var db = require("./../utils/dba");
var refund = require("./wxRefund");

function shopRefund() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var data = {}
        var row = []
        var sql = ""
        try {
            var payData = {}
            // var money = param['money']
            // var openid = param['openid']
            var refund_fee = param['refund_fee']
            var tradeId = param['tradeId']   // 商户订单号
            var order_id = param['order_id']
            var after_sale_state = param['after_sale_state']

            sql = "select single_price,`number`,postage from `order` where tradeid = ?"
            row = await db.Query(sql, tradeId)
            var total_fee = 0
            for(let i in row){
                total_fee = total_fee + Number(row[i].single_price) * Number(row[i].number)
            }
            console.info(total_fee)
            // 总金额需要查相同订单号的金额合计 tradeId
            // var total_fee = param['total_fee']

            payData.refund_fee = refund_fee * 100
            payData.tradeId = tradeId
            payData.total_fee = total_fee * 100


            async function Call() {
                var e = await refund(payData)
                data.code = -1
                if (e == '订单已全额退款' || e.indexOf('已部份退款') != -1) {
                    data.code = 0
                    after_sale_state = after_sale_state + 3
                    sql = "update `order` set after_sale_state = ? where id = ?"
                    row = await db.Query(sql, [after_sale_state, order_id])
                    // 可能需要做一个数据验证，确保部份退款的情况下，确实修改了状态（全款退款，反正钱退完了再退管理后台会报错）
                } else {
                    data.code = 1
                }
                data.text = e
            }

            await Call()
            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }

    }
}

module.exports = shopRefund;