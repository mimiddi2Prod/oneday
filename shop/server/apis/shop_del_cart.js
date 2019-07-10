var tools = require("./../tool");

function SHOPDelCart() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPDelCart::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["user_id"]) {
            // 用户id可能不需要传 cart的id为唯一对应的
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'user_id is not defined')
        } else if (param["cartId"]) {
            // 传过来的id为字符串形式以'_'分隔开来
            var cartIdList = param["cartId"].split('_')
            var row = [];
            var str = '?'
            str = str.repeat(cartIdList.length).split('').join(',')
            try {
                var sql = "delete from cart where id in(" + str + ")"
                row = await tool.query(sql, cartIdList)
                data.text = '删除成功'
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPDelCart::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPDelCart::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "del_cart",
            }, res);
        tool.log.debug("SHOPDelCart::Run.out");
    }
}

module.exports = SHOPDelCart;