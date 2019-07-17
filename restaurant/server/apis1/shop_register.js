var tools = require("./../tool");

function SHOPRegister() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var data = {}
        var name = "FBRegister::Run";
        tool.log.debug(name + ".in");
        var response = tool.error.OK;
        if (!param["op_id"]) {
            response = tool.error.ErrorNotOpId;
        } else if (!param["nick_name"]) {
            response = tool.error.ErrorNotNickName;
        } else if (param["type"] == 0) { // type: 0 custom, 1 admin, 2 god
            var row = [];
            var sql = '';
            try {
                if (!param["avatar"]) {
                    log.warn('注册没有头像')
                    // response = tool.error.ErrorNotNickName;
                } else {
                    sql = "insert into user(open_id, user_name, type, avatar,state)values(?,?,?,?,0)"
                    row = await tool.query(sql, [param["op_id"], param["nick_name"], param["type"], param["avatar"]]);
                    data.user_id = row.insertId

                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("FBRegister::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            response = tool.error.ErrorUserType;
            tool.log.warn(name, "error user type");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("FBRegister::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "register",
            }, res);
        tool.log.debug("FBRegister::Run.out");
    }
}

module.exports = SHOPRegister;