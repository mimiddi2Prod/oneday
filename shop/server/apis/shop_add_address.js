var tools = require("./../tool");

function SHOPAddAddress() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPAddAddress::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["user_id"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'user_id is not defined')
        } else if (param["user_id"]) {
            var row = [];
            var sql = ""
            try {
                sql = "insert into address(receiver,tel,province,city,area,road,user_id,create_time)values(?,?,?,?,?,?,?,CURRENT_TIMESTAMP)"
                row = await tool.query(sql,[param["receiver"], param["tel"], param["province"],param["city"],param["area"],param["road"],param["user_id"]])
                if(row.insertId){
                    data.text = "添加地址成功"
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPAddAddress::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPAddAddress::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_address",
            }, res);
        tool.log.debug("SHOPAddAddress::Run.out");
    }
}

module.exports = SHOPAddAddress;