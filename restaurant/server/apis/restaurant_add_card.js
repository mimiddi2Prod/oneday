var tools = require("./../tool");

async function RestaurantAddCard(param) {
    var tool = new tools;
    var query = tool.query;

    var data = {};
    var sql = '', row = [];

    if (!param["cardList"]) {
        tool.log.warn(name, 'cardList is not defined')
    } else if (!param["openid"]) {
        tool.log.warn(name, 'openid is not defind')
    } else {
        var row = [];
        try {
            let cardList = JSON.parse(param["cardList"]).cardList
            for (let i in cardList) {
                var sql = "select * from restaurant_card_info where card_id = ?"
                row = await query(sql, cardList[i].cardId)
                if (row.length > 0) {
                    let date_info = JSON.parse(row[0].cash).base_info.date_info
                    cardList[i].begin_time = new Date(date_info.begin_timestamp * 1000)
                    cardList[i].end_time = new Date(date_info.end_timestamp * 1000)
                }
                sql = "insert into restaurant_card(card_id,code,cardExt,openid,begin_time,end_time,create_time)values(?,?,?,?,?,?,CURRENT_TIMESTAMP )"
                row = await query(sql, [cardList[i].cardId, cardList[i].code, cardList[i].cardExt, param["openid"], cardList[i].begin_time, cardList[i].end_time])
                if (row.insertId) {
                    data.text = "添加成功"
                }
            }
        } catch (err) {
            response = tool.error.ErrorSQL;
            tool.log.error("RestaurantAddCard::Run", "code:", err.code, ", sql:", err.sql);
        }
    }

    if (response.code != tool.error.OKCode) {
        log.warn(name, JSON.stringify(response));
    }

    tool.MakeResponse(200,
        {
            res: response,
            data: data,
            action: "add_card",
        }, res);
    tool.log.debug("RestaurantAddCard::Run.out");
}

module.exports = RestaurantAddOrder;