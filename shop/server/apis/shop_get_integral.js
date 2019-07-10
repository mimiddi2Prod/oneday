var tools = require("./../tool");

function SHOPGetIntegral() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPGetIntegral::Run";
        tool.log.debug(name + ".in");
        var data = [];
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["user_id"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'op_id is not defined')
        } else if (param["user_id"]) {
            var row = [];
            var sql = ""
            try {
                sql = "select integral from `user` where id = ?"
                row = await tool.query(sql, param["user_id"])
                if (row.length > 0) {
                    data = row
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPGetIntegral::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPGetIntegral::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_cart",
            }, res);
        tool.log.debug("SHOPGetIntegral::Run.out");
    }
}

module.exports = SHOPGetIntegral;