var tools = require("./../tool");

function RestaurantCheckOrderStock() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantCheckOrderStock::Run";
        log.debug("RestaurantCheckOrderStock::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        try {
            if (param.length <= 0) {
                data.code = 1
            } else {
                sql = "select * from restaurant_goods where id in (?)";
                row = await query(sql, [param.map(function (eData) {
                    return eData.goodsId
                })]);
                if (row.length > 0) {
                    let haveStock = row.every(function (eData) {
                        for (let i in param) {
                            if (eData.id == param[i].goodsId) {
                                if (eData.stock >= param[i].number) {
                                    return true
                                }
                            }
                        }
                        return false
                    })
                    // every 只要满足true 就不会再运行下去
                    let shortageList = []
                    for (let i in row) {
                        for (let j in param) {
                            if (row[i].id == param[j].goodsId) {
                                if (row[i].stock < param[j].number) {
                                    shortageList.push(row[i])
                                }
                            }
                        }
                    }
                    data.code = 0
                    if (haveStock) {
                        data.canPay = 0
                        data.text = '库存有盈余'
                    } else {
                        data.canPay = 1
                        data.text = '库存耗竭'
                        data.shortageList = shortageList
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
                action: "get_banner",
            }, res);
        tool.log.debug("RestaurantCheckOrderStock::Run.out");
    }
}

module.exports = RestaurantCheckOrderStock;