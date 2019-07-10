var tools = require("./../tool");

function SHOPUpdateCartGoodsNum() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPUpdateCartGoodsNum::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["user_id"]) {
            // 用户id可能不需要传 cart的id为唯一对应的
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'user_id is not defined')
        } else if (param["cart_id"] && param["number"]) {
            var row = [];
            try {
                var sql = "update cart set number = ? where id = ?"
                row = await tool.query(sql, [param["number"], param["cart_id"]])
                if (row.changedRows == 1) {
                    data.text = "更改商品数量成功"
                }else{
                    data.text = "没有改动"
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPGetCart::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPUpdateCartGoodsNum::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "update_cartGoodsNum",
            }, res);
        tool.log.debug("SHOPUpdateCartGoodsNum::Run.out");
    }
}

module.exports = SHOPUpdateCartGoodsNum;