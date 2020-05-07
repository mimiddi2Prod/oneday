var tools = require("./../tool");

function RestaurantGetSubscribeMessage() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetSubscribeMessage::Run";
        log.debug("RestaurantGetSubscribeMessage::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        try {
            sql = "select * from restaurant_subscribe_message";
            row = await query(sql);
            // console.info(row)
            if (row.length > 0) {
                data = row
            } else {
                data = []
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
        // }


        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_tmplIds",
            }, res);
        tool.log.debug("RestaurantGetSubscribeMessage::Run.out");
    }
}

module.exports = RestaurantGetSubscribeMessage;