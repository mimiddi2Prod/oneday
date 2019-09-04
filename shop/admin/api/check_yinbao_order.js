var db = require("./../utils/dba");

module.exports = function getYinbaoOrder() {
    setInterval(function () {
        var sql = "select * from yinbao_update_time"
        var row = db.Query(sql)
        row.then(function (eData) {
            if (eData.length > 0) {
                let start_time = eData[0]['last_update_time']
                let timeList = {}, current_time = new Date()
                timeList.start_time = new Date(start_time)
                timeList.end_time = new Date(new Date(start_time).getTime() + (24 * 60 * 60 * 1000))

                if (timeList.end_time < current_time) {
                    let sql = '', row = ''
                    let getTicket = require('./yinbao_get_ticket')
                    let callData = getTicket(timeList)
                    callData.then(function (eData2) {
                        if (eData2.status == 'success' && eData2.data.result.length > 0) {
                            let result = eData2.data.result
                            console.info(result)
                            let day_sellprice = 0
                            for (let i in result) {
                                sql = 'insert into yinbao_order (cashier,cashierUid,customerUid,datetime,invalid,items,orderNo,payments,remark,rounding,serviceFee,sn,ticketType,totalAmount,totalProfit,uid,webOrderNo)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
                                row = db.Query(sql, [result[i].cashier, result[i].cashierUid, result[i].customerUid, result[i].datetime, result[i].invalid, result[i].items, (result[i].orderNo ? result[i].orderNo : ''), result[i].payments, (result[i].remark ? result[i].remark : ''), result[i].rounding, (result[i].serviceFee >= 0 ? result[i].serviceFee : ''), result[i].sn, result[i].ticketType, result[i].totalAmount, result[i].totalProfit, result[i].uid, result[i].webOrderNo])

                                let items = JSON.parse(result[i].items)
                                for (let j in items) {
                                    day_sellprice = day_sellprice + items[j].totalAmount
                                }
                            }
                            sql = 'insert into yinbao_order_sellprice (total_price,start_time,end_time)values(?,?,?)'
                            row = db.Query(sql, [day_sellprice, timeList.start_time, timeList.end_time])
                        }

                        sql = "update yinbao_update_time set last_update_time = ?"
                        row = db.Query(sql, timeList.end_time)
                    })

                }
            }
        })
    }, 10 * 1000)
}