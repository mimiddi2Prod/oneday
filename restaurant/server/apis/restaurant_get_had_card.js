var tools = require("./../tool");

function RestaurantGetHadCard() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetHadCard::Run";
        // log.debug("RestaurantGetHadCard::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (!param["openid"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'user_id is not defined')
        } else {
            var row = [];
            var sql = ""
            try {
                // sql = "select select_card_id from `order` where select_card_id is not null and state != -1 group by select_card_id"
                // row = await tool.query(sql)
                // let abCard = row

                sql = "select * from restaurant_card where openid = ? and trade_id is null"
                row = await tool.query(sql, param["openid"])
                let myCard = row
                if (myCard.length > 0) {
                    let myCardIdList = myCard.filter(val => {
                        // 去除已过期不可用的优惠券
                        return new Date(val.end_time) >= new Date()
                    }).map(function (fn) {
                        return fn.card_id
                    })
                    // let myCardIdList = myCard.map(function (fn) {
                    //     return fn.card_id
                    // })
                    // let ctime = new Date()
                    sql = "select * from restaurant_card_info where card_id in (?)"
                    row = await tool.query(sql, [myCardIdList.map(function (e) {
                        return e
                    })])
                    // row = row.filter(function (e) {
                    //     let date_info = JSON.parse(e.cash).base_info.date_info
                    //     if (date_info.type == "DATE_TYPE_FIX_TIME_RANGE") {
                    //         // 固定日期区间
                    //         return (new Date(date_info.begin_timestamp * 1000).getTime() < ctime && new Date(date_info.end_timestamp * 1000).getTime() > ctime)
                    //     } else {
                    //         return true
                    //     }
                    // })
                    for (let i in row) {
                        let cash = typeof row[i].cash == "string" ? JSON.parse(row[i].cash) : row[i].cash
                        let base_info = cash.base_info
                        for (let j in myCard) {
                            if (myCard[j].card_id == base_info.id) {
                                myCard[j].least_cost = cash.least_cost / 100
                                myCard[j].reduce_cost = cash.reduce_cost / 100
                                // myCard[j].begin_time = base_info.date_info.begin_timestamp * 1000
                                // myCard[j].end_time = base_info.date_info.end_timestamp * 1000
                                myCard[j].cash = cash
                            }
                        }
                    }
                    data = myCard
                    // data = data.filter(function (item) {
                    //     for (let i in abCard) {
                    //         if (item.id == abCard[i].select_card_id) {
                    //             return false
                    //         }
                    //     }
                    //     return true
                    // })
                }

            } catch (err) {
                log.error(name, err)
                // response = tool.error.ErrorSQL;
                // tool.log.error("RestaurantGetHadCard::Run", "code:", err.code, ", sql:", err.sql);
            }
        }


        // if (response.code != tool.error.OKCode) {
        //     log.warn(name, JSON.stringify(response));
        // }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_had_card",
            }, res);
        // tool.log.debug("RestaurantGetHadCard::Run.out");
    }
}

module.exports = RestaurantGetHadCard;
