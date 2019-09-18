var tools = require("./../tool");

function SHOPGetAfterSale() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetAfterSale::Run";
        log.debug("SHOPGetAfterSale::Run.in");
        var data = [];
        var response = tool.error.OK;
        var row = [];
        var sql = ''
        if (!param['user_id']) {
            tool.log.warn(name, 'user_id is not defined')
        } else if (param['user_id']) {
            try {
                // 数据库需要加订单号 说明是同一个包裹
                if (param['status'] == 0) {
                    console.info
                    // 拉取 申请售后栏
                    sql = "select item_id,param_id_1,param_id_2,param_1,param_2,image,`number`,update_time,create_time,state,address_text,tel,receiver,single_price,postage,id,tradeId,after_sale_state,logistics_code from `order` where user_id = ? and state >= ? and state <= ? and after_sale_state <= ? ORDER BY update_time desc limit ?,?";
                    row = await query(sql, [param['user_id'], 2, 7, 3, param['last_id'] * 10, 10]);
                    console.info(row)
                } else if (param['status'] == 1) {
                    // 拉取 售后记录栏
                    sql = "select item_id,param_id_1,param_id_2,param_1,param_2,image,`number`,update_time,create_time,state,address_text,tel,receiver,single_price,postage,id,tradeId,after_sale_state,logistics_code from `order` where user_id = ? and after_sale_state >= ? and after_sale_state <= ? ORDER BY update_time desc limit ?,?";
                    row = await query(sql, [param['user_id'], 4, 7, param['last_id'] * 10, 10]);
                    console.info(row)
                }
                var rowData = row
                if (rowData.length > 0) {
                    data = rowData
                    // console.info(rowData)
                    for (var i in data) {
                        sql = "select `name`,url,qcl,`describe` from item where id = ?"
                        row = await query(sql, data[i].item_id);
                        data[i].name = row[0].name
                        data[i].url = row[0].url
                        data[i].qcl = row[0].qcl
                        data[i].describe = row[0].describe

                        // if (data[i].param_id_1) {
                        //     sql = "select param,image from item_param where id = ?"
                        //     row = await query(sql, data[i].param_id_1)
                        //     if (row[0].image) {
                        //         data[i].image = row[0].image
                        //     }
                        //     data[i].param_1 = row[0].param
                        // }

                        // if (data[i].param_id_2) {
                        //     sql = "select param,image from item_param where id = ?"
                        //     row = await query(sql, data[i].param_id_2)
                        //     if (row[0].image) {
                        //         data[i].image = row[0].image
                        //     }
                        //     data[i].param_2 = row[0].param
                        // }
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
        }

        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_afterSale",
            }, res);
        tool.log.debug("SHOPGetAfterSale::Run.out");
    }
}

module.exports = SHOPGetAfterSale;