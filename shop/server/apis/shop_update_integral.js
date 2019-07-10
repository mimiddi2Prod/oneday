var tools = require("./../tool");

function SHOPUpdateIntegral() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPUpdateIntegral::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["integral"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'integral is not defined')
        }
        // else if (!param["state"].toString()) {
        //     // response = tool.error.ErrorUserType;
        //     tool.log.warn(name, "state is not defined");
        // }
        else if (!param["user_id"]) {
            tool.log.warn(name, "user_id is not defined");
        } else {
            var row = [];
            try {
                var sql = "select integral from `user` where id = ?"
                row = await tool.query(sql, param["user_id"])
                if (row.length > 0) {
                    let currentIntegral = row[0].integral
                    console.info('---------------------')
                    console.info(currentIntegral)

                    // 0相加 1相减
                    // if (param['state'] == 0) {
                    currentIntegral = Number(currentIntegral) + Number(param["integral"])
                    console.info(currentIntegral)
                    console.info('---------------------')
                    // } else {
                    //     currentIntegral = currentIntegral - param["integral"]
                    // }
                    sql = "update `user` set integral = ? where id = ?"
                    row = await tool.query(sql, [currentIntegral, param["user_id"]])
                    if (row.changedRows == 1) {
                        data.text = "积分更新成功"
                    }
                }

            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPUpdateIntegral::Run", "code:", err.code, ", sql:", err.sql);
            }
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPUpdateIntegral::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "update_address",
            }, res);
        tool.log.debug("SHOPUpdateIntegral::Run.out");
    }
}

module.exports = SHOPUpdateIntegral;