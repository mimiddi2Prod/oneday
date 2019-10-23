var tools = require("./../tool");

function SHOPGetCheckOrderStock() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetCheckOrderStock::Run";
        log.debug("SHOPGetCheckOrderStock::Run.in");
        var data = {};
        var response = tool.error.OK;
        var row = [], sql = '';
        try {
            if (!param.user_id && param.order.length <= 0) {
                data.code = 1
            } else {
                let itemParamList = []
                for (let i in param.order) {
                    // 确认商品对应属性都存在于数据库中
                    sql = 'select * from item_price where item_id = ? and param_id_1 = ? and param_id_2 = ?'
                    row = await query(sql, [param.order[i]['item_id'], param.order[i]['item_param_id_1'], param.order[i]['item_param_id_2']]);
                    if (row.length > 0) {
                        itemParamList = itemParamList.concat(row)
                    }
                }
                if (itemParamList.length == param.order.length) {
                    //
                    console.info(itemParamList)
                    let haveStock = itemParamList.every(function (eData) {
                        for (let i in param.order) {
                            if (eData.param_id_1 == param.order[i].item_param_id_1 && eData.param_id_2 == param.order[i].item_param_id_2) {
                                if (eData.stock >= param.order[i].number) {
                                    return true
                                }
                            }
                        }
                        return false
                    })

                    data.code = 0
                    if (haveStock) {
                        data.canPay = 0
                        data.text = '库存有盈余'

                        // 减去对应库存 锁单
                        // for (let i in itemParamList) {
                        //     for (let j in param) {
                        //         if (itemParamList[i].id == param[j].goodsId) {
                        //             let stock = itemParamList[i].stock - param[j].number
                        //             sql = "update restaurant_goods set stock = ? where id = ?"
                        //             row = await query(sql, [stock, itemParamList[i].id])
                        //         }
                        //     }
                        // }
                        // 在paid中添加订单 为未支付状态
                    } else {
                        // 提取库存不足的商品名字
                        let shortageList = []
                        for (let i in itemParamList) {
                            for (let j in param.order) {
                                if (itemParamList[i].param_id_1 == param.order[j].item_param_id_1 && itemParamList[i].param_id_2 == param.order[j].item_param_id_2) {
                                    if (itemParamList[i].stock < param.order[j].number) {
                                        param.order[j].stock = itemParamList[i].stock
                                        shortageList.push(param.order[j])
                                    }
                                }
                            }
                        }

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

        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_goodsInfo",
            }, res);
        tool.log.debug("SHOPGetCheckOrderStock::Run.out");
    }
}

module.exports = SHOPGetCheckOrderStock;