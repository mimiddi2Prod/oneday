var tools = require("./../tool");

function SHOPDelAddress() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPDelAddress::Run";
        // tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        // tool.log.debug(param)
        if (!param["user_id"]) {
            // 用户id可能不需要传 cart的id为唯一对应的
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'user_id is not defined')
        } else if (param["address_id"]) {
            var row = [];
            try {
                var sql = "delete from address where id = ?"
                row = await tool.query(sql, param["address_id"])
                data.text = '删除成功'
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPDelAddress::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPDelAddress::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "del_address",
            }, res);
        // tool.log.debug("SHOPDelCart::Run.out");
    }
}

module.exports = SHOPDelAddress;