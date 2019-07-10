var tools = require("./../tool");

function SHOPAddCart() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPAddCart::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["user_id"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'user_id is not defined')
        } else if (param["param_id_1"] && param["param_id_2"]) {
            var row = [];
            var sql = ""
            try {
                sql = "select user_id,item_param_id_1, item_param_id_2,`number` from cart where user_id = ? and item_param_id_1 = ? and item_param_id_2 = ?"
                row = await tool.query(sql,[param["user_id"], param["param_id_1"], param["param_id_2"]])
                var rowData = row
                if(rowData.length <= 0){
                    sql = "insert into cart(user_id,item_param_id_1, item_param_id_2,`number`,create_time)values(?,?,?,?,CURRENT_TIMESTAMP)"
                    row = await tool.query(sql, [param["user_id"], param["param_id_1"], param["param_id_2"], param["number"]]);
                    data.text = "添加成功"
                }else{
                    var number = rowData[0].number
                    console.info(row)
                    sql = "select stock from item_price where param_id_1 = ? and param_id_2 = ?"
                    row =  await tool.query(sql, [param["param_id_1"], param["param_id_2"]]);
                    console.info(row)
                    if(row[0].stock >= number + param["number"]){
                        sql = "update cart set `number` = ? where user_id = ? and item_param_id_1 = ? and item_param_id_2 = ?"
                        row =  await tool.query(sql, [param["number"]+number,param["user_id"], param["param_id_1"], param["param_id_2"]]);
                        data.text = "添加成功"
                    }else{
                        data.text = "添加商品超出库存量"
                    }
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPAddCart::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPAddCart::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_cart",
            }, res);
        tool.log.debug("SHOPAddCart::Run.out");
    }
}

module.exports = SHOPAddCart;