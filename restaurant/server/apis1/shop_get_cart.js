var tools = require("./../tool");

function SHOPGetCart() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPGetCart::Run";
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
                sql = "select item_param_id_1, item_param_id_2,`number`,id from cart where user_id = ?"
                row = await tool.query(sql, param["user_id"])
                var rowData = row
                if (rowData.length > 0) {
                    for (let i in rowData) {
                        // 需要做 获取库存时 需要再减去 获取paid一个小时内下单但未付款的数量
                        sql = "select item_id,price,stock,id from item_price where param_id_1 = ? and param_id_2 = ?"
                        row = await tool.query(sql, [rowData[i].item_param_id_1, rowData[i].item_param_id_2])
                        if (row.length > 0) {
                            rowData[i].price = row[0].price
                            rowData[i].stock = row[0].stock
                            var item_id = row[0].item_id

                            var currentTime = new Date().getTime()
                            var oneHours = 60 * 60 * 1000
                            var time = new Date(currentTime - oneHours)
                            sql = "select sum(number) from paid where item_price_id = ? and create_time >= ?"
                            row = await tool.query(sql, [row[0].id, time])
                            if(row.length > 0){
                                console.info(row[0]['sum(number)'])
                                rowData[i].stock = rowData[i].stock - row[0]['sum(number)']
                            }

                            sql = "select name,url,qcl,`describe`,id,integral_price from item where id = ?"
                            row = await tool.query(sql, item_id)
                            rowData[i].item_id = row[0].id
                            rowData[i].name = row[0].name
                            rowData[i].url = row[0].url
                            rowData[i].qcl = row[0].qcl
                            rowData[i].describe = row[0].describe
                            rowData[i].integral_price = row[0].integral_price
                        }
                        sql = "select image,param from item_param where id = ?"
                        row = await tool.query(sql, rowData[i].item_param_id_1)
                        console.info(rowData[i])
                        if (row.length > 0) {
                            rowData[i].param_1 = row[0].param
                            if (row[0].image) {
                                rowData[i].image = row[0].image
                            }
                        }

                        sql = "select image,param from item_param where id = ?"
                        row = await tool.query(sql, rowData[i].item_param_id_2)
                        if (row.length > 0) {
                            rowData[i].param_2 = row[0].param
                            if (row[0].image) {
                                rowData[i].image = row[0].image
                            }
                        }
                    }
                }
                data = rowData.filter(function (res) {
                    return res.price.toString()
                })
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPGetCart::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPGetCart::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_cart",
            }, res);
        tool.log.debug("SHOPGetCart::Run.out");
    }
}

module.exports = SHOPGetCart;