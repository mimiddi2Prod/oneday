var tools = require("./../tool");

function RestaurantGetCategoryByLocationCode() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetCategoryByLocationCode::Run";
        log.debug("RestaurantGetCategoryByLocationCode::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        try {
            sql = "select id,`name` from restaurant_category where location_code = ? order by sort";
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
                action: "get_category_by_location_code",
            }, res);
        tool.log.debug("RestaurantGetCategoryByLocationCode::Run.out");
    }
}

module.exports = RestaurantGetCategoryByLocationCode;