var tools = require("./../tool");

function RestaurantGetBanner() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetBanner::Run";
        // log.debug("RestaurantGetBanner::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        // if (param['openid'].length <= 0) {
        //     console.info('没有收到用户的openid')
        // } else {
        try {
            sql = "select * from restaurant_banner where status = ? order by sort";
            row = await query(sql, 0);
            // console.info(row)
            if (row.length > 0) {
                data.opening = row
            }

        } catch (err) {
            log.error(name, err)
            // if (err.code) {
            //     response = tool.error.ErrorSQL;
            //     log.warn(name, "code:", err.code, ", sql:", err.sql);
            // } else {
            //     log.warn(name, JSON.stringify(response));
            //     response = tool.error.ErrorCatch;
            // }
        }
        // }


        // if (response.code != tool.error.OKCode) {
        //     log.warn(name, JSON.stringify(response));
        // }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_banner",
            }, res);
        // tool.log.debug("RestaurantGetBanner::Run.out");
    }
}

module.exports = RestaurantGetBanner;
