var tools = require("./../tool");

function RestaurantSaveCard() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantSaveCard::Run";
        log.debug("RestaurantSaveCard::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (!param["cardList"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'cardList is not defined')
        } else if (!param["openid"]) {
            tool.log.warn(name, 'openid is not defind')
        } else {
            var row = [];
            try {
                // let cardList = JSON.parse(param["cardList"]).cardList
                // for (let i in cardList) {
                //     var sql = "select * from restaurant_card_info where card_id = ?"
                //     row = await tool.query(sql, cardList[i].cardId)
                //     if (row.length > 0) {
                //         let date_info = JSON.parse(row[0].cash).base_info.date_info
                //         cardList[i].begin_time = new Date(date_info.begin_timestamp * 1000)
                //         cardList[i].end_time = new Date(date_info.end_timestamp * 1000)
                //     }
                //     sql = "insert into restaurant_card(card_id,code,cardExt,openid,begin_time,end_time,create_time)values (?,?,?,?,?,?,CURRENT_TIMESTAMP )"
                //     row = await tool.query(sql, [cardList[i].cardId, cardList[i].code, cardList[i].cardExt, param["openid"], cardList[i].begin_time, cardList[i].end_time])
                //     if (row.insertId) {
                //         data.text = "添加成功"
                //     }
                // }
                let cardList = JSON.parse(param["cardList"]).cardList
                var sql = "select * from restaurant_card_info where card_id in (?)"
                row = await tool.query(sql, [cardList.map(val => {
                    return val.cardId
                })])
                if (row.length > 0) {
                    let ctime = new Date(new Date().toLocaleDateString()).getTime()
                    for (let i in cardList) {
                        for (let j in row) {
                            if (row[j].card_id == cardList[i].cardId) {
                                let date_info = JSON.parse(row[j].cash).base_info.date_info
                                if (date_info.type == "DATE_TYPE_FIX_TIME_RANGE") {
                                    cardList[i].begin_time = new Date(date_info.begin_timestamp * 1000)
                                    cardList[i].end_time = new Date(date_info.end_timestamp * 1000)
                                } else if (date_info.type == "DATE_TYPE_FIX_TERM") {
                                    cardList[i].begin_time = new Date(ctime + (1000 * 60 * 60 * 24 * date_info.fixed_begin_term))
                                    cardList[i].end_time = new Date(ctime + (1000 * 60 * 60 * 24 * date_info.fixed_begin_term) + (1000 * 60 * 60 * 24 * date_info.fixed_term) - 1000)
                                }
                            }
                        }
                    }
                    let list = cardList.map(val => {
                        return {
                            "card_id": val.cardId,
                            "code": val.code,
                            "cardExt": val.cardExt,
                            "openid": param["openid"],
                            "begin_time": val.begin_time,
                            "end_time": val.end_time,
                            "create_time": new Date(),
                        }
                    })
                    console.info(list)
                    await BulkInsert('restaurant_card', list)
                    data.text = "添加成功"
                }
                async function BulkInsert(table, list) {
                    let keys = Object.keys(list[0])
                    let sql = "insert into " + "`" + table + "` (`" + keys.join("`,`") + "`) values "
                    let string_1 = "(" + (() => {
                        let temp = []
                        keys.forEach(() => {
                            temp.push("?")
                        })
                        return temp
                    })() + ")"
                    let string_2 = (() => {
                        let temp = []
                        list.forEach(() => {
                            temp.push(string_1)
                        })
                        return temp
                    })()
                    sql += string_2
                    // 整理获得插入数据
                    let arr = []
                    list.forEach((value) => {
                        arr = arr.concat(Object.values(value))
                    })
                    tool.query(sql, arr)
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("RestaurantSaveCard::Run", "code:", err.code, ", sql:", err.sql);
            }
        }


        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "save_card",
            }, res);
        tool.log.debug("RestaurantSaveCard::Run.out");
    }
}

module.exports = RestaurantSaveCard;
