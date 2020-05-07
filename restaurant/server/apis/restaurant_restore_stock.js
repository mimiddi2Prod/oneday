var tools = require("./../tool");

function RestaurantRestoreStock() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantRestoreStock::Run";
        // log.debug("RestaurantRestoreStock::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        try {
            if (param.length <= 0) {
                data.code = 1
            } else {
                let temp = []
                for (let i in param) {
                    let haveSameGoods = temp.some(function (item) {
                        return item.goodsId == param[i].goodsId
                    })
                    if (!haveSameGoods) {
                        temp.push({
                            goodsId: param[i].goodsId,
                            number: param[i].number
                        })
                    } else {
                        for (let j in temp) {
                            if (temp[j].goodsId == param[i].goodsId) {
                                temp[j].number = temp[j].number + param[i].number
                            }
                        }
                    }
                }
                param = temp
                
                sql = "select * from restaurant_goods where id in (?)";
                row = await query(sql, [param.map(function (eData) {
                    return eData.goodsId
                })]);

                if (row.length > 0) {
                    let getRow = row
                    // 对微信支付失败的订单进行库存恢复
                    for (let i in getRow) {
                        for (let j in param) {
                            if (getRow[i].id == param[j].goodsId) {
                                let stock = getRow[i].stock + param[j].number
                                sql = "update restaurant_goods set stock = ? where id = ?"
                                row = await query(sql, [stock, getRow[i].id])
                            }
                        }
                    }
                }
            }

        } catch (err) {
            if (err.code) {
                response = tool.error.ErrorSQL;
                log.warn(name, "code:", err.code, ", sql:", err.sql);
            } else {
                log.warn(name, JSON.stringify(response));
                response = tool.error.ErrorCatch;
            }
        }
        // }


        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "restore_stock",
            }, res);
        // tool.log.debug("RestaurantRestoreStock::Run.out");
    }
}

module.exports = RestaurantRestoreStock;