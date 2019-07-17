var tools = require("./../tool");

function RestaurantGetMenuByLocationCode() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetMenuByLocationCode::Run";
        log.debug("RestaurantGetMenuByLocationCode::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        try {
            sql = "select id,`name` from restaurant_menu where location_code = ? order by sort";
            row = await query(sql, param['location_code']);
            if (row.length > 0) {
                data = row
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

        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_menu_by_location_code",
            }, res);
        tool.log.debug("RestaurantGetMenuByLocationCode::Run.out");
    }
}

module.exports = RestaurantGetMenuByLocationCode;