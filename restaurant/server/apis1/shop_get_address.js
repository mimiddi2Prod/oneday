var tools = require("./../tool");

function SHOPGetAddress() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPGetAddress::Run";
        tool.log.debug(name + ".in");
        var data = [];
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["user_id"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'user_id is not defined')
        } else if (param["user_id"]) {
            var row = [];
            var sql = ""
            try {
                sql = "select receiver,tel,province,city,area,road,id from address where user_id = ?"
                row = await tool.query(sql, param["user_id"])
                if (row.length > 0) {
                    data = row
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPGetAddress::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPGetAddress::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_cart",
            }, res);
        tool.log.debug("SHOPGetAddress::Run.out");
    }
}

module.exports = SHOPGetAddress;