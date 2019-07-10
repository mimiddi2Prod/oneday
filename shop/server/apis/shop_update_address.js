var tools = require("./../tool");

function SHOPUpdateAddress() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPUpdateAddress::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["address_id"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'address_id is not defined')
        } else if (!param["road"]) {
            tool.log.warn(name, 'road is not defined')
        } else if (!param["province"]) {
            tool.log.warn(name, 'province is not defined')
        } else if (!param["city"]) {
            tool.log.warn(name, 'city is not defined')
        } else if (!param["area"]) {
            tool.log.warn(name, 'area is not defined')
        } else if (!param["tel"]) {
            tool.log.warn(name, 'tel is not defined')
        }
        else if (param["receiver"]) {
            var row = [];
            try {
                var sql = "update address set receiver = ?,tel = ?,province = ?,city = ?,area = ?,road = ? where id = ?"
                row = await tool.query(sql, [param["receiver"], param["tel"], param["province"], param["city"], param["area"], param["road"], param["address_id"]])
                if (row.changedRows == 1) {
                    data.text = "更新地址成功"
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPUpdateAddress::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPUpdateAddress::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "update_address",
            }, res);
        tool.log.debug("SHOPUpdateAddress::Run.out");
    }
}

module.exports = SHOPUpdateAddress;